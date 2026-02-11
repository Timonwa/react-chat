---
title: "How to Build a Real-time Chat App with React and Firebase"
description: "In this article, we will build a real-time chat app using React and Firebase. We will allow the user to log in with their google account using Firebase's Google sign-in Authentication, and we will store and retrieve all the chatroom messages using Firebase's Cloud Firestore."
heroImage: "https://res.cloudinary.com/timonwa-s-notes/image/upload/v1691843433/Cover%20Images/Publications/5_sjhaho.png"
publishDate: "2023-01-13T09:00:00.322Z"
category: "web-development"
tags:
  - "react"
  - "firebase"
  - "javascript"
  - "tutorial"
  - "frontend"
canonical_url: "https://www.freecodecamp.org/news/building-a-real-time-chat-app-with-reactjs-and-firebase/"
devto_url: null
medium_url: null
hashnode_url: null
---

import Verpex728x90Ad from "@common/Verpex728x90Ad.astro";
import ByeBye from "@common/ByeBye.astro";
import ConnectWithMe from "@common/ConnectWithMe.astro";
import LeaderBoardAd from "@common/LeaderBoardAd.astro";
import FaqCode from "@common/FaqCode.astro";
import FaqCodeBlock from "@common/FaqCodeBlock.astro";
import InfoCard from "@common/InfoCard.astro";
import NewsletterCTATwo from "@common/NewsletterCTATwo.astro";

In this article, we will build a real-time chat app using React and Firebase. We will allow the user to log in with their google account using Firebase's Google sign-in Authentication, and we will store and retrieve all the chatroom messages using Firebase's Cloud Firestore.

## Prerequisites

You should have node.js installed on your system, have intermediate knowledge of CSS, Javascript and React and know how to use the command terminal. You do not need to know how to use Firebase.

## What is Firebase

Firebase is a Backend-as-a-Service (Baas). It is a Google-backed app development platform that allows developers to build iOS, Android and web apps. It provides tools for tracking analytics, reporting and fixing app crashes, and creating marketing and product experiments which help developers develop quality apps, grow their user base, and earn profit. We will be using two of their tools: Firebase Authentication and Cloud Firestore.

**Firebase Authentication**: Firebase Authentication (SDK) supports different authentication methods like passwords, phone numbers, Google, Facebook, X(Twitter), Github, and more. In this app, we will be using Google sign-in Authentication.

**Cloud Firestore**: Cloud Firestore is a cloud-based NoSQL database server for storing and syncing data. It stores data in documents as key-value pairs, and the documents are organized into collections. The documents can also have subcollections, allowing to nest data. The data is also synchronized automatically among all devices listening for them.

Now that you have an idea of Firebase let's build our app.

**Note:** For this article's scope, I have already prewritten the CSS and prebuilt the components for the chat app. You can find the final project code on [GitHub](https://github.com/Timonwa/react-chat) and the CSS and components in the [setup folder](https://github.com/Timonwa/react-chat/tree/main/setup). You can also view the final project with this [live link](https://react-chat-timonwa.vercel.app/).

## Creating our React App

