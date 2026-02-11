import React from "react";
import GoogleSignin from "../img/btn_google_signin_dark_pressed_web.png";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Welcome = () => {
  const blogUrl = "https://tech.timonwa.com/blog";
  const termsUrl = "https://tech.timonwa.com/terms";

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <main className="welcome">
      <div className="welcome-card">
        <span className="welcome-tag">Demo refreshed on Feb 2026</span>
        <h2>Welcome to React Chat.</h2>
        <p>
          Sign in with Google to chat with fellow React developers in public or
          private rooms.
        </p>
        <button className="sign-in" type="button" onClick={googleSignIn}>
          <img src={GoogleSignin} alt="sign in with google" />
        </button>
        <p className="welcome-disclaimer">
          <strong>Updated guide:</strong> The{" "}
          <a href={blogUrl} target="_blank" rel="noreferrer">
            2026 walkthrough
          </a>{" "}
          is on my blog. Looking for the original 2023 FreeCodeCamp tutorial?
          <a
            href="https://www.freecodecamp.org/news/building-a-real-time-chat-app-with-reactjs-and-firebase/"
            target="_blank"
            rel="noreferrer">
            Read it here
          </a>{" "}
          and use the legacy code on the{" "}
          <a
            href="https://github.com/Timonwa/react-chat/tree/freecodecamp-original"
            target="_blank"
            rel="noreferrer">
            freecodecamp-original
          </a>{" "}
          branch.
        </p>
        <p className="welcome-disclaimer welcome-disclaimer--muted">
          Signing in stores your Google email, name, avatar, and messages in
          Firebase so the chat can work. Demo data is cleared on the 1st of each
          month. See the{" "}
          <a href={termsUrl} target="_blank" rel="noreferrer">
            terms of use
          </a>{" "}
          for details.
        </p>
      </div>

      <div className="welcome-card">
        <div className="demo-rooms">
          <h3>Demo Private Rooms</h3>
          <p>Try these pre-created private rooms to test the feature:</p>
          <div className="room-codes">
            <div className="room-code">
              <strong>React Tips:</strong> <code>0695-RJ9I</code>
            </div>
            <div className="room-code">
              <strong>Firebase Chat:</strong> <code>P8IB-A98Z</code>
            </div>
            <div className="room-code">
              <strong>Modern UI:</strong> <code>64KN-6OXP</code>
            </div>
          </div>
          <p className="room-code-note">
            Copy a code above and paste it to join the private room.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Welcome;
