# Hospital Management System

A comprehensive web-based hospital management system built with HTML, CSS, JavaScript, PHP, and MySQL.

## 📋 Overview

This system provides complete management solutions for hospitals including patient management, appointment booking, health records, staff management, inventory tracking, and more.

## ✨ Features

### Patient Portal
- **Patient Dashboard** - Overview of appointments, health records, and account status
- **Health Records** - Secure access to medical records and test results
- **Appointment Booking** - Book and manage appointments with doctors
- **Emergency Contacts** - Store and manage emergency contact information
- **Patient History** - Complete medical history timeline
- **Subscriptions** - Manage subscription plans for premium features
- **Profile Management** - Update personal and health information

### Doctor Portal
- **Doctor Dashboard** - Overview of scheduled appointments and patients
- **Patient List** - View and search all assigned patients
- **Patient Records** - Access detailed patient medical information
- **Appointment Management** - View and manage appointments
- **Prescription Management** - Create and send prescriptions
- **Profile Settings** - Manage doctor profile and availability

### Admin Dashboard
- **System Overview** - Analytics and statistics
- **Patient Management** - Add, edit, delete patient records
- **Staff Management** - Manage hospital staff
- **Department Management** - Organize hospital departments
- **Inventory Management** - Track medical supplies and equipment
- **Appointment Management** - View and manage all appointments
- **Subscription Management** - Manage subscription plans and users
- **Settings** - Configure system settings

### Public Features
- **Home Page** - Landing page with hospital information
- **About Us** - Hospital mission, vision, and awards
- **Departments** - Browse hospital departments and services
- **Health Tips** - Educational content about health and wellness
- **FAQ** - Frequently asked questions and support
- **Careers** - Job listings and application management
- **Privacy Policy** - HIPAA-compliant privacy policy
- **Login/Sign Up** - User authentication and registration

### AI Features
- **Chatbot** - AI-powered customer service chatbot available on all pages
- **Appointment Reminders** - Automated notification system
- **Health Alerts** - Personalized health notifications

## 🏗️ Project Structure

```
hospital-management/
├── index.html                    # Homepage
├── assets/
│   ├── css/
│   │   ├── style.css            # Main stylesheet (2000+ lines)
│   │   └── responsive.css       # Mobile responsive styles
│   ├── js/
│   │   ├── app.js               # Main application logic
│   │   ├── auth.js              # Authentication & form validation
│   │   ├── api.js               # API communication layer
│   │   ├── chatbot.js           # AI chatbot functionality
│   │   └── utils.js             # Utility functions
│   └── images/
│       ├── logo.svg
│       ├── icons/
│       └── backgrounds/
├── pages/
│   ├── public/
│   │   ├── login.html           # User login page
│   │   ├── signup.html          # User registration page
│   │   ├── about.html           # About hospital
│   │   ├── health-tips.html     # Health education
│   │   ├── faq.html             # FAQ section
│   │   ├── departments.html     # Hospital departments
│   │   ├── careers.html         # Career opportunities
│   │   └── privacy.html         # Privacy policy
│   ├── patient/
│   │   ├── dashboard.html       # Patient main dashboard
│   │   ├── health-records.html  # View health records
│   │   ├── patient-history.html # Medical history
│   │   ├── book-appointment.html# Appointment booking
│   │   ├── emergency-contacts.html
│   │   ├── subscriptions.html   # Subscription plans
│   │   └── profile.html         # Patient profile
│   ├── doctor/
│   │   ├── dashboard.html       # Doctor dashboard
│   │   ├── patients.html        # Patient list
│   │   ├── patient-details.html # Patient details
│   │   └── appointments.html    # Doctor appointments
│   └── admin/
│       ├── dashboard.html       # Admin dashboard
│       ├── patients.html        # Patient management
│       ├── staff.html           # Staff management
│       ├── departments.html     # Department management
│       ├── inventory.html       # Inventory management
│       ├── appointments.html    # Appointment management
│       ├── subscriptions.html   # Subscription management
│       └── settings.html        # System settings
├── backend/
│   ├── config.php               # Database configuration
│   ├── auth.php                 # Authentication functions
│   ├── patients.php             # Patient operations
│   ├── doctors.php              # Doctor operations
│   ├── appointments.php         # Appointment operations
│   ├── health_records.php       # Health records operations
│   ├── inventory.php            # Inventory operations
│   ├── staff.php                # Staff operations
│   ├── departments.php          # Department operations
│   ├── subscriptions.php        # Subscription operations
│   └── api/
│       ├── login.php            # Login endpoint
│       ├── register.php         # Registration endpoint
│       ├── get_patients.php     # Get patients list
│       ├── get_appointments.php # Get appointments
│       ├── create_appointment.php
│       ├── get_health_records.php
│       └── [more endpoints]
├── database/
│   ├── schema.sql               # Database schema (tables, indexes)
│   └── seed_data.sql            # Sample data
└── README.md                    # This file

```

## 🗄️ Database Schema

The system includes 20+ tables:

- **users** - User authentication and basic info
- **patients** - Patient-specific information
- **doctors** - Doctor details and specialization
- **departments** - Hospital departments
- **staff** - Hospital staff records
- **appointments** - Doctor-patient appointments
- **health_records** - Medical test results and records
- **patient_history** - Medical history timeline
- **emergency_contacts** - Emergency contact information
- **inventory** - Medical supply tracking
- **inventory_logs** - Inventory transaction logs
- **subscriptions** - Patient subscription management
- **subscription_plans** - Subscription plan details
- **notifications** - System notifications
- **health_tips** - Educational content
- **job_listings** - Career opportunities
- **job_applications** - Job applications
- **audit_logs** - System activity logs

## 🚀 Installation & Setup

