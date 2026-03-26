-- For PostgreSQL (optional, MongoDB is used in current code)
CREATE DATABASE vidyadeva;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    phone VARCHAR(15) UNIQUE NOT NULL,
    otp_code VARCHAR(6),
    otp_expires TIMESTAMP,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);
