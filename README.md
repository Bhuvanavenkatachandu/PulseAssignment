# Pulse Video Assignment

A full-stack MERN application for uploading, processing, and streaming videos with intelligent Role-Based Access Control (RBAC) and real-time status updates.

## Live Demo

-   **Frontend (Netlify)**: [https://pulseassignment.netlify.app](https://pulseassignment.netlify.app)
-   **Backend (Render)**: [https://pulseassignment.onrender.com](https://pulseassignment.onrender.com)

---

## Success Criteria & Requirements

This project successfully implements all the following requirements and quality standards:

### Functional Requirements Met
- [x] **Complete video upload and storage system**: Supports large video files (up to 1GB) with validation.
- [x] **Real-time processing progress updates**: Live status bars powered by Socket.io.
- [x] **Video sensitivity analysis and classification**: Automated content classification (Safe/Flagged) simulation.
- [x] **Secure video streaming with range requests**: Optimized partial content delivery for smooth playback.
- [x] **Multi-tenant user isolation**: Private dashboards for Editors to manage their content.
- [x] **Role-based access control (RBAC)**: Strict permissions for Admins, Editors, and Viewers.

### Quality Standards Achieved
- [x] **Clean, maintainable code structure**: Modular architecture with separate routes, controllers, and services.
- [x] **Comprehensive documentation**: Detailed setup and usage guides.
- [x] **Secure authentication and authorisation**: JWT-based stateless auth with password hashing.
- [x] **Responsive and intuitive user interface**: Modern React UI with Tailwind-like styling.
- [x] **Proper error handling and user feedback**: Toast notifications and clear error messages.
- [x] **Public deployment**: Fully deployed and operational on cloud platforms.

---

## Key Features

### 1. Role-Based Access Control (RBAC)
-   **Admin**: Complete oversight. Can view all users and all videos (regardless of status or sensitivity).
-   **Editor**: Content creator. Can upload videos, track their processing status, and manage their own private library.
-   **Viewer**: End-user. Can only stream videos that have been processed and marked as **"Safe"**.

### 2. Intelligent Video Processing
-   **Real-time Simulation**: Upon upload, the server simulates a heavy processing task (transcoding/analysis).
-   **Sensitivity Analysis**: Videos are automatically classified as either **Safe** or **Flagged**. Flagged content is hidden from Viewers.
-   **Live Updates**: Users see a real-time progress bar (0-100%) without refreshing the page.

### 3. High-Performance Streaming
-   **HTTP Range Requests**: The backend supports partial content delivery (Status 206), allowing browsers to buffer and seek efficiently.

---

## Tech Stack

### Frontend
-   **Framework**: React (Vite)
-   **Routing**: React Router v6
-   **HTTP Client**: Axios (with Interceptors)
-   **Real-time**: Socket.io Client
-   **Styling**: CSS Modules / Modern CSS

### Backend
-   **Runtime**: Node.js
-   **Framework**: Express.js
-   **Database**: MongoDB (Mongoose ODM)
-   **Real-time**: Socket.io
-   **File Handling**: Multer & FS
-   **Security**: BCrypt, JWT, CORS

---

## Project Structure

```bash
PulseAssignment/
├── backend/
│   ├── config/         # Database configuration
│   ├── routes/         # API routes (Video handling logic included)
│   ├── middleware/     # Auth & Error handling
│   ├── models/         # Mongoose Schemas (User, Video)
│   ├── uploads/        # Local video storage directory
│   └── server.js       # Application entry point
└── frontend/
    ├── src/
    │   ├── components/ # Reusable UI components (ProtectedRoute, etc.)
    │   ├── context/    # AuthContext for global state
    │   ├── pages/      # Pages (Login, Dashboard, VideoPlayer)
    │   └── services/   # Centralized API service configuration
```

---

## Setup & Installation

### Prerequisites
- Node.js (v14+)
- MongoDB Connection String

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

### 3. Run Locally

**Start Backend:**
```bash
cd backend
npm run dev
```

**Start Frontend:**
```bash
cd frontend
npm run dev
```

The app will automatically detect if it's running locally/production.
- Local: Connects to `http://localhost:5001`
- Production: Connects to `https://pulseassignment.onrender.com`

---

## Usage Guide

1.  **Register**: Create an account.
    -   Select **Editor** to upload videos.
    -   Select **Viewer** to watch videos.
2.  **Upload (Editor)**: Go to Dashboard -> Upload Video.
3.  **Process**: Watch the progress bar.
4.  **Watch**: 
    -   **Editors** can watch their own videos immediately.
    -   **Viewers** can only watch videos once they are "Completed" and "Safe".

---

## Security Measures

-   **JWT Auth**: Stateless, secure token-based authentication.
-   **Password Encryption**: All passwords are hashed using BCrypt.
-   **Route Protection**: Backend middleware (`protect`, `authorize`) prevents unauthorized access to APIs.
-   **CORS Policy**: Configured to allow requests only from trusted frontend domains.

---

Made with love by Bhuvan Venkata Chandu
