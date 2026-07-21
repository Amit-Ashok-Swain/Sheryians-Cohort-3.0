import { Star, ArrowRight, ShoppingBag } from "lucide-react";
import { NavLink } from "react-router";
import { useCart } from "../context/CartContext";

const FeatureItem = ({ items, cardName, link, linkForItem }) => {
  const { openCart, addToCart } = useCart();

  return (
    <div className="mb-4 rounded-3xl border border-white/10 bg-ink p-6 transition-colors hover:border-white/20">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-heading text-lg font-bold text-white">
          <Star className="h-4.5 w-4.5 fill-amber-400 text-amber-400" />
          {cardName}
        </h2>
        <NavLink
          to={link}
          className="flex items-center gap-1 text-xs text-volt hover:text-volt-light"
        >
          See all <ArrowRight className="h-3 w-3" />
        </NavLink>
      </div>

      <div className="space-y-2">
        {items.map((item) => (
          <NavLink
            key={item.id}
            to={`${linkForItem}/${item.id}`}
            className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 transition-all duration-200 hover:border-volt/30 hover:bg-white/10"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-1.5">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-contain"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p
                className="line-clamp-1 text-xs font-semibold text-white/80"
                title={item.title}
              >
                {item.title}
              </p>
              <p className="mt-0.5 font-heading text-sm font-bold text-volt">
                ${Number(item.price).toFixed(2)}
              </p>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart({ ...item });
                openCart();
              }}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-volt/10 text-volt transition-all group-hover:scale-105 hover:bg-volt hover:text-ink cursor-pointer"
            >
              <ShoppingBag className="h-4 w-4" />
            </button>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default FeatureItem;
