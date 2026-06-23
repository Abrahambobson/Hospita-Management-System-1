/* ========================================
   API COMMUNICATION MODULE
   ======================================== */

const api = {
    baseUrl: '/backend/api',
    timeout: 10000,

    async request(endpoint, options = {}) {
        const url = `${this.baseUrl}/${endpoint}`;
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };

        // Add auth token if available
        const token = localStorage.getItem('authToken');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const config = {
            method: options.method || 'GET',
            headers,
            body: options.body ? JSON.stringify(options.body) : undefined,
            timeout: this.timeout
        };

        try {
            const response = await fetch(url, config);

            if (!response.ok) {
                if (response.status === 401) {
                    // Unauthorized - redirect to login
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('currentUser');
                    window.location.href = '/pages/public/login.html';
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    },

    // Patient endpoints
    async getPatients(filters = {}) {
        const params = new URLSearchParams(filters);
        return this.request(`get_patients.php?${params}`);
    },

    async getPatient(id) {
        return this.request(`get_patient.php?id=${id}`);
    },

    async createPatient(data) {
        return this.request('create_patient.php', {
            method: 'POST',
            body: data
        });
    },

    async updatePatient(id, data) {
        return this.request(`update_patient.php`, {
            method: 'POST',
            body: { id, ...data }
        });
    },

    async deletePatient(id) {
        return this.request('delete_patient.php', {
            method: 'POST',
            body: { id }
        });
    },

    // Health records endpoints
    async getHealthRecords(patientId) {
        return this.request(`get_health_records.php?patient_id=${patientId}`);
    },

    async createHealthRecord(data) {
        return this.request('create_health_record.php', {
            method: 'POST',
            body: data
        });
    },

    async updateHealthRecord(id, data) {
        return this.request('update_health_record.php', {
            method: 'POST',
            body: { id, ...data }
        });
    },

    // Appointment endpoints
    async getAppointments(filters = {}) {
        const params = new URLSearchParams(filters);
        return this.request(`get_appointments.php?${params}`);
    },

    async createAppointment(data) {
        return this.request('create_appointment.php', {
            method: 'POST',
            body: data
        });
    },

    async updateAppointment(id, data) {
        return this.request('update_appointment.php', {
            method: 'POST',
            body: { id, ...data }
        });
    },

    async cancelAppointment(id) {
        return this.request('cancel_appointment.php', {
            method: 'POST',
            body: { id }
        });
    },

    // Doctor endpoints
    async getDoctors(filters = {}) {
        const params = new URLSearchParams(filters);
        return this.request(`get_doctors.php?${params}`);
    },

    async getDoctor(id) {
        return this.request(`get_doctor.php?id=${id}`);
    },

    async getDoctorSchedule(doctorId) {
        return this.request(`get_doctor_schedule.php?doctor_id=${doctorId}`);
    },

    // Staff endpoints
    async getStaff(filters = {}) {
        const params = new URLSearchParams(filters);
        return this.request(`get_staff.php?${params}`);
    },

    async createStaff(data) {
        return this.request('create_staff.php', {
            method: 'POST',
            body: data
        });
    },

    async updateStaff(id, data) {
        return this.request('update_staff.php', {
            method: 'POST',
            body: { id, ...data }
        });
    },

    // Department endpoints
    async getDepartments() {
        return this.request('get_departments.php');
    },

    async createDepartment(data) {
        return this.request('create_department.php', {
            method: 'POST',
            body: data
        });
    },

    async updateDepartment(id, data) {
        return this.request('update_department.php', {
            method: 'POST',
            body: { id, ...data }
        });
    },

    // Inventory endpoints
    async getInventory(filters = {}) {
        const params = new URLSearchParams(filters);
        return this.request(`get_inventory.php?${params}`);
    },

    async createInventoryItem(data) {
        return this.request('create_inventory.php', {
            method: 'POST',
            body: data
        });
    },

    async updateInventoryItem(id, quantity) {
        return this.request('update_inventory.php', {
            method: 'POST',
            body: { id, quantity }
        });
    },

    // Subscription endpoints
    async getSubscriptionPlans() {
        return this.request('get_subscription_plans.php');
    },

    async subscribeToplan(planId) {
        return this.request('subscribe_plan.php', {
            method: 'POST',
            body: { plan_id: planId }
        });
    },

    // Analytics endpoints
    async getDashboardStats() {
        return this.request('get_dashboard_stats.php');
    },

    async getPatientStats() {
        return this.request('get_patient_stats.php');
    },

    // Emergency contact endpoints
    async getEmergencyContacts(patientId) {
        return this.request(`get_emergency_contacts.php?patient_id=${patientId}`);
    },

    async createEmergencyContact(data) {
        return this.request('create_emergency_contact.php', {
            method: 'POST',
            body: data
        });
    },

    async deleteEmergencyContact(id) {
        return this.request('delete_emergency_contact.php', {
            method: 'POST',
            body: { id }
        });
    },

    // Notifications
    async getNotifications() {
        return this.request('get_notifications.php');
    },

    async markNotificationAsRead(id) {
        return this.request('mark_notification_read.php', {
            method: 'POST',
            body: { id }
        });
    },

    // Careers
    async getJobs(filters = {}) {
        const params = new URLSearchParams(filters);
        return this.request(`get_jobs.php?${params}`);
    },

    async applyForJob(jobId, data) {
        return this.request('apply_job.php', {
            method: 'POST',
            body: { job_id: jobId, ...data }
        });
    }
};

// Common CRUD builder
function createCRUDHandler(endpoint) {
    return {
        async list(filters = {}) {
            return api.request(`${endpoint}.php`, {
                method: 'GET',
                body: filters
            });
        },

        async get(id) {
            return api.request(`${endpoint}.php?id=${id}`);
        },

        async create(data) {
            return api.request(`${endpoint}.php`, {
                method: 'POST',
                body: data
            });
        },

        async update(id, data) {
            return api.request(`${endpoint}.php`, {
                method: 'PUT',
                body: { id, ...data }
            });
        },

        async delete(id) {
            return api.request(`${endpoint}.php?id=${id}`, {
                method: 'DELETE'
            });
        }
    };
}

// Export API handlers
const apis = {
    patients: createCRUDHandler('patients'),
    doctors: createCRUDHandler('doctors'),
    staff: createCRUDHandler('staff'),
    departments: createCRUDHandler('departments'),
    appointments: createCRUDHandler('appointments'),
    healthRecords: createCRUDHandler('health_records'),
    inventory: createCRUDHandler('inventory')
};
