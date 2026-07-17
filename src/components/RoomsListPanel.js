import React, { useEffect, useMemo, useState } from "react";
import {
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

const RoomsListPanel = ({ activeRoomId, onSelectRoom, isOpen, onClose }) => {
  const [user] = useAuthState(auth);
  const [rooms, setRooms] = useState([]);
  const [memberships, setMemberships] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

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

  const filteredRooms = useMemo(() => {
    let filtered = rooms.filter(
      room => !room.isPrivate || membershipSet.has(room.id),
    );

    if (activeTab === "public") {
      filtered = filtered.filter(room => !room.isPrivate);
    } else if (activeTab === "private") {
      filtered = filtered.filter(room => room.isPrivate);
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        room =>
          room.name.toLowerCase().includes(term) ||
          (room.joinCode && room.joinCode.toLowerCase().includes(term)),
      );
    }

    return filtered;
  }, [rooms, membershipSet, activeTab, searchTerm]);

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
    <aside className={`rooms-list-panel ${isOpen ? "panel--open" : ""}`}>
      <div className="rooms-list-panel__header">
        <div className="panel-title-row">
          <h2>Rooms</h2>
          <button
            type="button"
            className="panel-close"
            onClick={onClose}
            aria-label="Close rooms panel">
            ✕
          </button>
        </div>
        <div className="rooms-tabs">
          <button
            className={`rooms-tab ${activeTab === "all" ? "rooms-tab--active" : ""}`}
            onClick={() => setActiveTab("all")}>
            All
          </button>
          <button
            className={`rooms-tab ${activeTab === "public" ? "rooms-tab--active" : ""}`}
            onClick={() => setActiveTab("public")}>
            Public
          </button>
          <button
            className={`rooms-tab ${activeTab === "private" ? "rooms-tab--active" : ""}`}
            onClick={() => setActiveTab("private")}>
            Private
          </button>
        </div>
      </div>

      <div className="rooms-search">
        <input
          type="text"
          placeholder="Search rooms..."
          value={searchTerm}
          onChange={event => setSearchTerm(event.target.value)}
        />
      </div>

      <div className="rooms-list">
        {filteredRooms.map(room => {
          const isMember = membershipSet.has(room.id);
          const isActive = room.id === activeRoomId;
          return (
            <button
              key={room.id}
              type="button"
              className={`room-card ${isActive ? "room-card--active" : ""}`}
              onClick={() => onSelectRoom(room)}>
              <div className="room-card__content">
                <p className="room-card__name">{room.name}</p>
                <div className="room-card__meta">
                  <span>{room.isPrivate ? "Private" : "Public"}</span>
                  {room.isPrivate && room.joinCode && (
                    <code className="room-card__code">{room.joinCode}</code>
                  )}
                </div>
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

export default RoomsListPanel;
