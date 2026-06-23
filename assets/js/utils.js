/* ========================================
   UTILITY FUNCTIONS
   ======================================== */

const utils = {
    // Formatting utilities
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    },

    formatDate(date, format = 'short') {
        const d = new Date(date);
        if (format === 'short') {
            return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        }
        if (format === 'long') {
            return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        }
        return d.toLocaleDateString('en-US');
    },

    formatTime(date) {
        return new Date(date).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    },

    formatDateTime(date) {
        return new Date(date).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    },

    getTimeAgo(date) {
        const seconds = Math.floor((new Date() - new Date(date)) / 1000);
        let interval = seconds / 31536000;

        if (interval > 1) return Math.floor(interval) + ' years ago';
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + ' months ago';
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + ' days ago';
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + ' hours ago';
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + ' minutes ago';
        return Math.floor(seconds) + ' seconds ago';
    },

    // String utilities
    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    },

    titleCase(str) {
        return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    },

    truncate(str, length = 50) {
        return str.length > length ? str.substring(0, length) + '...' : str;
    },

    slugify(str) {
        return str.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_]+/g, '-').replace(/^-+|-+$/g, '');
    },

    // Array utilities
    groupBy(array, key) {
        return array.reduce((result, item) => {
            const group = item[key];
            if (!result[group]) result[group] = [];
            result[group].push(item);
            return result;
        }, {});
    },

    sortBy(array, key, order = 'asc') {
        return [...array].sort((a, b) => {
            if (order === 'asc') {
                return a[key] > b[key] ? 1 : -1;
            }
            return a[key] < b[key] ? 1 : -1;
        });
    },

    filterBy(array, key, value) {
        return array.filter(item => item[key] === value);
    },

    unique(array, key) {
        if (key) {
            return array.filter((item, index, self) =>
                index === self.findIndex(obj => obj[key] === item[key])
            );
        }
        return [...new Set(array)];
    },

    pluck(array, key) {
        return array.map(item => item[key]);
    },

    // Object utilities
    deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    },

    merge(...objects) {
        return Object.assign({}, ...objects);
    },

    pick(obj, keys) {
        return keys.reduce((result, key) => {
            if (key in obj) result[key] = obj[key];
            return result;
        }, {});
    },

    omit(obj, keys) {
        return Object.keys(obj)
            .filter(key => !keys.includes(key))
            .reduce((result, key) => {
                result[key] = obj[key];
                return result;
            }, {});
    },

    // Validation utilities
    isEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    },

    isPhone(phone) {
        const regex = /^[\d\s\-\+\(\)]{10,}$/;
        return regex.test(phone);
    },

    isStrongPassword(password) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    },

    isEmpty(value) {
        return value === null || value === undefined ||
            (typeof value === 'string' && value.trim() === '') ||
            (Array.isArray(value) && value.length === 0) ||
            (typeof value === 'object' && Object.keys(value).length === 0);
    },

    // DOM utilities
    $(selector) {
        return document.querySelector(selector);
    },

    $$(selector) {
        return document.querySelectorAll(selector);
    },

    ready(callback) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', callback);
        } else {
            callback();
        }
    },

    on(element, event, handler) {
        if (typeof element === 'string') {
            element = this.$(element);
        }
        element?.addEventListener(event, handler);
    },

    off(element, event, handler) {
        if (typeof element === 'string') {
            element = this.$(element);
        }
        element?.removeEventListener(event, handler);
    },

    addClass(element, className) {
        if (typeof element === 'string') {
            element = this.$(element);
        }
        element?.classList.add(className);
    },

    removeClass(element, className) {
        if (typeof element === 'string') {
            element = this.$(element);
        }
        element?.classList.remove(className);
    },

    toggleClass(element, className) {
        if (typeof element === 'string') {
            element = this.$(element);
        }
        element?.classList.toggle(className);
    },

    hasClass(element, className) {
        if (typeof element === 'string') {
            element = this.$(element);
        }
        return element?.classList.contains(className);
    },

    // Storage utilities
    setStorage(key, value, type = 'local') {
        const storage = type === 'session' ? sessionStorage : localStorage;
        storage.setItem(key, JSON.stringify(value));
    },

    getStorage(key, type = 'local') {
        const storage = type === 'session' ? sessionStorage : localStorage;
        const value = storage.getItem(key);
        return value ? JSON.parse(value) : null;
    },

    removeStorage(key, type = 'local') {
        const storage = type === 'session' ? sessionStorage : localStorage;
        storage.removeItem(key);
    },

    clearStorage(type = 'local') {
        const storage = type === 'session' ? sessionStorage : localStorage;
        storage.clear();
    },

    // Debounce and Throttle
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    throttle(func, limit) {
        let inThrottle;
        return function (...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // HTTP Status
    getStatusText(code) {
        const statuses = {
            200: 'OK',
            201: 'Created',
            204: 'No Content',
            400: 'Bad Request',
            401: 'Unauthorized',
            403: 'Forbidden',
            404: 'Not Found',
            500: 'Internal Server Error',
            502: 'Bad Gateway',
            503: 'Service Unavailable'
        };
        return statuses[code] || 'Unknown';
    },

    // Random utilities
    randomId(length = 10) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    },

    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    // URL utilities
    getQueryParams() {
        const params = {};
        const searchParams = new URLSearchParams(window.location.search);
        for (let [key, value] of searchParams) {
            params[key] = value;
        }
        return params;
    },

    getQueryParam(name) {
        return new URLSearchParams(window.location.search).get(name);
    },

    buildQueryString(obj) {
        return Object.keys(obj)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
            .join('&');
    },

    // Cookie utilities
    setCookie(name, value, days = 7) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = `expires=${date.toUTCString()}`;
        document.cookie = `${name}=${value};${expires};path=/`;
    },

    getCookie(name) {
        const nameEQ = `${name}=`;
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            cookie = cookie.trim();
            if (cookie.indexOf(nameEQ) === 0) {
                return cookie.substring(nameEQ.length);
            }
        }
        return null;
    },

    deleteCookie(name) {
        this.setCookie(name, '', -1);
    }
};

// Make utilities global
window.utils = utils;
