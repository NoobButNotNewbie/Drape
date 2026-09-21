import React, { useState, useMemo } from 'react';
import { Heart, ChevronDown } from 'lucide-react';
import { newArrivals } from '../data/mockData';

export default function NewArrivals({
  isMobileFrame,
  onSelectProduct,
  wishlist,
  toggleWishlist,
}) {
  const [sortBy, setSortBy] = useState('newest');
  const [isSortOpen, setIsSortOpen] = useState(false);

  const sortedProducts = useMemo(() => {
    const list = [...newArrivals];
    if (sortBy === 'price-low') {
      return list.sort((a, b) => a.price - b.price);
    }
    if (sortBy === 'price-high') {
      return list.sort((a, b) => b.price - a.price);
    }
    if (sortBy === 'name') {
      return list.sort((a, b) => a.name.localeCompare(b.name));
    }
    return list; // default 'newest'
  }, [sortBy]);

  const sortLabels = {
    newest: 'Newest',
    'price-low': 'Price: Low to High',
    'price-high': 'Price: High to Low',
    name: 'Name: A to Z',
  };

  return (
    <section className="py-8 sm:py-10 bg-[#FBFBFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-serif-luxury text-xl sm:text-3xl font-bold text-[#151816]">
              New Arrivals
            </h3>
            {!isMobileFrame && (
              <p className="text-xs text-[#706D65] mt-1 font-normal">
                The latest additions to the Linen & Logic collection.
              </p>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center space-x-1.5 px-3 py-1.5 text-xs bg-white border border-[#DDD7CD] hover:border-[#B5AEA1] rounded-sm text-[#45433E] font-medium transition-colors"
            >
              <span>
                {isMobileFrame ? 'Sort' : `Sort by: ${sortLabels[sortBy]}`}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-[#737068]" />
            </button>

            {isSortOpen && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setIsSortOpen(false)}
                />
                <div className="absolute right-0 mt-1 w-44 bg-white border border-[#DDD7CD] rounded-md shadow-md py-1 z-30 text-xs">
                  {Object.entries(sortLabels).map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => {
                        setSortBy(key);
                        setIsSortOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 hover:bg-[#F5F2EC] transition-colors ${
                        sortBy === key
                          ? 'font-semibold text-[#1A3C24] bg-[#F7F4EE]'
                          : 'text-[#45433E]'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Product Grid: 2 columns on mobile, 4 columns on desktop */}
        <div
          className={`grid gap-4 sm:gap-6 ${
            isMobileFrame
              ? 'grid-cols-2'
              : 'grid-cols-2 md:grid-cols-4'
          }`}
        >
          {sortedProducts.map((product) => {
            const isLiked = wishlist.includes(product.id);

            return (
              <div
                key={product.id}
                className="bg-white border border-[#E9E4DC] rounded-xl overflow-hidden group flex flex-col justify-between hover:shadow-sm transition-all"
              >
                {/* Image Container with Wishlist button */}
                <div className="relative aspect-[4/5] bg-[#F5F2EB] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500 cursor-pointer"
                    onClick={() => onSelectProduct(product)}
                  />

                  {/* Wishlist Heart Icon */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className="absolute top-2.5 right-2.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#55524B] hover:text-[#C53030] hover:bg-white shadow-2xs transition-all"
                    title={isLiked ? 'Remove from wishlist' : 'Add to wishlist'}
                    aria-label="Wishlist"
                  >
                    <Heart
                      className={`w-4 h-4 transition-transform duration-200 active:scale-125 ${
                        isLiked
                          ? 'fill-[#C53030] text-[#C53030]'
                          : 'text-[#66635B]'
                      }`}
                    />
                  </button>
                </div>

                {/* Card Body */}
                <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between bg-white">
                  <div className="mb-3 cursor-pointer" onClick={() => onSelectProduct(product)}>
                    <h4 className="font-serif-luxury text-xs sm:text-sm font-bold text-[#151816] line-clamp-1 mb-1 group-hover:text-[#1A3C24] transition-colors">
                      {product.name}
                    </h4>
                    <p className="font-serif-luxury text-xs text-[#1A3C24] font-semibold">
                      {product.formattedPrice}
                    </p>
                  </div>

                  {/* View Details Button */}
                  <button
                    onClick={() => onSelectProduct(product)}
                    className="w-full py-1.5 sm:py-2 px-3 text-[10px] sm:text-xs font-serif-luxury tracking-wider text-[#4A4740] bg-[#FAF8F5] hover:bg-[#F0ECE4] hover:text-[#151816] border border-[#DDD7CC] rounded-sm transition-all duration-200"
                  >
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
