import React, { useMemo, useState } from 'react';
import MixCanvasPageMobile from './mobile/MixCanvasPageMobile';
import MixCanvasPageDesktop from './desktop/MixCanvasPageDesktop';

const priceByCategory = {
  tops: 850000,
  bottoms: 950000,
  shoes: 950000,
  outerwear: 1500000,
};

function toCanvasItem(piece) {
  return {
    ...piece,
    name: piece.name,
    displayName: piece.name,
    category: piece.category === 'bottoms' ? 'pants' : piece.category,
    type: piece.category === 'bottoms' ? 'bottom' : piece.category === 'tops' ? 'top' : piece.category,
    price: priceByCategory[piece.category] || 0,
    formattedPrice: `${(priceByCategory[piece.category] || 0).toLocaleString('vi-VN')}₫`,
    selected: Boolean(piece.selected),
  };
}

export default function MixCanvasPage({ isMobileFrame, onNavigateToFeed, onNavigateToBrand, onOpenAuth, wardrobePieces }) {
  const [selectedIds, setSelectedIds] = useState(() => wardrobePieces.slice(0, 3).map((piece) => piece.id));
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileTab, setMobileTab] = useState('tops');
  const [showGrid, setShowGrid] = useState(true);
  const [toastMessage, setToastMessage] = useState('');
  const items = useMemo(() => wardrobePieces.map((piece) => ({ ...toCanvasItem(piece), selected: selectedIds.includes(piece.id) })), [wardrobePieces, selectedIds]);
  const toggleItemSelection = (id) => setSelectedIds((previous) => previous.includes(id) ? previous.filter((itemId) => itemId !== id) : [...previous, id]);
  const showToast = (message, duration) => { setToastMessage(message); setTimeout(() => setToastMessage(''), duration); };
  const handleReset = () => { setSelectedIds(wardrobePieces.slice(0, 3).map((item) => item.id)); showToast('Đã làm mới bảng phối đồ', 2000); };
  const handleClearAll = () => { setSelectedIds([]); showToast('Đã xóa tất cả trang phục trên Canvas', 2000); };
  const handleSaveOutfit = () => showToast('Đã lưu bộ đồ vào Tủ đồ thành công!', 2500);
  const canvasItems = useMemo(() => items.filter((item) => item.selected), [items]);
  const totalPrice = useMemo(() => `${canvasItems.reduce((sum, item) => sum + item.price, 0).toLocaleString('vi-VN')}₫`, [canvasItems]);
  const filteredWardrobe = useMemo(() => items.filter((item) => (activeCategory === 'all' || item.category === activeCategory) && item.name.toLowerCase().includes(searchQuery.toLowerCase())), [items, activeCategory, searchQuery]);
  const mobileFilteredItems = useMemo(() => mobileTab === 'my-wardrobe' ? items : items.filter((item) => item.category === mobileTab), [items, mobileTab]);
  const viewProps = { items, canvasItems, totalPrice, filteredWardrobe, mobileFilteredItems, activeCategory, setActiveCategory, searchQuery, setSearchQuery, mobileTab, setMobileTab, showGrid, setShowGrid, toastMessage, toggleItemSelection, handleReset, handleClearAll, handleSaveOutfit, onNavigateToFeed, onNavigateToBrand, onOpenAuth };
  return isMobileFrame ? <MixCanvasPageMobile {...viewProps} /> : <MixCanvasPageDesktop {...viewProps} />;
}
