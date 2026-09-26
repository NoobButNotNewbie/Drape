import React, { useEffect, useMemo, useState } from 'react';
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

export default function MixCanvasPage({ onNavigateToFeed, onOpenAuth, wardrobePieces, setWardrobePieces }) {
  const [selectedIds, setSelectedIds] = useState(() => wardrobePieces.slice(0, 3).map((piece) => piece.id));
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showGrid, setShowGrid] = useState(true);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    setSelectedIds((previous) => {
      const validIds = new Set(wardrobePieces.map((piece) => piece.id));
      const nextIds = previous.filter((id) => validIds.has(id));

      if (nextIds.length > 0) return nextIds;
      return wardrobePieces.slice(0, 3).map((piece) => piece.id);
    });
  }, [wardrobePieces]);

  const items = useMemo(() => wardrobePieces.map((piece) => ({ ...toCanvasItem(piece), selected: selectedIds.includes(piece.id) })), [wardrobePieces, selectedIds]);
  const toggleItemSelection = (id) => setSelectedIds((previous) => previous.includes(id) ? previous.filter((itemId) => itemId !== id) : [...previous, id]);
  const showToast = (message, duration) => { setToastMessage(message); setTimeout(() => setToastMessage(''), duration); };
  const handleReset = () => { setSelectedIds(wardrobePieces.slice(0, 3).map((item) => item.id)); showToast('Đã làm mới bảng phối đồ', 2000); };
  const handleClearAll = () => { setSelectedIds([]); showToast('Đã xóa tất cả trang phục trên Canvas', 2000); };
  const handleAddPiece = (newPiece) => {
    setWardrobePieces((previous) => [newPiece, ...previous]);
    setSelectedIds((previous) => [newPiece.id, ...previous]);
    setIsAddOpen(false);
    showToast('Đã thêm món đồ mới vào Tủ đồ của tôi!', 2500);
  };
  const handleSaveOutfit = () => showToast('Đã lưu bộ đồ vào Tủ đồ thành công!', 2500);
  const canvasItems = useMemo(() => items.filter((item) => item.selected), [items]);
  const totalPrice = useMemo(() => `${canvasItems.reduce((sum, item) => sum + item.price, 0).toLocaleString('vi-VN')}₫`, [canvasItems]);
  const filteredWardrobe = useMemo(() => items.filter((item) => (activeCategory === 'all' || item.category === activeCategory) && item.name.toLowerCase().includes(searchQuery.toLowerCase())), [items, activeCategory, searchQuery]);
  const viewProps = { items, canvasItems, totalPrice, filteredWardrobe, activeCategory, setActiveCategory, searchQuery, setSearchQuery, showGrid, setShowGrid, toastMessage, toggleItemSelection, handleReset, handleClearAll, handleAddPiece, isAddOpen, setIsAddOpen, handleSaveOutfit, onNavigateToFeed, onOpenAuth };
  return <MixCanvasPageDesktop {...viewProps} />;
}
