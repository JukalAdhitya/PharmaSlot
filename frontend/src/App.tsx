import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import AdminInventory from './pages/AdminInventory';
import AdminCustomers from './pages/AdminCustomers';
import AdminOrders from './pages/AdminOrders';
import AdminPharmacies from './pages/AdminPharmacies';
import Home from './pages/Home';
import MyBookings from './pages/MyBookings';
import Navbar from './components/Navbar';

function App() {
    return (
        <AuthProvider>
            <div className="min-h-screen bg-background text-slate-900 font-sans">
                <Navbar />
                <Routes>
                    <Route path="/login" element={<Login />} />

                    {/* Admin Routes */}
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute requiredRole="ADMIN">
                                <AdminDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/inventory"
                        element={
                            <ProtectedRoute requiredRole="ADMIN">
                                <AdminInventory />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        element={
                            <ProtectedRoute requiredRole="ADMIN">
                                <AdminCustomers />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/orders"
                        element={
                            <ProtectedRoute requiredRole="ADMIN">
                                <AdminOrders />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/customers"
                        element={
                            <ProtectedRoute requiredRole="ADMIN">
                                <AdminCustomers />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/pharmacies"
                        element={
                            <ProtectedRoute requiredRole="ADMIN">
                                <AdminPharmacies />
                            </ProtectedRoute>
                        }
                    />

                    {/* User Routes */}
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute requiredRole="USER">
                                <Home />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/my-bookings"
                        element={
                            <ProtectedRoute requiredRole="USER">
                                <MyBookings />
                            </ProtectedRoute>
                        }
                    />

                    {/* Fallback */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </AuthProvider>
    )
}

export default App;
