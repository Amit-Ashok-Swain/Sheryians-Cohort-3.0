import { Star, ShoppingCart, Tag as BadgeIcon, Check } from "lucide-react";
import { NavLink } from "react-router";
import { useCart } from "../context/CartContext";

const ProductCard = ({
  id,
  title,
  price,
  category,
  image,
  description,
  rating,
  delay = 0,
}) => {
  const { addToCart, openCart, cartItems } = useCart();
  const inCartExist = cartItems.some((p) => p.id === id);

  const safeRate = rating?.rate || 0;
  const safeCount = rating?.count || 0;

  return (
    <NavLink
      to={`/products/${id}`}
      className="product-card group animate-fade-up flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-[#111] transition-all duration-200 hover:border-volt/50 hover:shadow-[0_0_25px_rgba(0,255,150,0.2)]"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative aspect-square overflow-hidden bg-white">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="h-full w-full object-contain p-6 transition-transform duration-500 group-hover:scale-110"
        />
        <span className="badge absolute top-3 left-3 flex items-center gap-1 rounded-xl bg-black/60 px-2 py-1 text-xs text-white/90 capitalize backdrop-blur-sm">
          <BadgeIcon className="h-3 w-3" />
          {category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3">
          <h3
            className="mb-2 line-clamp-2 font-body text-base font-semibold leading-snug text-white"
            title={title}
          >
            {title}
          </h3>
        </div>

        <div className="mb-3 flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(safeRate)
                    ? "fill-amber-400 text-amber-400"
                    : i === Math.floor(safeRate) && safeRate % 1 >= 0.5
                      ? "fill-amber-400 text-amber-400"
                      : "fill-white/30 text-white/30"
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-medium text-white/50">
            {safeRate} ({safeCount})
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4">
          <span className="font-heading text-xl font-bold text-volt">
            ${Number(price).toFixed(2)}
          </span>

          <button
            type="button"
            disabled={inCartExist}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              addToCart({
                id,
                title,
                price,
                category,
                image,
                rating,
                description,
              });
              openCart();
            }}
            className={`${
              inCartExist
                ? "border-[#164728] bg-[#132B1C] text-white/80 cursor-default"
                : "bg-volt text-ink hover:bg-volt-light hover:shadow-[0_0_15px_rgba(200,244,0,0.3)] cursor-pointer"
            } flex items-center gap-2 rounded-xl px-3 py-2 font-body text-xs font-semibold transition-all duration-200 active:scale-95`}
          >
            {inCartExist ? (
              <Check className="h-3 w-3" />
            ) : (
              <ShoppingCart className="h-3 w-3" />
            )}
            {inCartExist ? "Added" : "Add"}
          </button>
        </div>
      </div>
    </NavLink>
  );
};

export default ProductCard;
