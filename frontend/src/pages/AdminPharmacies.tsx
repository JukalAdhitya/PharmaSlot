import React, { useEffect, useState } from 'react';
import api from '../api';

interface Pharmacy {
    id: string;
    name: string;
    address: string;
    contact_number: string;
}

const AdminPharmacies: React.FC = () => {
    const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPharmacies();
    }, []);

    const fetchPharmacies = async () => {
        try {
            const res = await api.get('/admin/pharmacies');
            setPharmacies(res.data);
        } catch (error) {
            console.error('Failed to fetch pharmacies', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background p-8">
            <h2 className="text-3xl font-display font-bold text-slate-800 mb-8">Registered Pharmacies</h2>

            {loading ? (
                <div className="text-center text-slate-500">Loading...</div>
            ) : pharmacies.length === 0 ? (
                <div className="text-center p-12 bg-white rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-slate-500 text-lg">No pharmacies registered yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pharmacies.map((pharmacy) => (
                        <div key={pharmacy.id} className="glass-card group hover:shadow-neon-purple transition-all duration-300">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                                    <span className="text-xl text-indigo-600 group-hover:text-white transition-colors">🏥</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-800">{pharmacy.name}</h3>
                            </div>
                            <div className="space-y-2 text-sm text-slate-600">
                                <p className="flex items-start gap-2">
                                    <span className="font-semibold text-slate-400">📍</span>
                                    {pharmacy.address}
                                </p>
                                <p className="flex items-center gap-2">
                                    <span className="font-semibold text-slate-400">📞</span>
                                    {pharmacy.contact_number}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminPharmacies;
