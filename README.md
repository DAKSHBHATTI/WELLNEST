# WELLNEST: Your Personal AI-Powered Wellness Companion

![WELLNEST Dashboard](https://private-user-images.githubusercontent.com/165627814/457663856-c268609d-bfde-472b-abd9-d84d9893a023.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTA2MTA5NTUsIm5iZiI6MTc1MDYxMDY1NSwicGF0aCI6Ii8xNjU2Mjc4MTQvNDU3NjYzODU2LWMyNjg2MDlkLWJmZGUtNDcyYi1hYmQ5LWQ4NGQ5ODkzYTAyMy5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwNjIyJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDYyMlQxNjQ0MTVaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT01YTA0NzI2ZGVlOTRlZDc5YzlkNDc3NThhYzAxNjg1MGQ1NDRiNzA3ZDI1ZTM2YTFlZmJjYWMyYzdlODU5ODdlJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.lzcBKv-1PoEmtoXLf0D9jAgEoPC4TISWH6g5TyC4cvc) <!-- Replace with an actual screenshot URL -->

WELLNEST is a comprehensive full-stack web application designed to empower users to take control of their health and well-being. It combines essential health tracking tools with an intelligent AI assistant to provide personalized insights and support. With a sleek, modern, and responsive interface featuring both light and dark modes, WELLNEST offers a seamless user experience.

## ✨ Key Features

- **Secure User Authentication**: JWT-based authentication system for user registration and login, ensuring data privacy.
- **AI Health Diagnosis**: An intelligent chatbot that analyzes user-reported symptoms and provides potential health insights and recommendations.
- **Vitals Tracking**: Easily log and monitor key health metrics, including:
  - Blood Pressure
  - Blood Sugar Level
  - Heart Rate
  - Body Temperature
- **AI-Powered Vitals Analysis**: Receive instant, AI-generated analysis and health suggestions based on your vital readings.
- **Personal Journal**: A private space to log daily thoughts, feelings, and mood. Track your mental well-being over time.
- **Comprehensive History**: Access detailed history for both AI diagnoses and vital entries, allowing you to track your health journey.
- **Interactive Dashboard**: A central hub that provides a snapshot of your latest activities, a mood chart visualizing recent journal entries, and easy navigation to all features.
- **User Profile Management**: View and manage your account details.
- **Responsive Design with Dark Mode**: A beautiful, modern UI that works flawlessly on all devices and includes a user-toggleable light/dark theme.

## 🛠️ Technology Stack

This project is built with a modern MERN-based stack:

- **Frontend**:
  - **React**: A powerful JavaScript library for building user interfaces.
  - **Tailwind CSS**: A utility-first CSS framework for rapid, custom UI development.
  - **Recharts**: A composable charting library for visualizing data.
  - **Axios**: A promise-based HTTP client for making API requests.
  - **Lucide React**: A beautiful and consistent icon library.

- **Backend**:
  - **Node.js**: A JavaScript runtime for building fast and scalable server-side applications.
  - **Express.js**: A minimal and flexible Node.js web application framework.
  - **MongoDB**: A NoSQL database for storing application data.
  - **Mongoose**: An ODM library for MongoDB and Node.js, used for data modeling.
  - **JWT (JSON Web Tokens)**: For securing the API and managing user sessions.
  - **Google Gemini API**: Powers the AI for diagnosis and health analysis.

## 🚀 Getting Started

Follow these instructions to get a local copy of the project up and running.

### Prerequisites

- Node.js and npm (or yarn)
- MongoDB (local installation or a cloud service like MongoDB Atlas)

### Installation & Setup

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/DAKSHBHATTI/WELLNEST.git
    cd WELLNEST
    ```

2.  **Backend Setup**:
    ```bash
    cd wellnest-backend
    npm install
    ```
    - Create a `.env` file in the `wellnest-backend` directory.
    - Add the following environment variables:
      ```
      PORT=5000
      MONGO_URI=your_mongodb_connection_string
      JWT_SECRET=your_jwt_secret
      GEMINI_API_KEY=your_google_gemini_api_key
      ```

3.  **Frontend Setup**:
    ```bash
    cd ../frontend
    npm install
    ```

### Running the Application

1.  **Start the Backend Server**:
    - From the `wellnest-backend` directory:
    ```bash
    npm start
    ```
    - The server will be running on `http://localhost:5000`.

2.  **Start the Frontend Development Server**:
    - From the `frontend` directory:
    ```bash
    npm start
    ```
    - The application will open in your browser at `http://localhost:3000`.

## 🤝 Contributing

Contributions are welcome! If you have ideas for improvements or find any bugs, feel free to open an issue or submit a pull request.

---

*This project was built with the assistance of an AI coding partner.*
