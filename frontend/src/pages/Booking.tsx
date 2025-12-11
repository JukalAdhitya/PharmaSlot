import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

export default function Booking() {
    const { pharmacyId, medicineId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        user_name: '',
        user_contact: '',
        quantity: 1,
        slot_time: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/bookings', {
                ...formData,
                pharmacy_id: pharmacyId,
                medicine_id: medicineId
            });
            alert('Booking Confirmed!');
            navigate('/');
        } catch (err) {
            console.error(err);
            alert('Booking Failed: ' + (err as any).response?.data?.error || 'Unknown error');
        }
    };

    return (
        <div>
            <h2>Confirm Booking</h2>
            <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label>Name</label>
                        <input
                            type="text"
                            className="input"
                            required
                            value={formData.user_name}
                            onChange={e => setFormData({ ...formData, user_name: e.target.value })}
                        />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label>Contact Number</label>
                        <input
                            type="tel"
                            className="input"
                            required
                            value={formData.user_contact}
                            onChange={e => setFormData({ ...formData, user_contact: e.target.value })}
                        />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label>Quantity</label>
                        <input
                            type="number"
                            className="input"
                            min="1"
                            required
                            value={formData.quantity}
                            onChange={e => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                        />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label>Pickup Time</label>
                        <input
                            type="datetime-local"
                            className="input"
                            required
                            value={formData.slot_time}
                            onChange={e => setFormData({ ...formData, slot_time: e.target.value })}
                        />
                    </div>
                    <button type="submit" className="btn" style={{ width: '100%' }}>Confirm & Book</button>
                </form>
            </div>
        </div>
    );
}
