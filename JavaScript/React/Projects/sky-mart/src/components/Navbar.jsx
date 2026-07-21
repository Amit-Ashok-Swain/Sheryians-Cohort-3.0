import { LogOut, ShoppingCart, Zap, Menu, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../context/useAuth";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";
import { useState } from "react";

const Navbar = () => {
  const { loggedInUser, setLoggedInUser } = useAuth();
  const { openCart, totalNumberOfItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const onLogout = () => {
    setLoggedInUser(undefined);
    localStorage.removeItem("log-user");
    setMobileMenuOpen(false);

    toast.success("Log out successfully", {
      duration: 2000,
      position: "bottom-right",
      id: "logout-toast",
    });
    navigate("/login");
  };

  const userInitial = loggedInUser?.name
    ? loggedInUser.name.charAt(0).toUpperCase()
    : "U";

  return (
    <nav className="relative mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-6 px-4 sm:px-6">
      <NavLink to="/" className="flex shrink-0 items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-volt">
          <Zap size={18} className="fill-ink text-ink" />
        </div>
        <span className="font-heading text-lg font-bold text-white">
          Sky<span className="text-volt">Mart</span>
        </span>
      </NavLink>

      <div className="hidden items-center gap-6 md:flex">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${isActive ? "text-volt" : "text-[#919191]"} text-sm hover:text-white/80`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            `${isActive ? "text-volt" : "text-[#919191]"} text-sm hover:text-white/80`
          }
        >
          Shop
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `${isActive ? "text-volt" : "text-[#919191]"} text-sm hover:text-white/80`
          }
        >
          About
        </NavLink>
      </div>

      <div className="hidden shrink-0 items-center gap-2 md:flex">
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-volt text-xs font-bold text-ink">
            {userInitial}
          </div>
          <span className="max-w-[100px] truncate font-body text-sm text-white/70">
            {loggedInUser?.name || "Guest"}
          </span>
        </div>

        <button
          type="button"
          onClick={openCart}
          className="relative cursor-pointer rounded-xl border border-white/10 bg-ink p-2.5 transition-all hover:bg-white/5"
        >
          <ShoppingCart size={18} className="text-white" />
          {totalNumberOfItems > 0 && (
            <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-volt text-[10px] font-bold text-ink">
              {totalNumberOfItems}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={onLogout}
          title="Logout"
          className="cursor-pointer rounded-xl border border-white/10 bg-ink p-2.5 text-white/60 transition-all hover:border-red-500/30 hover:bg-red-500/20 hover:text-red-400"
        >
          <LogOut size={18} />
        </button>
      </div>

      <div className="flex items-center gap-3 md:hidden">
        <button
          type="button"
          onClick={openCart}
          className="relative cursor-pointer rounded-xl border border-white/10 bg-ink p-2.5"
        >
          <ShoppingCart size={18} className="text-white" />
          {totalNumberOfItems > 0 && (
            <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-volt text-[10px] font-bold text-ink">
              {totalNumberOfItems}
            </span>
          )}
        </button>
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="cursor-pointer rounded-xl border border-white/10 bg-ink p-2.5 text-white"
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 z-50 flex flex-col gap-4 border-b border-white/10 bg-ink px-4 py-6 md:hidden shadow-xl">
          <div className="flex items-center gap-3 mb-2 border-b border-white/10 pb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-volt text-sm font-bold text-ink">
              {userInitial}
            </div>
            <span className="truncate font-body text-base text-white/90">
              {loggedInUser?.name || "Guest"}
            </span>
          </div>
          <NavLink
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="text-white/80 hover:text-volt"
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            onClick={() => setMobileMenuOpen(false)}
            className="text-white/80 hover:text-volt"
          >
            Shop
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="text-white/80 hover:text-volt"
          >
            About
          </NavLink>
          <button
            type="button"
            onClick={onLogout}
            className="mt-2 flex items-center gap-2 text-red-400"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
