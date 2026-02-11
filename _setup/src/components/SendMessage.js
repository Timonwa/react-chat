import React, { useState } from "react";

const SendMessage = ({ scroll, roomId, onSend }) => {
  const [message, setMessage] = useState("");

  const sendMessage = event => {
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
    onSend?.(trimmed);
    setMessage("");
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <form onSubmit={sendMessage} className="send-message">
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
