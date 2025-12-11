import React, { useState, useEffect } from 'react';
import api from '../api';

const AdminInventory: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'medicine' | 'pharmacy' | 'inventory'>('medicine');

    // Form States
    const [medName, setMedName] = useState('');
    const [medDesc, setMedDesc] = useState('');
    const [medPrice, setMedPrice] = useState('');

    const [pharmacyName, setPharmacyName] = useState('');
    const [pharmacyAddress, setPharmacyAddress] = useState('');
    const [pharmacyContact, setPharmacyContact] = useState('');

    // Inventory States
    const [selectedMedId, setSelectedMedId] = useState('');
    const [selectedPharmacyId, setSelectedPharmacyId] = useState('');
    const [stockQty, setStockQty] = useState('');

    // Lists for Dropdowns
    const [medicineList, setMedicineList] = useState<any[]>([]);
    const [pharmacyList, setPharmacyList] = useState<any[]>([]);

    useEffect(() => {
        // Fetch lists when entering inventory tab
        if (activeTab === 'inventory') {
            fetchLists();
        }
    }, [activeTab]);

    const fetchLists = async () => {
        try {
            const [medsRes, pharmRes] = await Promise.all([
                api.get('/medicines'), // Public endpoint
                api.get('/admin/pharmacies') // Admin endpoint
            ]);
            setMedicineList(medsRes.data);
            setPharmacyList(pharmRes.data);
        } catch (error) {
            console.error("Failed to fetch lists", error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (activeTab === 'medicine') {
                await api.post('/admin/medicines', {
                    name: medName,
                    description: medDesc,
                    price: parseFloat(medPrice),
                    manufacturer: 'Generic'
                });
            } else if (activeTab === 'pharmacy') {
                await api.post('/admin/pharmacies', {
                    name: pharmacyName,
                    address: pharmacyAddress,
                    contact_number: pharmacyContact
                });
            } else if (activeTab === 'inventory') {
                await api.post('/admin/inventory', {
                    medicine_id: selectedMedId,
                    pharmacy_id: selectedPharmacyId,
                    quantity: parseInt(stockQty)
                });
            }
            alert(`Successfully added new ${activeTab}`);
            // Reset forms
            setMedName(''); setMedDesc(''); setMedPrice('');
            setPharmacyName(''); setPharmacyAddress(''); setPharmacyContact('');
            setSelectedMedId(''); setSelectedPharmacyId(''); setStockQty('');
        } catch (error) {
            console.error(error);
            alert('Failed to add entry');
        }
    };

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="glass-card max-w-2xl mx-auto">
                <h2 className="text-3xl font-display font-bold text-center mb-8 text-black">
                    ADD NEW ENTRY
                </h2>

                <div className="flex justify-center mb-8 space-x-2 md:space-x-4">
                    <button
                        onClick={() => setActiveTab('medicine')}
                        className={`px-4 py-2 text-sm md:text-base rounded-lg transition-all ${activeTab === 'medicine'
                            ? 'bg-blue-600/20 text-blue-600 border border-blue-600 shadow-neon-blue'
                            : 'text-gray-400 border border-slate-200'
                            }`}
                    >
                        MEDICINE
                    </button>
                    <button
                        onClick={() => setActiveTab('pharmacy')}
                        className={`px-4 py-2 text-sm md:text-base rounded-lg transition-all ${activeTab === 'pharmacy'
                            ? 'bg-indigo-600/20 text-indigo-600 border border-indigo-600 shadow-neon-purple'
                            : 'text-gray-400 border border-slate-200'
                            }`}
                    >
                        PHARMACY
                    </button>
                    <button
                        onClick={() => setActiveTab('inventory')}
                        className={`px-4 py-2 text-sm md:text-base rounded-lg transition-all ${activeTab === 'inventory'
                            ? 'bg-emerald-600/20 text-emerald-600 border border-emerald-600 shadow-neon-blue'
                            : 'text-gray-400 border border-slate-200'
                            }`}
                    >
                        UPDATE STOCK
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {activeTab === 'medicine' ? (
                        <>
                            <div>
                                <label className="block text-gray-500 text-sm mb-2">Medicine Name</label>
                                <input
                                    value={medName}
                                    onChange={e => setMedName(e.target.value)}
                                    className="input-field"
                                    placeholder="e.g. Paracetamol 500mg"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-500 text-sm mb-2">Description</label>
                                <textarea
                                    value={medDesc}
                                    onChange={e => setMedDesc(e.target.value)}
                                    className="input-field min-h-[100px]"
                                    placeholder="Brief description..."
                                />
                            </div>
                            <div>
                                <label className="block text-gray-500 text-sm mb-2">Price ($)</label>
                                <input
                                    type="number"
                                    value={medPrice}
                                    onChange={e => setMedPrice(e.target.value)}
                                    className="input-field"
                                    placeholder="0.00"
                                />
                            </div>
                        </>
                    ) : activeTab === 'pharmacy' ? (
                        <>
                            <div>
                                <label className="block text-gray-500 text-sm mb-2">Pharmacy Name</label>
                                <input
                                    className="input-field"
                                    placeholder="e.g. City Care Chemist"
                                    value={pharmacyName}
                                    onChange={(e) => setPharmacyName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-500 text-sm mb-2">Address</label>
                                <input
                                    className="input-field"
                                    placeholder="Full address"
                                    value={pharmacyAddress}
                                    onChange={(e) => setPharmacyAddress(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-500 text-sm mb-2">Contact Number</label>
                                <input
                                    className="input-field"
                                    placeholder="+1 234 567 890"
                                    value={pharmacyContact}
                                    onChange={(e) => setPharmacyContact(e.target.value)}
                                />
                            </div>
                        </>
                    ) : (
                        /* INVENTORY TAB */
                        <>
                            <div>
                                <label className="block text-gray-500 text-sm mb-2">Select Medicine</label>
                                <select
                                    className="input-field"
                                    value={selectedMedId}
                                    onChange={(e) => setSelectedMedId(e.target.value)}
                                >
                                    <option value="">-- Choose Medicine --</option>
                                    {medicineList.map(m => (
                                        <option key={m.id} value={m.id}>{m.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-500 text-sm mb-2">Select Pharmacy</label>
                                <select
                                    className="input-field"
                                    value={selectedPharmacyId}
                                    onChange={(e) => setSelectedPharmacyId(e.target.value)}
                                >
                                    <option value="">-- Choose Pharmacy --</option>
                                    {pharmacyList.map(p => (
                                        <option key={p.id} value={p.id}>{p.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-500 text-sm mb-2">Units to Add</label>
                                <input
                                    type="number"
                                    className="input-field"
                                    placeholder="e.g. 100"
                                    value={stockQty}
                                    onChange={(e) => setStockQty(e.target.value)}
                                />
                            </div>
                        </>
                    )}

                    <button
                        type="submit"
                        className={`w-full py-3 rounded-lg font-bold uppercase tracking-wider transition-all mt-6 ${activeTab === 'medicine' ? 'bg-blue-600 hover:bg-blue-700 shadow-neon-blue' :
                            activeTab === 'pharmacy' ? 'bg-indigo-600 hover:bg-indigo-700 shadow-neon-purple' :
                                'bg-emerald-600 hover:bg-emerald-700 shadow-lg'
                            } text-white`}
                    >
                        Submit {activeTab === 'inventory' ? 'Stock' : activeTab}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminInventory;
