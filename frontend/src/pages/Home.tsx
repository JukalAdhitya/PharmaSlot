import React, { useState, useEffect } from 'react';
import BookingModal from '../components/BookingModal'; // Import Modal
import api from '../api';

const Home: React.FC = () => {
    const [search, setSearch] = useState('');
    const [aiQuery, setAiQuery] = useState('');
    const [aiResult, setAiResult] = useState<string | null>(null);
    const [selectedMed, setSelectedMed] = useState<any | null>(null);
    const [medicines, setMedicines] = useState<any[]>([]);

    useEffect(() => {
        fetchMedicines();
    }, [search]); // Search as dependency if we want server-side search

    const fetchMedicines = async () => {
        try {
            const res = await api.get(`/medicines?query=${search}`);
            setMedicines(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-background p-4 md:p-8 relative">
            {/* Modal */}
            {selectedMed && (
                <BookingModal
                    medicineName={selectedMed.name}
                    medicineId={selectedMed.id}
                    onClose={() => setSelectedMed(null)}
                />
            )}

            <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div className="flex-1">
                    <h1 className="text-3xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                        PHARMASLOT
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">Find and book your medicines instantly</p>
                </div>

                {/* AI Search Section */}
                <div className="w-full md:w-auto flex-1 flex flex-col gap-2">
                    <div className="relative group w-full">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-400 to-pink-600 rounded-lg blur opacity-30 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative flex">
                            <input
                                type="text"
                                value={aiQuery}
                                onChange={(e) => setAiQuery(e.target.value)}
                                placeholder="💊 Ask AI: 'Alternative to Paracetamol?'"
                                className="block w-full p-3 text-sm text-slate-900 bg-white border border-slate-200 rounded-l-lg focus:ring-purple-500 focus:border-purple-500"
                            />
                            <button
                                onClick={() => {
                                    if (aiQuery.toLowerCase().includes('dolo') || aiQuery.toLowerCase().includes('650')) {
                                        setAiResult("🤖 AI Suggestion: The active ingredient in Dolo 650 is Paracetamol. You can search for 'Paracetamol 500mg' or 'Calpol' as alternatives. Consult a doctor for dosage.");
                                        setSearch('Paracetamol'); // Auto-fill search
                                    } else {
                                        setAiResult("🤖 AI: I mostly know about Dolo 650 right now! Try asking about that.");
                                    }
                                }}
                                className="flex-shrink-0 bg-slate-900 hover:bg-slate-800 border-slate-900 hover:border-slate-800 text-sm border-4 text-white py-1 px-4 rounded-r-lg transition-colors flex items-center gap-2"
                            >
                                <span>✨ AI Search</span>
                            </button>
                        </div>
                    </div>
                    {aiResult && (
                        <div className="bg-purple-50 border border-purple-100 text-purple-800 text-xs p-3 rounded-lg animate-fade-in">
                            {aiResult}
                        </div>
                    )}
                </div>
            </header>

            <div className="flex justify-between items-center mb-6">
                <div className="relative w-full md:w-96">
                    <input
                        type="text"
                        placeholder="Search for medicines..."
                        className="input-field pl-10"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
                </div>
            </div>

            {/* Featured Section */}
            <div className="mb-12 relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 p-8 border border-white shadow-sm">
                <div className="relative z-10">
                    <h2 className="text-2xl font-bold mb-2 text-slate-800">Find Your Medicine Faster</h2>
                    <p className="text-slate-500 mb-6 max-w-lg">Check real-time stock availability at pharmacies near you and book your pickup slot instantly.</p>
                </div>
            </div>

            {/* Medicine Grid */}
            <h3 className="text-xl font-display text-slate-800 mb-6 pl-2 border-l-4 border-primary">AVAILABLE MEDICINES</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {medicines.length === 0 ? (
                    <div className="col-span-full text-center py-12 text-slate-500">
                        <p className="text-lg">No medicines found.</p>
                        <button onClick={fetchMedicines} className="text-primary hover:underline mt-2">Refresh</button>
                    </div>
                ) : (
                    medicines.map((med) => (
                        <div key={med.id} className="glass-card group hover:scale-[1.02] border border-slate-200">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h4 className="font-bold text-lg text-slate-800 group-hover:text-primary transition-colors">{med.name}</h4>
                                    <p className="text-sm text-slate-500">{med.description || med.generic_name}</p>
                                </div>
                            </div>

                            <div className="flex justify-between items-center mt-6">
                                <span className="text-2xl font-bold text-slate-800 font-mono">${med.price || '5.99'}</span>
                                <button
                                    onClick={() => setSelectedMed(med)}
                                    className="btn-primary py-1 px-4 text-xs"
                                >
                                    Check Stock
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Home;
