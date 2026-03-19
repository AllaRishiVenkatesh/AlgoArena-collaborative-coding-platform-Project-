# AlgoArena

**Real-Time Collaborative Coding Platform**

AlgoArena is a premium collaborative integrated development environment (IDE) designed for developers to solve algorithmic challenges, share coding sessions, and improve engineering skills in real-time.

## Overview

The platform enables multiple users to join in a shared coding room and edit a code simultaneously with sub-millisecond latency. It features a built-in compiler accessing remote execution engines, facilitating instant feedback for JavaScript, Python, C++, and Java.

The architecture emphasizes performance and scalability, utilizing WebSockets for state synchronization and a microservices-ready backend structure.

## Key Features

### Collaborative Engine
*   **Real-time Synchronization**: Concurrent editing with conflict resolution.
*   **Presence Management**: Active user tracking and status updates.
*   **Multi-language Support**: Seamless switching between supported runtime environments.

### Execution Environment
*   **Remote Compilation**: code execution via Piston API integration.
*   **Output Streaming**: Instant standard output and error stream capture.
*   **Security Sandboxing**: Code runs in isolated containers.

### User Interface
*   **Modern Design System**: Built with Tailwind CSS focusing on usability and aesthetics.
*   **Interactive Visuals**: Neural graph particle system for immersive background effects.
*   **Responsive Layout**: Optimized for desktop and high-resolution displays.

## Technology Stack

**Frontend**
*   **Framework**: React 18
*   **Styling**: Tailwind CSS, Framer Motion
*   **Editor**: CodeMirror 6
*   **State**: React Hooks, Context API
*   **Network**: Socket.io Client, Axios

**Backend**
*   **Runtime**: Node.js, Express.js
*   **Database**: MongoDB, Mongoose
*   **Real-time**: Socket.io
*   **Auth**: JWT (JSON Web Tokens)
*   **Validation**: Zod

## Installation

### Prerequisites
*   Node.js (v16 or higher)
*   MongoDB Instance (Local or Atlas)
*   Git

### Setup Instructions

1.  **Clone the Repository**

    ```bash
    git clone https://github.com/AllaRishiVenkatesh/Algo-Arena-collaborative-coding-platform-Project-.git
    cd Algo-Arena-collaborative-coding-platform-Project-
    ```

2.  **Backend Configuration**

    Navigate to the backend directory and install dependencies:

    ```bash
    cd backend
    npm install
    ```

    Create a `.env` file in the `backend` directory:

    ```env
    MONGODB_URL=your_mongodb_connection_string
    JWT_SECRET=your_secure_secret_key
    PORT=3000
    ```

    Start the server:

    ```bash
    npm start
    ```

3.  **Frontend Configuration**

    Open a new terminal, navigate to the frontend directory, and install dependencies:

    ```bash
    cd frontend
    npm install
    ```

    Create a `.env` file in the `frontend` directory:

    ```env
    VITE_BACKEND_URL=http://localhost:3000
    ```

    Start the development server:

    ```bash
    npm run dev
    ```

4.  **Access the Application**

    Open your browser and visit: `http://localhost:5173`

## Usage Guide

1.  **Registration**: Creating a new account serves as your persistent identity.
2.  **Room Creation**: Generate a unique Room ID from the dashboard to initialize a new session.
3.  **Joining**: Peers can enter the provided Room ID to join the session immediately.
4.  **Coding**: Use the editor to write solution. Changes are broadcast to all room participants instantly.
5.  **Execution**: Press the "Run" button to compile and execute source code against the selected language runtime.

## API Documentation

### Authentication Endpoints

*   `POST /api/auth/signup`: Register a new user.
*   `POST /api/auth/signin`: Authenticate existing user.
*   `GET /api/auth/profile/:username`: Retrieve user profile data.

### Room Endpoints

*   `POST /api/rooms/`: Initialize a new coding room.
*   `GET /api/rooms/:roomId`: Validate and retrieve room metadata.
*   `GET /api/rooms/get-code/:roomId`: Fetch current editor state.
*   `PUT /api/rooms/update-code/:roomId`: Persist editor state changes.

## License

This project is licensed under the MIT License.

## Author

**Alla Rishi Venkatesh**
*   GitHub: [AllaRishiVenkatesh](https://github.com/AllaRishiVenkatesh)
