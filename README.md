# Create a Multi-Room Chat App Using React and Firebase

This repository contains the updated demo project for building a real-time chat app with React and Firebase. You will learn how to set up Firebase Authentication, design a room-based Firestore data model, and build a modern chat UI with public and private rooms.

> **📌 You're on the `setup` branch**
>
> This branch holds the **starter code** you follow along with in the tutorial — a static chat UI with placeholder sample data and **no Firebase wired up yet**. Work through the guide step by step to add Google authentication, the Firestore data model, and real-time messaging yourself:
>
> **👉 [Create a Multi-Room Chat App Using React and Firebase](https://tech.timonwa.com/blog/create-multi-room-chat-app-using-react-firebase)**
>
> Prefer to see the finished result first? The completed code lives on the [`main` branch](https://github.com/Timonwa/react-chat).

To access the original FreeCodeCamp tutorial, check out the [freecodecamp-original branch](https://github.com/Timonwa/react-chat/tree/freecodecamp-original).

Please give this repo a ⭐ if it was helpful to you.

## Table of Contents

- [What You'll Build](#what-youll-build)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Scripts \& Data Cleanup](#scripts--data-cleanup)
- [License](#license)
- [Additional Resources](#additional-resources)

## What You'll Build

By following the tutorial from this starter code, you'll add:

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

## Scripts & Data Cleanup

> **⚠️ This project ships with a script that deletes data.** It isn't part of the tutorial, but if you clone and host your own copy, this is why demo rooms and older messages may disappear over time.

The [`scripts/`](scripts/) folder holds a maintenance script that runs with the **Firebase Admin SDK** on a server (or a scheduled job) — it is separate from the browser app and needs admin credentials to run.

- [`scripts/firebaseAdmin.mjs`](scripts/firebaseAdmin.mjs) – initializes the Admin SDK. It reads a service account from the `FIREBASE_SERVICE_ACCOUNT` environment variable (falling back to Google's default application credentials).
- [`scripts/cleanup-monthly.mjs`](scripts/cleanup-monthly.mjs) – the actual cleanup routine, run via `npm run cleanup:monthly`.

### `npm run cleanup:monthly`

This is what keeps the public demo from growing forever (and running up Firestore costs). Each run:

- **Deletes every room and its messages**, _except_ the rooms you preserve.
- **Always keeps the `general` room**, but trims it to the **10 most recent messages**.
- Keeps any extra rooms listed in `PRESERVE_ROOM_IDS` (also trimmed to their latest 10 messages).

On the hosted demo it runs on a monthly schedule (e.g. a cron job or GitHub Action), so a fresh clone that reuses that setup will see rooms and old messages cleared periodically. **If you don't want this, simply don't run or schedule the script** — nothing in the app itself deletes data.

It's configured entirely through environment variables:

| Variable | Required | Default | Description |
| --- | --- | --- | --- |
| `FIREBASE_SERVICE_ACCOUNT` | Yes | – | Firebase service account JSON (as a string) used to authenticate the Admin SDK. |
| `PRESERVE_ROOM_IDS` | No | – | Comma-separated room IDs to keep in addition to `general`. |
| `PAGE_SIZE` | No | `400` | Number of documents deleted per batch. |

## License

This project is licensed under the MIT License – see the [LICENSE](LICENSE.MD) file for details.

## Additional Resources

- 📝 [Updated 2026 Guide](https://tech.timonwa.com/blog/create-multi-room-chat-app-using-react-firebase)
- 📜 [Original FreeCodeCamp Tutorial (2023)](https://www.freecodecamp.org/news/building-a-real-time-chat-app-with-reactjs-and-firebase/)
- 🧩 [Legacy Code Branch](https://github.com/Timonwa/react-chat/tree/freecodecamp-original)
- 📚 [Firebase Documentation](https://firebase.google.com/docs)
