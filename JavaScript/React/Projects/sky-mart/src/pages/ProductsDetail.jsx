import {
  ArrowLeft,
  Star,
  ShoppingCart,
  Heart,
  Truck,
  Shield,
  RotateCcw,
  ChevronRight,
  Tag as BadgeIcon,
  PackageX,
} from "lucide-react";
import { NavLink, useParams, useNavigate } from "react-router";
import { productData } from "../data/productData";
import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [heartClicked, setHeartClicked] = useState(false);
  const { addToCart, openCart } = useCart();

  const singleProduct = productData.find(
    (product) => product.id === Number(id),
  );

  if (!singleProduct) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4">
        <PackageX size={64} className="text-white/20 mb-6" />
        <h2 className="text-2xl font-heading font-bold text-white mb-3">
          Product Not Found
        </h2>
        <p className="text-white/50 mb-8">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <button
          onClick={() => navigate("/products")}
          className="rounded-xl bg-volt px-8 py-3 font-semibold text-ink hover:bg-volt-light"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  const currentIndex = productData.findIndex(
    (product) => product.id === Number(id),
  );

  const nextProductId =
    productData.length > 1
      ? productData[(currentIndex + 1) % productData.length].id
      : singleProduct.id;

  const relatedProducts = productData
    .filter(
      (product) =>
        product.category === singleProduct.category &&
        product.id !== singleProduct.id,
    )
    .slice(0, 5);

  const safeRate = singleProduct.rating?.rate || 0;
  const safeCount = singleProduct.rating?.count || 0;

  return (
    <main>
      <div className="animate-fade-in mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <nav className="mb-8 flex items-center gap-2 font-body text-sm text-white/30">
          <NavLink
            to="/products"
            className="flex items-center gap-1.5 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Products
          </NavLink>
          <span>/</span>
          <span className="capitalize text-white/50">
            {singleProduct.category}
          </span>
          <span>/</span>
          <span className="line-clamp-1 max-w-[200px] sm:max-w-xs text-white/70">
            {singleProduct.title}
          </span>
        </nav>

        <div className="mb-16 grid grid-cols-1 gap-10 lg:grid-cols-2 xl:gap-16">
          <div className="animate-scale-in flex aspect-square items-center justify-center rounded-3xl bg-white p-10 shadow-[0_0_40px_rgba(255,255,255,0.05)] border border-white/10">
            <img
              src={singleProduct.image}
              alt={singleProduct.title}
              className="h-full w-full object-contain transition-transform duration-500 hover:scale-105"
            />
          </div>

          <div className="animate-fade-up flex flex-col gap-5 justify-center">
            <span className="badge flex w-fit items-center gap-1.5 rounded-full border border-volt/30 bg-volt/10 px-3 py-1 text-xs font-semibold capitalize tracking-wide text-volt">
              <BadgeIcon className="h-3.5 w-3.5" />
              {singleProduct.category}
            </span>

            <h1 className="font-heading text-3xl font-bold leading-tight text-white sm:text-4xl">
              {singleProduct.title}
            </h1>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`h-4 w-4 ${index < Math.round(safeRate) ? "fill-amber-400 text-amber-400" : "fill-amber-400/30 text-amber-400/30"}`}
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-white/90">
                {safeRate}
              </span>
              <span className="text-sm text-white/40">
                ({safeCount} reviews)
              </span>
            </div>

            <div className="border-y border-white/10 py-5 my-2">
              <span className="font-heading text-4xl font-bold text-volt">
                ${Number(singleProduct.price).toFixed(2)}
              </span>
            </div>

            <p className="font-body text-base leading-relaxed text-white/60">
              {singleProduct.description}
            </p>

            <div className="flex gap-4 mt-2">
              <button
                onClick={() => {
                  addToCart(singleProduct);
                  openCart();
                }}
                className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-2xl bg-volt py-4 font-heading text-lg font-bold text-ink transition-all duration-200 hover:bg-volt-light hover:shadow-[0_0_20px_rgba(200,244,0,0.3)] active:scale-[0.98]"
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </button>

              <button
                onClick={() => setHeartClicked((prev) => !prev)}
                className={`cursor-pointer rounded-2xl border p-4 transition-all duration-200 ${heartClicked ? "border-red-500/50 bg-red-500/10 text-red-500" : "border-white/10 bg-[#111] text-white/40 hover:border-white/30 hover:text-white"}`}
              >
                <Heart
                  className={`h-6 w-6 ${heartClicked ? "fill-red-500" : ""}`}
                />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="rounded-2xl border border-white/10 bg-[#1a1a1a] p-4 text-center">
                <Truck className="mx-auto mb-2 h-5 w-5 text-volt" />
                <p className="font-body text-xs font-semibold text-white/80">
                  Free Delivery
                </p>
                <p className="font-body text-[10px] text-white/40 mt-0.5">
                  On orders $50+
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-[#1a1a1a] p-4 text-center">
                <Shield className="mx-auto mb-2 h-5 w-5 text-volt" />
                <p className="font-body text-xs font-semibold text-white/80">
                  Secure Pay
                </p>
                <p className="font-body text-[10px] text-white/40 mt-0.5">
                  256-bit SSL
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-[#1a1a1a] p-4 text-center">
                <RotateCcw className="mx-auto mb-2 h-5 w-5 text-volt" />
                <p className="font-body text-xs font-semibold text-white/80">
                  Easy Returns
                </p>
                <p className="font-body text-[10px] text-white/40 mt-0.5">
                  30-day policy
                </p>
              </div>
            </div>

            {nextProductId !== singleProduct.id && (
              <div className="mt-2 flex gap-3">
                <NavLink
                  to={`/products/${nextProductId}`}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-transparent px-4 py-3.5 font-heading text-sm font-semibold text-white transition-all hover:bg-white/5 hover:border-white/20"
                >
                  View Next Product{" "}
                  <ChevronRight className="h-4 w-4 text-volt" />
                </NavLink>
              </div>
            )}
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <section className="mt-16 border-t border-white/10 pt-12">
            <h2 className="mb-8 font-heading text-2xl font-bold text-white">
              Related Products
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default ProductDetail;
