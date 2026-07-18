import React, { useState } from "react";

// Renders a room code that copies to the clipboard on click and briefly
// shows a "Copied!" confirmation.
const CopyCode = ({ code, className = "" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      // Fallback for older browsers or non-secure (http) contexts.
      const textarea = document.createElement("textarea");
      textarea.value = code;
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`copy-code ${copied ? "copy-code--copied" : ""} ${className}`}
      title="Click to copy"
      aria-label={`Copy code ${code}`}>
      <code>{code}</code>
      {copied && (
        <span className="copy-code__status" aria-live="polite">
          Copied!
        </span>
      )}
    </button>
  );
};

export default CopyCode;
