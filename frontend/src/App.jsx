import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import BrandHero from './components/BrandHero';
import CuratedOutfits from './components/CuratedOutfits';
import NewArrivals from './components/NewArrivals';
import Footer from './components/Footer';
import MobileBottomNav from './components/MobileBottomNav';
import ProductModal from './components/ProductModal';
import LookbookModal from './components/LookbookModal';
import DeviceSimulatorBar from './components/DeviceSimulatorBar';
import DesignReferenceModal from './components/DesignReferenceModal';
import HomeDashboardPage from './components/HomeDashboardPage';
import WardrobeFocusPage from './components/WardrobeFocusPage';
import SearchPage from './components/SearchPage';
import FeedPage from './components/FeedPage';
import MixCanvasPage from './components/MixCanvasPage';
import WardrobePage from './components/WardrobePage';
import OutfitDetailPage from './components/OutfitDetailPage';
import AuthModal from './components/AuthModal';
import BrandAuthFlowPage from './components/brand-auth/BrandAuthFlowPage';
import UserAuthFlowPage from './components/user-auth/UserAuthFlowPage';
import MobileBrandAuthFlowPage from './components/mobile-brand-auth/MobileBrandAuthFlowPage';
import MobileUserAuthFlowPage from './components/mobile-user-auth/MobileUserAuthFlowPage';
import { newArrivals, curatedOutfits } from './data/mockData';
import { Wifi, Battery, Signal, Check } from 'lucide-react';

const pageFromPath = (pathname) => {
  if (pathname === '/' || pathname === '/feed') return 'feed';
  if (pathname === '/wardrobe') return 'wardrobe';
  if (pathname === '/mix-canvas' || pathname === '/canvas') return 'canvas';
  if (pathname === '/login') return 'user-auth';
  if (pathname.startsWith('/outfits/')) return 'outfit-detail';
  if (pathname === '/search') return 'search';
  return 'feed';
};

const outfitIdFromPath = (pathname) => pathname.startsWith('/outfits/') ? pathname.split('/')[2] : null;

const pathFromPage = (page, selectedOutfit) => {
  if (page === 'feed') return '/feed';
  if (page === 'wardrobe') return '/wardrobe';
  if (page === 'canvas') return '/mix-canvas';
  if (page === 'outfit-detail') return `/outfits/${selectedOutfit?.id || 'the-modern-minimalist'}`;
  if (page === 'search') return '/search';
  if (page === 'user-auth') return '/login';
  return '/feed';
};

