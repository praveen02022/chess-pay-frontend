import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

if (import.meta.env.DEV) {
  const token = import.meta.env.VITE_DEV_ORGANIZER_TOKEN;

  if (token) {
    localStorage.setItem("token", token);
    console.log("✅ DEV TOKEN SET");
  } else {
    console.error("❌ DEV TOKEN MISSING");
  }
}


const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
const queryClient = new QueryClient();
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
