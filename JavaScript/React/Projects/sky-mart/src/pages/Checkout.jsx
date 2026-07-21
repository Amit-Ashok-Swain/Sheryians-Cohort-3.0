import {
  ArrowLeft,
  CreditCard,
  MapPin,
  PackageCheck,
  ShieldCheck,
} from "lucide-react";
import { useNavigate, NavLink } from "react-router";
import { useCart } from "../context/CartContext";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useEffect } from "react";

const Checkout = () => {
  const { cartItems, totalAmount, clearCart } = useCart();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/products", { replace: true });
    }
  }, [cartItems, navigate]);

  const onPlaceOrder = (data) => {
    toast.success("Order placed successfully! Check your email for details.", {
      duration: 4000,
      position: "bottom-right",
      id: "checkout-success",
    });

    clearCart();
    navigate("/");
  };

  if (cartItems.length === 0) return null;

  const shippingCost = totalAmount > 50 ? 0 : 10;
  const finalTotal = totalAmount + shippingCost;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <nav className="mb-8 flex items-center gap-2 font-body text-sm text-white/40">
        <NavLink
          to="/products"
          className="flex items-center gap-1.5 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" /> Continue Shopping
        </NavLink>
      </nav>

      <h1 className="mb-8 font-heading text-3xl font-bold text-white sm:text-4xl">
        Checkout
      </h1>

      <div className="flex flex-col-reverse gap-10 lg:flex-row lg:gap-12">
        <div className="flex-1 space-y-8">
          <form
            id="checkout-form"
            onSubmit={handleSubmit(onPlaceOrder)}
            className="space-y-8"
          >
            <section className="rounded-3xl border border-white/10 bg-[#111] p-6 shadow-xl sm:p-8">
              <h2 className="mb-6 flex items-center gap-2 font-heading text-xl font-bold text-white">
                <MapPin className="h-5 w-5 text-volt" /> Shipping Details
              </h2>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-white/60">
                    Full Name
                  </label>
                  <input
                    {...register("fullName", { required: "Name is required" })}
                    type="text"
                    className="h-12 w-full rounded-xl border border-white/10 bg-[#1a1a1a] px-4 text-white focus:border-volt focus:outline-none"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-white/60">
                    Street Address
                  </label>
                  <input
                    {...register("address", {
                      required: "Address is required",
                    })}
                    type="text"
                    className="h-12 w-full rounded-xl border border-white/10 bg-[#1a1a1a] px-4 text-white focus:border-volt focus:outline-none"
                  />
                  {errors.address && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.address.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-white/60">
                    City
                  </label>
                  <input
                    {...register("city", { required: "City is required" })}
                    type="text"
                    className="h-12 w-full rounded-xl border border-white/10 bg-[#1a1a1a] px-4 text-white focus:border-volt focus:outline-none"
                  />
                  {errors.city && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.city.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-white/60">
                    Zip / Postal Code
                  </label>
                  <input
                    {...register("zipCode", {
                      required: "Zip code is required",
                    })}
                    type="text"
                    className="h-12 w-full rounded-xl border border-white/10 bg-[#1a1a1a] px-4 text-white focus:border-volt focus:outline-none"
                  />
                  {errors.zipCode && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.zipCode.message}
                    </p>
                  )}
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-white/10 bg-[#111] p-6 shadow-xl sm:p-8">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="flex items-center gap-2 font-heading text-xl font-bold text-white">
                  <CreditCard className="h-5 w-5 text-volt" /> Payment Method
                </h2>
                <ShieldCheck className="h-5 w-5 text-green-400" />
              </div>

              <div className="space-y-5">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-white/60">
                    Card Number
                  </label>
                  <input
                    {...register("cardNumber", {
                      required: "Card number is required",
                      pattern: {
                        value: /^[0-9]{16}$/,
                        message: "Must be a 16-digit number",
                      },
                    })}
                    type="text"
                    placeholder="0000 0000 0000 0000"
                    maxLength={16}
                    className="h-12 w-full rounded-xl border border-white/10 bg-[#1a1a1a] px-4 text-white focus:border-volt focus:outline-none"
                  />
                  {errors.cardNumber && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.cardNumber.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-white/60">
                      Expiry Date
                    </label>
                    <input
                      {...register("expiry", { required: "Required (MM/YY)" })}
                      type="text"
                      placeholder="MM/YY"
                      className="h-12 w-full rounded-xl border border-white/10 bg-[#1a1a1a] px-4 text-white focus:border-volt focus:outline-none"
                    />
                    {errors.expiry && (
                      <p className="mt-1 text-xs text-red-400">
                        {errors.expiry.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-white/60">
                      CVC
                    </label>
                    <input
                      {...register("cvc", { required: "Required" })}
                      type="text"
                      placeholder="123"
                      maxLength={4}
                      className="h-12 w-full rounded-xl border border-white/10 bg-[#1a1a1a] px-4 text-white focus:border-volt focus:outline-none"
                    />
                    {errors.cvc && (
                      <p className="mt-1 text-xs text-red-400">
                        {errors.cvc.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </form>
        </div>

        <div className="w-full lg:w-[400px]">
          <div className="sticky top-24 rounded-3xl border border-white/10 bg-[#0a0a0a] p-6 shadow-2xl sm:p-8">
            <h2 className="mb-6 font-heading text-xl font-bold text-white">
              Order Summary
            </h2>

            <div className="mb-6 flex max-h-[300px] flex-col gap-4 overflow-y-auto pr-2">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-white p-2">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="line-clamp-2 font-body text-sm font-medium text-white/80">
                      {item.title}
                    </p>
                    <p className="mt-1 text-xs text-white/40">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-heading font-bold text-white">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-3 border-y border-white/10 py-5">
              <div className="flex justify-between text-sm text-white/60">
                <span>Subtotal</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-white/60">
                <span>Shipping</span>
                <span>
                  {shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <span className="font-heading text-lg font-bold text-white">
                Total
              </span>
              <span className="font-heading text-2xl font-bold text-volt">
                ${finalTotal.toFixed(2)}
              </span>
            </div>

            <button
              form="checkout-form"
              type="submit"
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-volt py-4 font-heading text-lg font-bold text-ink transition-all hover:bg-volt-light hover:shadow-[0_0_20px_rgba(200,244,0,0.2)] active:scale-[0.98]"
            >
              <PackageCheck size={20} /> Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
