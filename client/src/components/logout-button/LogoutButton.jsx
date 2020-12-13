import React from "react";

export default function LogoutButton({ logOutHander }) {
  return (
    <button onClick={logOutHander} className="logout-btn">
      Log Out
    </button>
  );
}
