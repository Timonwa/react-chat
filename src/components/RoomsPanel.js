import React, { useEffect, useMemo, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";

const RoomsPanel = ({ activeRoomId, onSelectRoom }) => {
  const [user] = useAuthState(auth);
  const [rooms, setRooms] = useState([]);
  const [memberships, setMemberships] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  useEffect(() => {
    const roomsQuery = query(collection(db, "rooms"), orderBy("createdAt"));
    const unsubscribe = onSnapshot(roomsQuery, snapshot => {
      const nextRooms = snapshot.docs.map(room => ({
        id: room.id,
        ...room.data(),
      }));
      setRooms(nextRooms);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) {
      setMemberships([]);
      return undefined;
    }

    const membershipQuery = query(
      collection(db, "memberships"),
      where("uid", "==", user.uid),
    );

    const unsubscribe = onSnapshot(membershipQuery, snapshot => {
      const nextMemberships = snapshot.docs.map(membership => ({
        id: membership.id,
        ...membership.data(),
      }));
      setMemberships(nextMemberships);
    });

    return () => unsubscribe();
  }, [user]);

  const membershipSet = useMemo(
    () => new Set(memberships.map(membership => membership.roomId)),
    [memberships],
  );

  const visibleRooms = useMemo(
    () => rooms.filter(room => !room.isPrivate || membershipSet.has(room.id)),
    [rooms, membershipSet],
  );

  const handleCreateRoom = async event => {
    event.preventDefault();
    const trimmed = roomName.trim();
    if (!trimmed) {
      return;
    }

    const newRoom = await addDoc(collection(db, "rooms"), {
      name: trimmed,
      isPrivate,
      createdAt: serverTimestamp(),
      createdBy: user?.uid ?? "anonymous",
    });

    if (isPrivate && user) {
      await setDoc(doc(db, "memberships", `${newRoom.id}_${user.uid}`), {
        roomId: newRoom.id,
        uid: user.uid,
        joinedAt: serverTimestamp(),
      });
    }

    setRoomName("");
    setIsPrivate(false);
  };

  const joinRoom = async (roomId, event) => {
    event.stopPropagation();
    if (!user) {
      return;
    }

    await setDoc(doc(db, "memberships", `${roomId}_${user.uid}`), {
      roomId,
      uid: user.uid,
      joinedAt: serverTimestamp(),
    });
  };

  const leaveRoom = async (roomId, event) => {
    event.stopPropagation();
    if (!user) {
      return;
    }

    await deleteDoc(doc(db, "memberships", `${roomId}_${user.uid}`));

    if (activeRoomId === roomId) {
      onSelectRoom({ id: "general", name: "General", isPrivate: false });
    }
  };

  return (
    <aside className="rooms-panel">
      <div className="rooms-panel__header">
        <h2>Rooms</h2>
        <p>Create a public hangout or a private chat.</p>
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

      <div className="rooms-list">
        {visibleRooms.map(room => {
          const isMember = membershipSet.has(room.id);
          const isActive = room.id === activeRoomId;
          return (
            <button
              key={room.id}
              type="button"
              className={`room-card ${isActive ? "room-card--active" : ""}`}
              onClick={() => onSelectRoom(room)}>
              <div>
                <p className="room-card__name">{room.name}</p>
                <span className="room-card__meta">
                  {room.isPrivate ? "Private" : "Public"}
                </span>
              </div>
              {room.isPrivate ? (
                isMember ? (
                  <span
                    className="room-card__action"
                    onClick={event => leaveRoom(room.id, event)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={event =>
                      event.key === "Enter" && leaveRoom(room.id, event)
                    }>
                    Leave
                  </span>
                ) : (
                  <span
                    className="room-card__action"
                    onClick={event => joinRoom(room.id, event)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={event =>
                      event.key === "Enter" && joinRoom(room.id, event)
                    }>
                    Join
                  </span>
                )
              ) : null}
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export default RoomsPanel;
