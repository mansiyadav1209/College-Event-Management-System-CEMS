# College Event Management System (CEMS)

## Overview

The College Event Management System (CEMS) is a full-stack web application designed to streamline the management of college events. The platform provides dedicated dashboards for Admins, Faculty Coordinators, and Students, enabling efficient event organization, participation tracking, notifications, and analytics.

---






# 🌐 Live Demo

🎓 Frontend (Live Application)

👉 https://college-event-management-system-cem-lake.vercel.app

⚙️ Backend API

👉 https://college-event-management-system-cem.vercel.app








# MySQL Database Schema - College Event Management System

<!-- ```sql
CREATE DATABASE college_event_db;
USE college_event_db;

-- ==========================
-- USERS TABLE
-- ==========================

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin','faculty','student') NOT NULL,
    course VARCHAR(50),
    phone VARCHAR(20),
    college VARCHAR(200),
    year VARCHAR(50),
    department VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================
-- EVENTS TABLE
-- ==========================

CREATE TABLE events (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    image VARCHAR(255),
    date DATE NOT NULL,
    time VARCHAR(50),
    venue VARCHAR(255),
    faculty_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (faculty_id)
    REFERENCES users(id)
    ON DELETE SET NULL
);

-- ==========================
-- REGISTRATIONS TABLE
-- ==========================

CREATE TABLE registrations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
    REFERENCES users(id),
    <!-- ON DELETE CASCADE, -->

    FOREIGN KEY (event_id)
    REFERENCES events(id)
    <!-- ON DELETE CASCADE -->
<!-- ); -->


-- ==========================
-- FACULTIES TABLE
-- ==========================
CREATE TABLE faculties (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20),
    department VARCHAR(100),
    is_available BOOLEAN DEFAULT TRUE
);



-- ==========================
-- FACULTY NOTIFICATIONS --sends to registered students of event
-- ==========================

CREATE TABLE notifications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    event_id INT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (event_id)
    REFERENCES events(id)
    ON DELETE CASCADE
);

-- ==========================
-- ADMIN NOTIFICATIONS --sends to both faculties and students
-- ==========================

CREATE TABLE admin_notifications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,

    target_role ENUM(
        'student',
        'faculty',
        'all'
    ) NOT NULL DEFAULT 'all',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================
-- SAMPLE ADMIN ACCOUNT
-- ==========================

INSERT INTO users
(
    name,
    email,
    password,
    role
)
VALUES
(
    'Admin',
    'admin@cems.com',  or 'your email,
    '$2b$10$ReplaceWithHashedPassword', or 'your strong any password'
    'admin'
);
``` -->

## Tables Overview

### users

Stores:

* Admins
* Faculty
* Students

### events

Stores:

* Event details
* Assigned faculty coordinator

### registrations

Stores:

* Student event registrations

### notifications

Stores:

* Faculty notifications for specific events

### admin_notifications

Stores:

* Notifications sent by admin to:

  * Students
  * Faculty
  * Everyone

## Relationships

```text
users (faculty)
      │
      ▼
events
      │
      ▼
registrations
      │
      ▼
users (students)

events
      │
      ▼
notifications

admin_notifications
      │
      ├── student
      ├── faculty
      └── all
```





## Features

### Admin Module

* Manage students, faculty, and events
* Assign faculty coordinators to events
* Send notifications to students and faculty
* View event analytics and statistics
* Monitor registrations and participation

### Faculty Module

* View assigned events
* Manage registered students
* Send event-specific notifications
* Update profile information
* Track event participation

### Student Module

* Register and login securely
* Explore available events
* Register for events
* View registered events
* Receive notifications from admins and faculty
* Manage personal profile

---

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* Framer Motion
* Recharts
* CSS3

### Backend

* Node.js
* Express.js
* JWT Authentication
* bcrypt.js

### Database

* MySQL

---

## Project Structure

```text
College Event Management System
│
├── frontend
│   ├── src
│   │   ├── pages
│   │   ├── components
│   │   ├── styles
│   │   ├── services
│   │   └── App.js
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── middleware
│   ├── config
│   ├── models
│   └── server.js
│
└── database
    └── MySQL Schema
```

---

## User Roles

### Admin

* Event Management
* Faculty Assignment
* Notification Management
* Analytics Dashboard

### Faculty

* Assigned Events Management
* Student Tracking
* Notification Sending
* Profile Management

### Student

* Event Registration
* Event Participation
* Notification Access
* Profile Management

---

## Installation

### Clone Repository

```bash
git clone <https://github.com/mansiyadav1209/College-Event-Management-System-CEMS.git>
cd college-event-management-system-CEMS
```

### Backend Setup

```bash
cd backend
npm install
```

Create `.env`

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=college_event_db

JWT_SECRET=your_secret_key
```

Run Backend

```bash
npm start
```

or

```bash
npx nodemon server.js
      # or
nodemon server.js
```

---

### Frontend Setup

```bash
cd frontend
npm install
```

Run Frontend

```bash
npm start
```

or

```bash
npm run dev
```

---

## Database Setup

Create a MySQL database:

```sql
CREATE DATABASE college_event_db;
```

Import the provided SQL schema.

---

## Main Functionalities

### Event Management

* Create events
* Update events
* Delete events
* Assign faculty coordinators

### Registration Management

* Student event registration
* Registration tracking
* Participation records

### Notification System

* Admin notifications
* Faculty notifications
* Student notification center

### Analytics Dashboard

* Total events
* Student registrations
* Event categories
* Monthly participation trends

---

## Security Features

* JWT Authentication
* Password Hashing using bcrypt
* Protected Routes
* Role-Based Access Control

---

## Future Enhancements

* Certificate Generation
* Attendance Management
* Email Notifications
* Event Feedback System
* QR Code Based Check-in
* Mobile Responsive Enhancements

---

## Deployment

### Frontend

* Vercel

### Backend

* Vercel

### Database

* Aiven

---

## Author

Developed as a Full Stack Web Application Project using React, Node.js, Express, and MySQL.

---

## License

This project is developed for educational and academic purposes.
