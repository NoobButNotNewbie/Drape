import React, { useMemo, useState } from 'react';
import { initialWardrobeItems } from '../data/canvasData';
import MixCanvasPageMobile from './mobile/MixCanvasPageMobile';
import MixCanvasPageDesktop from './desktop/MixCanvasPageDesktop';

export default function MixCanvasPage({ isMobileFrame, onNavigateToFeed, onNavigateToBrand, onOpenAuth }) {
  const [items, setItems] = useState(initialWardrobeItems);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileTab, setMobileTab] = useState('tops');
  const [showGrid, setShowGrid] = useState(true);
  const [toastMessage, setToastMessage] = useState('');
  const toggleItemSelection = (id) => setItems((previous) => previous.map((item) => item.id === id ? { ...item, selected: !item.selected } : item));
  const showToast = (message, duration) => { setToastMessage(message); setTimeout(() => setToastMessage(''), duration); };
  const handleReset = () => { setItems((previous) => previous.map((item) => ({ ...item, selected: ['item-sweater', 'item-chinos', 'item-shoes'].includes(item.id) }))); showToast('Đã làm mới bảng phối đồ', 2000); };
  const handleClearAll = () => { setItems((previous) => previous.map((item) => ({ ...item, selected: false }))); showToast('Đã xóa tất cả trang phục trên Canvas', 2000); };
  const handleSaveOutfit = () => showToast('Đã lưu bộ đồ vào Tủ đồ thành công!', 2500);
  const canvasItems = useMemo(() => items.filter((item) => item.selected), [items]);
  const totalPrice = useMemo(() => `${canvasItems.reduce((sum, item) => sum + item.price, 0).toLocaleString('vi-VN')}₫`, [canvasItems]);
  const filteredWardrobe = useMemo(() => items.filter((item) => (activeCategory === 'all' || item.category === activeCategory) && item.name.toLowerCase().includes(searchQuery.toLowerCase())), [items, activeCategory, searchQuery]);
  const mobileFilteredItems = useMemo(() => mobileTab === 'my-wardrobe' ? items : items.filter((item) => item.category === mobileTab), [items, mobileTab]);
  const viewProps = { items, canvasItems, totalPrice, filteredWardrobe, mobileFilteredItems, activeCategory, setActiveCategory, searchQuery, setSearchQuery, mobileTab, setMobileTab, showGrid, setShowGrid, toastMessage, toggleItemSelection, handleReset, handleClearAll, handleSaveOutfit, onNavigateToFeed, onNavigateToBrand, onOpenAuth };
  return isMobileFrame ? <MixCanvasPageMobile {...viewProps} /> : <MixCanvasPageDesktop {...viewProps} />;
}
