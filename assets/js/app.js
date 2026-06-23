/* ========================================
   MAIN APPLICATION LOGIC
   ======================================== */

const app = {
    apiBaseUrl: '/backend/api',
    currentUser: null,
    currentPage: 'home',

    init() {
        console.log('Hospital Management System Initialized');
        this.checkAuth();
        this.setupEventListeners();
        this.loadCurrentPage();
        this.initializeNotifications();
    },

    checkAuth() {
        const token = localStorage.getItem('authToken');
        const user = localStorage.getItem('currentUser');
        if (token && user) {
            this.currentUser = JSON.parse(user);
            this.setUserUI();
        } else {
            this.currentUser = null;
        }
    },

    setUserUI() {
        const userElement = document.getElementById('currentUser');
        if (userElement && this.currentUser) {
            userElement.textContent = this.currentUser.name;
            userElement.style.display = 'block';
        }
    },

    setupEventListeners() {
        // Mobile menu toggle
        const navbarToggle = document.querySelector('.navbar-toggle');
        const navbarNav = document.querySelector('.navbar-nav');
        if (navbarToggle) {
            navbarToggle.addEventListener('click', () => {
                navbarNav?.classList.toggle('show');
            });
        }

        // Sidebar toggle
        const sidebarToggle = document.querySelector('.sidebar-toggle');
        const sidebar = document.querySelector('.sidebar');
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => {
                sidebar?.classList.toggle('show');
            });
        }

        // Close mobile menu on link click
        const navLinks = document.querySelectorAll('.navbar-nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navbarNav?.classList.remove('show');
            });
        });

        // Logout
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.logout());
        }
    },

    loadCurrentPage() {
        const path = window.location.pathname;
        const page = path.split('/').pop() || 'index.html';
        this.currentPage = page.replace('.html', '');
    },

    async logout() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
        window.location.href = '/pages/public/login.html';
    },

    initializeNotifications() {
        if (this.currentUser) {
            this.checkNotifications();
            setInterval(() => this.checkNotifications(), 30000);
        }
    },

    async checkNotifications() {
        try {
            const response = await fetch(`${this.apiBaseUrl}/get_notifications.php`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            const data = await response.json();
            if (data.success && data.notifications.length > 0) {
                this.displayNotifications(data.notifications);
            }
        } catch (error) {
            console.error('Error checking notifications:', error);
        }
    },

    displayNotifications(notifications) {
        const notifContainer = document.getElementById('notificationsContainer');
        if (notifContainer) {
            notifContainer.innerHTML = notifications.map(notif => `
        <div class="notification-item" data-id="${notif.id}">
          <div class="notification-header">
            <strong>${notif.title}</strong>
            <button class="btn-close" onclick="app.dismissNotification('${notif.id}')">×</button>
          </div>
          <p>${notif.message}</p>
          <small>${new Date(notif.created_at).toLocaleString()}</small>
        </div>
      `).join('');
        }
    },

    dismissNotification(id) {
        const element = document.querySelector(`[data-id="${id}"]`);
        if (element) {
            element.remove();
        }
    },

    // Common functions
    showLoader() {
        const loader = document.getElementById('mainLoader');
        if (loader) loader.style.display = 'flex';
    },

    hideLoader() {
        const loader = document.getElementById('mainLoader');
        if (loader) loader.style.display = 'none';
    },

    showAlert(message, type = 'info') {
        const alertContainer = document.getElementById('alertContainer');
        if (!alertContainer) return;

        const alertElement = document.createElement('div');
        alertElement.className = `alert alert-${type}`;
        alertElement.innerHTML = `
      <span>${message}</span>
      <button class="btn-close" onclick="this.parentElement.remove()">×</button>
    `;
        alertContainer.appendChild(alertElement);

        setTimeout(() => alertElement.remove(), 5000);
    },

    // Date formatting
    formatDate(date) {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    },

    formatDateTime(dateTime) {
        return new Date(dateTime).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => app.init());
