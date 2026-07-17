import "./App.css";
import NavBar from "./components/NavBar";
import ChatBox from "./components/ChatBox";
import Welcome from "./components/Welcome";
import RoomsListPanel from "./components/RoomsListPanel";
import RoomsActionsPanel from "./components/RoomsActionsPanel";
import { useState } from "react";

function App() {
  const [user] = useState(false);
  const [activeRoom, setActiveRoom] = useState({
    id: "general",
    name: "General",
    isPrivate: false,
  });
  // Which side panel is open as a drawer on small screens: "rooms" | "actions" | null.
  const [openPanel, setOpenPanel] = useState(null);

  const handleSelectRoom = room => {
    setActiveRoom(room);
    setOpenPanel(null); // close the drawer after picking a room on mobile
  };

  return (
    <div className="App">
      <NavBar />
      {!user ? (
        <Welcome />
      ) : (
        <div className="app-shell">
          <div className="panel-toggles">
            <button
              type="button"
              className="panel-toggle"
              onClick={() => setOpenPanel("rooms")}>
              ☰ Rooms
            </button>
            <button
              type="button"
              className="panel-toggle"
              onClick={() => setOpenPanel("actions")}>
              + Create &amp; Join
            </button>
          </div>

          <RoomsListPanel
            activeRoomId={activeRoom.id}
            onSelectRoom={handleSelectRoom}
            isOpen={openPanel === "rooms"}
            onClose={() => setOpenPanel(null)}
          />
          <ChatBox activeRoom={activeRoom} />
          <RoomsActionsPanel
            onSelectRoom={handleSelectRoom}
            isOpen={openPanel === "actions"}
            onClose={() => setOpenPanel(null)}
          />

          {openPanel && (
            <div
              className="panel-overlay"
              onClick={() => setOpenPanel(null)}
              aria-hidden="true"
            />
          )}
        </div>
      )}
      <footer className="app-footer">
        Built by{" "}
        <a href="https://links.timonwa.com" target="_blank" rel="noreferrer">
          Timonwa
        </a>
      </footer>
    </div>
  );
}

export default App;
