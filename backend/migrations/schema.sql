-- schema.sql
-- Drop if exist (for quick re-run during dev)
DROP TABLE IF EXISTS booking_items CASCADE;
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS pickup_slots CASCADE;
DROP TABLE IF EXISTS pharmacy_medicines CASCADE;
DROP TABLE IF EXISTS medicines CASCADE;
DROP TABLE IF EXISTS pharmacies CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT
);

CREATE TABLE pharmacies (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE medicines (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  generic_name TEXT,
  created_at TIMESTAMP DEFAULT now()
);

-- inventory: how many of a given medicine a pharmacy has
CREATE TABLE pharmacy_medicines (
  id SERIAL PRIMARY KEY,
  pharmacy_id INT REFERENCES pharmacies(id) ON DELETE CASCADE,
  medicine_id INT REFERENCES medicines(id) ON DELETE CASCADE,
  quantity INT NOT NULL DEFAULT 0,
  price NUMERIC(10,2) DEFAULT 0
);

-- pickup time slots for pharmacy (10-minute windows)
CREATE TABLE pickup_slots (
  id SERIAL PRIMARY KEY,
  pharmacy_id INT REFERENCES pharmacies(id) ON DELETE CASCADE,
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NOT NULL,
  capacity INT NOT NULL DEFAULT 5, -- max pickup bookings for that slot
  available_spots INT NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

-- main booking record (one booking may have multiple items)
CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  pharmacy_id INT REFERENCES pharmacies(id),
  status TEXT CHECK (status IN ('PENDING','CONFIRMED','FAILED')) NOT NULL DEFAULT 'PENDING',
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE booking_items (
  id SERIAL PRIMARY KEY,
  booking_id INT REFERENCES bookings(id) ON DELETE CASCADE,
  medicine_id INT REFERENCES medicines(id),
  quantity INT NOT NULL DEFAULT 1,
  slot_id INT REFERENCES pickup_slots(id),
  status TEXT CHECK (status IN ('PENDING','CONFIRMED','FAILED')) NOT NULL DEFAULT 'PENDING'
);

-- indexes
CREATE INDEX idx_pharmacy_medicine ON pharmacy_medicines(pharmacy_id, medicine_id);
CREATE INDEX idx_slot_pharmacy ON pickup_slots(pharmacy_id, start_time);
CREATE INDEX idx_bookings_status ON bookings(status);

-- seed data
INSERT INTO pharmacies (name, address) VALUES
('Central Pharmacy','123 Main St'),
('GreenCare Pharmacy','45 Market Rd');

INSERT INTO medicines (name, generic_name) VALUES
('Paracetamol 500mg','Paracetamol'),
('Ibuprofen 400mg','Ibuprofen'),
('Amoxicillin 500mg','Amoxicillin');

-- inventory
INSERT INTO pharmacy_medicines (pharmacy_id, medicine_id, quantity, price) VALUES
(1,1,20,0.50),(1,2,5,0.80),(1,3,0,1.20),
(2,1,0,0.55),(2,2,10,0.75),(2,3,2,1.20);

-- create a few slots for each pharmacy (three 10-min windows each)
DO $$
DECLARE
  p integer;
  base timestamptz := date_trunc('minute', now()) + interval '10 minutes';
BEGIN
  FOR p IN 1..2 LOOP
    INSERT INTO pickup_slots (pharmacy_id, start_time, end_time, capacity, available_spots)
    VALUES (p, base, base + interval '10 minutes', 5, 5);
    base := base + interval '10 minutes';
    INSERT INTO pickup_slots (pharmacy_id, start_time, end_time, capacity, available_spots)
    VALUES (p, base, base + interval '10 minutes', 5, 5);
    base := base + interval '10 minutes';
    INSERT INTO pickup_slots (pharmacy_id, start_time, end_time, capacity, available_spots)
    VALUES (p, base, base + interval '10 minutes', 5, 5);
    base := date_trunc('minute', now()) + interval '10 minutes';
  END LOOP;
END$$;
