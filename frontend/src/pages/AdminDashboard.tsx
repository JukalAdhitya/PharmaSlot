import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
    const navigate = useNavigate();

    const stats = [
        { label: 'Total Orders', value: '1,234', color: 'from-primary to-blue-600' },
        { label: 'Active Slots', value: '45', color: 'from-secondary to-purple-600' },
        { label: 'Revenue', value: '$12.5k', color: 'from-accent to-green-600' },
    ];

    return (
        <div className="min-h-screen bg-background p-8">
            <header className="mb-12">
                <h1 className="text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                    ADMIN DASHBOARD
                </h1>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {stats.map((stat, index) => (
                    <div key={index} className="glass-card hover:translate-y-[-5px]">
                        <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-2">{stat.label}</h3>
                        <div className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                            {stat.value}
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <h2 className="text-2xl font-display text-white mb-6">QUICK ACTIONS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <button
                    onClick={() => navigate('/admin/inventory')}
                    className="glass-card flex flex-col items-center justify-center p-8 text-center group"
                >
                    <div className="w-16 h-16 rounded-full bg-blue-600/10 flex items-center justify-center mb-4 group-hover:shadow-neon-blue transition-all">
                        <span className="text-3xl text-blue-600">+</span>
                    </div>
                    <span className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">Add New Things</span>
                </button>

                <button
                    onClick={() => navigate('/admin/customers')}
                    className="glass-card flex flex-col items-center justify-center p-8 text-center group"
                >
                    <div className="w-16 h-16 rounded-full bg-indigo-600/10 flex items-center justify-center mb-4 group-hover:shadow-neon-purple transition-all">
                        <span className="text-3xl text-indigo-600">👥</span>
                    </div>
                    <span className="text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">View Customers</span>
                </button>

                <button
                    onClick={() => navigate('/admin/orders')}
                    className="glass-card flex flex-col items-center justify-center p-8 text-center group"
                >
                    <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4 group-hover:shadow-neon-blue transition-all">
                        <span className="text-3xl text-green-500">📋</span>
                    </div>
                    <span className="text-xl font-bold text-slate-800 group-hover:text-green-600 transition-colors">View Orders</span>
                </button>
            </div>
        </div>
    );
};

export default AdminDashboard;
