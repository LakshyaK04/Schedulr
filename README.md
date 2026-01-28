# Schedulr - Doctor Appointment Booking System

Schedulr is a comprehensive full-stack web application designed to simplify doctor appointment booking. It bridges the gap between patients and healthcare providers through three integrated interfaces: a patient-facing frontend, a doctor's dashboard, and an administrative panel.

## 🚀 Features

### 🏥 Patient Frontend
* **Browse & Filter:** Search for doctors by specialty (General Physician, Gynecologist, Dermatologist, etc.).
* **Book Appointments:** Real-time slot availability checks and booking.
* **User Profiles:** Manage personal details and profile pictures.
* **Payments:** Secure payment integration via **Razorpay**.
* **History:** Track appointment status (Pending, Completed, Cancelled).

### 👨‍⚕️ Doctor Dashboard
* **Analytics:** View earnings, patient count, and appointment statistics.
* **Schedule Management:** Mark appointments as completed or cancelled.
* **Profile Control:** Update availability status, consultation fees, and practice address.

### 🛡️ Admin Panel
* **Doctor Management:** Add new doctors with images, qualifications, and experience.
* **System Oversight:** View global statistics and manage all users and appointments.

## 🛠️ Tech Stack

### Frontend & Admin
* **Framework:** [React](https://react.dev/) + [Vite](https://vitejs.dev/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **State Management:** React Context API
* **Routing:** React Router DOM

### Backend
* **Runtime:** [Node.js](https://nodejs.org/)
* **Framework:** [Express.js](https://expressjs.com/)
* **Database:** [MongoDB](https://www.mongodb.com/) + Mongoose
* **Authentication:** JWT (JSON Web Tokens)
* **Image Storage:** Cloudinary
* **Payments:** Razorpay

---

## ⚙️ Installation & Setup

Prerequisites: Ensure **Node.js** and **MongoDB** are installed on your machine.

### 1. Backend Setup

The backend runs on Port `4000` by default.

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

The admin panel runs on Port `5174`.

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

The user-facing application runs on Port `5173`.

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
