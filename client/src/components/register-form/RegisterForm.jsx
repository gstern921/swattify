import React, { useState } from "react";

export default function RegisterForm({ registerWithCredentials }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  return (
    <div className="register-form__container">
      <h2>Register</h2>
      <h4>email: {email}</h4>
      <h4>password: {password}</h4>
      <h4>passwordConfirm: {passwordConfirm}</h4>
      <h4>name: {name}</h4>
      <form
        className="register-form"
        onSubmit={registerWithCredentials({
          email,
          password,
          passwordConfirm,
          name,
        })}
      >
        <input
          name="email"
          placeholder="email"
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          name="name"
          placeholder="name"
          type="text"
          required
          onChange={(e) => setName(e.target.value)}
        />
        <input
          name="password"
          placeholder="password"
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          name="passwordConfirm"
          placeholder="confirm password"
          type="password"
          onChange={(e) => setPasswordConfirm(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
