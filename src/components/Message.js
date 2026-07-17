import React from "react";
import Avatar from "./Avatar";

const Message = ({ message }) => {
  const messageTime = message?.createdAt
    ? new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        month: "short",
        day: "numeric",
      }).format(new Date(message.createdAt))
    : "";

  return (
    <div className={`chat-bubble ${message.isOwn ? "right" : ""}`}>
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
          <time className="message-time" dateTime={new Date().toISOString()}>
            {messageTime}
          </time>
        ) : null}
      </div>
    </div>
  );
};

export default Message;
