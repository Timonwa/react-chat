import React, { useState } from "react";
import { auth, db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const SendMessage = ({ roomId }) => {
  const [message, setMessage] = useState("");

  const sendMessage = async event => {
    event.preventDefault();
    const trimmed = message.trim();
    if (!trimmed) {
      alert("Enter valid message");
      return;
    }
    if (!roomId) {
      alert("Select a room to send messages");
      return;
    }
    const { uid, displayName, photoURL } = auth.currentUser;
    await addDoc(collection(db, "rooms", roomId, "messages"), {
      text: trimmed,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      uid,
    });
    setMessage("");
  };
  return (
    <form onSubmit={event => sendMessage(event)} className="send-message">
      <label htmlFor="messageInput" hidden>
        Enter Message
      </label>
      <input
        id="messageInput"
        name="messageInput"
        type="text"
        placeholder="type message..."
        value={message}
        onChange={e => setMessage(e.target.value)}
        maxLength={500}
        disabled={!roomId}
      />
      <button type="submit" disabled={!roomId}>
        Send
      </button>
    </form>
  );
};

export default SendMessage;
