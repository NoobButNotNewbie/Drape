import { Home, Dna, Shirt, User, Layers } from 'lucide-react';

export default function MobileBottomNav({ activeTab = 'home', setActiveTab }) {
  const tabs = [
    { id: 'home', label: 'Trang chủ', icon: Home },
    { id: 'feed', label: 'Feed', icon: Dna },
    { id: 'wardrobe', label: 'Tủ đồ', icon: Shirt },
    { id: 'canvas', label: 'Tư vấn', icon: Layers },
    { id: 'profile', label: 'Hồ sơ', icon: User },
  ];

  return (
    <nav className="sticky bottom-0 left-0 right-0 z-40 bg-[#FBFBFA]/98 backdrop-blur-md border-t border-[#EAE6DF] px-6 py-2">
      <div className="flex items-center justify-between max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1 transition-colors ${
                isActive ? 'text-[#1A3C24]' : 'text-[#87837A] hover:text-[#36342F]'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 mb-1 ${
                    isActive ? 'stroke-[2.5px]' : 'stroke-[1.75px]'
                  }`}
                />
                {isActive && (
                  <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#1A3C24] rounded-full" />
                )}
              </div>
              <span
                className={`text-[10px] tracking-tight ${
                  isActive ? 'font-bold text-[#1A3C24]' : 'font-medium'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
