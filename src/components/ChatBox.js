import React, { useEffect, useMemo, useRef, useState } from "react";
import Message from "./Message";
import SendMessage from "./SendMessage";

const sampleMessages = {
  general: [
    {
      id: "m1",
      name: "Timonwa",
      text: "Welcome to React Chat!",
      createdAt: new Date(),
      isOwn: false,
    },
    {
      id: "m2",
      name: "You",
      text: "Excited to build this with Firebase.",
      createdAt: new Date(),
      isOwn: true,
    },
  ],
  "react-tips": [
    {
      id: "m3",
      name: "Timonwa",
      text: "Share your best hooks patterns.",
      createdAt: new Date(),
      isOwn: false,
    },
  ],
};

const ChatBox = ({ activeRoom }) => {
  const [messages, setMessages] = useState([]);
  const messagesRef = useRef(null);

  const roomLabel = useMemo(() => {
    if (!activeRoom?.name) {
      return "Select a room";
    }
    return `${activeRoom.name}${activeRoom.isPrivate ? " · Private" : ""}`;
  }, [activeRoom]);

  useEffect(() => {
    if (!activeRoom?.id) {
      setMessages([]);
      return;
    }

    setMessages(sampleMessages[activeRoom.id] || []);
  }, [activeRoom]);

  useEffect(() => {
    // Scroll the message list itself to the bottom — not the whole window.
    const el = messagesRef.current;
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = text => {
    const newMessage = {
      id: `m-${Date.now()}`,
      name: "You",
      text,
      createdAt: new Date(),
      isOwn: true,
    };
    setMessages(prev => [...prev, newMessage]);
  };

  return (
    <main className="chat-box">
      <header className="chat-box__header">
        <div>
          <h2>{roomLabel}</h2>
          <p>Share updates and keep the conversation moving.</p>
        </div>
      </header>
      <div className="messages-wrapper" ref={messagesRef}>
        {messages.length ? (
          messages.map(message => (
            <Message key={message.id} message={message} />
          ))
        ) : (
          <div className="messages-empty">
            <p>No messages yet. Start the conversation.</p>
          </div>
        )}
      </div>
      <SendMessage
        roomId={activeRoom?.id}
        onSend={handleSend}
      />
    </main>
  );
};

export default ChatBox;
