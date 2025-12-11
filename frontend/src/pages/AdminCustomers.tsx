import React, { useEffect, useState } from 'react';
import api from '../api';

const AdminCustomers: React.FC = () => {
    const [customers, setCustomers] = useState<any[]>([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await api.get('/admin/users');
            setCustomers(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-background p-8">


            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-display font-bold mb-8 text-slate-800">
                    REGISTERED CUSTOMERS
                </h2>

                <div className="glass-card overflow-hidden p-0">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 text-slate-500">
                            <tr>
                                <th className="p-4 font-semibold uppercase text-sm tracking-wider">Name</th>
                                <th className="p-4 font-semibold uppercase text-sm tracking-wider">Email</th>
                                <th className="p-4 font-semibold uppercase text-sm tracking-wider">Phone</th>
                                <th className="p-4 font-semibold uppercase text-sm tracking-wider">Role</th>
                                <th className="p-4 font-semibold uppercase text-sm tracking-wider">Joined</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {customers.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-slate-500">
                                        No customers registered yet.
                                    </td>
                                </tr>
                            ) : (
                                customers.map((customer) => (
                                    <tr key={customer.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="p-4 text-slate-800 font-medium">{customer.name}</td>
                                        <td className="p-4 text-slate-500">{customer.email}</td>
                                        <td className="p-4 text-slate-500">{customer.phone}</td>
                                        <td className="p-4 text-slate-500">{customer.role}</td>
                                        <td className="p-4 text-slate-400">
                                            {new Date(customer.created_at).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminCustomers;
