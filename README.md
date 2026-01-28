# Schedulr - Doctor Appointment Booking System

Schedulr is a comprehensive full-stack web application designed to simplify doctor appointment booking. It bridges the gap between patients and healthcare providers through three integrated interfaces: a patient-facing frontend, a doctor's dashboard, and an administrative panel.

## 🚀 Features

### 🏥 Patient Frontend
* [cite_start]**Browse & Filter:** Search for doctors by specialty (General Physician, Gynecologist, Dermatologist, etc.)[cite: 452, 512].
* [cite_start]**Book Appointments:** Real-time slot availability checks and booking[cite: 483, 487].
* [cite_start]**User Profiles:** Manage personal details and profile pictures[cite: 580].
* [cite_start]**Payments:** Secure payment integration via **Razorpay**[cite: 550].
* [cite_start]**History:** Track appointment status (Pending, Completed, Cancelled)[cite: 568].

### 👨‍⚕️ Doctor Dashboard
* [cite_start]**Analytics:** View earnings, patient count, and appointment statistics[cite: 254].
* [cite_start]**Schedule Management:** Mark appointments as completed or cancelled[cite: 249, 251].
* [cite_start]**Profile Control:** Update availability status, consultation fees, and practice address[cite: 257].

### 🛡️ Admin Panel
* [cite_start]**Doctor Management:** Add new doctors with images, qualifications, and experience[cite: 220].
* [cite_start]**System Oversight:** View global statistics and manage all users and appointments[cite: 241].

## 🛠️ Tech Stack

### Frontend & Admin
* [cite_start]**Framework:** [React](https://react.dev/) + [Vite](https://vitejs.dev/) [cite: 13, 351]
* [cite_start]**Styling:** [Tailwind CSS](https://tailwindcss.com/) [cite: 31, 358]
* [cite_start]**State Management:** React Context API [cite: 43, 461]
* [cite_start]**Routing:** React Router DOM [cite: 25, 360]

### Backend
* **Runtime:** [Node.js](https://nodejs.org/)
* [cite_start]**Framework:** [Express.js](https://expressjs.com/) [cite: 207]
* [cite_start]**Database:** [MongoDB](https://www.mongodb.com/) + Mongoose [cite: 219]
* [cite_start]**Authentication:** JWT (JSON Web Tokens) [cite: 229, 266]
* [cite_start]**Image Storage:** Cloudinary [cite: 209]
* [cite_start]**Payments:** Razorpay [cite: 312]

---

## ⚙️ Installation & Setup

Prerequisites: Ensure **Node.js** and **MongoDB** are installed on your machine.

### 1. Backend Setup

[cite_start]The backend runs on Port `4000` by default[cite: 207].

1.  Navigate to the backend folder:
    ```bash
    cd Backend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Create a `.env` file in the `Backend/` directory with the following variables:
    ```env
    PORT=4000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    
    # Cloudinary Credentials
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret

    # Admin Credentials
    ADMIN_EMAIL=admin@schedulr.com
    ADMIN_PASSWORD=your_admin_password

    # Razorpay Credentials
    RAZORPAY_KEY_ID=your_razorpay_key_id
    RAZORPAY_KEY_SECRET=your_razorpay_key_secret
    CURRENCY=INR
    ```

4.  Start the server:
    ```bash
    npm start
    ```

### 2. Admin Panel Setup

[cite_start]The admin panel runs on Port `5174`[cite: 24].

1.  Navigate to the admin folder:
    ```bash
    cd admin
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Create a `.env` file in the `admin/` directory:
    ```env
    VITE_BACKEND_URL=http://localhost:4000
    ```

4.  Start the development server:
    ```bash
    npm run dev
    ```

### 3. Frontend Setup

[cite_start]The user-facing application runs on Port `5173`[cite: 360].

1.  Navigate to the frontend folder:
    ```bash
    cd frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Create a `.env` file in the `frontend/` directory:
    ```env
    VITE_BACKEND_URL=http://localhost:4000
    VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
    ```

4.  Start the development server:
    ```bash
    npm run dev
    ```

## 📂 Project Structure

```text
lakshyak04-schedulr/
├── admin/          # Admin Dashboard (React + Vite)
│   ├── src/        # Components, Pages, Context
│   └── index.html  # Entry point
├── Backend/        # API Server
│   ├── config/     # DB & Cloudinary Config
│   ├── controllers/# Route Logic
│   ├── models/     # Mongoose Schemas
│   └── routes/     # API Endpoints
└── frontend/       # Patient App (React + Vite)
    ├── src/        # Assets, Components, Pages
    └── index.html  # Entry point
```

## 🔑 Usage

1.  **Admin Access:** Log in to the Admin Panel (`http://localhost:5174`) using the `ADMIN_EMAIL` and `ADMIN_PASSWORD` set in your Backend `.env` file.
2.  **Add Doctors:** Use the Admin Panel to add doctors. This will make them visible on the Frontend.
3.  **Book Appointment:** Open the Frontend (`http://localhost:5173`), create a patient account, and book an appointment with a doctor.