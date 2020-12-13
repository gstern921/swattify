import React from "react";
import LogOutButton from "../logout-button/LogoutButton";
import "./NavBar.styles.css";

export default function NavBar({ user, logOutHandler }) {
  return (
    <div className="nav-bar__container">
      <h1>NavBar</h1>
      {user && <LogOutButton logOutHander={logOutHandler}></LogOutButton>}
    </div>
  );
}
