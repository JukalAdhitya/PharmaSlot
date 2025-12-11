import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
    const { user, logout, isAuthenticated, isAdmin } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!isAuthenticated || location.pathname === '/login') return null;

    return (
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                            <span className="text-2xl font-display font-bold text-primary">PHARMASLOT</span>
                        </Link>
                        <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
                            {/* Common Links */}
                            <Link
                                to="/"
                                className="border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors"
                            >
                                Medicines
                            </Link>

                            {/* User Links */}
                            {!isAdmin && (
                                <Link
                                    to="/my-bookings"
                                    className="border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors"
                                >
                                    My Bookings
                                </Link>
                            )}

                            {/* Admin Links */}
                            {isAdmin && (
                                <>
                                    <Link
                                        to="/admin/pharmacies"
                                        className="border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors"
                                    >
                                        Pharmacies
                                    </Link>
                                    <Link
                                        to="/admin/orders"
                                        className="border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors"
                                    >
                                        Orders
                                    </Link>
                                    <Link
                                        to="/admin/inventory"
                                        className="border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors"
                                    >
                                        Inventory
                                    </Link>
                                    <Link
                                        to="/admin/customers"
                                        className="border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors"
                                    >
                                        Customers
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="text-sm text-slate-600 hidden md:block">
                            Hello, <span className="font-semibold text-slate-800">{user?.name}</span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
