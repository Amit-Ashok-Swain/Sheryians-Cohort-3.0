import { ArrowRight, Eye, Lock, Mail, User, Zap } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../context/useAuth";
import toast from "react-hot-toast";
import { useState } from "react";

const Register = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const password = useWatch({ control, name: "password" });
  const { setRegisteredUser, registeredUser } = useAuth();

  const onCommit = (data) => {
    const existingUsers = Array.isArray(registeredUser) ? registeredUser : [];

    const emailExists = existingUsers.some(
      (u) => u.email.toLowerCase() === data.email.toLowerCase(),
    );

    if (emailExists) {
      toast.error("Email is already registered", {
        duration: 3000,
        position: "bottom-right",
        id: "reg-error",
      });
      return;
    }

    const newUser = [...existingUsers, data];
    setRegisteredUser(newUser);

    try {
      localStorage.setItem("reg-user", JSON.stringify(newUser));
      toast.success("Account created successfully!", {
        duration: 2000,
        position: "bottom-right",
        id: "reg-success",
      });
      reset();
      navigate("/login");
    } catch (error) {
      toast.error("Storage error. Please try again.", {
        position: "bottom-right",
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-ink">
      <div className="relative hidden w-1/2 flex-col overflow-hidden border-r border-white/10 bg-[#0a0a0a] p-12 lg:flex">
        <div className="pointer-events-none absolute top-1/4 -left-20 h-64 w-64 rounded-full bg-volt/10 blur-3xl"></div>
        <div className="pointer-events-none absolute right-10 bottom-1/4 h-48 w-48 rounded-full bg-volt/5 blur-3xl"></div>

        <div className="relative z-10 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-volt">
            <Zap size={18} className="fill-ink text-ink" />
          </div>
          <span className="font-heading text-2xl font-bold text-white">
            Sky<span className="text-volt">Mart</span>
          </span>
        </div>

        <div className="relative z-10 flex flex-1 flex-col justify-center">
          <p className="mb-4 font-body text-sm font-bold uppercase tracking-widest text-volt">
            Join the Club
          </p>
          <h1 className="mb-6 font-heading text-5xl font-bold leading-tight text-white">
            Unlock premium <br />
            <span className="text-volt">shopping.</span>
          </h1>
          <p className="max-w-md font-body text-lg leading-relaxed text-white/50">
            Create an account to track orders, save favorites, and access
            exclusive member-only deals.
          </p>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center justify-center gap-2 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-volt">
              <Zap size={20} className="fill-ink text-ink" />
            </div>
            <span className="font-heading text-2xl font-bold text-white">
              Sky<span className="text-volt">Mart</span>
            </span>
          </div>

          <div className="auth-card rounded-3xl border border-white/10 bg-[#111] p-8 shadow-2xl">
            <h2 className="mb-2 font-heading text-3xl font-bold text-white">
              Create account
            </h2>
            <p className="mb-8 font-body text-base text-white/50">
              Join SkyMart and start shopping
            </p>

            <form onSubmit={handleSubmit(onCommit)} className="space-y-5">
              <div>
                <div className="relative flex items-center rounded-2xl border border-white/10 bg-[#1a1a1a] p-1 focus-within:border-volt/50 focus-within:bg-[#222] transition-colors">
                  <div className="pl-4 pr-2 text-white/40">
                    <User size={18} />
                  </div>
                  <input
                    {...register("name", { required: "Name is required" })}
                    type="text"
                    placeholder="Full Name"
                    className="h-12 w-full border-0 bg-transparent text-white placeholder:text-white/30 focus:outline-none focus:ring-0"
                  />
                </div>
                {errors.name && (
                  <p className="mt-2 ml-2 text-xs text-red-400">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <div className="relative flex items-center rounded-2xl border border-white/10 bg-[#1a1a1a] p-1 focus-within:border-volt/50 focus-within:bg-[#222] transition-colors">
                  <div className="pl-4 pr-2 text-white/40">
                    <Mail size={18} />
                  </div>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Invalid email",
                      },
                    })}
                    type="email"
                    placeholder="Email address"
                    className="h-12 w-full border-0 bg-transparent text-white placeholder:text-white/30 focus:outline-none focus:ring-0"
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 ml-2 text-xs text-red-400">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <div className="relative flex items-center rounded-2xl border border-white/10 bg-[#1a1a1a] p-1 focus-within:border-volt/50 focus-within:bg-[#222] transition-colors">
                  <div className="pl-4 pr-2 text-white/40">
                    <Lock size={18} />
                  </div>
                  <input
                    {...register("password", {
                      required: "Password is required",
                      minLength: { value: 6, message: "Min 6 characters" },
                    })}
                    type={show ? "text" : "password"}
                    placeholder="Password (min 6 chars)"
                    className="h-12 w-full border-0 bg-transparent pr-12 text-white placeholder:text-white/30 focus:outline-none focus:ring-0"
                  />
                  <button
                    type="button"
                    onClick={() => setShow((prev) => !prev)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 transition-colors hover:text-white"
                  >
                    <Eye size={18} />
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-2 ml-2 text-xs text-red-400">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <div className="relative flex items-center rounded-2xl border border-white/10 bg-[#1a1a1a] p-1 focus-within:border-volt/50 focus-within:bg-[#222] transition-colors">
                  <div className="pl-4 pr-2 text-white/40">
                    <Lock size={18} />
                  </div>
                  <input
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                    type="password"
                    placeholder="Confirm Password"
                    className="h-12 w-full border-0 bg-transparent text-white placeholder:text-white/30 focus:outline-none focus:ring-0"
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="mt-2 ml-2 text-xs text-red-400">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-volt py-4 font-heading text-lg font-bold text-ink transition-transform hover:bg-volt-light active:scale-[0.98]"
              >
                Create account <ArrowRight size={18} />
              </button>
            </form>

            <p className="mt-8 text-center font-body text-sm text-white/40">
              Already have an account?{" "}
              <NavLink
                to="/login"
                className="font-semibold text-volt transition-colors hover:text-volt-light underline underline-offset-4"
              >
                Sign in
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
