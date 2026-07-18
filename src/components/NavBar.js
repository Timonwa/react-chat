import React from "react";
import GoogleSignin from "../img/google-button.png";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Avatar from "./Avatar";

const NavBar = () => {
  const [user] = useAuthState(auth);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const signOut = () => {
    auth.signOut();
  };

  return (
    <nav className="nav-bar">
      <div className="nav-bar__left">
        <h1>React Chat</h1>
        {user && (
          <Avatar
            photoURL={user.photoURL}
            name={user.displayName}
            size={32}
            className="nav-bar__avatar"
          />
        )}
      </div>
      {user ? (
        <button onClick={signOut} className="sign-out" type="button">
          Sign Out
        </button>
      ) : (
        <button className="sign-in" type="button" onClick={googleSignIn}>
          <img src={GoogleSignin} alt="sign in with google" type="button" />
        </button>
      )}
    </nav>
  );
};

export default NavBar;
