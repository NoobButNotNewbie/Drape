import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductModal from './components/ProductModal';
import LookbookModal from './components/LookbookModal';
import AdminDashboardPage from './components/AdminDashboardPage';
import StyleSuggestionPage from './components/StyleSuggestionPage';
import SearchPage from './components/SearchPage';
import FeedPage from './components/FeedPage';
import MixCanvasPage from './components/MixCanvasPage';
import OutfitDetailPage from './components/OutfitDetailPage';
import UserAuthFlowPage from './components/user-auth/UserAuthFlowPage';
import { supabase } from './lib/supabase';
import { newArrivals, curatedOutfits } from './data/mockData';
import { initialWardrobePieces } from './data/wardrobeData';
import { Wifi, Battery, Signal, Check } from 'lucide-react';

const pageFromPath = (pathname) => {
  if (pathname === '/' || pathname === '/feed') return 'feed';
  if (pathname === '/wardrobe') return 'wardrobe-focus';
  if (pathname === '/mix-canvas' || pathname === '/canvas') return 'canvas';
  if (pathname === '/login') return 'user-auth';
  if (pathname === '/admin') return 'admin';
  if (pathname.startsWith('/outfits/')) return 'outfit-detail';
  if (pathname === '/search') return 'search';
  return 'feed';
};

const outfitIdFromPath = (pathname) => pathname.startsWith('/outfits/') ? pathname.split('/')[2] : null;

const pathFromPage = (page, selectedOutfit) => {
  if (page === 'feed') return '/feed';
  if (page === 'wardrobe-focus') return '/wardrobe';
  if (page === 'canvas') return '/mix-canvas';
  if (page === 'outfit-detail') return `/outfits/${selectedOutfit?.id || 'the-modern-minimalist'}`;
  if (page === 'search') return '/search';
  if (page === 'user-auth') return '/login';
  if (page === 'admin') return '/admin';
  return '/feed';
};

