# WELLNEST: Your Personal AI-Powered Wellness Companion

![WELLNEST Dashboard](https://github.com/DAKSHBHATTI/WELLNEST/issues/1#issue-3166092844) <!-- Replace with an actual screenshot URL -->

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
