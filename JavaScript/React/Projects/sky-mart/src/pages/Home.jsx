import {
  Package,
  TrendingUp,
  Star,
  Tag,
  ArrowRight,
  Zap,
  Monitor,
  Shirt,
  Sofa,
  Dumbbell,
  Watch,
  Shield,
  HomeIcon,
} from "lucide-react";
import { NavLink } from "react-router";
import { useAuth } from "../context/useAuth";
import { useCart } from "../context/CartContext";
import {
  perCategoryCountResult,
  premiumItems,
  topRatedItems,
} from "../data/productData";
import FeatureItem from "../components/FeatureItem";

const Home = () => {
  const { loggedInUser } = useAuth();
  const { cartItems, totalAmount } = useCart();

  const hour = new Date().getHours();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="relative mb-10 overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a] bg-[image:var(--background-image-grid)] bg-[length:40px_40px] p-8 sm:p-12 shadow-2xl">
        <div className="pointer-events-none absolute top-1/4 -left-20 h-64 w-64 rounded-full bg-volt/10 blur-3xl"></div>
        <div className="pointer-events-none absolute right-10 bottom-1/4 h-48 w-48 rounded-full bg-volt/5 blur-3xl"></div>

        <div className="relative z-10 flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div>
            <p className="mb-3 font-body text-sm font-bold uppercase tracking-widest text-volt/80">
              {hour < 12
                ? "Good Morning"
                : hour < 16
                  ? "Good Afternoon"
                  : "Good Evening"}{" "}
              👋
            </p>
            <h1 className="mb-4 font-heading text-4xl font-bold leading-tight text-white sm:text-5xl">
              Welcome back,
              <br />
              <span className="text-volt">
                {loggedInUser?.name || "Guest"}!
              </span>
            </h1>
            <p className="max-w-md font-body text-white/50 text-lg">
              Discover today's picks — hand-curated products across electronics,
              fashion, and more.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <NavLink
                to="/products"
                className="flex items-center gap-2 rounded-2xl bg-volt px-6 py-3.5 font-bold text-ink transition-all hover:bg-volt-light hover:shadow-[0_0_20px_rgba(200,244,0,0.3)] active:scale-95"
              >
                Shop Now <ArrowRight className="h-4 w-4" />
              </NavLink>
              <NavLink
                to="/products"
                className="flex items-center gap-2 rounded-2xl border border-white/10 bg-[#111] px-6 py-3.5 text-sm font-semibold text-white/80 transition-all hover:border-white/30 hover:bg-white/5"
              >
                View All Products
              </NavLink>
            </div>
          </div>

          <div className="flex shrink-0 flex-row sm:flex-col gap-4 w-full sm:w-auto">
            <div className="flex-1 rounded-2xl border border-volt/20 bg-volt/5 px-8 py-5 text-center backdrop-blur-sm">
              <p className="font-heading text-4xl font-bold text-volt">20+</p>
              <p className="mt-1 font-body text-xs font-medium text-white/60">
                Products Available
              </p>
            </div>
            <div className="flex-1 rounded-2xl border border-white/10 bg-[#111]/80 px-8 py-5 text-center backdrop-blur-sm">
              <p className="font-heading text-3xl font-bold text-white">Free</p>
              <p className="mt-1 font-body text-xs font-medium text-white/60">
                Delivery on $50+
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          {
            icon: Package,
            value: cartItems.length,
            label: "Cart Items",
            sub: "In your bag",
            color: "text-volt",
            bg: "bg-volt/10",
          },
          {
            icon: TrendingUp,
            value: `$${totalAmount.toFixed(2)}`,
            label: "Cart Value",
            sub: "Ready to checkout",
            color: "text-blue-400",
            bg: "bg-blue-500/10",
          },
          {
            icon: Star,
            value: topRatedItems.length,
            label: "Top Products",
            sub: "Highly rated",
            color: "text-amber-400",
            bg: "bg-amber-500/10",
          },
          {
            icon: Tag,
            value: Object.keys(perCategoryCountResult).length,
            label: "Categories",
            sub: "To explore",
            color: "text-purple-400",
            bg: "bg-purple-500/10",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="flex items-start gap-4 rounded-3xl border border-white/10 bg-[#111] p-6 transition-colors hover:border-white/20"
          >
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${stat.bg} ${stat.color}`}
            >
              <stat.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="font-heading text-2xl font-bold text-white">
                {stat.value}
              </p>
              <p className="font-body text-sm font-medium text-white/70">
                {stat.label}
              </p>
              <p className="mt-0.5 font-body text-xs text-white/40">
                {stat.sub}
              </p>
            </div>
          </div>
        ))}
      </div>

      <section className="mb-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-heading text-2xl font-bold text-white">
            Shop by Category
          </h2>
          <NavLink
            to="/products"
            className="flex items-center gap-1 text-sm font-semibold text-volt transition-colors hover:text-volt-light"
          >
            View All <ArrowRight className="h-4 w-4" />
          </NavLink>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {[
            { label: "Electronics", icon: Monitor, dbCategory: "electronics" },
            { label: "Clothing", icon: Shirt, dbCategory: "clothing" },
            { label: "Furniture", icon: Sofa, dbCategory: "furniture" },
            {
              label: "Home & Kitchen",
              icon: HomeIcon,
              dbCategory: "home & kitchen",
            },
            { label: "Sports", icon: Dumbbell, dbCategory: "sports" },
            {
              label: "Personal Care",
              icon: Watch,
              dbCategory: "personal care & beauty",
            },
          ].map((cat) => (
            <NavLink
              key={cat.label}
              to={`/products?category=${encodeURIComponent(cat.dbCategory)}`}
              className="group flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-[#111] p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-volt/50 hover:bg-[#1a1a1a] hover:shadow-[0_10px_20px_rgba(0,0,0,0.4)]"
            >
              <div className="mb-4 rounded-full bg-white/5 p-4 transition-colors group-hover:bg-volt/10">
                <cat.icon className="h-8 w-8 text-white/70 transition-colors group-hover:text-volt" />
              </div>
              <p className="font-body text-sm font-bold capitalize text-white/90">
                {cat.label}
              </p>
              <p className="mt-1 text-xs font-medium text-white/40">
                {perCategoryCountResult[cat.dbCategory] || 0} items
              </p>
            </NavLink>
          ))}
        </div>
      </section>

      <section className="mb-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <FeatureItem
          items={topRatedItems.slice(0, 4)}
          cardName="Top Rated"
          link="/products?sort=topRated"
          linkForItem="/products"
        />
        <FeatureItem
          items={premiumItems.slice(0, 4)}
          cardName="Premium Products"
          link="/products?sort=highToLow"
          linkForItem="/products"
        />
      </section>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          {
            icon: Zap,
            title: "Fast Delivery",
            desc: "Same-day on select items",
            color: "text-volt",
          },
          {
            icon: Shield,
            title: "Secure Payments",
            desc: "100% encrypted checkout",
            color: "text-blue-400",
          },
          {
            icon: Tag,
            title: "Best Prices",
            desc: "Price-match guarantee",
            color: "text-green-400",
          },
        ].map((feat, i) => (
          <div
            key={i}
            className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#111] p-6"
          >
            <feat.icon className={`h-8 w-8 ${feat.color}`} />
            <div>
              <p className="font-body text-base font-bold text-white/90">
                {feat.title}
              </p>
              <p className="mt-0.5 text-xs text-white/40">{feat.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
