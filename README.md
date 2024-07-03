# 💬 smalltalk.eu

smalltalk.eu is a lightweight web application for chatting on a single channel. Built with ReactJS and Firebase/Firestore, this app leverages the power of modern web technologies to provide a simple and effective communication platform.

## 📋 Features

- 💻 **Single Channel Chat**: Engage in conversations in a single, shared chat channel.
- 🔥 **Firebase/Firestore Integration**: Real-time database updates for smooth, instant messaging.
- 🧑‍🏫 **Based on Fireship Tutorial**: Developed using best practices and techniques from Fireship tutorials.

## 🛠️ Technology Stack

- **ReactJS**: A JavaScript library for building user interfaces.
- **Firebase/Firestore**: A flexible, scalable database for real-time applications.

## 📦 Installation

1. **Clone the Repository**
    ```bash
    git clone https://github.com/yourusername/smalltalk.eu.git
    cd smalltalk.eu
    ```

2. **Install Dependencies**
    ```bash
    npm install
    ```

3. **Run the Application**
    ```bash
    npm start
    ```

## 🔧 Configuration

### Firebase Setup

1. **Create a Firebase Project**
   - Go to the [Firebase Console](https://console.firebase.google.com/).
   - Create a new project.

2. **Setup Firestore Database**
   - In your Firebase project, navigate to Firestore Database.
   - Create a new database and set the security rules as needed.

3. **Get Firebase Configuration**
   - In your Firebase project settings, find your Firebase configuration and copy it.

4. **Add Firebase Configuration to the App**
   - Create a `.env` file in the root directory of the project.
   - Add your Firebase configuration to the `.env` file:
     ```env
     REACT_APP_FIREBASE_API_KEY=your_api_key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
     REACT_APP_FIREBASE_PROJECT_ID=your_project_id
     REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
     REACT_APP_FIREBASE_APP_ID=your_app_id
     ```

## 🚀 Deployment

To deploy the app, you can use a variety of hosting services such as Firebase Hosting, Vercel, or Netlify.

### Firebase Hosting

1. **Install Firebase CLI**
    ```bash
    npm install -g firebase-tools
    ```

2. **Login to Firebase**
    ```bash
    firebase login
    ```

3. **Initialize Firebase in Your Project**
    ```bash
    firebase init
    ```

4. **Deploy to Firebase Hosting**
    ```bash
    npm run build
    firebase deploy
    ```
