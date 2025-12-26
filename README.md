# Video Processing App 🎥

A full-stack MERN application for uploading, processing, and streaming videos with Role-Based Access Control (RBAC).

## 🚀 Features

-   **User Authentication**: JWT-based secure login and registration.
-   **Role-Based Access Control (RBAC)**:
    -   **Viewer**: Can watch processed "Safe" videos.
    -   **Editor**: Can upload and manage their own private videos.
    -   **Admin**: distinct dashboard to manage all videos and users.
-   **Video Upload**: Supports MP4, MKV, WebM formats (up to 1GB).
-   **Real-time Progress**: Socket.io powered upload and processing status bars.
-   **Video Processing Simulation**: Mock sensitivity analysis (Safe/Flagged) engine.
-   **Secure Streaming**: HTTP Range requests for optimal video playback and seeking.
-   **Responsive UI**: Clean React interface built with Vite.

## 🛠 Tech Stack

-   **Frontend**: React, Vite, React Router, Socket.io Client, Axios.
-   **Backend**: Node.js, Express, MongoDB (Mongoose), Socket.io, Multer.
-   **Database**: MongoDB Atlas.

## 📂 Project Structure

```
PulseAssignment/
├── backend/
│   ├── config/         # DB configuration
│   ├── controllers/    # Route logic (if separated)
│   ├── middleware/     # Auth & Error handling
│   ├── models/         # Mongoose Schemas (User, Video)
│   ├── routes/         # API Routes
│   ├── uploads/        # Video storage
│   └── server.js       # Entry point
└── frontend/
    ├── src/
    │   ├── components/ # Reusable UI components
    │   ├── context/    # Auth Global State
    │   ├── pages/      # Application Pages
    │   └── services/   # API configuration
```

## ⚙️ Setup & Installation

### Prerequisites
- Node.js (v14+)
- MongoDB URI

### 1. Clone & Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### 2. Environment Configuration

Create a `.env` file in the `backend/` directory:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5001
```

### 3. Run the Application

**Start Backend (Port 5001):**
```bash
cd backend
npm run dev
```

**Start Frontend (Port 5174):**
```bash
cd frontend
npm run dev
```

Visit `http://localhost:5174` to view the app.

## 🧪 Usage Guide

1.  **Register**: Create an account. Choose **Editor** role to upload videos.
2.  **Upload**: Go to the Dashboard, click "Upload Video", and select a file.
3.  **Process**: Watch the real-time progress bar as the video "processes".
4.  **Watch**: Once completed (and if marked "Safe"), click "Watch Video" to stream.

## 🔒 Security Measures

-   **JWT Auth**: Stateless authentication for API endpoints.
-   **Password Hashing**: Bcrypt for secure password storage.
-   **Route Protection**: Middleware ensures only authorized roles access specific endpoints.
-   **Input Validation**: File type and size limits on uploads.

## 🌐 Deployment

-   **Frontend**: Ready for Vercel/Netlify deployment.
-   **Backend**: Ready for Heroku/Render deployment.
-   **Storage**: Currently uses local disk storage. For production, integrate AWS S3.
