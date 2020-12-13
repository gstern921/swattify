import React, { useState } from "react";
import { API_URL } from "../../config/app.config";

export default function LoginForm({ loginWithCredentials }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="login-form__container">
      <h2>Log In</h2>
      <h4>email: {email}</h4>
      <h4>password: {password}</h4>
      <form
        action={`${API_URL}/auth/login`}
        method="POST"
        onSubmit={loginWithCredentials({ email, password })}
      >
        <input
          name="email"
          placeholder="email"
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          name="password"
          placeholder="password"
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
