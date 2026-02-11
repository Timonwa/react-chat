import React from "react";

const Avatar = ({ photoURL, name, size = 36, className = "" }) => {
  const initials = name
    ? name
        .split(" ")
        .map(part => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";

  return (
    <div
      className={`avatar ${className}`}
      style={{ width: size, height: size }}>
      {photoURL ? (
        <img src={photoURL} alt={name || "User avatar"} />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
};

export default Avatar;
