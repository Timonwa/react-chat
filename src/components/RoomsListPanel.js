import React, { useMemo, useState } from "react";

const RoomsListPanel = ({ activeRoomId, onSelectRoom }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [memberRoomIds, setMemberRoomIds] = useState(["general"]);

  const rooms = useMemo(
    () => [
      { id: "general", name: "General", isPrivate: false },
      {
        id: "react-tips",
        name: "React Tips",
        isPrivate: true,
        joinCode: "0695-RJ9I",
      },
      {
        id: "firebase-chat",
        name: "Firebase Chat",
        isPrivate: true,
        joinCode: "P8IB-A98Z",
      },
      {
        id: "modern-ui",
        name: "Modern UI",
        isPrivate: true,
        joinCode: "64KN-6OXP",
      },
      { id: "frontend", name: "Frontend Lab", isPrivate: false },
    ],
    [],
  );

  const membershipSet = useMemo(() => new Set(memberRoomIds), [memberRoomIds]);

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

  const joinRoom = (roomId, event) => {
    event.stopPropagation();
    setMemberRoomIds(prev =>
      prev.includes(roomId) ? prev : [...prev, roomId],
    );
  };

  const leaveRoom = (roomId, event) => {
    event.stopPropagation();
    setMemberRoomIds(prev => prev.filter(id => id !== roomId));
    if (activeRoomId === roomId) {
      onSelectRoom({ id: "general", name: "General", isPrivate: false });
    }
  };

  return (
    <aside className="rooms-list-panel">
      <div className="rooms-list-panel__header">
        <h2>Rooms</h2>
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
