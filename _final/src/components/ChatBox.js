import React, { useEffect, useMemo, useRef, useState } from "react";
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

const ChatBox = ({ activeRoom }) => {
  const [messages, setMessages] = useState([]);
  const scroll = useRef(null);

  const roomLabel = useMemo(() => {
    if (!activeRoom?.name) {
      return "Select a room";
    }
    return `${activeRoom.name}${activeRoom.isPrivate ? " · Private" : ""}`;
  }, [activeRoom]);

  useEffect(() => {
    if (!activeRoom?.id) {
      setMessages([]);
      return undefined;
    }

    const q = query(
      collection(db, "rooms", activeRoom.id, "messages"),
      orderBy("createdAt"),
      limit(100),
    );

    const unsubscribe = onSnapshot(q, snapshot => {
      const fetchedMessages = snapshot.docs.map(docSnapshot => ({
        ...docSnapshot.data(),
        id: docSnapshot.id,
      }));
      setMessages(fetchedMessages);
    });

    return () => unsubscribe();
  }, [activeRoom?.id]);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <main className="chat-box">
      <header className="chat-box__header">
        <div>
          <h2>{roomLabel}</h2>
          <p>Share updates and keep the conversation moving.</p>
        </div>
      </header>
      <div className="messages-wrapper">
        {messages.length ? (
          messages.map(message => (
            <Message key={message.id} message={message} />
          ))
        ) : (
          <div className="messages-empty">
            <p>No messages yet. Start the conversation.</p>
          </div>
        )}
        <span ref={scroll}></span>
      </div>
      <SendMessage scroll={scroll} roomId={activeRoom?.id} />
    </main>
  );
};

export default ChatBox;
