/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#f8fafc', // Slate-50
                surface: '#ffffff',
                primary: '#2563eb', // Blue-600
                secondary: '#4f46e5', // Indigo-600
                accent: '#10b981', // Emerald-500
                'glass-white': 'rgba(255, 255, 255, 0.7)',
                'glass-border': 'rgba(226, 232, 240, 0.8)', // Slate-200
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Inter', 'sans-serif'], // Fallback to Inter for display too
            },
        },
    },
    plugins: [],
}
