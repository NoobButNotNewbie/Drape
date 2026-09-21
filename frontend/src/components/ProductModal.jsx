import React, { useState } from 'react';
import { X, Heart, Check, ShoppingBag, ShieldCheck, Truck } from 'lucide-react';

export default function ProductModal({ product, onClose, wishlist, toggleWishlist, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || null);
  const [addedToast, setAddedToast] = useState(false);

  if (!product) return null;

  const isLiked = wishlist.includes(product.id);

  const handleAdd = () => {
    onAddToCart({ ...product, size: selectedSize, color: selectedColor });
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-[#FBFBFA] rounded-2xl shadow-2xl border border-[#E5E0D6] overflow-hidden z-10 max-h-[90vh] flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-2 text-[#706C64] hover:text-[#151816] bg-white/80 hover:bg-white rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image */}
        <div className="md:w-1/2 bg-[#F4F0E8] relative min-h-[260px] md:min-h-[420px]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Product Info */}
        <div className="p-6 md:w-1/2 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-start justify-between gap-3 mb-2">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#1A3C24] bg-[#ECF4EE] px-2.5 py-0.5 rounded-sm">
                Linen & Logic
              </span>
              <button
                onClick={() => toggleWishlist(product.id)}
                className="text-[#68655E] hover:text-[#C53030] transition-colors"
                title="Wishlist"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isLiked ? 'fill-[#C53030] text-[#C53030]' : ''
                  }`}
                />
              </button>
            </div>

            <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#151816] mb-1">
              {product.name}
            </h3>

            <div className="font-serif-luxury text-lg font-semibold text-[#1A3C24] mb-3">
              {product.formattedPrice}
            </div>

            <p className="text-xs text-[#6A675F] leading-relaxed mb-4">
              {product.description}
            </p>

            {/* Fabric Details */}
            <div className="bg-[#F5F2EB] p-3 rounded-lg text-xs space-y-1 mb-4 border border-[#E8E2D8]">
              <div className="text-[#36342F] font-semibold">Material & Craft:</div>
              <div className="text-[#65625B]">{product.fabric}</div>
              <div className="text-[#807D76] italic">{product.fit}</div>
            </div>

            {/* Colors */}
            {product.colors && (
              <div className="mb-4">
                <div className="text-[11px] font-semibold text-[#45433D] uppercase tracking-wider mb-2">
                  Color: <span className="font-normal text-[#75726B]">{selectedColor?.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {product.colors.map((c, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColor(c)}
                      className={`w-6 h-6 rounded-full border transition-all ${
                        selectedColor?.name === c.name
                          ? 'ring-2 ring-offset-2 ring-[#1A3C24]'
                          : 'border-black/20 hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            <div className="mb-6">
              <div className="text-[11px] font-semibold text-[#45433D] uppercase tracking-wider mb-2">
                Select Size
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-1.5 text-xs font-medium rounded-sm border transition-all ${
                      selectedSize === size
                        ? 'bg-[#183B22] text-white border-[#183B22]'
                        : 'bg-white text-[#4A4741] border-[#DDD7CD] hover:border-[#8E8B83]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div>
            <button
              onClick={handleAdd}
              className="w-full py-3 bg-[#183B22] hover:bg-[#112B18] text-white text-xs font-semibold tracking-widest uppercase rounded-md shadow-xs transition-colors flex items-center justify-center space-x-2"
            >
              {addedToast ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Bag!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag • {product.formattedPrice}</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center space-x-4 mt-3 text-[10px] text-[#86837C]">
              <span className="flex items-center space-x-1">
                <Truck className="w-3 h-3" />
                <span>Complimentary Shipping</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <ShieldCheck className="w-3 h-3" />
                <span>Authenticity Guaranteed</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
