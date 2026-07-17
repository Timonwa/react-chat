import React from "react";
import GoogleSignin from "../img/google-button.png";

const NavBar = () => {
  const googleSignIn = () => {};

  return (
    <nav className="nav-bar">
      <div className="nav-bar__left">
        <h1>React Chat</h1>
      </div>
      <button className="sign-in" type="button" onClick={googleSignIn}>
        <img src={GoogleSignin} alt="sign in with google" type="button" />
      </button>
    </nav>
  );
};

export default NavBar;
