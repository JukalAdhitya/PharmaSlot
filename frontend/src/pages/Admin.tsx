import { useState } from 'react';
import api from '../api';

export default function Admin() {
    const [pharmacy, setPharmacy] = useState({ name: '', address: '', contact_number: '' });
    const [medicine, setMedicine] = useState({ name: '', description: '', manufacturer: '', price: 0 });
    const [inventory, setInventory] = useState({ pharmacy_id: '', medicine_id: '', quantity: 0 });

    const createPharmacy = async () => {
        try {
            const res = await api.post('/admin/pharmacies', pharmacy);
            alert('Pharmacy created ID: ' + res.data.id);
            setInventory({ ...inventory, pharmacy_id: res.data.id });
        } catch (e) { alert('Error creating pharmacy'); }
    };

    const createMedicine = async () => {
        try {
            const res = await api.post('/admin/medicines', medicine);
            alert('Medicine created ID: ' + res.data.id);
            setInventory({ ...inventory, medicine_id: res.data.id });
        } catch (e) { alert('Error creating medicine'); }
    };

    const addInventory = async () => {
        try {
            await api.post('/admin/inventory', inventory);
            alert('Inventory updated');
        } catch (e) { alert('Error updating inventory'); }
    };

    return (
        <div className="min-h-screen bg-background p-8">
            <h2 className="text-3xl font-display font-bold text-slate-800 mb-8">Admin Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="glass-card">
                    <h3 className="text-xl font-bold text-slate-800 mb-4">Add Pharmacy</h3>
                    <div className="space-y-3">
                        <input className="input-field" placeholder="Name" onChange={e => setPharmacy({ ...pharmacy, name: e.target.value })} />
                        <input className="input-field" placeholder="Address" onChange={e => setPharmacy({ ...pharmacy, address: e.target.value })} />
                        <input className="input-field" placeholder="Contact" onChange={e => setPharmacy({ ...pharmacy, contact_number: e.target.value })} />
                        <button className="w-full btn-primary" onClick={createPharmacy}>Create Pharmacy</button>
                    </div>
                </div>

                <div className="glass-card">
                    <h3 className="text-xl font-bold text-slate-800 mb-4">Add Medicine</h3>
                    <div className="space-y-3">
                        <input className="input-field" placeholder="Name" onChange={e => setMedicine({ ...medicine, name: e.target.value })} />
                        <input className="input-field" placeholder="Description" onChange={e => setMedicine({ ...medicine, description: e.target.value })} />
                        <input className="input-field" placeholder="Manufacturer" onChange={e => setMedicine({ ...medicine, manufacturer: e.target.value })} />
                        <input className="input-field" type="number" placeholder="Price" onChange={e => setMedicine({ ...medicine, price: parseFloat(e.target.value) })} />
                        <button className="w-full btn-primary" onClick={createMedicine}>Create Medicine</button>
                    </div>
                </div>

                <div className="glass-card">
                    <h3 className="text-xl font-bold text-slate-800 mb-4">Update Stock</h3>
                    <div className="space-y-3">
                        <input className="input-field" placeholder="Pharmacy ID" value={inventory.pharmacy_id} onChange={e => setInventory({ ...inventory, pharmacy_id: e.target.value })} />
                        <input className="input-field" placeholder="Medicine ID" value={inventory.medicine_id} onChange={e => setInventory({ ...inventory, medicine_id: e.target.value })} />
                        <input className="input-field" type="number" placeholder="Quantity" onChange={e => setInventory({ ...inventory, quantity: parseInt(e.target.value) })} />
                        <button className="w-full btn-primary" onClick={addInventory}>Add Inventory</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
