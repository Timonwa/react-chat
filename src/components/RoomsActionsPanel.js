import React, { useState } from "react";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";

const RoomsActionsPanel = ({ onSelectRoom }) => {
  const [user] = useAuthState(auth);
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

  const handleCreateRoom = async event => {
    event.preventDefault();
    const trimmed = roomName.trim();
    if (!trimmed) {
      return;
    }

    const joinCodeValue = isPrivate ? createJoinCode() : null;
    const joinCodeLower = joinCodeValue ? joinCodeValue.toLowerCase() : null;

    const newRoom = await addDoc(collection(db, "rooms"), {
      name: trimmed,
      isPrivate,
      joinCode: joinCodeValue,
      joinCodeLower,
      createdAt: serverTimestamp(),
      createdBy: user?.uid ?? "anonymous",
    });

    if (isPrivate && user) {
      await setDoc(doc(db, "memberships", `${newRoom.id}_${user.uid}`), {
        roomId: newRoom.id,
        uid: user.uid,
        joinedAt: serverTimestamp(),
      });
      setCreatedRoomCode({
        roomId: newRoom.id,
        name: trimmed,
        code: joinCodeValue,
      });
    }

    setRoomName("");
    setIsPrivate(false);
  };

  const handleJoinByCode = async event => {
    event.preventDefault();
    if (!user) {
      return;
    }

    const normalized = joinCode.trim().toLowerCase();
    if (!normalized) {
      return;
    }

    setJoinStatus(null);
    const roomQuery = query(
      collection(db, "rooms"),
      where("joinCodeLower", "==", normalized),
      limit(1),
    );
    const snapshot = await getDocs(roomQuery);

    if (snapshot.empty) {
      setJoinStatus({ type: "error", message: "No private room found." });
      return;
    }

    const roomDoc = snapshot.docs[0];
    const roomData = roomDoc.data();
    if (!roomData?.isPrivate) {
      setJoinStatus({
        type: "error",
        message: "Code is not for a private room.",
      });
      return;
    }

    await setDoc(doc(db, "memberships", `${roomDoc.id}_${user.uid}`), {
      roomId: roomDoc.id,
      uid: user.uid,
      joinedAt: serverTimestamp(),
    });

    setJoinStatus({ type: "success", message: "Joined private room." });
    setJoinCode("");
    onSelectRoom({
      id: roomDoc.id,
      name: roomData.name || "Private room",
      isPrivate: true,
    });
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
