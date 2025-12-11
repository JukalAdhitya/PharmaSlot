# 🏥 PharmaSlot
### Intelligent Pharmacy Availability & Pickup Slot Booking System

PharmaSlot is a modern full-stack web application designed to help users find medicines, check real-time stock availability across different pharmacies, and book pickup slots to avoid waiting in lines.

## 🚀 Features

### For Users
-   **🔍 AI Health Search**: Ask for medicines or alternatives (e.g., "Alternative to Dolo 650") and get instant suggestions.
-   **💊 Real-time Inventory**: Search for medicines and see which pharmacies have them in stock.
-   **📅 Slot Booking**: specific pickup slots to ensure your medicine is ready when you arrive.
-   **📱 Responsive & Modern UI**: Built with a "glassmorphism" aesthetic, fully responsive for all devices.
-   **📋 My Bookings**: Track your order history and status.

### For Admins
-   **📊 Dashboard**: Overview of key metrics (Orders, Active Slots, Revenue).
-   **🏥 Pharmacy Management**: Register new pharmacies with address and contact details.
-   **📦 Inventory Management**: Add new medicines and update stock levels for specific pharmacies.
-   **👥 Customer View**: See registered users.
-   **✅ Order Processing**: Update order statuses (Pending -> Confirmed -> Completed).

---

## 🛠️ Tech Stack

### Frontend
-   **React (Vite)**: Fast, modern UI development.
-   **TypeScript**: Type-safe code.
-   **Tailwind CSS**: Utility-first styling for the modern aesthetic.
-   **React Router**: SPA navigation.

### Backend
-   **Node.js & Express**: Robust REST API.
-   **PostgreSQL**: Relational database for Users, Bookings, Medicines, and Pharmacies.
-   **pg**: Native PostgreSQL client for Node.js.

---

## ⚙️ Installation & Setup

### Prerequisites
-   Node.js (v18+)
-   PostgreSQL

### 1. Database Setup
1.  Open your PostgreSQL terminal (`psql`).
2.  Create the database:
    ```sql
    CREATE DATABASE pharmaslot;
    ```
3.  Navigate to the `backend` folder and run the seed script (if available) or create tables manually using `seed.sql`.

### 2. Backend Setup
```bash
cd backend
npm install
# Create a .env file with your DB credentials if needed, or use defaults in db.js
npm run dev
```
*Server runs on port **3000**.*

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
*Client runs on port **5173** (default Vite port).*

---

## 📖 Usage Guides

### Admin Access
1.  Log in with admin credentials (or update a user role to `ADMIN` in the database).
2.  Navigate to `/admin` to access the dashboard.
3.  Use "Inventory" to add Medicines and Pharmacies.
4.  Use "Update Stock" (in Inventory) to link them.

### User Flow
1.  Register/Login at `/login`.
2.  On Home, search for a medicine.
3.  Click "Book Now" on available stock.
4.  Confirm details and book.
5.  View booking key/status in "My Bookings".

---

## 🤝 Contribution
1.  Fork the repository.
2.  Create a feature branch (`git checkout -b feature/NewFeature`).
3.  Commit changes (`git commit -m 'Add NewFeature'`).
4.  Push to branch (`git push origin feature/NewFeature`).
5.  Open a Pull Request.

---
*Built for College Project Submission.*
