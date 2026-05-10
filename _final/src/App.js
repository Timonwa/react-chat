import { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import "./App.css";
import NavBar from "./components/NavBar";
import ChatBox from "./components/ChatBox";
import Welcome from "./components/Welcome";
import RoomsListPanel from "./components/RoomsListPanel";
import RoomsActionsPanel from "./components/RoomsActionsPanel";

function App() {
  const [user] = useAuthState(auth);
  const [activeRoom, setActiveRoom] = useState({
    id: "general",
    name: "General",
    isPrivate: false,
  });

  useEffect(() => {
    const ensureGeneralRoom = async () => {
      const generalRef = doc(db, "rooms", "general");
      const generalSnap = await getDoc(generalRef);
      if (!generalSnap.exists()) {
        await setDoc(generalRef, {
          name: "General",
          isPrivate: false,
          createdAt: serverTimestamp(),
          createdBy: "system",
        });
      } else {
        const data = generalSnap.data();
        setActiveRoom(prev => ({
          ...prev,
          name: data.name || "General",
          isPrivate: Boolean(data.isPrivate),
        }));
      }
    };

    ensureGeneralRoom();
  }, []);

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
