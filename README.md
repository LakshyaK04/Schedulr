🩺 Schedulr – Doctor Appointment Scheduling Platform

Schedulr is a full-stack doctor appointment management system that enables patients to book appointments, doctors to manage schedules, and administrators to control the entire platform.
It is built using the MERN stack with a modern React + Vite frontend and a scalable Node.js backend.

🚀 Features
👨‍⚕️ Admin Panel

Secure admin authentication

Add and manage doctors

Control doctor availability

View all appointments

Cancel appointments

Dashboard analytics (doctors, patients, bookings)

🧑‍⚕️ Doctor Panel

Secure doctor login

View assigned appointments

Mark appointments as completed or cancelled

Manage profile (fees, availability, address)

Earnings and appointment statistics

👤 User (Patient) Side

User registration & login

Browse doctors by speciality

Book appointments

View and manage personal appointments

Online / offline payment handling

🛠️ Tech Stack
Frontend

React (Vite)

Tailwind CSS

React Router

Axios

React Toastify

Backend

Node.js

Express.js

MongoDB (Mongoose)

JWT Authentication

Multer + Cloudinary (Image Uploads)

Razorpay (Payments)

📁 Project Structure
lakshyak04-schedulr/
│
├── Backend/              # Node.js + Express backend
│   ├── config/           # DB & Cloudinary configs
│   ├── controllers/      # Business logic
│   ├── middlewares/      # Auth & upload middlewares
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API routes
│   └── server.js         # Entry point
│
├── frontend/             # Patient-facing React app
│   └── src/
│
├── admin/                # Admin & Doctor dashboard
│   └── src/
│
└── README.md

🔐 Authentication & Security

JWT-based authentication for Admin, Doctor, and User

Role-based access control using middleware

Secure password hashing with bcrypt

Protected routes on both frontend and backend

▶️ Running the Project Locally
1️⃣ Backend
cd Backend
npm install
npm run server

2️⃣ Frontend (User)
cd frontend
npm install
npm run dev

3️⃣ Admin Panel
cd admin
npm install
npm run dev

📊 Dashboards

Admin Dashboard: Platform-wide analytics & controls

Doctor Dashboard: Earnings, appointments & patient tracking

🧠 Learning Outcomes

This project demonstrates:

Real-world MERN architecture

Role-based authentication

File uploads with Cloudinary

Appointment scheduling logic

Clean separation of concerns

Scalable folder structure

📌 Future Improvements

Email & SMS notifications

Calendar integration

Advanced appointment filtering

Role-based analytics

Deployment with Docker