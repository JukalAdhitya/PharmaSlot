import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api';

interface BookingModalProps {
    medicineName: string;
    medicineId: number; // Added ID
    onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ medicineName, medicineId, onClose }) => {
    const { user } = useAuth();
    const [step, setStep] = useState(1);
    const [selectedPharmacy, setSelectedPharmacy] = useState<any | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [pharmacies, setPharmacies] = useState<any[]>([]);

    useEffect(() => {
        fetchPharmacies();
    }, [medicineId]);

    const fetchPharmacies = async () => {
        try {
            const res = await api.get(`/medicines/${medicineId}/pharmacies`);
            setPharmacies(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    // Generate slots for next 2 hours
    const generateSlots = () => {
        const slots = [];
        const now = new Date();
        now.setMinutes(Math.ceil(now.getMinutes() / 10) * 10); // Round to next 10 min

        for (let i = 0; i < 5; i++) {
            const time = new Date(now.getTime() + i * 10 * 60000);
            slots.push(time.toISOString()); // Store ISO for backend
        }
        return slots;
    };

    const slots = generateSlots();

    const handleConfirm = async () => {
        try {
            if (!user) {
                alert('Please login to book');
                return;
            }

            await api.post('/bookings', {
                user_id: user.id,
                user_name: user.name || 'Guest',
                user_contact: user.phone || 'N/A', // Use user details from context
                pharmacy_id: selectedPharmacy.id,
                medicine_id: medicineId,
                quantity: 1,
                slot_time: selectedSlot
            });

            setIsSuccess(true);
            setTimeout(() => {
                onClose();
            }, 2000);
        } catch (err: any) {
            console.error(err);
            alert(err.response?.data?.error || 'Booking failed');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="glass-card w-full max-w-lg relative border border-slate-200 shadow-xl bg-white">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-800"
                >
                    ✕
                </button>

                {!isSuccess ? (
                    <>
                        <h2 className="text-2xl font-display font-bold text-slate-800 mb-2">BOOKING: <span className="text-primary">{medicineName}</span></h2>
                        <div className="h-1 w-full bg-slate-100 rounded-full mb-6 overflow-hidden">
                            <div className={`h-full bg-primary transition-all duration-500 ease-out ${step === 1 ? 'w-1/2' : 'w-full'}`} />
                        </div>

                        {step === 1 ? (
                            <div className="space-y-4">
                                <h3 className="text-slate-600 mb-2">Select Pharmacy</h3>
                                {pharmacies.length === 0 && <p className="text-slate-500">No pharmacies found with stock.</p>}
                                {pharmacies.map((pharm) => (
                                    <div
                                        key={pharm.id}
                                        onClick={() => setSelectedPharmacy(pharm)}
                                        className={`p-4 rounded-lg border cursor-pointer transition-all flex justify-between items-center ${selectedPharmacy?.id === pharm.id
                                            ? 'bg-primary/5 border-primary shadow-sm'
                                            : 'bg-white border-slate-200 hover:bg-slate-50'
                                            }`}
                                    >
                                        <div>
                                            <div className="font-bold text-slate-800">{pharm.name}</div>
                                            <div className="text-xs text-slate-500">{pharm.quantity} units available</div>
                                        </div>
                                        {/* Using random price if not in DB, else use price from joint query if available */}
                                        <div className="text-primary font-mono font-bold">$10.00</div>
                                    </div>
                                ))}
                                <button
                                    disabled={!selectedPharmacy}
                                    onClick={() => setStep(2)}
                                    className="w-full btn-primary mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Next: Select Slot
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <h3 className="text-slate-600 mb-2">Select Pickup Slot ({selectedPharmacy?.name})</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {slots.map((slot, idx) => {
                                        const timeLabel = new Date(slot).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                                        return (
                                            <button
                                                key={idx}
                                                onClick={() => setSelectedSlot(slot)}
                                                className={`p-3 rounded-lg border text-sm transition-all ${selectedSlot === slot
                                                    ? 'bg-secondary text-white shadow-md border-secondary'
                                                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                                                    }`}
                                            >
                                                {timeLabel}
                                            </button>
                                        );
                                    })}
                                </div>
                                <div className="flex gap-4 mt-6">
                                    <button
                                        onClick={() => setStep(1)}
                                        className="w-1/3 py-2 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50"
                                    >
                                        Back
                                    </button>
                                    <button
                                        disabled={!selectedSlot}
                                        onClick={handleConfirm}
                                        className="w-2/3 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Confirm Booking
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-12">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-200">
                            <span className="text-4xl text-green-600">✓</span>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-2">Booking Confirmed!</h3>
                        <p className="text-slate-500">Your pickup slot has been reserved.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookingModal;
