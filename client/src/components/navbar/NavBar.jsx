import React from "react";
import { Link, BrowserRouter as Router } from 'react-router-dom';
import LogOutButton from "../logout-button/LogoutButton";
import "./NavBar.styles.css";

export default function NavBar({ user }) {
  return (
    <div className="nav-bar__container">
      <h1>Swattify</h1>
      {user && <LogOutButton></LogOutButton>}
    </div>
  );
}
