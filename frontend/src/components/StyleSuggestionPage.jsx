import React, { useState } from 'react';
import { anchorItems } from '../data/wardrobeFocusData';
import WardrobeFocusMobile from './mobile/WardrobeFocusMobile';
import WardrobeFocusDesktop from './desktop/WardrobeFocusDesktop';

export default function StyleSuggestionPage({
  isMobileFrame,
  onNavigateToCanvas,
  onOpenAuth,
  pieces,
  setPieces,
}) {
  const [selectedItemId, setSelectedItemId] = useState(
    isMobileFrame ? 'navy-cable-knit-sweater' : 'essential-oxford-shirt'
  );
  const [isLiked, setIsLiked] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (message, duration = 2500) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), duration);
  };

  const handleSelectOtherItem = () => {
    const currentIndex = anchorItems.findIndex((item) => item.id === selectedItemId);
    setSelectedItemId(anchorItems[(currentIndex + 1) % anchorItems.length].id);
  };

  // Thêm món đồ mới vào pool wardrobe dùng chung (wardrobePieces ở App.jsx),
  // pool này cũng chính là pool Mix Canvas đang đọc.
  const handleAddPiece = (newPiece) => {
    setPieces((previous) => [newPiece, ...previous]);
    setIsAddOpen(false);
    showToast('Đã thêm món đồ mới vào Tủ đồ của tôi!', 3000);
  };

  const sharedProps = {
    selectedItemId,
    toastMessage,
    onNavigateToCanvas,
    onSelectOtherItem: handleSelectOtherItem,
    isAddOpen,
    onAddOpen: () => setIsAddOpen(true),
    onCloseAdd: () => setIsAddOpen(false),
    onAddPiece: handleAddPiece,
  };

  if (isMobileFrame) {
    return (
      <WardrobeFocusMobile
        {...sharedProps}
        onOpenAuth={onOpenAuth}
      />
    );
  }

  return (
    <WardrobeFocusDesktop
      {...sharedProps}
      isLiked={isLiked}
      onSelectItem={setSelectedItemId}
      onShare={() => showToast('Đã sao chép liên kết trang phục!')}
      onToggleLike={() => {
        setIsLiked((previous) => !previous);
        showToast(
          !isLiked
            ? 'Đã lưu món đồ vào danh sách Yêu thích!'
            : 'Đã xóa khỏi danh sách Yêu thích'
        );
      }}
    />
  );
}