-- Add Users Table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'USER', -- USER, ADMIN
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Update Bookings Table to reference Users
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES users(id);
-- Optionally remove user_name/contact if we want to rely on user_id, but keeping them for now as fallback/snapshot is fine.
