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
        <span className="welcome-tag">Demo refreshed for 2026</span>
        <h2>Welcome to React Chat.</h2>
        <p>
          Sign in with Google to chat with fellow React developers in public or
          private rooms.
        </p>
        <button className="sign-in" type="button" onClick={googleSignIn}>
          <img src={GoogleSignin} alt="sign in with google" />
        </button>
        <p className="welcome-disclaimer">
          <strong>New guide available:</strong> the refreshed walkthrough lives
          on my blog. The original FreeCodeCamp guide still works, and the
          legacy code remains on the{" "}
          <span className="welcome-inline">freecodecamp-original</span> branch.{" "}
          <a href={blogUrl} target="_blank" rel="noreferrer">
            Read the updated guide
          </a>
        </p>
        <p className="welcome-disclaimer welcome-disclaimer--muted">
          Signing in stores your Google email, name, avatar, and messages in
          Firebase so the chat can work. By testing this demo, you agree to
          receive occasional tech updates from me. Details are in the{" "}
          <a href={termsUrl} target="_blank" rel="noreferrer">
            Terms of use
          </a>
          .
        </p>
      </div>
    </main>
  );
};

export default Welcome;
