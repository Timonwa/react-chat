# Real-time React Chat App (Legacy FreeCodeCamp Version)

This repository contains the original demo project for the FreeCodeCamp tutorial: [How to Build a Real-time Chat App with React and Firebase](https://www.freecodecamp.org/news/building-a-real-time-chat-app-with-reactjs-and-firebase/).

If you are looking for the **updated 2026 version** of this project, visit the main branch and the refreshed guide on my blog: [React + Firebase Chat App (2026)](https://tech.timonwa.com/blog).

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
- **Real-time messaging** with Cloud Firestore
- **Simple chat UI** for the original tutorial walkthrough

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

1. Checkout the legacy branch:

  ```bash
  git checkout freecodecamp-original
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
- 📜 [Original FreeCodeCamp Tutorial](https://www.freecodecamp.org/news/building-a-real-time-chat-app-with-reactjs-and-firebase/)
- 🧩 [Legacy Code Branch](https://github.com/Timonwa/react-chat/tree/freecodecamp-original)
- 📚 [Firebase Documentation](https://firebase.google.com/docs)
