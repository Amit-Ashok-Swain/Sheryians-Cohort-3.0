import {
  X,
  ShoppingBag,
  PackageOpen,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export default function Cart() {
  const navigate = useNavigate();
  const {
    cartOpen,
    closeCart,
    cartItems,
    totalAmount,
    incQuantity,
    decQuantity,
    removeFromCart,
    totalNumberOfItems,
  } = useCart();

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") closeCart();
    };

    if (cartOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEsc);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [cartOpen, closeCart]);

  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) return;
    closeCart();
    navigate("/checkout");
  };

  return (
    <>
      {cartOpen && (
        <div
          onClick={closeCart}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity"
        />
      )}

      <aside
        className={`fixed top-0 right-0 z-50 flex h-full w-full flex-col border-l border-white/10 bg-[#111] transition-transform duration-300 sm:w-[420px] ${cartOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-white/8 px-6 py-5">
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} className="text-volt" />
            <h2 className="font-heading text-lg font-bold text-white">Cart</h2>
            {totalNumberOfItems > 0 && (
              <span className="text-xs font-medium text-volt bg-volt/10 px-2 py-0.5 rounded-full">
                {totalNumberOfItems} items
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="rounded-xl p-2 text-white/50 hover:bg-white/8 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 space-y-3 overflow-y-auto px-6 py-4">
          {cartItems.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 py-16 text-center">
              <PackageOpen size={48} className="text-white/20 mb-2" />
              <p className="font-heading text-lg text-white/70">
                Your cart is empty
              </p>
              <p className="text-sm text-white/40 mb-2">
                Looks like you haven't added anything yet.
              </p>
              <button
                type="button"
                onClick={() => {
                  navigate("/products");
                  closeCart();
                }}
                className="cursor-pointer rounded-2xl bg-volt px-6 py-3 text-sm font-semibold text-ink transition-transform active:scale-95 hover:bg-volt-light"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 rounded-2xl border border-white/8 bg-white/4 p-3 transition-colors hover:border-white/15"
              >
                <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-xl bg-white p-2">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <p
                    className="line-clamp-1 font-body text-sm font-medium text-white/90"
                    title={item.title}
                  >
                    {item.title}
                  </p>
                  <p className="font-heading font-bold text-volt mt-1">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => decQuantity(item.id)}
                      className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/8 hover:bg-white/15 text-white"
                    >
                      <Minus size={11} />
                    </button>
                    <span className="w-6 text-center text-sm font-bold text-white">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => incQuantity(item.id)}
                      className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/8 hover:bg-white/15 text-white"
                    >
                      <Plus size={11} />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="ml-auto text-red-400/60 hover:text-red-400 p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="space-y-4 border-t border-white/8 px-6 py-5 bg-[#0a0a0a]">
            <div className="flex items-center justify-between">
              <span className="font-body text-sm text-white/60">
                Total Amount
              </span>
              <span className="font-heading text-2xl font-bold text-white">
                ${totalAmount.toFixed(2)}
              </span>
            </div>

            <button
              type="button"
              onClick={handleProceedToCheckout}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-volt py-3.5 text-base font-bold text-ink hover:bg-volt-light transition-colors active:scale-[0.98]"
            >
              Proceed to Checkout <ArrowRight size={18} />
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