export default function App() {
  const [currentPage, setCurrentPage] = useState(() => pageFromPath(window.location.pathname));
  const [activeDesktopTab, setActiveDesktopTab] = useState('feed');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedOutfit, setSelectedOutfit] = useState(() => {
    const outfitId = outfitIdFromPath(window.location.pathname);
    const pendingOutfitId = sessionStorage.getItem('drape_auth_outfit_id');
    return outfitId ? { id: outfitId } : pendingOutfitId ? { id: pendingOutfitId } : null;
  });
  const [wishlist, setWishlist] = useState(['heritage-linen-shirt']);
  const [cart, setCart] = useState([]);
  const [wardrobePieces, setWardrobePieces] = useState(initialWardrobePieces);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [authInitialScreen, setAuthInitialScreen] = useState('user-login');
  const [showAccountPanel, setShowAccountPanel] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [pendingCartItems, setPendingCartItems] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem('drape_pending_cart') || '[]');
    } catch {
      return [];
    }
  });
  const [toastMessage, setToastMessage] = useState('');

  // Shortcut ⌘ K / Ctrl + K to go to Search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCurrentPage('search');
        setToastMessage('Đã mở thanh tìm kiếm (⌘ K)');
        setTimeout(() => setToastMessage(''), 2000);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    let mounted = true;
    const restorePendingAuth = () => {
      const pendingOutfitId = sessionStorage.getItem('drape_auth_outfit_id');
      if (!pendingOutfitId) {
        if (window.location.pathname === '/login') {
          window.history.replaceState({ page: 'feed' }, '', '/feed');
          setCurrentPage('feed');
        }
        return;
      }
      let pendingItems = [];
      try {
        pendingItems = JSON.parse(sessionStorage.getItem('drape_pending_cart') || '[]');
      } catch {
        pendingItems = [];
      }
      setCart((prev) => [...prev, ...pendingItems]);
      setPendingCartItems([]);
      sessionStorage.removeItem('drape_pending_cart');
      sessionStorage.removeItem('drape_auth_outfit_id');
      window.history.replaceState({ page: 'outfit-detail' }, '', `/outfits/${pendingOutfitId}`);
      setCurrentPage('outfit-detail');
      setToastMessage('Đã thêm sản phẩm của outfit vào giỏ hàng');
      setTimeout(() => setToastMessage(''), 3000);
    };
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (mounted && session?.user) {
        setIsAuthenticated(true);
        setCurrentUser(session.user);
        restorePendingAuth();
      }
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        setAuthInitialScreen('user-reset');
        setCurrentPage('user-auth');
        return;
      }
      if (session?.user) {
        setIsAuthenticated(true);
        setCurrentUser(session.user);
        restorePendingAuth();
      } else {
        setIsAuthenticated(false);
        setCurrentUser(null);
      }
    });
    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
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

  const handlePageChange = (page) => {
    const nextPath = pathFromPage(page, selectedOutfit);
    if (window.location.pathname !== nextPath) window.history.pushState({ page }, '', nextPath);
    setCurrentPage(page);
    if (page === 'wardrobe-focus') {
      setActiveDesktopTab('wardrobe');
    } else if (page === 'feed') {
      setActiveDesktopTab('feed');
    } else if (page === 'canvas') {
      setActiveDesktopTab('mix-canvas');
    } else if (page === 'search') {
      setActiveDesktopTab('feed');
    } else if (page === 'admin') {
      setActiveDesktopTab('feed');
    }
  };

  const handleOpenAuth = () => {
    setShowNotifications(false);
    if (isAuthenticated) setShowAccountPanel(true);
    else handlePageChange('user-auth');
  };

  const handleOpenNotifications = () => {
    setShowAccountPanel(false);
    setShowNotifications(true);
  };

  const handleNavigateToAdmin = () => {
    setShowAccountPanel(false);
    handlePageChange('admin');
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setShowAccountPanel(false);
    handlePageChange('feed');
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
      const nextPendingItems = [...pendingCartItems, product];
      setPendingCartItems(nextPendingItems);
      sessionStorage.setItem('drape_pending_cart', JSON.stringify(nextPendingItems));
      if (selectedOutfit?.id) sessionStorage.setItem('drape_auth_outfit_id', selectedOutfit.id);
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

  const handleAuthSuccess = (user) => {
    setIsAuthenticated(true);
    if (user) setCurrentUser(user);
    if (pendingCartItems.length) {
      setCart((prev) => [...prev, ...pendingCartItems]);
      setPendingCartItems([]);
      sessionStorage.removeItem('drape_pending_cart');
      setToastMessage('Đã thêm sản phẩm của outfit vào giỏ hàng');
      setTimeout(() => setToastMessage(''), 3000);
    }
    if (sessionStorage.getItem('drape_auth_outfit_id')) {
      sessionStorage.removeItem('drape_auth_outfit_id');
      handlePageChange('outfit-detail');
    } else {
      handlePageChange('feed');
    }
  };

  // Main Page Content
  const renderCurrentPage = () => {
    if (currentPage === 'wardrobe-focus') {
      return (
        <div className="bg-[#FBFBFA] min-h-screen text-[#151816] flex flex-col justify-between">
          <div>
            <Navbar
              activeTab="wardrobe"
              setActiveTab={setActiveDesktopTab}
              onNavigateToFeed={() => handlePageChange('feed')}
              onNavigateToWardrobe={() => handlePageChange('wardrobe-focus')}
              onNavigateToCanvas={() => handlePageChange('canvas')}
              onNavigateToSearch={() => handlePageChange('search')}
              onOpenAuth={handleOpenAuth}
              onOpenNotifications={handleOpenNotifications}
              currentUser={currentUser}
            />

            <StyleSuggestionPage
              onNavigateToCanvas={() => handlePageChange('canvas')}
              onOpenAuth={handleOpenAuth}
              onOpenNotifications={handleOpenNotifications}
              pieces={wardrobePieces}
              setPieces={setWardrobePieces}
            />
          </div>

          <Footer />
        </div>
      );
    }

    if (currentPage === 'admin') {
      return (
        <div className="bg-[#FBFBFA] min-h-screen text-[#151816] flex flex-col justify-between">
          <div>
            <Navbar
              activeTab="feed"
              setActiveTab={setActiveDesktopTab}
              onNavigateToFeed={() => handlePageChange('feed')}
              onNavigateToWardrobe={() => handlePageChange('wardrobe-focus')}
              onNavigateToCanvas={() => handlePageChange('canvas')}
              onNavigateToSearch={() => handlePageChange('search')}
              onNavigateToAdmin={handleNavigateToAdmin}
              onOpenAuth={handleOpenAuth}
              onOpenNotifications={handleOpenNotifications}
              currentUser={currentUser}
            />

            <AdminDashboardPage />
          </div>
        </div>
      );
    }

    if (currentPage === 'feed') {
      return (
        <div className="bg-[#FBFBFA] min-h-screen text-[#151816] flex flex-col justify-between">
          <div>
            <Navbar
              activeTab="feed"
              setActiveTab={setActiveDesktopTab}
              onNavigateToFeed={() => handlePageChange('feed')}
              onNavigateToWardrobe={() => handlePageChange('wardrobe-focus')}
              onNavigateToCanvas={() => handlePageChange('canvas')}
              onNavigateToSearch={() => handlePageChange('search')}
              onNavigateToAdmin={handleNavigateToAdmin}
              onOpenAuth={handleOpenAuth}
              onOpenNotifications={handleOpenNotifications}
              currentUser={currentUser}
            />

            <FeedPage
              onSelectOutfit={handleOpenOutfit}
              onNavigateToCanvas={() => handlePageChange('canvas')}
              onNavigateToSearch={() => handlePageChange('search')}
              onOpenAuth={handleOpenAuth}
              onOpenNotifications={handleOpenNotifications}
            />
          </div>
        </div>
      );
    }

    if (currentPage === 'canvas') {
      return (
        <div className="bg-[#FBFBFA] min-h-screen text-[#151816] flex flex-col justify-between">
          <div>
            <Navbar
              activeTab="mix-canvas"
              setActiveTab={setActiveDesktopTab}
              onNavigateToFeed={() => handlePageChange('feed')}
              onNavigateToWardrobe={() => handlePageChange('wardrobe-focus')}
              onNavigateToCanvas={() => handlePageChange('canvas')}
              onNavigateToSearch={() => handlePageChange('search')}
              onOpenAuth={handleOpenAuth}
              onOpenNotifications={handleOpenNotifications}
              currentUser={currentUser}
            />

            <MixCanvasPage
              onNavigateToFeed={() => handlePageChange('feed')}
              onOpenAuth={handleOpenAuth}
              onOpenNotifications={handleOpenNotifications}
              wardrobePieces={wardrobePieces}
              setWardrobePieces={setWardrobePieces}
            />
          </div>
        </div>
      );
    }

    if (currentPage === 'outfit-detail') {
      return (
        <div className="bg-[#FBFBFA] min-h-screen text-[#151816] flex flex-col justify-between">
          <div>
            <Navbar
              activeTab="feed"
              setActiveTab={setActiveDesktopTab}
              onNavigateToFeed={() => handlePageChange('feed')}
              onNavigateToWardrobe={() => handlePageChange('wardrobe-focus')}
              onNavigateToCanvas={() => handlePageChange('canvas')}
              onNavigateToSearch={() => handlePageChange('search')}
              onOpenAuth={handleOpenAuth}
              onOpenNotifications={handleOpenNotifications}
              currentUser={currentUser}
            />

            <OutfitDetailPage
              outfitId={selectedOutfit ? selectedOutfit.id : 'the-modern-minimalist'}
              onBack={() => handlePageChange('feed')}
              onNavigateToCanvas={() => handlePageChange('canvas')}
              onOpenAuth={handleOpenAuth}
              onOpenNotifications={handleOpenNotifications}
              onAddToCart={handleOutfitItemAdd}
              isAuthenticated={isAuthenticated}
              onRequireAuth={() => handlePageChange('user-auth')}
            />
          </div>

          <Footer />
        </div>
      );
    }

    if (currentPage === 'search') {
      return (
        <div className="bg-[#FBFBFA] min-h-screen text-[#151816] flex flex-col justify-between">
          <div>
            <Navbar
              activeTab={activeDesktopTab}
              setActiveTab={setActiveDesktopTab}
              onNavigateToFeed={() => handlePageChange('feed')}
              onNavigateToWardrobe={() => handlePageChange('wardrobe-focus')}
              onNavigateToCanvas={() => handlePageChange('canvas')}
              onNavigateToSearch={() => handlePageChange('search')}
              onOpenAuth={handleOpenAuth}
              onOpenNotifications={handleOpenNotifications}
            />

            <SearchPage
              onOpenAuth={handleOpenAuth}
              onOpenNotifications={handleOpenNotifications}
            />
          </div>
        </div>
      );
    }

    if (currentPage === 'user-auth' || currentPage === 'user-select' || currentPage.startsWith('user-')) {
      const initialSub = currentPage === 'user-auth' ? authInitialScreen : currentPage === 'user-select' ? 'user-login' : currentPage;
      const onToast = (message) => {
        setToastMessage(message);
        setTimeout(() => setToastMessage(''), 3500);
      };

      return <UserAuthFlowPage initialSubScreen={initialSub} onBackToApp={(page) => handlePageChange(page || 'feed')} onToast={onToast} onAuthSuccess={handleAuthSuccess} />;
    }

    return (
      <div className="bg-[#FBFBFA] min-h-screen text-[#151816] flex flex-col justify-between">
        <div>
          <Navbar
            activeTab="feed"
            setActiveTab={setActiveDesktopTab}
            onNavigateToFeed={() => handlePageChange('feed')}
            onNavigateToWardrobe={() => handlePageChange('wardrobe-focus')}
            onNavigateToCanvas={() => handlePageChange('canvas')}
            onNavigateToSearch={() => handlePageChange('search')}
            onOpenAuth={handleOpenAuth}
            currentUser={currentUser}
          />

          <FeedPage
            onSelectOutfit={handleOpenOutfit}
            onNavigateToCanvas={() => handlePageChange('canvas')}
            onNavigateToSearch={() => handlePageChange('search')}
            onOpenAuth={handleOpenAuth}
            onOpenNotifications={handleOpenNotifications}
          />
        </div>

        <Footer />
      </div>
    );
  };


  return (
    <div className="min-h-screen bg-[#F0EFEB] flex flex-col selection:bg-[#1A3C24] selection:text-white">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#16291C] text-white px-4 py-2.5 rounded-lg shadow-xl text-xs flex items-center space-x-2 border border-[#2B4B34] animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {showNotifications && (
        <div className="fixed top-20 right-20 z-50 w-72 rounded-xl border border-[#E2DDD3] bg-white p-5 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="font-serif-luxury text-base font-bold text-[#183B22]">Thông báo</h3>
            <button onClick={() => setShowNotifications(false)} className="text-xs text-[#706C64]">Đóng</button>
          </div>
          <p className="mt-5 text-center text-xs text-[#8C8880]">Chưa có thông báo mới.</p>
        </div>
      )}

      {showAccountPanel && isAuthenticated && (
        <div className="fixed top-20 right-5 z-50 w-72 rounded-xl border border-[#E2DDD3] bg-white p-5 shadow-xl">
          <h3 className="font-serif-luxury text-base font-bold text-[#183B22]">Tài khoản Drape</h3>
          <div className="mt-3 flex items-center gap-3">
            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-[#D5CEC2] bg-[#E5DFD5] flex items-center justify-center text-[#1A3C24]">
              {currentUser?.user_metadata?.avatar_url || currentUser?.user_metadata?.picture ? (
                <img src={currentUser.user_metadata.avatar_url || currentUser.user_metadata.picture} alt="" className="h-full w-full object-cover" />
              ) : <span className="text-sm font-semibold">{(currentUser?.user_metadata?.full_name || currentUser?.user_metadata?.name || currentUser?.email || 'D').charAt(0).toUpperCase()}</span>}
            </div>
            <p className="break-all text-xs text-[#706C64]">{currentUser?.user_metadata?.full_name || currentUser?.user_metadata?.name || currentUser?.user_metadata?.display_name || currentUser?.email || 'Tài khoản Drape'}</p>
          </div>
          <button onClick={handleSignOut} className="mt-5 w-full rounded-md bg-[#183B22] px-3 py-2 text-xs font-semibold text-white">Đăng xuất</button>
        </div>
      )}

      <main className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full bg-[#FBFBFA] shadow-lg">
          <div className="w-full">{renderCurrentPage()}</div>
        </div>
      </main>

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
    </div>
  );
}