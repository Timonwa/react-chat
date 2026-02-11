import React, { useState } from "react";

const RoomsActionsPanel = () => {
  const [roomName, setRoomName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [createdRoomCode, setCreatedRoomCode] = useState(null);
  const [joinCode, setJoinCode] = useState("");
  const [joinStatus, setJoinStatus] = useState(null);

  const createJoinCode = () => {
    const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
    const prefix = Math.random().toString(36).slice(2, 6).toUpperCase();
    return `${prefix}-${suffix}`;
  };

  const handleCreateRoom = event => {
    event.preventDefault();
    const trimmed = roomName.trim();
    if (!trimmed) {
      return;
    }

    if (isPrivate) {
      setCreatedRoomCode({ name: trimmed, code: createJoinCode() });
    } else {
      setCreatedRoomCode(null);
    }

    setRoomName("");
    setIsPrivate(false);
  };

  const handleJoinByCode = event => {
    event.preventDefault();
    if (!joinCode.trim()) {
      return;
    }

    setJoinStatus({ type: "success", message: "Room joined (demo)." });
    setJoinCode("");
  };

  return (
    <aside className="rooms-actions-panel">
      <div className="rooms-actions-panel__header">
        <h2>Create & Join</h2>
        <p>Start a new room or join an existing one.</p>
      </div>

      <form className="room-create" onSubmit={handleCreateRoom}>
        <label className="room-create__label" htmlFor="room-name">
          Room name
        </label>
        <input
          id="room-name"
          type="text"
          value={roomName}
          onChange={event => setRoomName(event.target.value)}
          placeholder="Design Sprint"
          maxLength={32}
        />
        <label className="room-create__toggle">
          <input
            type="checkbox"
            checked={isPrivate}
            onChange={event => setIsPrivate(event.target.checked)}
          />
          Private room
        </label>
        <button type="submit" className="room-create__button">
          Create room
        </button>
      </form>

      {createdRoomCode ? (
        <div className="room-code-panel">
          <p className="room-code-panel__title">Private room code</p>
          <div className="room-code-panel__code">
            <span>{createdRoomCode.name}</span>
            <code>{createdRoomCode.code}</code>
          </div>
          <p className="room-code-panel__hint">
            Share this code so others can join your room.
          </p>
        </div>
      ) : null}

      <form className="room-join" onSubmit={handleJoinByCode}>
        <label className="room-create__label" htmlFor="room-code">
          Join with code
        </label>
        <input
          id="room-code"
          type="text"
          value={joinCode}
          onChange={event => setJoinCode(event.target.value)}
          placeholder="AB12-CD34"
          maxLength={12}
        />
        <button type="submit" className="room-join__button">
          Join private room
        </button>
        {joinStatus ? (
          <p
            className={`room-join__status room-join__status--${joinStatus.type}`}>
            {joinStatus.message}
          </p>
        ) : null}
      </form>
    </aside>
  );
};

export default RoomsActionsPanel;
