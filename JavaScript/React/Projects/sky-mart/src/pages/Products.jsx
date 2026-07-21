import { Search, ChevronDown, X, PackageX } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { productData } from "../data/productData";
import { useState } from "react";
import { useSearchParams } from "react-router";

const products = productData;

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchItemQuery, setSearchItemQuery] = useState(
    searchParams.get("search") || "",
  );
  const [categorySelected, setCategorySelected] = useState(
    searchParams.get("category") || "all",
  );
  const [sort, setSort] = useState(searchParams.get("sort") || "default");

  const updateParams = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (!value || value === "all" || value === "default") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    setSearchParams(params);
  };

  const showClearBtn =
    searchItemQuery || categorySelected !== "all" || sort !== "default";

  const filteredProducts = products
    .filter(
      (product) =>
        categorySelected === "all" ||
        product.category.toLowerCase() === categorySelected,
    )
    .filter(
      (product) =>
        product.title.toLowerCase().includes(searchItemQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchItemQuery.toLowerCase()),
    );

  const activeFilters = [];
  if (searchItemQuery) {
    activeFilters.push({
      type: "search",
      label: `"${searchItemQuery}"`,
      clear: () => {
        setSearchItemQuery("");
        updateParams("search", "");
      },
    });
  }
  if (categorySelected !== "all") {
    activeFilters.push({
      type: "category",
      label: categorySelected,
      clear: () => {
        setCategorySelected("all");
        updateParams("category", "all");
      },
    });
  }
  if (sort !== "default") {
    activeFilters.push({
      type: "sort",
      label:
        sort === "lowToHigh"
          ? "Price Low → High"
          : sort === "highToLow"
            ? "Price High → Low"
            : sort === "topRated"
              ? "Top Rated"
              : "Lowest Rated",
      clear: () => {
        setSort("default");
        updateParams("sort", "default");
      },
    });
  }

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sort) {
      case "lowToHigh":
        return a.price - b.price;
      case "highToLow":
        return b.price - a.price;
      case "topRated":
        return b.rating.rate - a.rating.rate;
      case "lowestRated":
        return a.rating.rate - b.rating.rate;
      default:
        return 0;
    }
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-white sm:text-4xl">
          All Products
        </h1>
        <p className="font-body text-sm text-white/40">
          {sortedProducts.length} products found
        </p>
      </div>

      <div className="mb-8 rounded-3xl border border-white/10 bg-[#111] p-5 shadow-lg">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchItemQuery}
              onChange={(e) => {
                setSearchItemQuery(e.target.value);
                updateParams("search", e.target.value);
              }}
              className="h-12 w-full appearance-none rounded-xl border border-white/10 bg-[#1a1a1a] pl-11 pr-10 text-white transition-all duration-200 focus:border-volt focus:bg-[#222] focus:outline-none"
            />
            {searchItemQuery && (
              <button
                onClick={() => {
                  setSearchItemQuery("");
                  updateParams("search", "");
                }}
                className="absolute top-1/2 right-3 -translate-y-1/2 rounded-md p-1 text-white/40 hover:bg-white/10 hover:text-white"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="relative rounded-xl border border-white/10 bg-[#1a1a1a] focus-within:border-volt">
            <select
              value={categorySelected}
              onChange={(e) => {
                setCategorySelected(e.target.value);
                updateParams("category", e.target.value);
              }}
              className="h-12 w-full min-w-[160px] cursor-pointer appearance-none border-0 bg-transparent px-4 pr-10 text-sm text-white focus:outline-none sm:w-auto"
            >
              <option value="all" className="bg-ink">
                All Categories
              </option>
              <option value="electronics" className="bg-ink">
                Electronics
              </option>
              <option value="clothing" className="bg-ink">
                Clothing
              </option>
              <option value="furniture" className="bg-ink">
                Furniture
              </option>
              <option value="home & kitchen" className="bg-ink">
                Home & Kitchen
              </option>
              <option value="sports" className="bg-ink">
                Sports
              </option>
              <option value="personal care & beauty" className="bg-ink">
                Personal Care
              </option>
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-white/40" />
          </div>

          <div className="relative rounded-xl border border-white/10 bg-[#1a1a1a] focus-within:border-volt">
            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                updateParams("sort", e.target.value);
              }}
              className="h-12 w-full min-w-[160px] cursor-pointer appearance-none border-0 bg-transparent px-4 pr-10 text-sm text-white focus:outline-none sm:w-auto"
            >
              <option value="default" className="bg-ink">
                Featured
              </option>
              <option value="lowToHigh" className="bg-ink">
                Price Low → High
              </option>
              <option value="highToLow" className="bg-ink">
                Price High → Low
              </option>
              <option value="topRated" className="bg-ink">
                Top Rated
              </option>
              <option value="lowestRated" className="bg-ink">
                Lowest Rated
              </option>
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-white/40" />
          </div>

          {showClearBtn && (
            <button
              onClick={() => {
                setSearchItemQuery("");
                setCategorySelected("all");
                setSort("default");
                setSearchParams(new URLSearchParams());
              }}
              className="flex h-12 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-5 text-sm font-medium text-red-400 transition-all hover:bg-red-500/20 hover:text-red-300"
            >
              <X size={16} /> Clear
            </button>
          )}
        </div>

        {activeFilters.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2 border-t border-white/10 pt-4">
            {activeFilters.map((filter) => (
              <span
                key={filter.type}
                className="flex items-center gap-1.5 rounded-lg border border-volt/30 bg-volt/10 py-1 pl-3 pr-1 text-xs font-medium text-volt"
              >
                {filter.label}
                <button
                  onClick={filter.clear}
                  className="rounded-md p-1 hover:bg-volt/20 hover:text-white"
                >
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {sortedProducts.map((product, index) => (
            <ProductCard key={product.id} {...product} delay={index * 50} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-[#111] py-24 text-center">
          <PackageX size={64} className="text-white/20 mb-4" />
          <h3 className="text-xl font-heading font-bold text-white mb-2">
            No products found
          </h3>
          <p className="text-white/40 max-w-sm">
            We couldn't find any products matching your current filters. Try
            adjusting your search or categories.
          </p>
          <button
            onClick={() => {
              setSearchItemQuery("");
              setCategorySelected("all");
              setSort("default");
              setSearchParams(new URLSearchParams());
            }}
            className="mt-6 rounded-xl bg-volt px-6 py-3 font-semibold text-ink hover:bg-volt-light"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
