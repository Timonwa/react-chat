# Build a Real-time React Chat App with Firebase

This repository contains the updated demo project for building a real-time chat app with React and Firebase. You will learn how to set up Firebase Authentication, design a room-based Firestore data model, and build a modern chat UI with public and private rooms.

This is the code demo for the updated guide: [Build a Real-time React Chat App with Firebase)](https://tech.timonwa.com/blog). To access the original FreeCodeCamp tutorial, check out the [freecodecamp-original branch](https://github.com/Timonwa/react-chat/tree/freecodecamp-original).

Please give this repo a ⭐ if it was helpful to you.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [License](#license)
- [Additional Resources](#additional-resources)

## Features

- **Google authentication** with Firebase Auth
- **Public and private rooms** with shareable join codes
- **Room search and tabs** for public vs private rooms
- **Message timestamps** and avatars with fallbacks
- **Room-based Firestore schema** for cleaner data access
- **Monthly cleanup automation** to keep demo data fresh

## Technologies Used

- **[React](https://react.dev/)** – UI library
- **[Firebase](https://firebase.google.com/)** – Auth + Firestore
- **[React Firebase Hooks](https://github.com/CSFrequency/react-firebase-hooks)** – Auth state helpers
- **JavaScript** – ES2020+ syntax

## Prerequisites

- Node.js 18+ (or newer)
- A Firebase project with Authentication and Firestore enabled

## Getting Started

1. Clone the repository:

  ```bash
  git clone https://github.com/Timonwa/react-chat.git
  cd react-chat
  ```

1. Install dependencies:

  ```bash
  npm install
  ```

1. Create your environment file:

  ```bash
  cp .env.example .env
  ```

  Add your Firebase config values in `.env`.

1. Start the development server:

  ```bash
  npm start
  ```

## License

This project is licensed under the MIT License – see the [LICENSE](LICENSE.MD) file for details.

## Additional Resources

- 📝 [Updated 2026 Guide](https://tech.timonwa.com/blog)
- 📜 [Original FreeCodeCamp Tutorial (2023)](https://www.freecodecamp.org/news/building-a-real-time-chat-app-with-reactjs-and-firebase/)
- 🧩 [Legacy Code Branch](https://github.com/Timonwa/react-chat/tree/freecodecamp-original)
- 📚 [Firebase Documentation](https://firebase.google.com/docs)
