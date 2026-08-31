// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FavoritesProvider } from "./context/FavoritesContext";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// ===== Настройка React Query =====
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 минут данные считаются свежими
      cacheTime: 10 * 60 * 1000, // 10 минут хранятся в кэше
      refetchOnWindowFocus: false, // Не перезапрашивать при переключении вкладки
      refetchOnReconnect: false, // Не перезапрашивать при восстановлении соединения
      retry: 1, // Одна попытка перезапроса при ошибке
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
  <FavoritesProvider>
    <App />
  </FavoritesProvider>
  <ReactQueryDevtools initialIsOpen={false} />
</QueryClientProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);

reportWebVitals();