Run the codes, `npx create-react-app react-chat`, to create a new react app where `react-chat` is the name of the app and `npm install firebase react-firebase-hooks` to install **firebase** and **react-firebase-hooks**. Delete the current `src` folder and replace it with the one from the [setup folder](https://github.com/Timonwa/react-chat/tree/main/setup) to use the prewritten CSS and prebuilt components. (Optionally, you can write yours yourself.)

Our new `src` folder contains the following; a components folder with a `NavBar` component having the Google sign-in and Sign Out button, a `Welcome` component that will be visible to the user not signed in, a `Chatbox` component that will be visible only when the user is signed in, the `Message` component for displaying a user's message, and a `SendMessage` component so the user can input and send in their messages.

![snapshot of the new src folder](https://paper-attachments.dropboxusercontent.com/s_B6DDEC735898D3445BBF655B53FFE42B53361DCD6229DE6836CD5302F930DF9D_1667917866994_image2.png)

It also has an `img` folder where the `Google Sign-in` image for the Sign-in button is stored, an `App.css` file with the prewritten CSS codes, the new `App.js` file with all our components imported into it and the `index.js` file.

Run `npm start` to view the app in the browser. Our app should look like this:

![Visuals of the app in the browser](https://paper-attachments.dropboxusercontent.com/s_B6DDEC735898D3445BBF655B53FFE42B53361DCD6229DE6836CD5302F930DF9D_1667916861885_image1.png)

Now let's create a Firebase account and set up our Firebase project.

## Setting up the Firebase Project

If you do not have a [Firebase](https://firebase.google.com/) account already, you can open one using your Gmail (you can only use [google mail](https://mail.google.com/mail/)). On the landing page, click on **Get started** and then, **Add project**.

![](https://paper-attachments.dropboxusercontent.com/s_B6DDEC735898D3445BBF655B53FFE42B53361DCD6229DE6836CD5302F930DF9D_1667929969308_image3.png)

![](https://paper-attachments.dropboxusercontent.com/s_B6DDEC735898D3445BBF655B53FFE42B53361DCD6229DE6836CD5302F930DF9D_1667929996407_image4.png)

Fill out the **Create a project** form by providing a project name, and if you want Google Analytics enabled for your project, leave it enabled; otherwise, disable it. After that, click on **Create project**.

![](https://paper-attachments.dropboxusercontent.com/s_B6DDEC735898D3445BBF655B53FFE42B53361DCD6229DE6836CD5302F930DF9D_1667930368482_image5.png)

Once created, click on **Continue**.

![](https://paper-attachments.dropboxusercontent.com/s_B6DDEC735898D3445BBF655B53FFE42B53361DCD6229DE6836CD5302F930DF9D_1667930783189_image8.png)

Choose the type of app you want to add Firebase to; for this article scope, we chose the code icon because it is a web app.

![](https://paper-attachments.dropboxusercontent.com/s_B6DDEC735898D3445BBF655B53FFE42B53361DCD6229DE6836CD5302F930DF9D_1667931932857_image9.png)

Enter a nickname for your app and click on **Register app**.

![](https://paper-attachments.dropboxusercontent.com/s_B6DDEC735898D3445BBF655B53FFE42B53361DCD6229DE6836CD5302F930DF9D_1667934485512_image10.png)

Then select **npm,** copy the code snippet below, and click **Continue to console**. We will be using it later.

![](https://paper-attachments.dropboxusercontent.com/s_B6DDEC735898D3445BBF655B53FFE42B53361DCD6229DE6836CD5302F930DF9D_1667934988668_image11.png)

## Setting up Firebase Authentication

Go to the menu on the left side of the screen, click on **Build** and select **Authentication** from the dropdown.

![](https://paper-attachments.dropboxusercontent.com/s_B6DDEC735898D3445BBF655B53FFE42B53361DCD6229DE6836CD5302F930DF9D_1667937032772_image12.png)

Click on **Get started** and select **Google** in the **Sign-in method's** tab.

![](https://paper-attachments.dropboxusercontent.com/s_B6DDEC735898D3445BBF655B53FFE42B53361DCD6229DE6836CD5302F930DF9D_1667937105063_image13.png)

Enable **Google**, choose your **Project support email** and click **Save**.

![](https://paper-attachments.dropboxusercontent.com/s_B6DDEC735898D3445BBF655B53FFE42B53361DCD6229DE6836CD5302F930DF9D_1667937310260_image14.png)

Our Firebase project is set. Let's go back to our React app.

## Configuring Firebase in React

In our **src** folder, create a file called `firebase.js` and paste the code we had copied into it. Let's also import the `getAuth` and `getFirestore` services from Firebase's **auth** and **firestore** libraries, respectively and export them. You can learn more about Firebases' available libraries from their [documentation](https://firebase.google.com/docs/web/setup#available-libraries).

Our firebase.js config should look like this;

```
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: REACT_APP_API_KEY_GOES_HERE,
  authDomain: REACT_APP_AUTH_DOMAIN_GOES_HERE,
  projectId: REACT_APP_PROJECT_ID_GOES_HERE,
  storageBucket: REACT_APP_STORAGE_BUCKET_GOES_HERE,
  messagingSenderId: REACT_APP_MESSSAGING_SENDER_ID_GOES_HERE,
  appId: REACT_APP_APP_ID_GOES_HERE,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

## Implementing Firebase into our React app

### Authenticating users with their Google account

We want our users to have access to the chatroom and send messages if logged in. They should see the welcome page if they are not. They should also see the Sign Out button if logged in and the Google Sign-in button if not. This authentication will be handed within our NavBar component, which holds our sign-in and sign-out buttons.

In our `NavBar` component, we currently import our Google sign-in image and store it as a const called `GoogleSignin`. We also have a state called `user` set to false, a `googleSignIn` function which sets the user state to `true` and a `signOut` function which sets the user state to `false`.

We also have a `nav` element with an `h1` tag representing our app's title and two buttons rendered conditionally based on the user's state.

```jsx
import React, { useState } from "react";
import GoogleSignin from "../img/btn_google_signin_dark_pressed_web.png";

const NavBar = () => {
  const [user, setUser] = useState(false);
  const googleSignIn = () => {
    setUser(true);
  };
  const signOut = () => {
    setUser(false);
  };
  return (
    <nav className="nav-bar">
      <h1>React Chat</h1>
      {user ? (
        <button onClick={signOut} className="sign-out" type="button">
          Sign Out
        </button>
      ) : (
        <button className="sign-in">
          <img
            onClick={googleSignIn}
            src={GoogleSignin}
            alt="sign in with google"
            type="button"
          />
        </button>
      )}
    </nav>
  );
};
export default NavBar;
```

Let's make changes to the **NavBar** component. Import the following,

```jsx
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
```

replace the user state with the code below,

```jsx
const [user] = useAuthState(auth);
```

and edit the googleSignIn and signOut functions.

```jsx
const googleSignIn = () => {
  const provider = new GoogleAuthProvider();
  signInWithRedirect(auth, provider);
};
const signOut = () => {
  auth.signOut();
};
```

The `useAuthState` function gets triggered when the user signs in or signs out, allowing us access to the user's details. Currently, the user state is null, once they are logged in, the user state will change to the data provided by the authentication method, in this case, Google.

In the `googleSignIn` function, we let Firebase know that the user wants to sign in with Google using the `GoogleAuthProvider()`. It also redirects them to Google's sign-in page. After the user successfully signs in, their data is saved in `auth` and the user is redirected to our app. The `signOut` function clears the `auth` data returning it to null. The new user state also determines which authentication buttons are rendered to the user.

Let us also add authentication to our App.js file. Import the following,

```jsx
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
```

and add the new user state so we can use it to render the **Welcome** component if the user is not logged in or the **Chatbox** component if the user is logged in.

```jsx
const [user] = useAuthState(auth);
```

The final code looks like this,

```jsx
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./App.css";
import NavBar from "./components/NavBar";
import ChatBox from "./components/ChatBox";
import Welcome from "./components/Welcome";

function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <NavBar />
      {!user ? <Welcome /> : <ChatBox />}
    </div>
  );
}
export default App;
```

Testing our new sign-in and sign-out functions, we see the following

![video 1](https://res.cloudinary.com/timonwa-s-notes/image/upload/v1686483950/Article%20Images/freeCodeCamp/react-chat-app/video1_jlubsf.gif)

Now let us do the same for our **Welcome** Component, which currently has the following code.

```jsx
import React from "react";
import GoogleSignin from "../img/btn_google_signin_dark_pressed_web.png";

const Welcome = () => {
  const googleSignIn = () => {};

  return (
    <main className="welcome">
      <h2>Welcome to React Chat.</h2>
      <img src="/logo512.png" alt="React logo" width={50} height={50} />
      <p>Sign in with Google to chat with with your fellow React Developers.</p>
      <button className="sign-in">
        <img
          onClick={googleSignIn}
          src={GoogleSignin}
          alt="sign in with google"
          type="button"
        />
      </button>
    </main>
  );
};
export default Welcome;
```

We import the following

```jsx
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
```

and also edit the googleSignIn function

```jsx
const googleSignIn = () => {
  const provider = new GoogleAuthProvider();
  signInWithRedirect(auth, provider);
};
```

Now we can also log in from the second Sign in button

![video 2](https://res.cloudinary.com/timonwa-s-notes/image/upload/v1686483950/Article%20Images/freeCodeCamp/react-chat-app/video2_ciavjq.gif)

### Sending and storing messages in Firebase

Currently, we are displaying a dummy message from our `Message` Component, and the `Send` button also does not perform any action. We want that when the user inputs a message and hit the send button, the message is seen immediately in the chatroom. With our current `SendMessage` component having the code below, let us edit it.

```jsx
import React from "react";

const SendMessage = () => {
  return (
    <form className="send-message">
      <label htmlFor="messageInput" hidden>
        Enter Message
      </label>
      <input
        id="messageInput"
        name="messageInput"
        type="text"
        className="form-input__input"
        placeholder="type message..."
      />
      <button type="submit">Send</button>
    </form>
  );
};
export default SendMessage;
```

First, we import `useState` from React, `auth` and `db` from our firebase configuration file and `addDoc`, `collection` and `serverTimestamp` from the Firestore library.

```jsx
import React, { useState } from "react";
import { auth, db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
```

We create a state called `message` which is initially set to an empty string and passed as a value to the input tag. An onChange function is also added to the input, which sets the `message` state to whatever message the user types.

```jsx
const SendMessage = () => {
  const [message, setMessage] = useState("");

  return (
    <form className="send-message">
      <input value={message} onChange={e => setMessage(e.target.value)} />
      <button type="submit">Send</button>
    </form>
  );
};
```

We also create a function called `sendMessage`, add an `onSubmit` attribute to our form, which runs the `sendMessage` function when the user clicks on Send. Note that the button must have `type=submit` for the onSubmit attribute to work.

```jsx
const sendMessage = async event => {
  event.preventDefault();
  if (message.trim() === "") {
    alert("Enter valid message");
    return;
  }
  const { uid, displayName, photoURL } = auth.currentUser;
  await addDoc(collection(db, "messages"), {
    text: message,
    name: displayName,
    avatar: photoURL,
    createdAt: serverTimestamp(),
    uid,
  });
  setMessage("");
};
return (
  <form onSubmit={event => sendMessage(event)} className="send-message">
    ...
  </form>
);
```

The `sendMessage` function is an async function. It first checks if the user is trying to send an empty string or whitespace as a message and alerts the user. If the message is not an empty string, it gets the user's `uid`, `displayName`, and `photoURL` from the auth data provided when they log in, which corresponds to the user's unique id, full name, and photo URL, respectively.

Once that is done, it then uses the `addDoc()` to create a document inside the collection called `messages` in our database, which we have access to via the `db` import. If the collection doesn't exist yet, it will create it for us. It also creates key-value pairs, storing our message in text, displayName in name, storing the time the message was saved in our database in createdAt, and then the user's uid. These key-value pairs are what make up the data for our document. After this is done, it then resets the `message` state to an empty string.

### Retrieving messages from our database

After sending the user's message, we need to display it on the screen to the user. Going into our ChatBox component, we import the following

```jsx
import { useEffect, useRef, useState } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { db } from "../firebase";
```

We create a messages array to store all the messages we will retrieve

```jsx
const [messages, setMessages] = useState([]);
```

We create a `useEffect` hook that will run anytime changes are made in the chatroom, like sending or deleting of a message.

```jsx
useEffect(() => {
  const q = query(
    collection(db, "messages"),
    orderBy("createdAt", "desc"),
    limit(50)
  );
  const unsubscribe = onSnapshot(q, QuerySnapshot => {
    const fetchedMessages = [];
    QuerySnapshot.forEach(doc => {
      fetchedMessages.push({ ...doc.data(), id: doc.id });
    });
    const sortedMessages = fetchedMessages.sort(
      (a, b) => a.createdAt - b.createdAt
    );
    setMessages(sortedMessages);
  });
  return () => unsubscribe;
}, []);
```

In this `useEffect` hook, we have a const `q`, a firebase query that queries our database, looking for a **message collection**. It then orders the documents in the collection in decending order based on the `createdAt` key, and returns a maximum of **50** documents (messages saved).

The `unsubscribe` const represents the `onSnapshot` function, which has an empty array called messages. The `forEach` loop loops through all the documents from the collection and saves the data in the new array. It then sets the initial messages array to the new messages array.

We also use a map function on our messages array to render each message/document data in our Message component.

```jsx
{
  messages?.map(message => <Message key={message.id} message={message} />);
}
```

The final code looks like this

```jsx
import React, { useEffect, useRef, useState } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { db } from "../firebase";
import Message from "./Message";
import SendMessage from "./SendMessage";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const scroll = useRef();

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt", "desc"),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, QuerySnapshot => {
      const fetchedMessages = [];
      QuerySnapshot.forEach(doc => {
        fetchedMessages.push({ ...doc.data(), id: doc.id });
      });
      const sortedMessages = fetchedMessages.sort(
        (a, b) => a.createdAt - b.createdAt
      );
      setMessages(sortedMessages);
    });
    return () => unsubscribe;
  }, []);

  return (
    <main className="chat-box">
      <div className="messages-wrapper">
        {messages?.map(message => (
          <Message key={message.id} message={message} />
        ))}
      </div>
      {/* when a new message enters the chat, the screen scrolls down to the scroll div */}
      <span ref={scroll}></span>
      <SendMessage scroll={scroll} />
    </main>
  );
};

export default ChatBox;
```

Going into our `Message` component, let us render the data passed into it in our browser.

```jsx
import React from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
const Message = ({ message }) => {
  const [user] = useAuthState(auth);

  return (
    <div className={`chat-bubble ${message.uid === user.uid ? "right" : ""}`}>
      <img
        className="chat-bubble__left"
        src={message.avatar}
        alt="user avatar"
      />
      <div className="chat-bubble__right">
        <p className="user-name">{message.name}</p>
        <p className="user-message">{message.text}</p>
      </div>
    </div>
  );
};
export default Message;
```

We imported `auth` and `useAuthState`, and stored the user details in `user`. We deconstructed the messages prop and passed the avatar into the img src attribute, and replaced the dummy name and message with the one gotten from the message data.

We also conditioned a CSS style to take effect based on the `uid` of the message's author. So if the message's author uid is the same as the uid of the person logged in, then the CSS styles stored in the `right` property should be added to the div; otherwise, no new style should be added.

Currently, all messages are positioned to the left, so if the logged user is the message's author, his message should be positioned to the right. Let us view these changes in our browser.

![video 3](https://res.cloudinary.com/timonwa-s-notes/image/upload/v1686483950/Article%20Images/freeCodeCamp/react-chat-app/video3_brgyig.gif)

The message is sent and stored in our database, then all the messages are retrieved, and the chatroom is updated in real-time with the new messages. The name and avatar of the user are also present on the message card. But we can also notice that the chat doesn't scroll to the bottom when a new message enters. Let us fix that.

### Adding Scroll to the bottom

Going into our ChatBox.js, we import `useRef` hook and create a const called `scroll`

```jsx
import React, { useEffect, useRef, useState } from "react";
...
  const scroll = useRef();
```

We then create a span element with a `ref` attribute whose value is `scroll`, and also pass the scroll into our `Messages` component

```jsx
<main className="chat-box">
  ...
  {/* when a new message enters the chat, the screen scrolls dowwn to the scroll div */}
  <span ref={scroll}></span>
  <SendMessage scroll={scroll} />
</main>
```

We then go into the Messages component, access the scroll const and add `scroll.current.scrollIntoView({ behavior: "smooth" })` to the bottom of our sendMessage function. This code tells the browser to let the scroll span be in view in the browser after sending a message. That is why the span tag was placed at the bottom of all the messages.

```jsx
const SendMessage = ({ scroll }) => {

  const sendMessage = async (event) => {
    ...
    setMessage("");
    scroll.current.scrollIntoView({ behavior: "smooth" });
  };
  ...
};
```

Going back to the browser, we should see the chat scroll to the bottom when the user sends in a new message.

![video 4](https://res.cloudinary.com/timonwa-s-notes/image/upload/v1686483952/Article%20Images/freeCodeCamp/react-chat-app/video4_iukbxq.gif)

### Add Authorized Domains

When deploying our React app, it's essential to add our domain to the list of authorized domains in Firebase. This step ensures that our app communicates with the Firebase services correctly. Here's how you can do it:

In the Firebase console, navigate to the **Authentication** section from the left sidebar and click on the **Settings** tab. Scroll down to the **Authorized domains** section, then click on the **Add domain** button. Add the domain or domains that your React app will be deployed on. For example, if you are deploying your app to <https://my-react-chat-app.com>, enter my-react-chat-app.com as an authorized domain. Click the **Add** button to apply the changes.

![](https://res.cloudinary.com/timonwa-s-notes/image/upload/v1686503300/Article%20Images/freeCodeCamp/react-chat-app/FireShot_Capture_002_-_react-chat_-_Authentication_-_Firebase_console_-_console.firebase.google.com_yhkjop.png)

By adding your app's domain to the authorized domains list, you grant permission for Firebase services to be accessed from that domain. Without adding the domain, you may encounter errors when trying to establish connections or perform operations with Firebase.

And that's it on building a real-time chat app. We learnt how to use Firebase and React together to build a real-time chat app. We also authenticated the users using Firebase Authentication's Google sign-in method and stored the chat room messages in a database using Cloud Firestore. We also learnt how to use some of Firebase's services and libraries.

The code for this project can be found on [GitHub](https://github.com/Timonwa/react-chat), and you can explore the chat room using this [live link](https://react-chat-timonwa.vercel.app/).

<ConnectWithMe />
