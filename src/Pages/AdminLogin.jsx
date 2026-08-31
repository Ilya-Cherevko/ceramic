// src/Pages/AdminLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin/Admin.css";

const ADMIN_PASSWORD = "admin123"; // Пароль для входа (потом можно изменить)

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("adminAuth", "true");
      navigate("/admin");
    } else {
      setError("Неверный пароль");
      setPassword("");
    }
  };

  return (
    <div className="admin-login">
      <div className="admin-login__container">
        <h1 className="admin-login__title">Вход в админ-панель</h1>
        <form className="admin-login__form" onSubmit={handleSubmit}>
          <input
            type="password"
            className="admin-login__input"
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
          {error && <p className="admin-login__error">{error}</p>}
          <button type="submit" className="admin-login__button">
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}