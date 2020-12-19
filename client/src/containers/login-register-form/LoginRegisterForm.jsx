import React from "react";
import LoginForm from "../../components/login-form/LoginForm";
import RegisterForm from "../../components/register-form/RegisterForm";

export default function LoginRegisterForm() {
  return (
    <div className="login-register-form__container">
      <LoginForm></LoginForm>
      <RegisterForm></RegisterForm>
    </div>
  );
}
