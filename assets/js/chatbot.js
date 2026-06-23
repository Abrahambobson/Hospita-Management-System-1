/* ========================================
   AI CHATBOT MODULE
   ======================================== */

const chatbot = {
    isOpen: false,
    messages: [],
    apiKey: '', // Set your OpenAI or similar API key here

    init() {
        this.createChatbotWidget();
        this.loadChatHistory();
        this.setupEventListeners();
    },

    createChatbotWidget() {
        const existingWidget = document.getElementById('chatbotWidget');
        if (existingWidget) return;

        const widget = document.createElement('div');
        widget.id = 'chatbotWidget';
        widget.className = 'chatbot-widget';
        widget.innerHTML = `
      <div class="chatbot-container">
        <div class="chatbot-header">
          <h4>Hospital Assistant</h4>
          <button id="chatbotClose" class="close-btn">×</button>
        </div>
        <div class="chatbot-messages" id="chatbotMessages"></div>
        <div class="chatbot-footer">
          <input 
            type="text" 
            id="chatbotInput" 
            placeholder="Ask me anything..." 
            class="chatbot-input"
          >
          <button id="chatbotSend" class="btn btn-primary btn-sm">Send</button>
        </div>
      </div>
      <button id="chatbotToggle" class="chatbot-toggle">💬</button>
    `;
        document.body.appendChild(widget);
    },

    setupEventListeners() {
        const toggle = document.getElementById('chatbotToggle');
        const close = document.getElementById('chatbotClose');
        const send = document.getElementById('chatbotSend');
        const input = document.getElementById('chatbotInput');

        toggle?.addEventListener('click', () => this.toggle());
        close?.addEventListener('click', () => this.close());
        send?.addEventListener('click', () => this.sendMessage());
        input?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
    },

    toggle() {
        this.isOpen ? this.close() : this.open();
    },

    open() {
        const widget = document.querySelector('.chatbot-widget');
        if (widget) {
            widget.classList.add('open');
            this.isOpen = true;
            document.getElementById('chatbotInput')?.focus();
        }
    },

    close() {
        const widget = document.querySelector('.chatbot-widget');
        if (widget) {
            widget.classList.remove('open');
            this.isOpen = false;
        }
    },

    async sendMessage() {
        const input = document.getElementById('chatbotInput');
        const message = input?.value.trim();

        if (!message) return;

        // Add user message
        this.addMessage(message, 'user');
        input.value = '';

        // Show typing indicator
        this.showTypingIndicator();

        try {
            // Get bot response
            const response = await this.getBotResponse(message);
            this.removeTypingIndicator();
            this.addMessage(response, 'bot');
        } catch (error) {
            this.removeTypingIndicator();
            this.addMessage('Sorry, I encountered an error. Please try again.', 'bot');
            console.error('Chatbot error:', error);
        }
    },

    addMessage(text, sender) {
        const messagesContainer = document.getElementById('chatbotMessages');
        if (!messagesContainer) return;

        const message = {
            text,
            sender,
            timestamp: new Date()
        };

        this.messages.push(message);
        this.saveChatHistory();

        const messageElement = document.createElement('div');
        messageElement.className = `chatbot-message chatbot-message-${sender}`;
        messageElement.innerHTML = `
      <p>${this.escapeHtml(text)}</p>
      <small>${this.getTimeString(message.timestamp)}</small>
    `;

        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    },

    showTypingIndicator() {
        const messagesContainer = document.getElementById('chatbotMessages');
        if (!messagesContainer) return;

        const indicator = document.createElement('div');
        indicator.className = 'chatbot-message chatbot-message-bot chatbot-typing';
        indicator.id = 'typingIndicator';
        indicator.innerHTML = `
      <div class="typing-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    `;
        messagesContainer.appendChild(indicator);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    },

    removeTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        indicator?.remove();
    },

    async getBotResponse(userMessage) {
        // Default responses for common queries
        const lowerMessage = userMessage.toLowerCase();
        const responses = {
            'hello|hi|hey': 'Hello! Welcome to Hospital Management System. How can I assist you today?',
            'help': 'I can help you with:\n- Finding doctors\n- Booking appointments\n- Viewing health records\n- Understanding services\n- General health tips',
            'appointment': 'To book an appointment, please visit the appointment booking page or log in to your patient portal.',
            'health record': 'Your health records are securely stored in your patient portal. Log in to view them.',
            'emergency': 'In case of emergency, please call our emergency hotline or visit the nearest emergency room immediately.',
            'hours': 'Hospital operating hours: Monday-Friday 8 AM - 6 PM, Saturday 9 AM - 2 PM, Sunday Closed.',
            'thanks|thank you': 'You\'re welcome! Is there anything else I can help you with?',
            'bye|goodbye': 'Goodbye! Feel free to reach out anytime you need assistance.',
        };

        // Check for matching response
        for (const [keywords, response] of Object.entries(responses)) {
            const keywordArray = keywords.split('|');
            if (keywordArray.some(keyword => lowerMessage.includes(keyword))) {
                return response;
            }
        }

        // If no match, return default response
        return 'Thank you for your question. For more specific assistance, please contact our support team or visit our FAQ section.';
    },

    saveChatHistory() {
        localStorage.setItem('chatHistory', JSON.stringify(this.messages));
    },

    loadChatHistory() {
        const saved = localStorage.getItem('chatHistory');
        if (saved) {
            this.messages = JSON.parse(saved);
            const messagesContainer = document.getElementById('chatbotMessages');
            if (messagesContainer) {
                this.messages.forEach(msg => {
                    const messageElement = document.createElement('div');
                    messageElement.className = `chatbot-message chatbot-message-${msg.sender}`;
                    messageElement.innerHTML = `
            <p>${this.escapeHtml(msg.text)}</p>
            <small>${this.getTimeString(new Date(msg.timestamp))}</small>
          `;
                    messagesContainer.appendChild(messageElement);
                });
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }
        }
    },

    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    },

    getTimeString(date) {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }
};

