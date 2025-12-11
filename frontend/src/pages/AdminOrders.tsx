import React, { useEffect, useState } from 'react';
import api from '../api';

const AdminOrders: React.FC = () => {
    const [orders, setOrders] = useState<any[]>([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await api.get('/admin/orders');
            setOrders(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const updateStatus = async (id: string, newStatus: string) => {
        try {
            await api.put(`/bookings/${id}/status`, { status: newStatus });
            setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
        } catch (e) {
            alert('Failed to update status');
        }
    };

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-display font-bold mb-8 text-slate-800">
                    USER ORDERS <span className="text-primary text-sm align-middle ml-2 px-2 py-1 bg-primary/10 rounded border border-primary/20">{orders.length} Active</span>
                </h2>

                <div className="glass-card overflow-hidden p-0 border border-slate-200 shadow-xl">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 text-slate-500">
                            <tr>
                                <th className="p-4 font-semibold uppercase text-xs tracking-wider">Order ID</th>
                                <th className="p-4 font-semibold uppercase text-xs tracking-wider">User</th>
                                <th className="p-4 font-semibold uppercase text-xs tracking-wider">Medicine</th>
                                <th className="p-4 font-semibold uppercase text-xs tracking-wider">Pharmacy</th>
                                <th className="p-4 font-semibold uppercase text-xs tracking-wider">Slot Time</th>
                                <th className="p-4 font-semibold uppercase text-xs tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-slate-50 transition-colors group">
                                    <td className="p-4 text-primary font-mono text-sm">{order.id.slice(0, 8)}...</td>
                                    <td className="p-4 text-slate-800 font-medium">{order.user_name}</td>
                                    <td className="p-4 text-slate-600">{order.medicine_name}</td>
                                    <td className="p-4 text-slate-500 text-sm">{order.pharmacy_name}</td>
                                    <td className="p-4 text-slate-800 font-mono text-sm">
                                        {new Date(order.slot_time).toLocaleString()}
                                    </td>
                                    <td className="p-4">
                                        <select
                                            value={order.status}
                                            onChange={(e) => updateStatus(order.id, e.target.value)}
                                            className={`text-xs font-bold px-2 py-1 rounded border cursor-pointer bg-white ${order.status === 'CONFIRMED' ? 'text-green-700 border-green-200' :
                                                order.status === 'PENDING' ? 'text-yellow-700 border-yellow-200' :
                                                    order.status === 'COMPLETED' ? 'text-blue-700 border-blue-200' :
                                                        'text-red-700 border-red-200'
                                                }`}
                                        >
                                            <option value="PENDING">PENDING</option>
                                            <option value="CONFIRMED">CONFIRMED</option>
                                            <option value="COMPLETED">COMPLETED</option>
                                            <option value="CANCELLED">CANCELLED</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminOrders;
