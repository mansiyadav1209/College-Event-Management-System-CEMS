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
);


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

    'Admin',
    'admin@cems.com',
    '$2b$10$ReplaceWithHashedPassword',
    'admin'
);