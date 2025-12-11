-- Clear existing data
TRUNCATE TABLE bookings, inventory, medicines, pharmacies CASCADE;

-- Insert Pharmacies
WITH inserted_pharmacies AS (
    INSERT INTO pharmacies (name, address, contact_number, latitude, longitude) VALUES
    ('HealthPlus Pharmacy', '123 Main St, New York, NY', '555-0101', 40.7128, -74.0060),
    ('City Care Chemist', '456 Oak Ave, Brooklyn, NY', '555-0102', 40.6782, -73.9442),
    ('Wellness Corner', '789 Pine Ln, Queens, NY', '555-0103', 40.7282, -73.7949),
    ('QuickMeds Stop', '321 Elm St, Bronx, NY', '555-0104', 40.8448, -73.8648),
    ('PharmaDirect', '654 Maple Dr, Staten Island, NY', '555-0105', 40.5795, -74.1502)
    RETURNING id
),
-- Insert Medicines
inserted_medicines AS (
    INSERT INTO medicines (name, description, manufacturer, price) VALUES
    ('Paracetamol 500mg', 'Pain reliever and fever reducer', 'HealthCorp', 5.99),
    ('Amoxicillin 250mg', 'Antibiotic for bacterial infections', 'PharmaInc', 12.50),
    ('Ibuprofen 400mg', 'Non-steroidal anti-inflammatory drug', 'ReliefMeds', 8.75),
    ('Cetirizine 10mg', 'Antihistamine for allergy relief', 'AllergyGone', 15.00),
    ('Metformin 500mg', 'Medication for type 2 diabetes', 'DiabetCare', 10.25)
    RETURNING id
)
-- Insert Inventory (Linking all medicines to all pharmacies with random quantities)
INSERT INTO inventory (pharmacy_id, medicine_id, quantity)
SELECT p.id, m.id, floor(random() * 100 + 1)::int
FROM inserted_pharmacies p
CROSS JOIN inserted_medicines m;
