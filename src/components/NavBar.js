import React from "react";
import GoogleSignin from "../img/google-button.png";

const NavBar = ({ user, onSignIn, onSignOut }) => {
  return (
    <nav className="nav-bar">
      <div className="nav-bar__left">
        <h1>React Chat</h1>
      </div>
      {user ? (
        <button className="sign-out" type="button" onClick={onSignOut}>
          Sign Out
        </button>
      ) : (
        <button className="sign-in" type="button" onClick={onSignIn}>
          <img src={GoogleSignin} alt="sign in with google" />
        </button>
      )}
    </nav>
  );
};

export default NavBar;
