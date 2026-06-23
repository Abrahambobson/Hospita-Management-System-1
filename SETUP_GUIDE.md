# Hospital Management System - Setup Guide

## Quick Start Guide

Follow these steps to get the Hospital Management System up and running.

## Prerequisites

Before you begin, ensure you have:

- **PHP** 7.4 or higher installed
- **MySQL** 8.0 or higher installed and running
- **Apache/Nginx** or PHP built-in server
- **Git** (optional, for cloning)
- **Modern web browser** (Chrome, Firefox, Safari, Edge)

## Installation Steps

### 1. Database Setup

#### Option A: Using MySQL Command Line

```bash
# Connect to MySQL
mysql -u root -p

# Create database and user
CREATE DATABASE hospital_management;
USE hospital_management;

# Execute the schema
source /path/to/database/schema.sql;

# Execute sample data (optional)
source /path/to/database/seed_data.sql;
```

#### Option B: Using phpMyAdmin

1. Open phpMyAdmin in browser
2. Create new database: `hospital_management`
3. Select the database
4. Go to "Import" tab
5. Choose `database/schema.sql` file
6. Click Import
7. Repeat for `database/seed_data.sql` (optional)

### 2. Configure Backend

Edit `backend/config.php`:

```php
// Update database credentials
define('DB_HOST', 'localhost');      // Your MySQL host
define('DB_USER', 'root');           // Your MySQL username
define('DB_PASS', '');               // Your MySQL password
define('DB_NAME', 'hospital_management');

// Update JWT secret (CHANGE THIS!)
define('JWT_SECRET', 'your-secret-key-change-in-production');

// Update app URL
define('APP_URL', 'http://localhost:8000');
```

### 3. Create Database User (Recommended)

Instead of using root, create a dedicated user:

```sql
-- Create user
CREATE USER 'hospital_user'@'localhost' IDENTIFIED BY 'secure_password_123';

-- Grant permissions
GRANT ALL PRIVILEGES ON hospital_management.* TO 'hospital_user'@'localhost';
FLUSH PRIVILEGES;

-- Then use in config.php:
define('DB_USER', 'hospital_user');
define('DB_PASS', 'secure_password_123');
```

### 4. Start Web Server

#### Option A: PHP Built-in Server (Recommended for Development)

```bash
# Navigate to project directory
cd c:\Users\ADMIE\Desktop\Hosipat Management System\hospital-management

# Start PHP server
php -S localhost:8000
```

Access the system: `http://localhost:8000`

#### Option B: Apache Web Server

1. Copy project to Apache `htdocs` folder
2. Create virtual host (optional)
3. Restart Apache
4. Access via your configured URL

#### Option C: Docker

```bash
# If Docker is installed
docker run -p 80:80 -v /path/to/project:/var/www/html php:7.4-apache
```

### 5. Initial Configuration

1. **Access Login Page**
   - Navigate to `http://localhost:8000/pages/public/login.html`

2. **Login with Demo Account**
   - Email: `admin@example.com`
   - Password: `password123`

3. **Update System Settings**
   - Go to Admin Dashboard → Settings
   - Update hospital name, address, contact info
   - Configure email settings (optional)

## Demo Accounts

The system includes pre-loaded demo accounts:

### Admin Account
- **Email**: admin@example.com
- **Password**: password123
- **Access**: Full admin dashboard

### Doctor Account
- **Email**: doctor@example.com (or john.cardio@example.com)
- **Password**: password123
- **Access**: Doctor portal

### Patient Account
- **Email**: patient@example.com (or jane.doe@example.com)
- **Password**: password123
- **Access**: Patient portal

## File Structure Overview

```
hospital-management/
├── index.html                 # Homepage
├── pages/                     # All application pages
├── assets/
│   ├── css/                   # Stylesheets
│   ├── js/                    # JavaScript files
│   └── images/                # Images and icons
├── backend/                   # PHP backend
│   ├── config.php            # Configuration
│   ├── api/                  # API endpoints
│   └── [other backend files]
├── database/                  # Database files
│   ├── schema.sql            # Database schema
│   └── seed_data.sql         # Sample data
└── README.md                  # Documentation
```

## Common Issues & Solutions

### Issue: "Connection refused" error

**Solution:**
```bash
# Check if MySQL is running
# Windows: Services → MySQL80 (or your version)
# Mac: System Preferences → MySQL
# Linux: sudo systemctl status mysql

# If not running, start it:
# Windows: net start MySQL80
# Mac: mysql.server start
# Linux: sudo systemctl start mysql
```

### Issue: "Access Denied" for MySQL

**Solution:**
- Verify MySQL username and password in `config.php`
- Reset MySQL root password if forgotten
- Ensure database user has proper privileges

