import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api';

interface Booking {
    id: string;
    medicine_name: string;
    pharmacy_name: string;
    quantity: number;
    slot_time: string;
    status: string;
    created_at: string;
}

const MyBookings: React.FC = () => {
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [bookings, setBookings] = useState<Booking[]>([]);

    useEffect(() => {
        if (!isAuthenticated) navigate('/login');
        if (user) fetchBookings();
    }, [user, isAuthenticated]);

    const fetchBookings = async () => {
        try {
            const res = await api.get(`/bookings/user/${user?.id}`);
            setBookings(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-display font-bold text-slate-800">
                        MY BOOKINGS
                    </h2>
                    <button
                        onClick={() => navigate('/')}
                        className="btn-secondary"
                    >
                        New Booking
                    </button>
                </div>

                <div className="space-y-4">
                    {bookings.length === 0 ? (
                        <p className="text-slate-500">No bookings found.</p>
                    ) : (
                        bookings.map((booking) => (
                            <div key={booking.id} className="glass-card flex justify-between items-center">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-800">{booking.medicine_name}</h3>
                                    <p className="text-slate-500">{booking.pharmacy_name} • {booking.quantity} units</p>
                                    <p className="text-sm text-slate-400 mt-1">
                                        Pickup: {new Date(booking.slot_time).toLocaleString()}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' :
                                            booking.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-red-100 text-red-700'
                                        }`}>
                                        {booking.status}
                                    </span>
                                    <div className="text-xs text-slate-400 mt-2">
                                        Booked on {new Date(booking.created_at).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyBookings;
