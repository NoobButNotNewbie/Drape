import React, { useState } from 'react';
import { anchorItems } from '../data/wardrobeFocusData';
import WardrobeFocusMobile from './mobile/WardrobeFocusMobile';
import WardrobeFocusDesktop from './desktop/WardrobeFocusDesktop';

export default function WardrobeFocusPage({
  isMobileFrame,
  onNavigateToCanvas,
  onNavigateToWardrobeList,
  onOpenAuth,
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

  const sharedProps = {
    selectedItemId,
    toastMessage,
    onNavigateToCanvas,
    onSelectOtherItem: handleSelectOtherItem,
  };

  if (isMobileFrame) {
    return (
      <WardrobeFocusMobile
        {...sharedProps}
        onNavigateToWardrobeList={onNavigateToWardrobeList}
        onOpenAuth={onOpenAuth}
      />
    );
  }

  return (
    <WardrobeFocusDesktop
      {...sharedProps}
      isLiked={isLiked}
      isAddOpen={isAddOpen}
      onSelectItem={setSelectedItemId}
      onAddOpen={() => setIsAddOpen(true)}
      onCloseAdd={() => setIsAddOpen(false)}
      onAddPiece={() => {
        setIsAddOpen(false);
        showToast('Đã thêm món đồ mới vào Tủ đồ số!', 3000);
      }}
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
