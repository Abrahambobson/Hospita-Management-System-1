/* ========================================
   AUTHENTICATION MODULE
   ======================================== */

const auth = {
    apiBaseUrl: '/backend/api',

    async login(email, password) {
        try {
            app.showLoader();
            const response = await fetch(`${this.apiBaseUrl}/login.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            app.hideLoader();

            if (data.success) {
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('currentUser', JSON.stringify(data.user));
                app.currentUser = data.user;
                app.showAlert('Login successful!', 'success');

                // Redirect based on role
                setTimeout(() => {
                    const dashboardUrl = this.getDashboardUrl(data.user.role);
                    window.location.href = dashboardUrl;
                }, 1500);
            } else {
                app.showAlert(data.message || 'Login failed', 'danger');
            }
        } catch (error) {
            app.hideLoader();
            app.showAlert('An error occurred during login', 'danger');
            console.error('Login error:', error);
        }
    },

    async register(userData) {
        try {
            app.showLoader();
            const response = await fetch(`${this.apiBaseUrl}/register.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();
            app.hideLoader();

            if (data.success) {
                app.showAlert('Registration successful! Redirecting to login...', 'success');
                setTimeout(() => {
                    window.location.href = '/pages/public/login.html';
                }, 2000);
            } else {
                app.showAlert(data.message || 'Registration failed', 'danger');
            }
        } catch (error) {
            app.hideLoader();
            app.showAlert('An error occurred during registration', 'danger');
            console.error('Registration error:', error);
        }
    },

    getDashboardUrl(role) {
        const dashboards = {
            'patient': '/pages/patient/dashboard.html',
            'doctor': '/pages/doctor/dashboard.html',
            'admin': '/pages/admin/dashboard.html',
            'staff': '/pages/admin/dashboard.html'
        };
        return dashboards[role] || '/index.html';
    },

    isAuthenticated() {
        return !!localStorage.getItem('authToken');
    },

    getCurrentUser() {
        const user = localStorage.getItem('currentUser');
        return user ? JSON.parse(user) : null;
    },

    getToken() {
        return localStorage.getItem('authToken');
    },

    logout() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
        window.location.href = '/pages/public/login.html';
    },

    requireAuth(requiredRoles = []) {
        if (!this.isAuthenticated()) {
            window.location.href = '/pages/public/login.html';
            return false;
        }

        if (requiredRoles.length > 0) {
            const user = this.getCurrentUser();
            if (!requiredRoles.includes(user.role)) {
                window.location.href = '/index.html';
                return false;
            }
        }

        return true;
    }
};

// Form validation
const formValidator = {
    validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    },

    validatePassword(password) {
        // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        return regex.test(password);
    },

    validatePhone(phone) {
        const regex = /^[\d\s\-\+\(\)]{10,}$/;
        return regex.test(phone);
    },

    validateForm(formElement) {
        const errors = {};
        const formData = new FormData(formElement);

        for (let [key, value] of formData.entries()) {
            const field = formElement.elements[key];

            if (field.required && !value.trim()) {
                errors[key] = 'This field is required';
            }

            if (key === 'email' && value && !this.validateEmail(value)) {
                errors[key] = 'Please enter a valid email';
            }

            if (key === 'password' && value && !this.validatePassword(value)) {
                errors[key] = 'Password must be at least 8 characters with uppercase, lowercase, and number';
            }

            if (key === 'phone' && value && !this.validatePhone(value)) {
                errors[key] = 'Please enter a valid phone number';
            }
        }

        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    },

    displayErrors(formElement, errors) {
        formElement.querySelectorAll('.form-error').forEach(el => el.remove());

        Object.keys(errors).forEach(key => {
            const field = formElement.elements[key];
            if (field) {
                const errorElement = document.createElement('div');
                errorElement.className = 'form-error';
                errorElement.textContent = errors[key];
                field.parentElement.appendChild(errorElement);
                field.classList.add('error');
            }
        });
    }
};

// Login form handler
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            auth.login(email, password);
        });
    }

    // Register form handler
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const validation = formValidator.validateForm(registerForm);
            if (!validation.isValid) {
                formValidator.displayErrors(registerForm, validation.errors);
                return;
            }

            const formData = new FormData(registerForm);
            const userData = Object.fromEntries(formData);
            auth.register(userData);
        });
    }
});