export default function App() {
  const [viewMode, setViewMode] = useState('desktop');
  const [currentPage, setCurrentPage] = useState(() => pageFromPath(window.location.pathname));
  const [showDesignRef, setShowDesignRef] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [activeDesktopTab, setActiveDesktopTab] = useState('feed');
  const [activeMobileTab, setActiveMobileTab] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedOutfit, setSelectedOutfit] = useState(() => {
    const outfitId = outfitIdFromPath(window.location.pathname);
    return outfitId ? { id: outfitId } : null;
  });
  const [wishlist, setWishlist] = useState(['heritage-linen-shirt']);
  const [cart, setCart] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pendingCartItems, setPendingCartItems] = useState([]);
  const [toastMessage, setToastMessage] = useState('');

  // Shortcut ⌘ K / Ctrl + K to go to Search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCurrentPage('search');
        setActiveMobileTab('feed');
        setToastMessage('Đã mở thanh tìm kiếm (⌘ K)');
        setTimeout(() => setToastMessage(''), 2000);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const page = pageFromPath(window.location.pathname);
      const outfitId = outfitIdFromPath(window.location.pathname);
      if (outfitId) setSelectedOutfit({ id: outfitId });
      setCurrentPage(page);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleMobileTabChange = (tabId) => {
    setActiveMobileTab(tabId);
    if (tabId === 'home') {
      handlePageChange('home');
    } else if (tabId === 'feed') {
      handlePageChange('feed');
    } else if (tabId === 'wardrobe') {
      handlePageChange('wardrobe');
    } else if (tabId === 'canvas') {
      handlePageChange('canvas');
    } else if (tabId === 'profile') {
      handlePageChange('brand');
    }
  };

  const handlePageChange = (page) => {
    const nextPath = pathFromPage(page, selectedOutfit);
    if (window.location.pathname !== nextPath) window.history.pushState({ page }, '', nextPath);
    setCurrentPage(page);
    if (page === 'home') {
      setActiveMobileTab('home');
      setActiveDesktopTab('feed');
    } else if (page === 'wardrobe-focus') {
      setActiveMobileTab('wardrobe');
      setActiveDesktopTab('wardrobe');
    } else if (page === 'feed') {
      setActiveMobileTab('feed');
      setActiveDesktopTab('feed');
    } else if (page === 'wardrobe') {
      setActiveMobileTab('wardrobe');
      setActiveDesktopTab('wardrobe');
    } else if (page === 'canvas') {
      setActiveMobileTab('canvas');
      setActiveDesktopTab('mix-canvas');
    } else if (page === 'outfit-detail') {
      // Keep tabs
    } else if (page === 'search') {
      setActiveMobileTab('feed');
    } else if (page === 'brand') {
      setActiveMobileTab('profile');
      setActiveDesktopTab('wardrobe');
    }
  };

  const handleOpenOutfit = (outfit) => {
    setSelectedOutfit(outfit);
    window.history.pushState({ page: 'outfit-detail' }, '', `/outfits/${outfit.id}`);
    setCurrentPage('outfit-detail');
  };

  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      setPendingCartItems((prev) => [...prev, product]);
      handlePageChange('user-auth');
      return;
    }
    setCart((prev) => [...prev, product]);
    setToastMessage(`Added "${product.name}" to your Bag`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleOutfitItemAdd = (item) => {
    handleAddToCart({ ...item, size: 'One size', color: 'Default' });
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    if (pendingCartItems.length) {
      setCart((prev) => [...prev, ...pendingCartItems]);
      setPendingCartItems([]);
      setToastMessage('Đã thêm sản phẩm của outfit vào giỏ hàng');
      setTimeout(() => setToastMessage(''), 3000);
    }
    handlePageChange('outfit-detail');
  };

  // Main Page Content (can be rendered in full screen or inside mobile simulator frame)
  const renderCurrentPage = (isMobile) => {
    // 1. HOME DASHBOARD PAGE
    if (currentPage === 'home') {
      return (
        <div className="bg-[#FBFBFA] min-h-screen text-[#151816] flex flex-col justify-between">
          <div>
            {!isMobile && (
              <Navbar
                isMobileFrame={false}
                activeTab="feed"
                setActiveTab={setActiveDesktopTab}
                onNavigateToHome={() => handlePageChange('home')}
                onNavigateToFeed={() => handlePageChange('feed')}
                onNavigateToWardrobe={() => handlePageChange('wardrobe')}
                onNavigateToCanvas={() => handlePageChange('canvas')}
                onNavigateToSearch={() => handlePageChange('search')}
                onNavigateToBrand={() => handlePageChange('brand')}
                onOpenAuth={() => setIsAuthOpen(true)}
              />
            )}

            <HomeDashboardPage
              isMobileFrame={isMobile}
              onNavigateToCanvas={() => handlePageChange('canvas')}
              onNavigateToWardrobe={() => handlePageChange('wardrobe-focus')}
              onNavigateToSearch={() => handlePageChange('search')}
              onNavigateToBrand={() => handlePageChange('brand')}
              onSelectOutfit={handleOpenOutfit}
              onOpenAuth={() => setIsAuthOpen(true)}
            />
          </div>

          {isMobile && (
            <MobileBottomNav
              activeTab={activeMobileTab}
              setActiveTab={handleMobileTabChange}
            />
          )}
        </div>
      );
    }

    // 2. WARDROBE SELECTION FOCUSED (ANCHOR ITEM) PAGE
    if (currentPage === 'wardrobe-focus') {
      return (
        <div className="bg-[#FBFBFA] min-h-screen text-[#151816] flex flex-col justify-between">
          <div>
            {!isMobile && (
              <Navbar
                isMobileFrame={false}
                activeTab="wardrobe"
                setActiveTab={setActiveDesktopTab}
                onNavigateToHome={() => handlePageChange('home')}
                onNavigateToFeed={() => handlePageChange('feed')}
                onNavigateToWardrobe={() => handlePageChange('wardrobe')}
                onNavigateToCanvas={() => handlePageChange('canvas')}
                onNavigateToSearch={() => handlePageChange('search')}
                onNavigateToBrand={() => handlePageChange('brand')}
                onOpenAuth={() => setIsAuthOpen(true)}
              />
            )}

            <WardrobeFocusPage
              isMobileFrame={isMobile}
              onNavigateToCanvas={() => handlePageChange('canvas')}
              onNavigateToWardrobeList={() => handlePageChange('wardrobe')}
              onOpenAuth={() => setIsAuthOpen(true)}
            />
          </div>

          {isMobile ? (
            <MobileBottomNav
              activeTab={activeMobileTab}
              setActiveTab={handleMobileTabChange}
            />
          ) : (
            <Footer />
          )}
        </div>
      );
    }

    // 3. FEED PAGE
    if (currentPage === 'feed') {
      return (
        <div className="bg-[#FBFBFA] min-h-screen text-[#151816] flex flex-col justify-between">
          <div>
            {!isMobile && (
              <Navbar
                isMobileFrame={false}
                activeTab="feed"
                setActiveTab={setActiveDesktopTab}
                onNavigateToHome={() => handlePageChange('home')}
                onNavigateToFeed={() => handlePageChange('feed')}
                onNavigateToWardrobe={() => handlePageChange('wardrobe')}
                onNavigateToCanvas={() => handlePageChange('canvas')}
                onNavigateToSearch={() => handlePageChange('search')}
                onNavigateToBrand={() => handlePageChange('brand')}
                onOpenAuth={() => setIsAuthOpen(true)}
              />
            )}

            <FeedPage
              isMobileFrame={isMobile}
              onSelectOutfit={handleOpenOutfit}
              onNavigateToCanvas={() => handlePageChange('canvas')}
              onNavigateToSearch={() => handlePageChange('search')}
              onOpenAuth={() => setIsAuthOpen(true)}
            />
          </div>

          {isMobile && (
            <MobileBottomNav
              activeTab={activeMobileTab}
              setActiveTab={handleMobileTabChange}
            />
          )}
        </div>
      );
    }

    // 4. DIGITAL WARDROBE PAGE
    if (currentPage === 'wardrobe') {
      return (
        <div className="bg-[#FBFBFA] min-h-screen text-[#151816] flex flex-col justify-between">
          <div>
            {!isMobile && (
              <Navbar
                isMobileFrame={false}
                activeTab="wardrobe"
                setActiveTab={setActiveDesktopTab}
                onNavigateToFeed={() => handlePageChange('feed')}
                onNavigateToWardrobe={() => handlePageChange('wardrobe')}
                onNavigateToCanvas={() => handlePageChange('canvas')}
                onNavigateToSearch={() => handlePageChange('search')}
                onNavigateToBrand={() => handlePageChange('brand')}
                onOpenAuth={() => setIsAuthOpen(true)}
              />
            )}

            <WardrobePage
              isMobileFrame={isMobile}
              onNavigateToCanvas={() => handlePageChange('canvas')}
              onOpenAuth={() => setIsAuthOpen(true)}
            />
          </div>

          {isMobile ? (
            <MobileBottomNav
              activeTab={activeMobileTab}
              setActiveTab={handleMobileTabChange}
            />
          ) : (
            <Footer />
          )}
        </div>
      );
    }

    // 3. MIX CANVAS PAGE
    if (currentPage === 'canvas') {
      return (
        <div className="bg-[#FBFBFA] min-h-screen text-[#151816] flex flex-col justify-between">
          <div>
            {!isMobile && (
              <Navbar
                isMobileFrame={false}
                activeTab="mix-canvas"
                setActiveTab={setActiveDesktopTab}
                onNavigateToFeed={() => handlePageChange('feed')}
                onNavigateToWardrobe={() => handlePageChange('wardrobe')}
                onNavigateToCanvas={() => handlePageChange('canvas')}
                onNavigateToSearch={() => handlePageChange('search')}
                onNavigateToBrand={() => handlePageChange('brand')}
                onOpenAuth={() => setIsAuthOpen(true)}
              />
            )}

            <MixCanvasPage
              isMobileFrame={isMobile}
              onNavigateToFeed={() => handlePageChange('feed')}
              onNavigateToBrand={() => handlePageChange('brand')}
              onOpenAuth={() => setIsAuthOpen(true)}
            />
          </div>

          {isMobile && (
            <MobileBottomNav
              activeTab={activeMobileTab}
              setActiveTab={handleMobileTabChange}
            />
          )}
        </div>
      );
    }

    // 4. OUTFIT DETAIL PAGE
    if (currentPage === 'outfit-detail') {
      return (
        <div className="bg-[#FBFBFA] min-h-screen text-[#151816] flex flex-col justify-between">
          <div>
            {!isMobile && (
              <Navbar
                isMobileFrame={false}
                activeTab="feed"
                setActiveTab={setActiveDesktopTab}
                onNavigateToFeed={() => handlePageChange('feed')}
                onNavigateToWardrobe={() => handlePageChange('wardrobe')}
                onNavigateToCanvas={() => handlePageChange('canvas')}
                onNavigateToSearch={() => handlePageChange('search')}
                onNavigateToBrand={() => handlePageChange('brand')}
                onOpenAuth={() => setIsAuthOpen(true)}
              />
            )}

            <OutfitDetailPage
              isMobileFrame={isMobile}
              outfitId={selectedOutfit ? selectedOutfit.id : 'the-modern-minimalist'}
              onBack={() => handlePageChange('feed')}
              onNavigateToCanvas={() => handlePageChange('canvas')}
              onOpenAuth={() => setIsAuthOpen(true)}
              onAddToCart={handleOutfitItemAdd}
              isAuthenticated={isAuthenticated}
              onRequireAuth={() => handlePageChange('user-auth')}
            />
          </div>

          {isMobile ? (
            <MobileBottomNav
              activeTab={activeMobileTab}
              setActiveTab={handleMobileTabChange}
            />
          ) : (
            <Footer />
          )}
        </div>
      );
    }

    // 5. SEARCH / DNA PAGE
    if (currentPage === 'search') {
      return (
        <div className="bg-[#FBFBFA] min-h-screen text-[#151816] flex flex-col justify-between">
          <div>
            {!isMobile && (
              <Navbar
                isMobileFrame={false}
                activeTab={activeDesktopTab}
                setActiveTab={setActiveDesktopTab}
                onNavigateToFeed={() => handlePageChange('feed')}
                onNavigateToWardrobe={() => handlePageChange('wardrobe')}
                onNavigateToCanvas={() => handlePageChange('canvas')}
                onNavigateToSearch={() => handlePageChange('search')}
                onNavigateToBrand={() => handlePageChange('brand')}
                onOpenAuth={() => setIsAuthOpen(true)}
              />
            )}

            <SearchPage
              isMobileFrame={isMobile}
              onNavigateToBrand={() => handlePageChange('brand')}
              onOpenAuth={() => setIsAuthOpen(true)}
            />
          </div>

          {isMobile && (
            <MobileBottomNav
              activeTab={activeMobileTab}
              setActiveTab={handleMobileTabChange}
            />
          )}
        </div>
      );
    }

    if (currentPage === 'brand-auth' || currentPage === 'mobile-brand-auth' || currentPage === 'portal-select' || currentPage.startsWith('brand-')) {
      const initialSub = currentPage === 'brand-auth' || currentPage === 'mobile-brand-auth' ? 'portal-select' : currentPage;
      const onToast = (message) => {
        setToastMessage(message);
        setTimeout(() => setToastMessage(''), 3500);
      };

      if (isMobile || currentPage === 'mobile-brand-auth') {
        return <MobileBrandAuthFlowPage initialSubScreen={initialSub} onBackToApp={(page) => handlePageChange(page || 'home')} onNavigateToUser={(page) => handlePageChange(page || 'user-auth')} onToast={onToast} />;
      }

      return <BrandAuthFlowPage initialSubScreen={initialSub} onBackToApp={(page) => handlePageChange(page || 'home')} onNavigateToUser={(page) => handlePageChange(page || 'user-auth')} onToast={onToast} />;
    }

    if (currentPage === 'user-auth' || currentPage === 'mobile-user-auth' || currentPage === 'user-select' || currentPage.startsWith('user-')) {
      const initialSub = currentPage === 'user-auth' || currentPage === 'mobile-user-auth' ? 'user-login' : currentPage === 'user-select' ? 'portal-select' : currentPage;
      const onToast = (message) => {
        setToastMessage(message);
        setTimeout(() => setToastMessage(''), 3500);
      };

      if (isMobile || currentPage === 'mobile-user-auth') {
        return <MobileUserAuthFlowPage initialSubScreen={initialSub} onBackToApp={(page) => handlePageChange(page || 'feed')} onNavigateToBrand={(page) => handlePageChange(page || 'mobile-brand-auth')} onToast={onToast} onAuthSuccess={handleAuthSuccess} />;
      }

      return <UserAuthFlowPage initialSubScreen={initialSub} onBackToApp={(page) => handlePageChange(page || 'feed')} onNavigateToBrand={(page) => handlePageChange(page || 'brand-auth')} onToast={onToast} onAuthSuccess={handleAuthSuccess} />;
    }

    // 6. BRAND PAGE (Linen & Logic)
    return (
      <div className="bg-[#FBFBFA] min-h-screen text-[#151816] flex flex-col justify-between">
        <div>
          {/* Navigation / Header */}
          <Navbar
            isMobileFrame={isMobile}
            activeTab="wardrobe"
            setActiveTab={setActiveDesktopTab}
            onNavigateToFeed={() => handlePageChange('feed')}
            onNavigateToWardrobe={() => handlePageChange('wardrobe')}
            onNavigateToCanvas={() => handlePageChange('canvas')}
            onNavigateToSearch={() => handlePageChange('search')}
            onNavigateToBrand={() => handlePageChange('brand')}
            onOpenAuth={() => setIsAuthOpen(true)}
          />

          {/* Brand Hero Banner */}
          <BrandHero isMobileFrame={isMobile} />

          {/* Curated Outfits */}
          <CuratedOutfits
            isMobileFrame={isMobile}
            onSelectOutfit={(outfit) => {
              setSelectedOutfit(outfit);
              handlePageChange('outfit-detail');
            }}
            onOpenLookbook={(outfit) => {
              setSelectedOutfit(outfit || curatedOutfits[0]);
              handlePageChange('outfit-detail');
            }}
          />

          {/* New Arrivals */}
          <NewArrivals
            isMobileFrame={isMobile}
            onSelectProduct={(product) => setSelectedProduct(product)}
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
          />
        </div>

        {/* Bottom Nav on Mobile, or Full Footer on Desktop */}
        {isMobile ? (
          <MobileBottomNav
            activeTab={activeMobileTab}
            setActiveTab={handleMobileTabChange}
          />
        ) : (
          <Footer />
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F0EFEB] flex flex-col selection:bg-[#1A3C24] selection:text-white">
      {/* Top Device Simulator Controller */}
      <DeviceSimulatorBar
        viewMode={viewMode}
        setViewMode={setViewMode}
        onOpenDesignRef={() => setShowDesignRef(true)}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#16291C] text-white px-4 py-2.5 rounded-lg shadow-xl text-xs flex items-center space-x-2 border border-[#2B4B34] animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main View Area */}
      <main className="flex-1 flex flex-col items-center justify-center">
        {/* 1. Mobile Simulator Mode */}
        {viewMode === 'mobile' && (
          <div className="py-8 px-4 w-full flex justify-center items-center">
            {/* Phone Bezel Frame */}
            <div className="w-[390px] h-[844px] bg-[#1E1E1E] rounded-[48px] p-3 shadow-2xl border-4 border-[#2A2A2A] relative flex flex-col">
              {/* Dynamic Island / Speaker */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-40 flex items-center justify-end px-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#121B2B] border border-blue-900/40"></div>
              </div>

              {/* Status Bar */}
              <div className="bg-[#FBFBFA] rounded-t-[38px] pt-3 px-6 pb-1 flex items-center justify-between text-[11px] font-semibold text-black z-30 select-none">
                <span>9:41</span>
                <div className="flex items-center space-x-1.5 text-black">
                  <Signal className="w-3 h-3" />
                  <Wifi className="w-3 h-3" />
                  <Battery className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Screen Content */}
              <div className="flex-1 bg-[#FBFBFA] overflow-y-auto rounded-b-[38px] relative flex flex-col justify-between">
                {renderCurrentPage(true)}

                {/* Home Indicator */}
                <div className="sticky bottom-0 bg-[#FBFBFA] py-1 flex justify-center z-40">
                  <div className="w-32 h-1 bg-black/30 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. Desktop Forced Mode */}
        {viewMode === 'desktop' && (
          <div className="w-full bg-[#FBFBFA] shadow-lg">
            <div className="w-full">{renderCurrentPage(false)}</div>
          </div>
        )}

        {/* 3. Responsive Mode (Natural Fluid Layout) */}
        {viewMode === 'responsive' && (
          <div className="w-full bg-[#FBFBFA]">
            {/* Mobile View (< 768px) */}
            <div className="block md:hidden">
              {renderCurrentPage(true)}
            </div>

            {/* Desktop View (>= 768px) */}
            <div className="hidden md:block">
              {renderCurrentPage(false)}
            </div>
          </div>
        )}
      </main>

      {/* Modals */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          wishlist={wishlist}
          toggleWishlist={toggleWishlist}
          onAddToCart={handleAddToCart}
        />
      )}

      {selectedOutfit && (
        <LookbookModal
          outfit={selectedOutfit}
          onClose={() => setSelectedOutfit(null)}
          onSelectProduct={(product) => setSelectedProduct(product)}
          products={newArrivals}
        />
      )}

      {showDesignRef && (
        <DesignReferenceModal onClose={() => setShowDesignRef(false)} />
      )}

      {/* Auth Login / Register Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onOpenBrandPortal={() => handlePageChange('brand-auth')}
      />
    </div>
  );
}
