// src/Pages/AdminLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabase";
import "./Admin.css";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (authError) {
        setError("Неверный email или пароль");
        setPassword("");
        setLoading(false);
        return;
      }

      if (data?.session) {
        localStorage.setItem("adminAuth", "true");
        navigate("/admin");
      }
    } catch (err) {
      console.error("Ошибка входа:", err);
      setError("Ошибка соединения");
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="admin-login__container">
        <h1 className="admin-login__title">Вход в админ-панель</h1>
        <form className="admin-login__form" onSubmit={handleSubmit}>
          <input
            type="email"
            className="admin-login__input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
            required
          />
          <input
            type="password"
            className="admin-login__input"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="admin-login__error">{error}</p>}
          <button
            type="submit"
            className="admin-login__button"
            disabled={loading}
          >
            {loading ? "Вход..." : "Войти"}
          </button>
        </form>
      </div>
    </div>
  );
}