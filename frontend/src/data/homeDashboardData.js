// Mock data for Home Stylist Dashboard (Desktop & Mobile)
export const heroCollection = {
  exclusiveTag: 'COLLECTION EXCLUSIVE',
  seasonalTag: 'SEASONAL COLLECTION',
  title: 'Autumn/Winter 2024: The Modern Minimalist',
  subtitle: 'Dành cho những người đàn ông theo đuổi sự chỉn chu và thanh lịch vượt thời gian.',
  desktopImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1600&q=85',
  mobileImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=85',
};

export const quickActionCards = [
  {
    id: 'styling-ai',
    category: 'STYLING AI',
    title: 'Phối đồ gợi ý',
    desc: 'Sử dụng AI để tạo ra những bộ trang phục phù hợp nhất với vóc dáng và phong cách cá nhân của bạn.',
    actionText: 'Bắt đầu ngay',
    color: 'emerald',
    icon: 'wand',
  },
  {
    id: 'marketplace',
    category: 'MARKETPLACE',
    title: 'Cửa hàng/Sản phẩm',
    desc: 'Khám phá kho lưu trữ được giám tuyển kỹ lưỡng từ các thương hiệu thời trang bền vững hàng đầu.',
    actionText: 'Khám phá',
    color: 'stone',
    icon: 'bag',
  },
];

export const dailySuggestions = [
  {
    id: 'sug-1',
    category: 'OFFICE MINIMAL',
    title: 'Sự lịch lãm tinh tế',
    subtitle: 'Lý tưởng cho các buổi họp quan trọng & ngày làm việc công sở.',
    tags: ['Linen', 'Warm Tone'],
    matchBadge: '95% MATCH',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80',
    flatlay: true,
  },
  {
    id: 'sug-2',
    category: 'WINTER LAYERING',
    title: 'Phong cách đa tầng',
    subtitle: 'Năng động nhưng vẫn giữ được phom dáng trang nhã cho ngày se lạnh.',
    tags: ['Wool', 'Layering'],
    matchBadge: '92% MATCH',
    image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=900&q=80',
    flatlay: false,
  },
  {
    id: 'sug-3',
    category: 'QUIET LUXURY',
    title: 'Quiet Luxury Professional',
    subtitle: 'Lý tưởng cho các buổi họp quan trọng',
    tags: ['Cashmere', 'Tailored'],
    matchBadge: '95% MATCH',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=80',
    flatlay: true,
  },
  {
    id: 'sug-4',
    category: 'SMART CASUAL',
    title: 'Weekend Casual Utility',
    subtitle: 'Năng động nhẹ nhàng cho cuối tuần dạo phố hoặc cà phê gặp gỡ đối tác.',
    tags: ['Cotton', 'Over-shirt'],
    matchBadge: '89% MATCH',
    image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=900&q=80',
    flatlay: true,
  },
];

export const weeklyStyleAnalysis = {
  title: 'Phân tích phong cách tuần này',
  subtitle: 'Hệ thống AI đã nhận thấy bạn đang dần chuyển hướng sang phong cách Nordic Minimalism. Dưới đây là 3 lời khuyên từ chuyên gia tư vấn để tối ưu hóa tủ đồ hiện tại của bạn.',
  quote: 'Phong cách của bạn đang dần chuyển sang hướng Quiet Luxury với sự ưu tiên cho các chất liệu tự nhiên như Linen và Organic Cotton. Sự lựa chọn này rất phù hợp với khí hậu hiện tại.',
  stats: [
    { label: 'TÍNH NHẤT QUÁN', value: '84%' },
    { label: 'XẾP HẠNG PHONG CÁCH', value: 'S+' },
    { label: 'BẢNG MÀU ƯU TIÊN', value: 'Earth' },
  ],
  precisionRate: '74%',
  precisionLabel: 'STYLE PRECISION',
  recommendations: [
    {
      num: '01',
      text: 'Ưu tiên các layer đơn sắc để kéo dài vóc dáng.',
    },
    {
      num: '02',
      text: 'Kết hợp Linen và Len cho sự giao thoa kết cấu tinh tế.',
    },
    {
      num: '03',
      text: 'Chọn giày phom dáng Derby tối giản thay vì sneakers hầm hố cho môi trường công sở.',
    },
  ],
};
