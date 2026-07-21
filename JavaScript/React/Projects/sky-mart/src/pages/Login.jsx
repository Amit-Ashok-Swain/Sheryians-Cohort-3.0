import { ArrowRight, Eye, Lock, Mail, Zap } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../context/useAuth";
import toast from "react-hot-toast";

const Login = () => {
  const { register, handleSubmit, reset } = useForm();
  const [show, setShow] = useState(false);
  const { setLoggedInUser, registeredUser } = useAuth();
  const navigate = useNavigate();

  const onCommit = (data) => {
    const user = registeredUser.find(
      (u) =>
        u.email.toLowerCase() === data.email.toLowerCase() &&
        u.password === data.password,
    );

    if (!user) {
      toast.error("Incorrect email or password", {
        duration: 3000,
        position: "bottom-right",
        id: "login-error",
      });
      return;
    }

    setLoggedInUser(user);
    localStorage.setItem("log-user", JSON.stringify(user));

    toast.success(`Welcome back, ${user.name}!`, {
      duration: 2000,
      position: "bottom-right",
      id: "login-success",
    });

    reset();
    navigate("/");
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
            Welcome back
          </p>
          <h1 className="mb-6 font-heading text-5xl font-bold leading-tight text-white">
            Shop the future.
            <br />
            <span className="text-volt">Today.</span>
          </h1>
          <p className="max-w-md font-body text-lg leading-relaxed text-white/50">
            Thousands of products, lightning-fast delivery, and prices that make
            your wallet happy.
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
              Sign in
            </h2>
            <p className="mb-8 font-body text-base text-white/50">
              Enter your credentials to continue
            </p>

            <form onSubmit={handleSubmit(onCommit)} className="space-y-5">
              <div className="relative flex items-center rounded-2xl border border-white/10 bg-[#1a1a1a] p-1 focus-within:border-volt/50 focus-within:bg-[#222] transition-colors">
                <div className="pl-4 pr-2 text-white/40">
                  <Mail size={18} />
                </div>
                <input
                  {...register("email", { required: "Email is required" })}
                  type="email"
                  placeholder="Email address"
                  className="h-12 w-full border-0 bg-transparent text-white placeholder:text-white/30 focus:outline-none focus:ring-0"
                />
              </div>

              <div className="relative flex items-center rounded-2xl border border-white/10 bg-[#1a1a1a] p-1 focus-within:border-volt/50 focus-within:bg-[#222] transition-colors">
                <div className="pl-4 pr-2 text-white/40">
                  <Lock size={18} />
                </div>
                <input
                  {...register("password", {
                    required: "Password is required",
                  })}
                  type={show ? "text" : "password"}
                  placeholder="Password"
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

              <button
                type="submit"
                className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-volt py-4 font-heading text-lg font-bold text-ink transition-transform hover:bg-volt-light active:scale-[0.98]"
              >
                Sign in <ArrowRight size={18} />
              </button>
            </form>

            <p className="mt-8 text-center font-body text-sm text-white/40">
              Don't have an account?{" "}
              <NavLink
                to="/register"
                className="font-semibold text-volt transition-colors hover:text-volt-light underline underline-offset-4"
              >
                Create one
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
