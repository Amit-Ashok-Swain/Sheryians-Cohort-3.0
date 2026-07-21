import { createRoot } from "react-dom/client";
import "./index.css";
import AppRoute from "./routes/AppRoute";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "./context/CartContext";

const root = document.getElementById("root");

createRoot(root).render(
  <AuthProvider>
    <CartProvider>
      <AppRoute />
      <Toaster />
    </CartProvider>
  </AuthProvider>,
);
