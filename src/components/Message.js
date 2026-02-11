import React from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Avatar from "./Avatar";

const Message = ({ message }) => {
  const [user] = useAuthState(auth);
  const messageTime = message?.createdAt?.toDate
    ? new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        month: "short",
        day: "numeric",
      }).format(message.createdAt.toDate())
    : "";

  return (
    <div className={`chat-bubble ${message.uid === user?.uid ? "right" : ""}`}>
      <Avatar
        photoURL={message.avatar}
        name={message.name}
        size={38}
        className="chat-bubble__left"
      />
      <div className="chat-bubble__right">
        <p className="user-name">{message.name}</p>
        <p className="user-message">{message.text}</p>
        {messageTime ? (
          <time
            className="message-time"
            dateTime={message.createdAt.toDate().toISOString()}>
            {messageTime}
          </time>
        ) : null}
      </div>
    </div>
  );
};

export default Message;