### Prerequisites
- PHP 7.4 or higher
- MySQL 8.0 or higher
- Web server (Apache, Nginx, or built-in PHP server)
- Node.js (optional, for development tools)

### Step 1: Clone/Setup Project

```bash
# Navigate to your project directory
cd c:\Users\ADMIE\Desktop\Hosipat Management System\hospital-management
```

### Step 2: Create Database

```bash
# Using MySQL command line
mysql -u root -p

# Then execute:
CREATE DATABASE hospital_management;
USE hospital_management;
source database/schema.sql;
```

### Step 3: Configure Database Connection

Edit `backend/config.php`:

```php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', 'your_password');
define('DB_NAME', 'hospital_management');
```

### Step 4: Start Web Server

**Using PHP built-in server:**
```bash
php -S localhost:8000
```

**Using Apache:**
- Copy project to `htdocs` folder
- Configure virtual host
- Access via `http://localhost/hospital-management`

### Step 5: Access the System

Open browser and navigate to:
- **Homepage**: `http://localhost:8000`
- **Login**: `http://localhost:8000/pages/public/login.html`

## 👤 Demo Accounts

### Patient Account
- **Email**: patient@example.com
- **Password**: password123

### Doctor Account
- **Email**: doctor@example.com
- **Password**: password123

### Admin Account
- **Email**: admin@example.com
- **Password**: password123

## 🔐 Security Features

- **Password Hashing** - bcrypt for secure password storage
- **JWT Authentication** - Secure token-based authentication
- **HIPAA Compliance** - Protected health information security
- **SQL Injection Prevention** - Prepared statements
- **XSS Protection** - Input validation and output encoding
- **CORS Configuration** - Controlled cross-origin access
- **Audit Logging** - System activity tracking

## 📱 Responsive Design

- **Mobile First** - Optimized for all devices
- **Breakpoints**:
  - Mobile: < 576px
  - Tablet: 576px - 992px
  - Desktop: > 992px
- **Flexible Layout** - CSS Grid and Flexbox
- **Touch Friendly** - Larger tap targets on mobile

## 🎨 Design System

### Colors
- **Primary**: #007BFF (Medical Blue)
- **Secondary**: #28A745 (Health Green)
- **Accent**: #FFC107 (Warning Yellow)
- **Danger**: #DC3545 (Critical Red)
- **Neutral**: #6C757D (Gray)

### Typography
- **Font**: Segoe UI, Inter
- **Sizes**: H1 (2.5rem) → Body (1rem)

### Components
- Buttons (Primary, Secondary, Danger, Outline)
- Cards with hover effects
- Modal dialogs
- Responsive tables
- Form controls with validation
- Badges and alerts

## 🔌 API Endpoints

### Authentication
- `POST /backend/api/login.php` - User login
- `POST /backend/api/register.php` - User registration

### Patients
- `GET /backend/api/get_patients.php` - List patients
- `GET /backend/api/get_patient.php?id=X` - Get patient detail
- `POST /backend/api/create_patient.php` - Create patient
- `POST /backend/api/update_patient.php` - Update patient

### Appointments
- `GET /backend/api/get_appointments.php` - List appointments
- `POST /backend/api/create_appointment.php` - Create appointment
- `POST /backend/api/cancel_appointment.php` - Cancel appointment

### Health Records
- `GET /backend/api/get_health_records.php?patient_id=X` - Get records
- `POST /backend/api/create_health_record.php` - Create record

### Departments
- `GET /backend/api/get_departments.php` - List departments
- `POST /backend/api/create_department.php` - Create department

## 📊 Key Technologies Used

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Backend**: PHP 7.4+
- **Database**: MySQL 8.0
- **Architecture**: REST API with JWT authentication
- **Charts**: Chart.js (for analytics)
- **Calendar**: FullCalendar.js (for appointments)
- **Styling**: Custom CSS with responsive design

## 🚧 Deployment

### Development
```bash
php -S localhost:8000
```

### Production
1. Configure environment variables in `.env` file
2. Set up SSL certificate (HTTPS)
3. Configure database with strong credentials
4. Set `APP_ENV` to 'production' in config.php
5. Deploy to production server

## 📝 Usage

### Creating a New Patient Account
1. Click "Sign Up" on homepage
2. Fill in personal and health information
3. Set secure password
4. Confirm email (if configured)
5. Log in with credentials

### Booking an Appointment
1. Log in as patient
2. Navigate to "Book Appointment"
3. Select doctor and department
4. Choose date and time
5. Confirm booking
6. Receive confirmation notification

### Managing Health Records
1. Log in as doctor or admin
2. Navigate to patient
3. Add health record
4. Enter test results
5. Add notes and prescription
6. Mark as completed

## 🐛 Troubleshooting

### Database Connection Error
- Check MySQL is running
- Verify credentials in config.php
- Ensure database exists

### CORS Error
- Check ALLOWED_ORIGINS in config.php
- Add your domain to allowed origins

### Pages Not Loading
- Check file paths are correct
- Verify web server is running
- Check browser console for errors

### Authentication Issues
- Clear browser cache and cookies
- Verify JWT_SECRET is set
- Check token expiration time

## 📚 Additional Resources

- [MySQL Documentation](https://dev.mysql.com/doc/)
- [PHP Manual](https://www.php.net/manual/)
- [JWT Introduction](https://jwt.io/)
- [HIPAA Compliance](https://www.hhs.gov/hipaa/)

## 🤝 Contributing

To contribute to this project:

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

Hospital Management System © 2024. All rights reserved.

## 📞 Support

For support:
- Email: support@hospital.com
- Phone: +1 (555) 123-4567
- Documentation: See README.md

---

**Created**: January 2024
**Last Updated**: January 2024
**Version**: 1.0.0
