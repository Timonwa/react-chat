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
