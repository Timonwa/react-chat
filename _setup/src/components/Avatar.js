import React from "react";

const Avatar = ({ photoURL, name, size = 32, className = "" }) => {
  const getInitials = name => {
    if (!name) return "?";
    return name
      .split(" ")
      .map(word => word.charAt(0).toUpperCase())
      .slice(0, 2)
      .join("");
  };

  const getRandomColor = () => {
    const colors = [
      "#FF6B6B",
      "#4ECDC4",
      "#45B7D1",
      "#96CEB4",
      "#FFEAA7",
      "#DDA0DD",
      "#98D8C8",
      "#F7DC6F",
      "#BB8FCE",
      "#85C1E9",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const avatarStyle = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: "50%",
    border: `2px solid var(--accent)`,
    fontSize: `${size * 0.3}px`,
    fontFamily: '"Inter", sans-serif',
    fontWeight: 600,
  };

  if (photoURL) {
    return (
      <img
        src={photoURL}
        alt={`${name || "User"} avatar`}
        className={className}
        style={avatarStyle}
      />
    );
  }

  return (
    <div
      className={className}
      style={{
        ...avatarStyle,
        backgroundColor: getRandomColor(),
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
      {getInitials(name)}
    </div>
  );
};

export default Avatar;
