import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api';

const Login: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    // Form States
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (isAdmin) {
                // Hardcoded admin check
                if (email === 'admin@pharmaslot.com' && password === 'admin123') {
                    login({ id: 'admin', name: 'Admin', email, role: 'ADMIN', phone: '0000000000' });
                    navigate('/admin');
                } else {
                    alert('Invalid Admin Credentials');
                }
            } else {
                if (isLogin) {
                    // Login
                    const res = await api.post('/auth/login', { email, password });
                    login(res.data);
                    navigate('/');
                } else {
                    // Register
                    const res = await api.post('/auth/register', { name, email, phone, password, role: 'USER' });
                    login(res.data);
                    navigate('/');
                }
            }
        } catch (err: any) {
            console.error(err);
            alert(err.response?.data?.error || 'Authentication failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[100px] opacity-20" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[100px] opacity-20 delay-1000" />
            </div>

            <div className="glass-card w-full max-w-md z-10 relative">
                <h2 className="text-3xl font-display font-bold text-center mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    PHARMASLOT
                </h2>

                <div className="flex justify-center mb-8 space-x-4">
                    <button
                        onClick={() => setIsAdmin(false)}
                        className={`px-4 py-2 rounded-lg transition-all ${!isAdmin ? 'bg-primary text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
                    >
                        USER
                    </button>
                    <button
                        onClick={() => setIsAdmin(true)}
                        className={`px-4 py-2 rounded-lg transition-all ${isAdmin ? 'bg-secondary text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
                    >
                        ADMIN
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && !isAdmin && (
                        <>
                            <div>
                                <label className="block text-slate-600 text-sm mb-1">Full Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="input-field"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-slate-600 text-sm mb-1">Phone Number</label>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="input-field"
                                    placeholder="+1 234 567 890"
                                    required
                                />
                            </div>
                        </>
                    )}

                    <div>
                        <label className="block text-slate-600 text-sm mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input-field"
                            placeholder={isAdmin ? "admin@pharmaslot.com" : "user@example.com"}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-slate-600 text-sm mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input-field"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className={`w-full py-3 rounded-lg font-bold tracking-wider transition-all shadow-md mt-6 ${isAdmin
                            ? 'bg-secondary hover:bg-indigo-700 text-white'
                            : 'bg-primary hover:bg-blue-700 text-white'
                            }`}
                    >
                        {isAdmin ? 'LOGIN' : (isLogin ? 'LOGIN' : 'REGISTER')}
                    </button>
                </form>

                {!isAdmin && (
                    <div className="mt-6 text-center">
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-sm text-slate-500 hover:text-primary transition-colors"
                        >
                            {isLogin ? "New user? Create an account" : "Already have an account? Login"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
