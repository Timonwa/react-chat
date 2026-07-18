# Create a Multi-Room Chat App Using React and Firebase

A real-time chat app built with React and Firebase, featuring Google sign-in, public and private rooms with shareable join codes, and a room-based Firestore data model. This is the companion code for the tutorial — follow along to learn Firebase Authentication, Firestore real-time messaging, and how to structure chat data around rooms.

![The finished React Chat app: a Rooms panel with public/private tabs on the left, the General room with live messages and avatars in the middle, and a Create & Join panel on the right](public/01-final-app-look.png)

> **✅ This is the completed app**
>
> This branch holds the **finished code**, with Firebase Authentication, Firestore, and real-time messaging fully wired up. To build it yourself from scratch, start on the [`setup` branch](https://github.com/Timonwa/react-chat/tree/setup) and follow the step-by-step tutorial:
>
> **👉 [Create a Multi-Room Chat App Using React and Firebase](https://tech.timonwa.com/blog/create-multi-room-chat-app-using-react-firebase)**
>
> 🔗 Live demo: **[react-chat-timonwa.vercel.app](https://react-chat-timonwa.vercel.app/)**
>
> ⭐ If this helped, please star the repo — it helps others find it.

Prefer the original 2023 version? Read the [republished tutorial on my blog](https://tech.timonwa.com/blog/building-a-real-time-chat-app-with-reactjs-and-firebase) — originally published on [freeCodeCamp](https://www.freecodecamp.org/news/building-a-real-time-chat-app-with-reactjs-and-firebase/) — and check out the [`freecodecamp-original` branch](https://github.com/Timonwa/react-chat/tree/freecodecamp-original) for its code.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Scripts \& Data Cleanup](#scripts--data-cleanup)
- [Branch Guide](#branch-guide)
- [Author](#author)
- [License](#license)
- [Additional Resources](#additional-resources)

## Features

- **Google authentication** with Firebase Auth
- **Public and private rooms** with shareable join codes
- **Room search and tabs** for filtering public vs private rooms
- **Real-time messaging** with message timestamps and avatars (with fallbacks)
- **Responsive layout** — side panels collapse into drawers on small screens
- **Room-based Firestore schema** for cleaner, scalable data access
- **Monthly cleanup automation** to keep demo data fresh

## Tech Stack

- **[React](https://react.dev/)** – UI library (Create React App)
- **[Firebase](https://firebase.google.com/)** – Authentication + Cloud Firestore
- **[React Firebase Hooks](https://github.com/CSFrequency/react-firebase-hooks)** – auth state helpers
- **[Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)** – server-side data cleanup script
- **JavaScript** – ES2020+ syntax

## Prerequisites

- Node.js 18+ (or newer)
- A [Firebase project](https://console.firebase.google.com/) with **Authentication** (Google provider) and **Cloud Firestore** enabled

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/Timonwa/react-chat.git
   cd react-chat
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
   | `REACT_APP_AUTH_DOMAIN` | Yes | Firebase auth domain (`your_project_id.firebaseapp.com`) |
   | `REACT_APP_PROJECT_ID` | Yes | Firebase project ID |
   | `REACT_APP_STORAGE_BUCKET` | Yes | Firebase storage bucket |
   | `REACT_APP_MESSAGING_SENDER_ID` | Yes | Firebase Cloud Messaging sender ID |
   | `REACT_APP_APP_ID` | Yes | Firebase app ID |
   | `REACT_APP_MEASUREMENT_ID` | No | Google Analytics measurement ID (optional) |

4. Start the development server:

   ```bash
   npm start
   ```

   The app runs at [http://localhost:3000](http://localhost:3000). Or try the [live demo](https://react-chat-timonwa.vercel.app/).

## Scripts & Data Cleanup

The [`scripts/`](scripts/) folder holds an **optional** maintenance script that runs on a schedule to keep the hosted demo tidy. It isn't part of the tutorial and isn't needed to run the app — **nothing in the app itself deletes data.**

If you host your own copy and want the same auto-tidying (or you're just curious why demo rooms and old messages disappear over time), see [`scripts/README.md`](scripts/README.md) for what it does and how to run it.

## Branch Guide

| Branch | What it's for |
| --- | --- |
| `main` | The completed app — the finished code for the current tutorial. |
| `setup` | Starter code to follow along with; the UI is built but Firebase isn't wired up yet. |
| `freecodecamp-original` | The original 2023 freeCodeCamp version of the project. |

## Author

Built by **Timonwa Akintokun**.

- 📝 More tutorials on my blog: **[tech.timonwa.com/blog](https://tech.timonwa.com/blog)**
- 🔗 All my links & socials: **[links.timonwa.com](https://links.timonwa.com)**
- 💻 GitHub: **[@Timonwa](https://github.com/Timonwa)**

## License

This project is licensed under the MIT License – see the [LICENSE](LICENSE.MD) file for details.

## Additional Resources

- 📝 [Create a Multi-Room Chat App Using React and Firebase](https://tech.timonwa.com/blog/create-multi-room-chat-app-using-react-firebase) — the full tutorial
- 📜 [Original Tutorial (2023)](https://tech.timonwa.com/blog/building-a-real-time-chat-app-with-reactjs-and-firebase) – originally published on [freeCodeCamp](https://www.freecodecamp.org/news/building-a-real-time-chat-app-with-reactjs-and-firebase/)
- 🧩 [Legacy Code Branch](https://github.com/Timonwa/react-chat/tree/freecodecamp-original)
- 📚 [More tutorials on my blog](https://tech.timonwa.com/blog)
- 🔗 [Connect with me](https://links.timonwa.com)
- 📖 [Firebase Documentation](https://firebase.google.com/docs)
