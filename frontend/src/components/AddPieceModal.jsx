import React, { useState } from 'react';
import { X, Plus, Upload, Check } from 'lucide-react';

export default function AddPieceModal({ isOpen, onClose, onAddPiece }) {
  const [name, setName] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState('tops');
  const [badge, setBadge] = useState('HIGH CONF.');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      setImageFile(null);
      setImagePreview('');
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result || '');
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;

    const newPiece = {
      id: `piece-${Date.now()}`,
      name,
      subtitle: subtitle.toUpperCase() || 'CLASSIC',
      category,
      badge,
      badgeType: badge === 'VERSATILE' ? 'dark-green' : 'light-green',
      image: imagePreview ||
        (category === 'tops'
          ? 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800&auto=format&fit=crop'
          : category === 'bottoms'
          ? 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop'
          : category === 'shoes'
          ? 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop'
          : 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop'),
      matchesOutfits: Math.floor(Math.random() * 8) + 4,
    };

    onAddPiece(newPiece);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setName('');
      setSubtitle('');
      setImageFile(null);
      setImagePreview('');
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md bg-[#FBFBFA] rounded-2xl shadow-2xl border border-[#E2DDD3] overflow-hidden z-10 p-6 animate-in fade-in zoom-in-95 duration-200 text-[#151816]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-[#868279] hover:text-[#151816] hover:bg-[#EFECE6] rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-5">
          <h3 className="font-serif-luxury text-xl font-bold text-[#183B22] mb-1">
            + Thêm Trang Phục Mới
          </h3>
          <p className="text-xs text-[#706C64]">
            Số hóa món đồ của bạn vào Digital Wardrobe
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-semibold text-[#4A4740] uppercase tracking-wider mb-1">
              Tên món đồ
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="VD: Sơ mi Linen Trắng, Quần Tây Pleated..."
              className="w-full px-3 py-2 text-xs bg-white border border-[#D9D3C7] rounded-md outline-none focus:border-[#183B22] transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-[#4A4740] uppercase tracking-wider mb-1">
                Danh mục
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-[#D9D3C7] rounded-md outline-none focus:border-[#183B22] transition-colors"
              >
                <option value="tops">Tops (Áo)</option>
                <option value="bottoms">Bottoms (Quần)</option>
                <option value="shoes">Shoes (Giày)</option>
                <option value="outerwear">Outerwear (Áo khoác)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#4A4740] uppercase tracking-wider mb-1">
                Màu sắc / Subtitle
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="VD: Navy Blue, Ecru..."
                className="w-full px-3 py-2 text-xs bg-white border border-[#D9D3C7] rounded-md outline-none focus:border-[#183B22] transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-[#4A4740] uppercase tracking-wider mb-1">
                Nhãn đánh giá
              </label>
              <select
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-[#D9D3C7] rounded-md outline-none focus:border-[#183B22] transition-colors"
              >
                <option value="HIGH CONF.">HIGH CONF.</option>
                <option value="VERSATILE">VERSATILE</option>
                <option value="ESSENTIAL">ESSENTIAL</option>
                <option value="FORMAL">FORMAL</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-[#4A4740] uppercase tracking-wider mb-1">
              Ảnh món đồ (tuỳ chọn)
            </label>
            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-[#D9D3C7] bg-white px-3 py-2.5 text-xs text-[#183B22] transition hover:border-[#183B22]">
              <Upload className="w-4 h-4" />
              <span>{imageFile ? imageFile.name : 'Tải ảnh lên'}</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </label>
            {imagePreview && (
              <div className="mt-2 overflow-hidden rounded-md border border-[#E2DDD3] bg-white p-2">
                <img src={imagePreview} alt="Preview" className="h-24 w-full object-cover rounded-md" />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-[#183B22] hover:bg-[#122E1A] text-white text-xs font-semibold tracking-wider uppercase rounded-md shadow-xs transition-colors flex items-center justify-center space-x-2 mt-4"
          >
            {isSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Đã thêm vào tủ đồ!</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Thêm Món Đồ Này</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
