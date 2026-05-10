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

  return (
    <div className="App">
      <NavBar />
      {!user ? (
        <Welcome />
      ) : (
        <div className="app-shell">
          <RoomsListPanel
            activeRoomId={activeRoom.id}
            onSelectRoom={setActiveRoom}
          />
          <ChatBox activeRoom={activeRoom} />
          <RoomsActionsPanel onSelectRoom={setActiveRoom} />
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
