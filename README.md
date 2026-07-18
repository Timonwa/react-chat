# Real-time React Chat App (Legacy freeCodeCamp Version)

The original 2023 demo project for the freeCodeCamp tutorial [How to Build a Real-time Chat App with React and Firebase](https://www.freecodecamp.org/news/building-a-real-time-chat-app-with-reactjs-and-firebase/). It's a single-room chat app with Google sign-in and real-time messaging.

> **🧩 You're on the `freecodecamp-original` branch — the legacy version**
>
> This is the original code, kept for readers of the 2023 tutorial. For the **updated multi-room version** — with public/private rooms, join codes, and a room-based Firestore schema — head to the [`main` branch](https://github.com/Timonwa/react-chat) and the refreshed guide:
>
> **👉 [Create a Multi-Room Chat App Using React and Firebase](https://tech.timonwa.com/blog/create-multi-room-chat-app-using-react-firebase)**
>
> ⭐ If this helped, please star the repo.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Author](#author)
- [License](#license)
- [Additional Resources](#additional-resources)

## Features

- **Google authentication** with Firebase Auth
- **Real-time messaging** in a single shared chat, backed by Cloud Firestore
- **User avatars and names** on each message
- **Auto-scroll** to the newest message

## Tech Stack

- **[React](https://react.dev/)** – UI library (Create React App)
- **[Firebase](https://firebase.google.com/)** – Authentication + Cloud Firestore
- **[React Firebase Hooks](https://github.com/CSFrequency/react-firebase-hooks)** – auth state helpers
- **JavaScript**

## Prerequisites

- Node.js 18+ (or newer)
- A [Firebase project](https://console.firebase.google.com/) with **Authentication** (Google provider) and **Cloud Firestore** enabled

## Getting Started

1. Clone the repository and switch to this branch:

   ```bash
   git clone https://github.com/Timonwa/react-chat.git
   cd react-chat
   git checkout freecodecamp-original
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create your environment file:

   ```bash
   cp .env.example .env
   ```

   Fill in your Firebase web app config. You'll find these values in the Firebase console under **Project settings → General → Your apps**.

   | Variable | Required | Description |
   | --- | --- | --- |
   | `REACT_APP_API_KEY` | Yes | Firebase web API key |
   | `REACT_APP_AUTH_DOMAIN` | Yes | Firebase auth domain |
   | `REACT_APP_PROJECT_ID` | Yes | Firebase project ID |
   | `REACT_APP_STORAGE_BUCKET` | Yes | Firebase storage bucket |
   | `REACT_APP_MESSAGING_SENDER_ID` | Yes | Firebase Cloud Messaging sender ID |
   | `REACT_APP_APP_ID` | Yes | Firebase app ID |
   | `REACT_APP_MEASUREMENT_ID` | No | Google Analytics measurement ID (optional) |

4. Start the development server:

   ```bash
   npm start
   ```

   The app runs at [http://localhost:3000](http://localhost:3000).

## Author

Built by **Timonwa Akintokun**.

- 📝 More tutorials on my blog: **[tech.timonwa.com/blog](https://tech.timonwa.com/blog)**
- 🔗 All my links & socials: **[links.timonwa.com](https://links.timonwa.com)**
- 💻 GitHub: **[@Timonwa](https://github.com/Timonwa)**

## License

This project is licensed under the MIT License – see the [LICENSE](LICENSE.MD) file for details.

## Additional Resources

- 📜 [Original freeCodeCamp Tutorial (2023)](https://www.freecodecamp.org/news/building-a-real-time-chat-app-with-reactjs-and-firebase/) — also [republished on my blog](https://tech.timonwa.com/blog/building-a-real-time-chat-app-with-reactjs-and-firebase)
- 📝 [Updated Multi-Room Version (2026)](https://tech.timonwa.com/blog/create-multi-room-chat-app-using-react-firebase)
- 📚 [More tutorials on my blog](https://tech.timonwa.com/blog)
- 🔗 [Connect with me](https://links.timonwa.com)
- 📖 [Firebase Documentation](https://firebase.google.com/docs)
