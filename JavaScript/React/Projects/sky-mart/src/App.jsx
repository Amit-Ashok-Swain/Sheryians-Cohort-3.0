import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Cart from "./components/Cart";

const App = () => {
  return (
    <div className="flex min-h-screen flex-col bg-ink">
      <Navbar />
      <Cart />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;