// Initialize chatbot when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    chatbot.init();
});

// Add chatbot styles dynamically
const style = document.createElement('style');
style.textContent = `
  #chatbotWidget {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 9999;
    font-family: inherit;
  }

  .chatbot-toggle {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: var(--primary-color);
    color: white;
    border: none;
    font-size: 24px;
    cursor: pointer;
    box-shadow: var(--shadow-lg);
    transition: var(--transition);
  }

  .chatbot-toggle:hover {
    background-color: #0056b3;
    transform: scale(1.1);
  }

  .chatbot-container {
    display: none;
    position: absolute;
    bottom: 80px;
    right: 0;
    width: 350px;
    max-width: 90vw;
    height: 500px;
    max-height: 70vh;
    background-color: white;
    border-radius: 8px;
    box-shadow: var(--shadow-lg);
    flex-direction: column;
    z-index: 10000;
  }

  .chatbot-container.show {
    display: flex;
  }

  #chatbotWidget.open .chatbot-container {
    display: flex;
  }

  #chatbotWidget.open .chatbot-toggle {
    display: none;
  }

  .chatbot-header {
    background-color: var(--primary-color);
    color: white;
    padding: 15px;
    border-radius: 8px 8px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 600;
  }

  .chatbot-messages {
    flex: 1;
    overflow-y: auto;
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .chatbot-message {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }

  .chatbot-message-user {
    align-items: flex-end;
  }

  .chatbot-message-bot {
    align-items: flex-start;
  }

  .chatbot-message p {
    padding: 10px 12px;
    border-radius: 8px;
    max-width: 80%;
    word-wrap: break-word;
    margin: 0;
  }

  .chatbot-message-user p {
    background-color: var(--primary-color);
    color: white;
  }

  .chatbot-message-bot p {
    background-color: var(--light-bg);
    color: var(--dark-text);
  }

  .chatbot-message small {
    font-size: 0.75rem;
    color: var(--light-text);
    margin-top: 4px;
    padding: 0 12px;
  }

  .chatbot-typing {
    align-items: flex-start;
  }

  .typing-dots {
    display: flex;
    gap: 4px;
    padding: 10px 12px;
    background-color: var(--light-bg);
    border-radius: 8px;
  }

  .typing-dots span {
    width: 8px;
    height: 8px;
    background-color: var(--light-text);
    border-radius: 50%;
    animation: bounce 1.4s infinite;
  }

  .typing-dots span:nth-child(2) {
    animation-delay: 0.2s;
  }

  .typing-dots span:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes bounce {
    0%, 60%, 100% { opacity: 0.5; }
    30% { opacity: 1; }
  }

  .chatbot-footer {
    display: flex;
    gap: 8px;
    padding: 12px;
    border-top: 1px solid var(--border-color);
    background-color: var(--light-bg);
    border-radius: 0 0 8px 8px;
  }

  .chatbot-input {
    flex: 1;
    padding: 8px 12px;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    font-size: 0.9rem;
  }

  .chatbot-input:focus {
    outline: none;
    border-color: var(--primary-color);
  }

  @media (max-width: 576px) {
    .chatbot-container {
      width: calc(100vw - 40px);
      height: 60vh;
    }

    .chatbot-toggle {
      width: 50px;
      height: 50px;
    }
  }
`;
document.head.appendChild(style);