### Issue: Pages show blank or errors

**Solution:**
- Check browser console (F12 → Console tab)
- Verify all files are uploaded/present
- Check PHP error logs
- Ensure PHP version is 7.4+

### Issue: API endpoints return 404

**Solution:**
- Verify backend folder structure
- Check `.php` files exist in `backend/api/`
- Ensure file permissions are correct (644 for files)
- Check web server `mod_rewrite` is enabled

### Issue: CORS errors

**Solution:**
- Update `ALLOWED_ORIGINS` in `config.php`
- Add your domain to the origins array
- For local development, add `http://localhost:8000`

## Creating New Users

### Via Web Interface

1. Go to Sign Up page: `http://localhost:8000/pages/public/signup.html`
2. Fill in registration form
3. Account created automatically

### Via Database (Admin)

```sql
-- Hash password using: password_hash('password123', PASSWORD_BCRYPT)
INSERT INTO users (firstName, lastName, email, passwordHash, role)
VALUES ('First', 'Last', 'email@example.com', '$2y$10$YIjlrBgqV/hvTB7.K0H9v.WqJKzXP0J5xU9dQ8zZvW1iBK6vXBJ2u', 'patient');

-- Get the user ID
SELECT LAST_INSERT_ID();

-- Create patient record
INSERT INTO patients (userId, patientNumber) VALUES (11, 'PAT202400XX');
```

## Testing the System

### Manual Testing

1. **Register as new patient**
   - Sign up with test email
   - Verify account created

2. **Book appointment**
   - Log in as patient
   - Navigate to "Book Appointment"
   - Select doctor, date, time
   - Confirm booking

3. **Manage health records**
   - Log in as doctor
   - Add health record
   - Verify patient can see it

4. **Check admin features**
   - Log in as admin
   - Verify all dashboards work
   - Test inventory management

### API Testing with Curl

```bash
# Test login endpoint
curl -X POST http://localhost:8000/backend/api/login.php \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password123"}'

# Test get patients (requires token)
curl -X GET http://localhost:8000/backend/api/get_patients.php \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Production Deployment

### Before Going Live

1. **Security**
   - Change all demo account passwords
   - Update `JWT_SECRET` in config.php
   - Set `APP_ENV` to 'production'
   - Enable HTTPS/SSL certificate
   - Configure strong database password

2. **Performance**
   - Enable caching headers
   - Minimize CSS/JS files
   - Optimize database indexes
   - Set up database backups

3. **Configuration**
   - Update `ALLOWED_ORIGINS` for your domain
   - Configure email settings for notifications
   - Set up proper error logging
   - Configure backup location

### Deployment Checklist

- [ ] Database backed up
- [ ] Demo accounts changed/removed
- [ ] SSL certificate installed
- [ ] Environment variables configured
- [ ] Error logging enabled
- [ ] Database credentials secured
- [ ] File permissions set correctly
- [ ] .htaccess configured (if using Apache)
- [ ] Cron jobs set up for backups
- [ ] Health check page accessible

## Maintenance

### Regular Tasks

- **Database Backups**: Weekly
- **Security Updates**: Monthly
- **Log Review**: Weekly
- **Performance Monitoring**: Daily
- **User Support**: As needed

### Backup Procedure

```bash
# Manual backup
mysqldump -u hospital_user -p hospital_management > backup_$(date +%Y%m%d).sql

# Automated backup (cron job)
# Add to crontab: 0 2 * * * mysqldump -u hospital_user -p hospital_management > /backups/backup_$(date +\%Y\%m\%d).sql
```

## Enabling Additional Features

### Email Notifications

Update `config.php`:
```php
define('MAIL_HOST', 'smtp.gmail.com');
define('MAIL_USER', 'your-email@gmail.com');
define('MAIL_PASS', 'your-app-password');
define('MAIL_FROM', 'noreply@hospital.com');
```

### SMS Notifications

Set up Twilio credentials:
```php
define('TWILIO_SID', 'your-sid');
define('TWILIO_TOKEN', 'your-token');
define('TWILIO_PHONE', '+1234567890');
```

### Payment Integration

For subscription payments:
- Set up Stripe account
- Add Stripe API keys
- Configure payment webhooks

## Support & Documentation

- **API Documentation**: See `README.md`
- **Database Schema**: See `database/schema.sql`
- **Code Comments**: Check PHP files for inline documentation
- **Contact Support**: support@hospital.com

## Next Steps

After setup:

1. Customize hospital information
2. Add your departments
3. Register doctors and staff
4. Create custom subscription plans
5. Configure health tips and resources
6. Set up email notifications
7. Train users on the system
8. Launch to production

---

**Need Help?** Check the README.md file or contact support.
