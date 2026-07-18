# Maintenance Scripts

Server-side scripts for keeping the hosted demo tidy. These are **not part of the tutorial** and are **not needed to run the chat app** — they exist only to stop the public [live demo](https://react-chat-timonwa.vercel.app/) from growing forever (and running up Firestore costs).

They run with the **Firebase Admin SDK** on a server or a scheduled job, separate from the browser app, and require admin credentials.

## What's here

| File | What it does |
| --- | --- |
| [`firebaseAdmin.mjs`](firebaseAdmin.mjs) | Initializes the Firebase Admin SDK. Reads a service account from the `FIREBASE_SERVICE_ACCOUNT` env var, falling back to Google's [application default credentials](https://cloud.google.com/docs/authentication/application-default-credentials) if it isn't set. |
| [`cleanup-monthly.mjs`](cleanup-monthly.mjs) | The cleanup routine. Deletes old rooms and trims messages (details below). |

## What `cleanup-monthly.mjs` does

Run via `npm run cleanup:monthly` from the project root. Each run:

- **Deletes every room and all of its messages**, _except_ the rooms you preserve.
- **Always keeps the `general` room**, but trims it to the **50 most recent messages**.
- Keeps any extra rooms listed in `PRESERVE_ROOM_IDS` (also trimmed to their latest 50 messages).
- Deletes documents in batches of `PAGE_SIZE` (default 400) to stay within Firestore limits.

It prints a summary when it finishes, e.g. `Cleanup complete. Deleted rooms: 3. Deleted messages: 128.`

## Configuration

Everything is configured through environment variables:

| Variable | Required | Default | Description |
| --- | --- | --- | --- |
| `FIREBASE_SERVICE_ACCOUNT` | Yes | – | Firebase service account JSON, as a single-line string. Used to authenticate the Admin SDK. |
| `PRESERVE_ROOM_IDS` | No | – | Comma-separated room IDs to keep in addition to `general`. |
| `PAGE_SIZE` | No | `400` | Number of documents deleted per batch. |

Get a service account from the Firebase console: **Project settings → Service accounts → Generate new private key**. Treat this file as a secret — never commit it.

## Running it yourself (cloned copies)

You only need this if you host your own copy of the demo and want the same auto-tidying behavior. It's completely optional — **nothing in the app itself deletes data**, so if you skip these scripts your rooms and messages stay put.

To run a cleanup once, from the project root:

```bash
# macOS / Linux — pass the service account JSON inline
FIREBASE_SERVICE_ACCOUNT="$(cat path/to/serviceAccount.json)" \
PRESERVE_ROOM_IDS="roomIdOne,roomIdTwo" \
npm run cleanup:monthly
```

> **⚠️ This permanently deletes Firestore data.** Test against a throwaway Firebase project first, and double-check `PRESERVE_ROOM_IDS` before running against anything you care about.

## Running it on a schedule

The hosted demo runs this monthly via a GitHub Actions workflow: [`.github/workflows/monthly-cleanup.yml`](../.github/workflows/monthly-cleanup.yml). To reuse it in your own fork:

1. Add your service account JSON as a repository secret named `FIREBASE_SERVICE_ACCOUNT` (**Settings → Secrets and variables → Actions**).
2. Adjust the `PRESERVE_ROOM_IDS` list and the `cron` schedule in the workflow to taste.

You can also trigger it manually from the **Actions** tab (the workflow enables `workflow_dispatch`).
