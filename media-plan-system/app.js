/* ============================================================
   Media Plan Pro – Application Logic v2.0
   6 Sheets: Báo giá | Road Map | KPI | Keyword | Audience | Content
   ============================================================ */

/* ---- Constants ---- */
const CHANNELS = [
  { id: 'facebook',    name: 'Facebook Ads',          icon: '📘',
    formats: ['Image Ads', 'Video Ads', 'Carousel Ads', 'Collection Ads', 'Stories Ads', 'Reels Ads', 'Lead Generation'],
    defPricing: 'CPM', defPrice: 50000 },
  { id: 'instagram',   name: 'Instagram Ads',         icon: '📸',
    formats: ['Image Ads', 'Video Ads', 'Carousel Ads', 'Stories Ads', 'Reels Ads'],
    defPricing: 'CPM', defPrice: 55000 },
  { id: 'gg_search',   name: 'Google Search Ads',     icon: '🔍',
    formats: ['Responsive Search Ads', 'Dynamic Search Ads', 'Call Ads'],
    defPricing: 'CPC', defPrice: 12000 },
  { id: 'gg_display',  name: 'Google Display (GDN)',  icon: '🖥️',
    formats: ['Responsive Display Ads', 'Image Banner', 'Gmail Ads', 'Smart Display'],
    defPricing: 'CPM', defPrice: 20000 },
  { id: 'youtube',     name: 'YouTube Ads',           icon: '▶️',
    formats: ['TrueView In-Stream', 'Bumper Ads (6s)', 'Non-Skippable', 'Discovery Ads'],
    defPricing: 'CPV', defPrice: 300 },
  { id: 'tiktok',      name: 'TikTok Ads',            icon: '🎵',
    formats: ['TopView', 'Brand Takeover', 'In-Feed Video', 'Spark Ads', 'Branded Hashtag'],
    defPricing: 'CPM', defPrice: 45000 },
  { id: 'zalo',        name: 'Zalo Ads',              icon: '💬',
    formats: ['Zalo Display Ads', 'Zalo Follow Ads', 'Zalo Article Ads', 'Zalo OA'],
    defPricing: 'CPM', defPrice: 25000 },
  { id: 'native',      name: 'Native Ads / Báo điện tử', icon: '📰',
    formats: ['Native Article', 'Display Banner', 'Video Native', 'Content Marketing'],
    defPricing: 'CPM', defPrice: 30000 },
  { id: 'ooh',         name: 'OOH / Billboard',       icon: '🏙️',
    formats: ['Billboard Tĩnh', 'DOOH / LED Screen', 'Airport Ads', 'Metro Ads'],
    defPricing: 'Fixed', defPrice: 50000000 },
  { id: 'influencer',  name: 'Influencer Marketing',  icon: '⭐',
    formats: ['Facebook Post', 'Instagram Post', 'TikTok Video', 'YouTube Review', 'Facebook Live'],
    defPricing: 'Fixed', defPrice: 20000000 },
  { id: 'seo_content', name: 'SEO / Content',         icon: '✍️',
    formats: ['Blog Articles', 'Landing Page', 'Infographic', 'Video Script'],
    defPricing: 'Fixed', defPrice: 5000000 },
  { id: 'email',       name: 'Email Marketing',       icon: '📧',
    formats: ['Newsletter', 'Promotion Email', 'Transactional Email'],
    defPricing: 'Fixed', defPrice: 3000000 },
  { id: 'sms',         name: 'SMS Marketing',         icon: '📱',
    formats: ['SMS Brandname', 'SMS OTP'],
    defPricing: 'CPM', defPrice: 280000 },
  { id: 'other',       name: 'Khác (Custom)',         icon: '🎯',
    formats: ['Custom'],
    defPricing: 'Fixed', defPrice: 0 },
];

const PRICING_TYPES = ['CPM', 'CPC', 'CPV', 'CPL', 'Fixed'];

const OBJECTIVES = [
  'Brand Awareness', 'Reach & Frequency', 'Traffic', 'Engagement',
  'Lead Generation', 'App Install', 'Video Views', 'Conversions', 'Sales'
];

const STATUS_LABELS = {
  draft: 'Nháp', sent: 'Đã gửi', approved: 'Đã duyệt',
  rejected: 'Từ chối', expired: 'Hết hạn'
};

/* ---- New: Activity Types for Road Map ---- */
const ACTIVITY_TYPES = [
  { id: 'planning',  label: 'Lên kế hoạch',      cls: 'activity-planning',  dot: '#3b82f6' },
  { id: 'creative',  label: 'Sản xuất Creative',  cls: 'activity-creative',  dot: '#f59e0b' },
  { id: 'launch',    label: 'Triển khai',         cls: 'activity-launch',    dot: '#10b981' },
  { id: 'optimize',  label: 'Tối ưu hóa',        cls: 'activity-optimize',  dot: '#f97316' },
  { id: 'report',    label: 'Báo cáo & Đánh giá', cls: 'activity-report',    dot: '#64748b' },
  { id: 'meeting',   label: 'Họp & Review',       cls: 'activity-meeting',   dot: '#8b5cf6' },
];

/* ---- New: Channel Benchmarks for KPI auto-calc ---- */
const CHANNEL_BENCHMARKS = {
  facebook:    { ctr: 0.015, cvr: 0.020, reach_pct: 0.70 },
  instagram:   { ctr: 0.012, cvr: 0.018, reach_pct: 0.65 },
  gg_search:   { ctr: 0.050, cvr: 0.030, reach_pct: 0.90 },
  gg_display:  { ctr: 0.003, cvr: 0.010, reach_pct: 0.80 },
  youtube:     { ctr: 0.005, cvr: 0.008, reach_pct: 0.75 },
  tiktok:      { ctr: 0.010, cvr: 0.015, reach_pct: 0.60 },
  zalo:        { ctr: 0.020, cvr: 0.025, reach_pct: 0.70 },
  native:      { ctr: 0.008, cvr: 0.012, reach_pct: 0.80 },
  ooh:         { ctr: 0.000, cvr: 0.000, reach_pct: 1.00 },
  influencer:  { ctr: 0.030, cvr: 0.015, reach_pct: 0.50 },
  seo_content: { ctr: 0.020, cvr: 0.010, reach_pct: 0.90 },
  email:       { ctr: 0.150, cvr: 0.050, reach_pct: 1.00 },
  sms:         { ctr: 0.080, cvr: 0.030, reach_pct: 1.00 },
  other:       { ctr: 0.010, cvr: 0.010, reach_pct: 0.70 },
};

/* ---- New: Interest Categories ---- */
const INTEREST_CATEGORIES = [
  'Thời trang & Làm đẹp', 'Ẩm thực & Nấu ăn', 'Du lịch & Phượt',
  'Sức khỏe & Fitness', 'Công nghệ & Gadget', 'Ô tô & Xe máy',
  'Thể thao', 'Âm nhạc & Nghệ thuật', 'Giáo dục & Học tập',
  'Tài chính & Đầu tư', 'Gaming', 'Phim ảnh & Giải trí',
  'Gia đình & Trẻ em', 'Bất động sản & Nội thất',
  'Mua sắm Online', 'Startup & Kinh doanh',
];

/* ---- New: Industry AI Data ---- */
const INDUSTRY_AI = {
  'Thời trang & Phụ kiện': {
    keywords: [
      { keyword: 'thời trang nữ đẹp', volume: 90500, cpc: 3200, competition: 'high', type: 'generic', priority: 'p1', difficulty: 72 },
      { keyword: 'shop quần áo nữ online', volume: 74000, cpc: 2800, competition: 'high', type: 'generic', priority: 'p1', difficulty: 68 },
      { keyword: 'áo sơ mi nữ công sở', volume: 49500, cpc: 2100, competition: 'medium', type: 'longtail', priority: 'p2', difficulty: 55 },
      { keyword: 'set đồ nữ dễ thương', volume: 33100, cpc: 1800, competition: 'medium', type: 'longtail', priority: 'p2', difficulty: 48 },
      { keyword: 'váy đầm dự tiệc cao cấp', volume: 22200, cpc: 3500, competition: 'medium', type: 'longtail', priority: 'p2', difficulty: 51 },
      { keyword: 'thời trang xuất khẩu giá tốt', volume: 12100, cpc: 1500, competition: 'low', type: 'longtail', priority: 'p3', difficulty: 32 },
    ],
    audience: { ageMin:18, ageMax:35, gender:'female', income:'8-25 triệu/tháng', education:'Trung cấp, Đại học', locations:'TP.HCM, Hà Nội, Đà Nẵng', interests:['Thời trang & Làm đẹp','Mua sắm Online'], behaviors:'Hay mua hàng qua livestream, theo dõi fashion blogger, so sánh giá trước khi mua' },
    tones: ['friendly','inspiring','youthful'],
    pillars: [
      { title:'Sản phẩm & Style Tip', description:'Giới thiệu sản phẩm mới, hướng dẫn phối đồ', examples:'Video "5 cách mix đồ với áo trắng", Lookbook BST mới' },
      { title:'Behind The Scenes', description:'Câu chuyện thương hiệu, quy trình sản xuất', examples:'Video xưởng may, story nguồn gốc chất liệu' },
      { title:'User Generated Content', description:'Nội dung từ khách hàng thực tế', examples:'Repost ảnh KH mặc đồ, review thật từ người dùng' },
      { title:'Flash Sale & Promotion', description:'Thông báo ưu đãi, sự kiện đặc biệt', examples:'Countdown sale, Limited edition drop' },
    ],
  },
  'Thực phẩm & Đồ uống': {
    keywords: [
      { keyword: 'cà phê take away ngon', volume: 40500, cpc: 1500, competition: 'medium', type: 'generic', priority: 'p1', difficulty: 45 },
      { keyword: 'quán cà phê không gian đẹp', volume: 33100, cpc: 1200, competition: 'medium', type: 'longtail', priority: 'p1', difficulty: 42 },
      { keyword: 'đồ uống healthy', volume: 27100, cpc: 1800, competition: 'medium', type: 'generic', priority: 'p2', difficulty: 50 },
      { keyword: 'trà sữa ngon TP.HCM', volume: 22200, cpc: 900, competition: 'low', type: 'longtail', priority: 'p2', difficulty: 38 },
      { keyword: 'đặt đồ ăn online giao nhanh', volume: 18100, cpc: 2200, competition: 'high', type: 'generic', priority: 'p2', difficulty: 65 },
      { keyword: 'menu cà phê giá rẻ', volume: 9900, cpc: 700, competition: 'low', type: 'longtail', priority: 'p3', difficulty: 28 },
    ],
    audience: { ageMin:16, ageMax:35, gender:'all', income:'5-20 triệu/tháng', education:'Học sinh, Sinh viên, Đại học', locations:'TP.HCM, Hà Nội', interests:['Ẩm thực & Nấu ăn','Du lịch & Phượt'], behaviors:'Check-in quán mới, share ảnh đồ ăn lên MXH, review trên Google Maps' },
    tones: ['friendly','youthful','emotional'],
    pillars: [
      { title:'Menu Showcase', description:'Giới thiệu món mới, đồ uống theo mùa', examples:'Video latte art, ảnh product flat lay đẹp' },
      { title:'Lifestyle & Mood', description:'Không gian quán, cảm xúc khi thưởng thức', examples:'Ảnh morning coffee vibe, set-up làm việc tại quán' },
      { title:'Promotion & Combo', description:'Ưu đãi theo giờ, combo tiết kiệm', examples:'Happy hour 2-5pm, mua 2 tặng 1' },
      { title:'Community', description:'Sự kiện tại quán, cộng đồng khách hàng', examples:'Acoustic night, workshop latte art' },
    ],
  },
  'Công nghệ & Phần mềm': {
    keywords: [
      { keyword: 'phần mềm quản lý doanh nghiệp', volume: 22200, cpc: 8500, competition: 'high', type: 'generic', priority: 'p1', difficulty: 75 },
      { keyword: 'phần mềm CRM cho SME', volume: 9900, cpc: 12000, competition: 'high', type: 'longtail', priority: 'p1', difficulty: 70 },
      { keyword: 'app quản lý nhân sự', volume: 14800, cpc: 7200, competition: 'medium', type: 'generic', priority: 'p1', difficulty: 62 },
      { keyword: 'giải pháp ERP cloud', volume: 6600, cpc: 15000, competition: 'medium', type: 'longtail', priority: 'p2', difficulty: 58 },
      { keyword: 'phần mềm kế toán online miễn phí', volume: 18100, cpc: 5000, competition: 'high', type: 'longtail', priority: 'p2', difficulty: 68 },
      { keyword: 'SaaS B2B Vietnam', volume: 2900, cpc: 18000, competition: 'low', type: 'longtail', priority: 'p3', difficulty: 40 },
    ],
    audience: { ageMin:25, ageMax:50, gender:'all', income:'20-80 triệu/tháng', education:'Đại học, Sau đại học', locations:'TP.HCM, Hà Nội, Bình Dương', interests:['Startup & Kinh doanh','Công nghệ & Gadget','Tài chính & Đầu tư'], behaviors:'Đọc TechInAsia, theo dõi LinkedIn, tham gia hội thảo kinh doanh' },
    tones: ['professional','trustworthy','educational'],
    pillars: [
      { title:'Product Education', description:'Hướng dẫn tính năng, use-case thực tế', examples:'Demo video 2 phút, webinar live, case study' },
      { title:'Social Proof', description:'Câu chuyện khách hàng thành công', examples:'Video testimonial CEO, before/after ROI' },
      { title:'Industry Insights', description:'Xu hướng ngành, báo cáo thị trường', examples:'Infographic "5 lỗi quản lý phổ biến", E-book miễn phí' },
      { title:'Product Update', description:'Tính năng mới, roadmap sản phẩm', examples:'Release note video, changelog newsletter' },
    ],
  },
  'Bất động sản': {
    keywords: [
      { keyword: 'mua căn hộ TP.HCM', volume: 60500, cpc: 18000, competition: 'high', type: 'generic', priority: 'p1', difficulty: 80 },
      { keyword: 'căn hộ giá rẻ dưới 2 tỷ', volume: 33100, cpc: 12000, competition: 'high', type: 'longtail', priority: 'p1', difficulty: 75 },
      { keyword: 'dự án nhà phố mới mở bán', volume: 18100, cpc: 22000, competition: 'medium', type: 'longtail', priority: 'p1', difficulty: 65 },
      { keyword: 'căn hộ view sông Sài Gòn', volume: 9900, cpc: 25000, competition: 'medium', type: 'longtail', priority: 'p2', difficulty: 55 },
      { keyword: 'nhà đất Bình Dương dân cư đông', volume: 14800, cpc: 8000, competition: 'low', type: 'longtail', priority: 'p2', difficulty: 45 },
    ],
    audience: { ageMin:28, ageMax:55, gender:'all', income:'25-150 triệu/tháng', education:'Đại học trở lên', locations:'TP.HCM, Bình Dương, Đồng Nai', interests:['Bất động sản & Nội thất','Tài chính & Đầu tư'], behaviors:'Tìm kiếm thông tin dự án, so sánh vị trí, quan tâm lãi suất ngân hàng' },
    tones: ['professional','trustworthy'],
    pillars: [
      { title:'Dự Án & Vị Trí', description:'Giới thiệu dự án, lợi thế vị trí', examples:'Video flycam, 3D walkthrough căn hộ mẫu' },
      { title:'Chính Sách & Ưu Đãi', description:'Gói thanh toán, hỗ trợ vay', examples:'Infographic tiến độ thanh toán, so sánh ngân hàng' },
      { title:'Lifestyle', description:'Cuộc sống tại khu vực, tiện ích xung quanh', examples:'Video hàng xóm tốt, bản đồ tiện ích' },
    ],
  },
};

/* ---- Pre-built Templates (3 complete examples) ---- */
const TEMPLATES = [
  {
    id: 'ecommerce_fashion',
    name: 'E-commerce – Thời Trang Nữ',
    icon: '👗',
    description: 'Ra mắt BST, tăng doanh số online. Facebook + Instagram + TikTok + Google.',
    industry: 'Thời trang & Phụ kiện',
    color: 'pink',
    data: {
      clientCompany: 'Thời Trang Lily Fashion', clientIndustry: 'Thời trang & Phụ kiện',
      clientContact: 'Nguyễn Thu Hà', clientPosition: 'Marketing Manager',
      campaignName: 'Ra mắt BST Thu Đông 2026 – Lily Collection',
      campaignObjectives: ['Brand Awareness','Traffic','Sales'],
      targetAudience: 'Phụ nữ 20-35 tuổi, yêu thích thời trang, mua sắm online, thu nhập trung khá tại TP.HCM và Hà Nội',
      ageRange: '20-35', gender: 'female', location: 'TP.HCM, Hà Nội, Đà Nẵng',
      items: [
        { channelId:'facebook', channelName:'Facebook Ads', format:'Video Ads', objective:'Brand Awareness', pricingType:'CPM', unitPrice:52000, quantity:1500000, budget:78000000, duration:45 },
        { channelId:'instagram', channelName:'Instagram Ads', format:'Reels Ads', objective:'Traffic', pricingType:'CPM', unitPrice:58000, quantity:800000, budget:46400000, duration:45 },
        { channelId:'tiktok', channelName:'TikTok Ads', format:'In-Feed Video', objective:'Video Views', pricingType:'CPM', unitPrice:48000, quantity:1000000, budget:48000000, duration:45 },
        { channelId:'gg_search', channelName:'Google Search Ads', format:'Responsive Search Ads', objective:'Sales', pricingType:'CPC', unitPrice:3500, quantity:8000, budget:28000000, duration:45 },
        { channelId:'influencer', channelName:'Influencer Marketing', format:'Instagram Post', objective:'Brand Awareness', pricingType:'Fixed', unitPrice:25000000, quantity:1, budget:25000000, duration:30 },
      ],
      agencyFeeRate: 15, discountRate: 0, vatRate: 10,
      termsAndConditions: 'Báo giá có hiệu lực 30 ngày. Thanh toán 50% trước khi triển khai, 50% sau khi hoàn thành. Giá trên chưa bao gồm VAT 10%.',
      roadmapMonths: ['Tháng 10/2026', 'Tháng 11/2026', 'Tháng 12/2026'],
      roadmapActivities: [
        { month:1, type:'planning', label:'Lên brief chiến dịch, nghiên cứu đối thủ, lập kế hoạch content', week:'1-2' },
        { month:1, type:'creative', label:'Sản xuất video TVC 30s, chụp ảnh sản phẩm lookbook', week:'2-3' },
        { month:1, type:'launch', label:'Setup tài khoản quảng cáo, cài đặt pixel & tracking', week:'3' },
        { month:1, type:'launch', label:'Tung chiến dịch Facebook & Instagram Awareness', week:'4' },
        { month:2, type:'optimize', label:'A/B test creative, tối ưu target audience lookalike', week:'1-2' },
        { month:2, type:'launch', label:'Khởi động TikTok campaign + Google Search', week:'1' },
        { month:2, type:'optimize', label:'Scale ngân sách kênh hiệu quả nhất', week:'3-4' },
        { month:2, type:'meeting', label:'Review mid-campaign với khách hàng', week:'3' },
        { month:3, type:'optimize', label:'Retargeting đối tượng đã visit website', week:'1-2' },
        { month:3, type:'creative', label:'Sản xuất creative Tết/ cuối năm', week:'2' },
        { month:3, type:'report', label:'Báo cáo tổng kết chiến dịch, đề xuất Q1 2027', week:'4' },
        { month:3, type:'meeting', label:'Họp tổng kết & lên kế hoạch năm sau', week:'4' },
      ],
      audienceAgeMin:20, audienceAgeMax:35, audienceGender:'female',
      audienceLocations:'TP.HCM, Hà Nội, Đà Nẵng',
      audienceIncome:'8-25 triệu/tháng', audienceEducation:'Trung cấp, Đại học',
      audienceInterests:['Thời trang & Làm đẹp','Mua sắm Online'],
      audienceBehaviors:'Hay mua hàng qua livestream Facebook, follow fashion KOL/KOC, so sánh giá nhiều shop trước khi mua',
      audienceDevices:['mobile'],
      audiencePersonas:[
        { name:'Hà – Nhân viên văn phòng', age:'24-30', job:'Nhân viên văn phòng', income:'10-18 triệu', goals:'Mặc đẹp đi làm, phong cách chuyên nghiệp nhưng cá tính', painPoints:'Khó tìm size phù hợp, lo sợ màu thực khác ảnh', mediaHabits:'Instagram buổi tối, TikTok lúc nghỉ trưa', buyBehavior:'Xem review KOC trước, đọc comment thật, inbox hỏi ship trước khi mua' },
        { name:'Linh – Sinh viên năm 3', age:'20-23', job:'Sinh viên', income:'3-7 triệu (tiền tiêu vặt)', goals:'Mặc trendy, theo kịp xu hướng với budget ít', painPoints:'Budget hạn chế, muốn nhiều mẫu mới liên tục', mediaHabits:'TikTok 3-4h/ngày, Threads, Pinterest', buyBehavior:'Chờ flash sale, mua theo outfit gợi ý trên TikTok' },
      ],
      contentPillars:[
        { title:'Style Inspiration', description:'Gợi ý cách phối đồ với sản phẩm Lily', examples:'Video "5 cách mix áo blazer", Reels outfit của ngày' },
        { title:'Product Showcase', description:'Giới thiệu sản phẩm BST mới', examples:'Lookbook Thu Đông, ảnh detail chất liệu vải' },
        { title:'Customer Stories', description:'Review từ khách hàng thực tế', examples:'Repost ảnh KH tag, video unboxing' },
        { title:'Flash Sale Alert', description:'Ưu đãi giới hạn thời gian', examples:'Countdown 24h, bundle deal' },
      ],
      toneOfVoice:['friendly','inspiring','youthful'],
      visualStyle:'Lifestyle, Bright & Airy – tone màu pastel nhẹ nhàng', visualColors:'Dusty Rose #d4a5a5, Cream #f5f0eb, Sage Green #8a9e8a',
      visualMood:'Warm, Feminine, Empowering – cảm giác tự tin khi mặc đẹp',
      adCopyNotes:'Ngôn ngữ gần gũi, dùng "bạn" thay vì "quý khách". Headline ngắn dưới 25 ký tự, mạnh về cảm xúc.',
      ctaExamples:'Khám phá BST ngay →\nMua ngay – Freeship 0đ\nChọn size & đặt hàng\nXem thêm style gợi ý',
      designNotes:'Banner Facebook 1200x628, Square 1080x1080, Story 1080x1920. Ảnh phải có model thật mặc sản phẩm. Logo Lily góc phải trên.',
      videoDirection:'Video 15s cho TikTok/Reels: Hook 3 giây đầu = transformation moment. Có phụ đề tiếng Việt. Âm nhạc trending. Kết thúc = CTA rõ + URL shop.',
      kpiNotes:'Số liệu dựa trên benchmark thị trường thời trang VN Q4. CTR Facebook đạt ~1.5-2.5%, TikTok CPM thấp hơn. Mùa cuối năm conversion cao hơn ~30%.',
      keywords:[
        { keyword:'thời trang nữ đẹp', volume:90500, cpc:3200, competition:'high', type:'generic', priority:'p1', difficulty:72, notes:'Core term – high intent' },
        { keyword:'shop quần áo nữ online', volume:74000, cpc:2800, competition:'high', type:'generic', priority:'p1', difficulty:68, notes:'Shopping intent' },
        { keyword:'áo sơ mi nữ công sở', volume:49500, cpc:2100, competition:'medium', type:'longtail', priority:'p2', difficulty:55, notes:'Segment cụ thể' },
        { keyword:'set đồ nữ dễ thương', volume:33100, cpc:1800, competition:'medium', type:'longtail', priority:'p2', difficulty:48, notes:'TikTok style' },
        { keyword:'váy đầm thu đông 2026', volume:22200, cpc:3500, competition:'medium', type:'seasonal', priority:'p1', difficulty:51, notes:'Seasonal – ưu tiên Q4' },
        { keyword:'lily fashion collection', volume:8100, cpc:800, competition:'low', type:'brand', priority:'p1', difficulty:20, notes:'Brand term' },
      ],
    }
  },
  {
    id: 'saas_b2b',
    name: 'SaaS – B2B Lead Generation',
    icon: '💼',
    description: 'Tìm kiếm khách hàng doanh nghiệp cho phần mềm quản lý. Google + LinkedIn + Facebook.',
    industry: 'Công nghệ & Phần mềm',
    color: 'blue',
    data: {
      clientCompany: 'CloudWork Solutions JSC', clientIndustry: 'Công nghệ & Phần mềm',
      clientContact: 'Trần Minh Đức', clientPosition: 'Sales Director',
      campaignName: 'B2B Lead Generation – CloudWork CRM Q3/2026',
      campaignObjectives: ['Lead Generation','Traffic','Brand Awareness'],
      targetAudience: 'Chủ doanh nghiệp SME, Giám đốc điều hành, Trưởng phòng kinh doanh tại các công ty 50-500 nhân sự',
      ageRange: '28-50', gender: 'all', location: 'TP.HCM, Hà Nội, Bình Dương',
      items: [
        { channelId:'gg_search', channelName:'Google Search Ads', format:'Responsive Search Ads', objective:'Lead Generation', pricingType:'CPC', unitPrice:12000, quantity:5000, budget:60000000, duration:90 },
        { channelId:'gg_display', channelName:'Google Display (GDN)', format:'Responsive Display Ads', objective:'Brand Awareness', pricingType:'CPM', unitPrice:22000, quantity:2000000, budget:44000000, duration:90 },
        { channelId:'facebook', channelName:'Facebook Ads', format:'Lead Generation', objective:'Lead Generation', pricingType:'CPM', unitPrice:55000, quantity:800000, budget:44000000, duration:90 },
        { channelId:'youtube', channelName:'YouTube Ads', format:'TrueView In-Stream', objective:'Brand Awareness', pricingType:'CPV', unitPrice:350, quantity:200000, budget:70000000, duration:60 },
        { channelId:'seo_content', channelName:'SEO / Content', format:'Blog Articles', objective:'Traffic', pricingType:'Fixed', unitPrice:20000000, quantity:1, budget:20000000, duration:90 },
      ],
      agencyFeeRate: 18, discountRate: 5, vatRate: 10,
      termsAndConditions: 'Hợp đồng 3 tháng, gia hạn theo quý. Báo cáo hàng tuần mỗi thứ Hai. Thanh toán đầu tháng. Cam kết tối thiểu 50 qualified leads/tháng.',
      roadmapMonths: ['Tháng 7/2026', 'Tháng 8/2026', 'Tháng 9/2026'],
      roadmapActivities: [
        { month:1, type:'planning', label:'Audit landing page, cài đặt Google Tag Manager & tracking chuyển đổi', week:'1' },
        { month:1, type:'planning', label:'Nghiên cứu từ khóa B2B, phân tích đối thủ Salesforce/Base CRM', week:'1-2' },
        { month:1, type:'creative', label:'Viết 10 bài SEO/blog chủ đề quản lý khách hàng', week:'2-3' },
        { month:1, type:'launch', label:'Khởi động Google Search & GDN campaigns', week:'3' },
        { month:1, type:'launch', label:'Chạy Facebook Lead Gen với form hỏi tư vấn', week:'4' },
        { month:2, type:'optimize', label:'Tối ưu Quality Score Google, loại từ khóa không hiệu quả', week:'1' },
        { month:2, type:'launch', label:'Khởi động YouTube TrueView – video demo sản phẩm 2 phút', week:'1' },
        { month:2, type:'optimize', label:'A/B test landing page (headline & CTA)', week:'2-3' },
        { month:2, type:'meeting', label:'Họp mid-campaign review & điều chỉnh ngân sách theo kênh', week:'3' },
        { month:3, type:'optimize', label:'Remarketing đối tượng đã xem trang pricing nhưng chưa đăng ký', week:'1-2' },
        { month:3, type:'optimize', label:'Scale ngân sách Google Search – từ khóa CPL tốt nhất', week:'2' },
        { month:3, type:'report', label:'Báo cáo Q3: leads, CPL, pipeline value, đề xuất Q4', week:'4' },
      ],
      audienceAgeMin:28, audienceAgeMax:50, audienceGender:'all',
      audienceLocations:'TP.HCM, Hà Nội, Bình Dương',
      audienceIncome:'30-150 triệu/tháng', audienceEducation:'Đại học, MBA',
      audienceInterests:['Startup & Kinh doanh','Công nghệ & Gadget','Tài chính & Đầu tư'],
      audienceBehaviors:'Đọc báo VnEconomy, CafeF, theo dõi diễn giả kinh doanh, tham gia hội nhóm chủ doanh nghiệp',
      audienceDevices:['desktop','mobile'],
      audiencePersonas:[
        { name:'Đức – Giám đốc SME', age:'35-45', job:'CEO / Giám đốc doanh nghiệp 80-200 nhân viên', income:'50-150 triệu/tháng', goals:'Tăng doanh số, kiểm soát đội sales hiệu quả hơn, tiết kiệm chi phí vận hành', painPoints:'Sales team không có quy trình, dữ liệu khách hàng rải rác Excel, không biết deal nào đang ở đâu trong pipeline', mediaHabits:'LinkedIn 30p/ngày, Facebook buổi tối, YouTube xem podcast kinh doanh', buyBehavior:'Tìm kiếm Google, đọc case study, demo trial trước khi mua' },
        { name:'Phương – Trưởng phòng kinh doanh', age:'30-40', job:'Sales Manager / Trưởng phòng KD', income:'20-40 triệu/tháng', goals:'Đạt target, báo cáo rõ ràng cho sếp, giảm việc thủ công cho team', painPoints:'Báo cáo Excel tốn thời gian, khó track KPI từng nhân viên, mất data khi nhân viên nghỉ việc', mediaHabits:'Facebook Groups dành cho sales, LinkedIn học kỹ năng', buyBehavior:'Đề xuất lên sếp, cần approval budget, ưu tiên có free trial' },
      ],
      contentPillars:[
        { title:'Product Education', description:'Hướng dẫn tính năng, giải pháp cụ thể cho vấn đề của KH', examples:'Video demo "Cách setup pipeline trong 10 phút", Webinar hàng tháng' },
        { title:'Case Study & ROI', description:'Câu chuyện thành công của khách hàng thực tế', examples:'"Công ty XYZ tăng 40% doanh số sau 3 tháng dùng CloudWork"' },
        { title:'Industry Insights', description:'Xu hướng quản lý, tip tăng năng suất cho B2B VN', examples:'Infographic "7 lỗi quản lý CRM phổ biến", E-book miễn phí' },
        { title:'Product Updates', description:'Tính năng mới, hỗ trợ kỹ thuật, onboarding tips', examples:'Release video tính năng mới, hướng dẫn setup nhanh 5 phút' },
      ],
      toneOfVoice:['professional','trustworthy','educational'],
      visualStyle:'Corporate Tech – Clean, Minimal, Data-driven', visualColors:'Navy #1e3a8a, Sky Blue #0ea5e9, White #ffffff, Accent Orange #f97316',
      visualMood:'Confident, Reliable, Growth-oriented',
      adCopyNotes:'Tập trung vào kết quả đo được: "Tăng X%", "Tiết kiệm Y giờ/tuần". Avoid jargon phức tạp. Social proof với số liệu cụ thể.',
      ctaExamples:'Dùng thử miễn phí 14 ngày\nĐăng ký nhận demo\nXem case study →\nTính ROI cho doanh nghiệp bạn',
      designNotes:'Banner GDN: 300x250, 728x90, 160x600. Màu nền trắng/xanh navy, icon flat design. Cần có số liệu cụ thể trên creative (vd: "500+ doanh nghiệp tin dùng").',
      videoDirection:'YouTube TrueView 2 phút: Mở đầu bằng pain point quen thuộc (5s không skip). Demo thực tế dashboard trong 60s. Testimonial 30s. CTA trial miễn phí.',
      kpiNotes:'B2B CPL cao hơn B2C ~5-10x nhưng giá trị contract lớn. Target CPL < 800K. Qualified lead = đăng ký demo + có ngân sách.',
      keywords:[
        { keyword:'phần mềm quản lý doanh nghiệp', volume:22200, cpc:8500, competition:'high', type:'generic', priority:'p1', difficulty:75, notes:'High intent – core term' },
        { keyword:'phần mềm CRM cho SME', volume:9900, cpc:12000, competition:'high', type:'longtail', priority:'p1', difficulty:70, notes:'Very targeted – high CPL ok' },
        { keyword:'app quản lý nhân sự', volume:14800, cpc:7200, competition:'medium', type:'generic', priority:'p1', difficulty:62, notes:'Broader audience' },
        { keyword:'giải pháp ERP cloud Việt Nam', volume:6600, cpc:15000, competition:'medium', type:'longtail', priority:'p2', difficulty:58, notes:'High value segment' },
        { keyword:'phần mềm kế toán online', volume:18100, cpc:5000, competition:'high', type:'generic', priority:'p2', difficulty:68, notes:'Adjacent need' },
        { keyword:'cloudwork CRM', volume:1300, cpc:500, competition:'low', type:'brand', priority:'p1', difficulty:15, notes:'Brand defense' },
        { keyword:'demo CRM miễn phí', volume:4400, cpc:6000, competition:'medium', type:'longtail', priority:'p2', difficulty:45, notes:'Trial intent – high CVR' },
      ],
    }
  },
  {
    id: 'fnb_coffee',
    name: 'F&B – Khai Trương Chuỗi Cà Phê',
    icon: '☕',
    description: 'Brand awareness + foot traffic cho chuỗi cà phê mới. Facebook + TikTok + Zalo.',
    industry: 'Thực phẩm & Đồ uống',
    color: 'amber',
    data: {
      clientCompany: 'Cà Phê The Ground – Chuỗi 5 chi nhánh', clientIndustry: 'Thực phẩm & Đồ uống',
      clientContact: 'Lê Anh Khoa', clientPosition: 'Brand Manager',
      campaignName: 'Khai Trương Chuỗi The Ground – "Find Your Ground"',
      campaignObjectives: ['Brand Awareness','Reach & Frequency','Traffic','Engagement'],
      targetAudience: 'Giới trẻ 18-30 tuổi tại TP.HCM, yêu thích không gian cà phê có cá tính, hay check-in, chia sẻ ảnh lên MXH',
      ageRange: '18-32', gender: 'all', location: 'TP.HCM (Q1, Q3, Bình Thạnh, Gò Vấp, Thủ Đức)',
      items: [
        { channelId:'facebook', channelName:'Facebook Ads', format:'Video Ads', objective:'Brand Awareness', pricingType:'CPM', unitPrice:48000, quantity:2000000, budget:96000000, duration:60 },
        { channelId:'instagram', channelName:'Instagram Ads', format:'Stories Ads', objective:'Brand Awareness', pricingType:'CPM', unitPrice:55000, quantity:1000000, budget:55000000, duration:60 },
        { channelId:'tiktok', channelName:'TikTok Ads', format:'TopView', objective:'Reach & Frequency', pricingType:'Fixed', unitPrice:80000000, quantity:1, budget:80000000, duration:3 },
        { channelId:'zalo', channelName:'Zalo Ads', format:'Zalo Display Ads', objective:'Traffic', pricingType:'CPM', unitPrice:28000, quantity:1500000, budget:42000000, duration:60 },
        { channelId:'influencer', channelName:'Influencer Marketing', format:'TikTok Video', objective:'Engagement', pricingType:'Fixed', unitPrice:40000000, quantity:1, budget:40000000, duration:30 },
        { channelId:'ooh', channelName:'OOH / Billboard', format:'DOOH / LED Screen', objective:'Brand Awareness', pricingType:'Fixed', unitPrice:30000000, quantity:1, budget:30000000, duration:30 },
      ],
      agencyFeeRate: 15, discountRate: 0, vatRate: 10,
      termsAndConditions: 'Thanh toán 100% trước khi khai trương. Báo cáo daily trong 2 tuần đầu, sau đó weekly. Media buy OOH cần xác nhận trước 2 tuần.',
      roadmapMonths: ['Tháng 8/2026 (Pre-Launch)', 'Tháng 9/2026 (Grand Opening)', 'Tháng 10/2026 (Post-Launch)'],
      roadmapActivities: [
        { month:1, type:'planning', label:'Lên concept chiến dịch "Find Your Ground", brief KOL/KOC', week:'1' },
        { month:1, type:'creative', label:'Quay phim khai trương, chụp ảnh không gian & đồ uống', week:'2-3' },
        { month:1, type:'creative', label:'Teaser campaign – hé lộ địa điểm, countdown khai trương', week:'3-4' },
        { month:1, type:'launch', label:'Booking OOH/Billboard tại khu vực 5 chi nhánh', week:'4' },
        { month:2, type:'launch', label:'Khai trương ngày D – TikTok TopView + Facebook Video Reach', week:'1' },
        { month:2, type:'launch', label:'Influencer review – 5-10 KOC TikTok/Instagram checkin', week:'1-2' },
        { month:2, type:'optimize', label:'Boost post viral, chạy promoted posts có nhiều tương tác', week:'2-3' },
        { month:2, type:'launch', label:'Zalo OA push notification cho người dùng trong bán kính 2km', week:'2' },
        { month:2, type:'meeting', label:'Họp giữa tháng – review traffic thực tế vs KPI', week:'3' },
        { month:3, type:'optimize', label:'Chuyển sang engagement & loyalty – thông báo menu mới', week:'1-2' },
        { month:3, type:'creative', label:'UGC campaign – hashtag challenge #FindYourGround', week:'2-3' },
        { month:3, type:'report', label:'Báo cáo tổng kết 2 tháng – reach, engagement, foot traffic', week:'4' },
      ],
      audienceAgeMin:16, audienceAgeMax:32, audienceGender:'all',
      audienceLocations:'TP.HCM – Quận 1, 3, Bình Thạnh, Gò Vấp, Thủ Đức',
      audienceIncome:'3-20 triệu/tháng', audienceEducation:'Học sinh, Sinh viên, Đi làm mới',
      audienceInterests:['Ẩm thực & Nấu ăn','Du lịch & Phượt','Âm nhạc & Nghệ thuật'],
      audienceBehaviors:'Hay check-in quán mới, đăng story, dùng hashtag, theo dõi food blogger & lifestyle creator trên TikTok/Instagram',
      audienceDevices:['mobile'],
      audiencePersonas:[
        { name:'Minh – Sinh viên Đại học', age:'19-23', job:'Sinh viên / Freelancer part-time', income:'3-8 triệu', goals:'Có chỗ học bài/làm việc đẹp để check-in, uống đồ ngon giá vừa', painPoints:'Quán đông quá, wifi yếu, không có ổ cắm điện, quá ồn', mediaHabits:'TikTok 4-5h/ngày, Instagram stories, YouTube nhạc', buyBehavior:'Thấy review trên TikTok → đến thử → đăng story nếu đẹp' },
        { name:'Linh – Young Professional', age:'24-30', job:'Marketing/Creative/Tech', income:'12-25 triệu', goals:'Meeting client tại quán đẹp, không gian chill sau giờ làm', painPoints:'Quán đông cuối tuần, đặt bàn khó, chỗ ngồi không riêng tư', mediaHabits:'Instagram aesthetic feed, Spotify, TikTok trước ngủ', buyBehavior:'Xem địa điểm trên Google Maps + IG, book bàn nếu có', },
      ],
      contentPillars:[
        { title:'"The Ground Vibes"', description:'Không khí quán, cảm giác yên bình khi đến The Ground', examples:'Video slow-mo cà phê được pha, ánh sáng buổi sáng, âm thanh quán' },
        { title:'Menu Stars', description:'Showcase đồ uống đặc trưng, công thức độc quyền', examples:'Video latte art timelapse, ảnh sản phẩm aesthetic, "What I order at The Ground"' },
        { title:'Community Moments', description:'Khách hàng check-in, moments thật trong quán', examples:'Repost story của KH, video timelapse một ngày ở quán' },
        { title:'Local Love', description:'Kết nối với cộng đồng từng quận, sự kiện local', examples:'Acoustic night tại mỗi chi nhánh, collab với nghệ sĩ địa phương' },
      ],
      toneOfVoice:['friendly','youthful','emotional'],
      visualStyle:'Earthy, Raw & Aesthetic – tone nâu warm, kem, xanh lá nhẹ', visualColors:'Espresso Brown #3d2b1f, Warm Cream #f5ebe0, Sage #87a878, Off-white #fafaf8',
      visualMood:'Cozy, Authentic, Instagrammable – cảm giác "nhà" giữa thành phố',
      adCopyNotes:'Câu ngắn, emotional. Dùng tiếng Việt tự nhiên, thêm "ba" chữ tiếng Anh đúng chỗ để trendy. Tránh quá formal.',
      ctaExamples:'Ghé thăm The Ground ngay →\nTìm chi nhánh gần nhất\nĐặt bàn cuối tuần\n#FindYourGround',
      designNotes:'Story 1080x1920 – đặt text vùng an toàn giữa màn hình. Feed IG 1080x1080. Video TikTok 9:16. Palette màu nâu warm nhất quán across all platforms.',
      videoDirection:'TikTok hook 3s: cảnh pha cà phê đẹp + text "Bạn đã tìm được góc của mình chưa?". Duration 15-30s. Âm nhạc chill/lo-fi. Kết thúc: địa chỉ + giờ mở cửa.',
      kpiNotes:'F&B brand awareness campaign tập trung CPM thấp, reach rộng. Benchmark CPM Facebook Q3 TP.HCM ~48-55K. TikTok TopView đảm bảo 100% share of voice ngày D khai trương.',
      keywords:[
        { keyword:'cà phê take away ngon TP.HCM', volume:40500, cpc:1500, competition:'medium', type:'generic', priority:'p1', difficulty:45, notes:'Near-me intent' },
        { keyword:'quán cà phê đẹp check in', volume:33100, cpc:1200, competition:'medium', type:'longtail', priority:'p1', difficulty:42, notes:'High share intent' },
        { keyword:'the ground coffee', volume:5400, cpc:500, competition:'low', type:'brand', priority:'p1', difficulty:15, notes:'Brand term' },
        { keyword:'cà phê yên tĩnh làm việc', volume:18100, cpc:900, competition:'low', type:'longtail', priority:'p2', difficulty:35, notes:'WFH segment' },
        { keyword:'quán cà phê Bình Thạnh mới', volume:8100, cpc:700, competition:'low', type:'longtail', priority:'p2', difficulty:28, notes:'Hyper-local' },
        { keyword:'đặt bàn cà phê cuối tuần', volume:12100, cpc:1100, competition:'low', type:'longtail', priority:'p3', difficulty:32, notes:'Weekend traffic' },
      ],
    }
  },
];

/* ---- New: Tone of Voice Options ---- */
const TONE_OPTIONS = [
  { id: 'professional', label: 'Chuyên nghiệp' },
  { id: 'friendly',     label: 'Thân thiện, Gần gũi' },
  { id: 'inspiring',    label: 'Truyền cảm hứng' },
  { id: 'urgent',       label: 'Khẩn cấp, Thúc đẩy' },
  { id: 'humorous',     label: 'Hài hước' },
  { id: 'educational',  label: 'Giáo dục, Chia sẻ' },
  { id: 'luxurious',    label: 'Sang trọng, Đẳng cấp' },
  { id: 'youthful',     label: 'Trẻ trung, Năng động' },
  { id: 'trustworthy',  label: 'Đáng tin cậy' },
  { id: 'emotional',    label: 'Cảm xúc, Chạm lòng' },
];

/* ---- State ---- */
let state = {
  view: 'dashboard',
  quotes: [],
  currentQuote: null,
  editingId: null,
  activeTab: 'general',
  agency: {},
  settings: {},
  budgetChart: null,
};

/* ---- Storage ---- */
const Store = {
  QUOTES_KEY:   'mp_quotes',
  AGENCY_KEY:   'mp_agency',
  SETTINGS_KEY: 'mp_settings',

  loadQuotes()  { try { return JSON.parse(localStorage.getItem(this.QUOTES_KEY)) || []; } catch { return []; } },
  saveQuotes(q) { localStorage.setItem(this.QUOTES_KEY, JSON.stringify(q)); },
  loadAgency() {
    const def = { name: 'Công ty Quảng cáo ABC', address: '123 Đường ABC, Quận 1, TP.HCM',
      phone: '028 1234 5678', email: 'contact@agency.vn', website: 'www.agency.vn',
      taxCode: '0123456789', logoUrl: '' };
    try { return { ...def, ...JSON.parse(localStorage.getItem(this.AGENCY_KEY)) }; } catch { return def; }
  },
  saveAgency(a) { localStorage.setItem(this.AGENCY_KEY, JSON.stringify(a)); },
  loadSettings() {
    const def = { agencyFeeRate: 15, vatRate: 10, currency: 'VND', quotePrefix: 'MP' };
    try { return { ...def, ...JSON.parse(localStorage.getItem(this.SETTINGS_KEY)) }; } catch { return def; }
  },
  saveSettings(s) { localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(s)); },
};

/* ---- Utilities ---- */
function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}
function formatCurrency(num) {
  if (!num && num !== 0) return '—';
  return new Intl.NumberFormat('vi-VN').format(Math.round(num));
}
function parseCurrency(str) {
  if (!str) return 0;
  return parseFloat(String(str).replace(/[^\d.-]/g, '')) || 0;
}
function formatDate(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('vi-VN');
}
function today() { return new Date().toISOString().split('T')[0]; }
function addDays(dateStr, days) {
  const d = new Date(dateStr); d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}
function generateQuoteNumber() {
  const prefix = (state.settings.quotePrefix || 'MP');
  const year = new Date().getFullYear();
  return `${prefix}${year}-${String(state.quotes.length + 1).padStart(3, '0')}`;
}
function showToast(msg, type = 'success') {
  const toast = document.getElementById('toast');
  const colors = { success: 'bg-emerald-500', error: 'bg-red-500', info: 'bg-blue-600' };
  const icons  = { success: 'check-circle', error: 'times-circle', info: 'info-circle' };
  toast.className = `fixed bottom-6 right-6 z-50 transition-all duration-300 px-5 py-3 rounded-xl text-white font-medium shadow-xl ${colors[type] || colors.success}`;
  toast.innerHTML = `<i class="fas fa-${icons[type] || icons.success} mr-2"></i>${msg}`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}
function getChannel(id) { return CHANNELS.find(c => c.id === id) || CHANNELS[CHANNELS.length - 1]; }

/* ============================================================
   QUOTE FACTORY
   ============================================================ */
function newQuote() {
  const t = today();
  return {
    id: uuid(), quoteNumber: generateQuoteNumber(),
    status: 'draft', createdAt: t, updatedAt: t, validUntil: addDays(t, 30),
    /* Client */
    clientCompany: '', clientContact: '', clientPosition: '',
    clientPhone: '', clientEmail: '', clientAddress: '', clientIndustry: '',
    /* Campaign */
    campaignName: '', campaignObjectives: [],
    targetAudience: '', ageRange: '18-45', gender: 'all',
    location: 'Toàn quốc', startDate: '', endDate: '', campaignNotes: '',
    /* AM */
    accountManager: '', accountPhone: '', accountEmail: '',
    /* Sheet 1: Media items */
    items: [],
    /* Sheet 1: Finance */
    agencyFeeRate: state.settings.agencyFeeRate || 15,
    discountRate: 0, discountNote: '',
    vatRate: state.settings.vatRate || 10,
    termsAndConditions: 'Báo giá có hiệu lực trong vòng 30 ngày kể từ ngày phát hành. Giá trên chưa bao gồm VAT. Mọi thay đổi về ngân sách hoặc kế hoạch cần được thông báo trước 7 ngày.',
    internalNotes: '',
    /* Sheet 2: Road Map */
    roadmapMonths: ['Tháng 1', 'Tháng 2', 'Tháng 3'],
    roadmapActivities: [],
    /* Sheet 3: KPI */
    kpiRows: [], kpiNotes: '',
    /* Sheet 4: Keywords */
    keywords: [], keywordNotes: '',
    /* Sheet 5: Audience */
    audienceAgeMin: 18, audienceAgeMax: 45,
    audienceGender: 'all', audienceLocations: 'TP.HCM, Hà Nội',
    audienceIncome: '', audienceEducation: '',
    audienceInterests: [], audienceCustomInterests: '',
    audienceBehaviors: '', audienceDevices: ['mobile'],
    audiencePersonas: [],
    /* Sheet 6: Content & Design */
    contentPillars: [], toneOfVoice: [],
    visualStyle: '', visualColors: '', visualMood: '',
    adCopyNotes: '', ctaExamples: '',
    designNotes: '', videoDirection: '',
  };
}

function newMediaItem() {
  const ch = CHANNELS[0];
  return {
    id: uuid(), channelId: ch.id, channelName: ch.name,
    format: ch.formats[0], objective: 'Brand Awareness',
    pricingType: ch.defPricing, unitPrice: ch.defPrice,
    quantity: 1000000, budget: ch.defPricing === 'CPM' ? (ch.defPrice * 1000000 / 1000) : ch.defPrice,
    duration: 30, notes: '',
  };
}

/* ---- Calculations ---- */
function calcItemBudget(item) {
  const { pricingType, unitPrice, quantity } = item;
  if (pricingType === 'Fixed') return unitPrice;
  if (pricingType === 'CPM')  return (unitPrice * quantity) / 1000;
  return unitPrice * quantity;
}
function calcItemQuantity(item) {
  const { pricingType, unitPrice, budget } = item;
  if (!unitPrice) return 0;
  if (pricingType === 'Fixed') return 1;
  if (pricingType === 'CPM')  return (budget * 1000) / unitPrice;
  return budget / unitPrice;
}
function calcTotals(quote) {
  const subtotal     = quote.items.reduce((s, i) => s + (i.budget || 0), 0);
  const agencyFeeAmt = subtotal * (quote.agencyFeeRate || 0) / 100;
  const discountBase = subtotal + agencyFeeAmt;
  const discountAmt  = discountBase * (quote.discountRate || 0) / 100;
  const beforeVAT    = discountBase - discountAmt;
  const vatAmt       = beforeVAT * (quote.vatRate || 10) / 100;
  const total        = beforeVAT + vatAmt;
  return { subtotal, agencyFeeAmt, discountBase, discountAmt, beforeVAT, vatAmt, total };
}

/* ---- KPI Calculation ---- */
function calcKpiFromItem(item) {
  const b = CHANNEL_BENCHMARKS[item.channelId] || CHANNEL_BENCHMARKS.other;
  const budget = item.budget || 0;
  const unitPrice = item.unitPrice || 1;
  let impressions = 0, clicks = 0;

  if (item.pricingType === 'CPM') {
    impressions = unitPrice > 0 ? (budget / unitPrice) * 1000 : 0;
    clicks = impressions * b.ctr;
  } else if (item.pricingType === 'CPC') {
    clicks = unitPrice > 0 ? budget / unitPrice : 0;
    impressions = b.ctr > 0 ? clicks / b.ctr : clicks * 20;
  } else if (item.pricingType === 'CPV') {
    const views = unitPrice > 0 ? budget / unitPrice : 0;
    impressions = views;
    clicks = views * b.ctr;
  } else {
    const ch = CHANNELS.find(c => c.id === item.channelId);
    const estCPM = ch ? ch.defPrice : 30000;
    impressions = estCPM > 0 ? (budget / estCPM) * 1000 : 0;
    clicks = impressions * b.ctr;
  }

  const reach = impressions * b.reach_pct;
  const conversions = clicks * b.cvr;
  const cpa = conversions > 0 ? budget / conversions : 0;
  const effectiveCpc = clicks > 0 ? budget / clicks : 0;
  const ctr = impressions > 0 ? (clicks / impressions) * 100 : b.ctr * 100;

  return {
    impressions: Math.round(impressions),
    reach:       Math.round(reach),
    clicks:      Math.round(clicks),
    ctr:         +ctr.toFixed(2),
    effectiveCpc: Math.round(effectiveCpc),
    conversions: Math.round(conversions),
    cpa:         Math.round(cpa),
  };
}

/* ============================================================
   VIEWS
   ============================================================ */
function showView(view) {
  state.view = view;
  document.getElementById('dashboardView').classList.toggle('hidden', view !== 'dashboard');
  document.getElementById('editorView').classList.toggle('hidden', view !== 'editor');
  document.getElementById('previewView').classList.toggle('hidden', view !== 'preview');
  document.getElementById('navBack').classList.toggle('hidden', view === 'dashboard');
}

/* ============================================================
   DASHBOARD
   ============================================================ */
function renderDashboard() {
  showView('dashboard');
  renderStats();
  renderQuoteList();
}

function renderStats() {
  const quotes = state.quotes;
  const totalBudget = quotes.reduce((s, q) => s + calcTotals(q).total, 0);
  document.getElementById('statTotal').textContent    = quotes.length;
  document.getElementById('statApproved').textContent = quotes.filter(q => q.status === 'approved').length;
  document.getElementById('statBudget').textContent   = formatCurrency(totalBudget);
  document.getElementById('statActive').textContent   = quotes.filter(q => ['sent','approved'].includes(q.status)).length;
}

function renderQuoteList(filter = '') {
  const tbody = document.getElementById('quoteTbody');
  let quotes = [...state.quotes].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  if (filter) {
    const f = filter.toLowerCase();
    quotes = quotes.filter(q =>
      (q.quoteNumber||'').toLowerCase().includes(f) ||
      (q.clientCompany||'').toLowerCase().includes(f) ||
      (q.campaignName||'').toLowerCase().includes(f)
    );
  }
  if (!quotes.length) {
    tbody.innerHTML = `<tr><td colspan="8" class="py-16 text-center text-slate-400">
      <i class="fas fa-inbox text-4xl mb-3 block"></i>
      <p class="text-lg font-medium">Chưa có báo giá nào</p>
      <p class="text-sm mt-1">Bấm "Tạo báo giá mới" để bắt đầu</p>
    </td></tr>`;
    return;
  }
  tbody.innerHTML = quotes.map(q => {
    const totals = calcTotals(q);
    return `
    <tr class="border-b border-slate-100 hover:bg-slate-50 transition-colors">
      <td class="px-4 py-3 text-sm font-mono font-medium text-blue-700">${q.quoteNumber || '—'}</td>
      <td class="px-4 py-3">
        <div class="font-medium text-slate-800">${q.clientCompany || '<span class="text-slate-400">Chưa điền</span>'}</div>
        <div class="text-xs text-slate-400">${q.clientContact || ''}</div>
      </td>
      <td class="px-4 py-3 text-sm text-slate-600">${q.campaignName || '—'}</td>
      <td class="px-4 py-3 text-sm text-right font-medium">${formatCurrency(totals.total)} đ</td>
      <td class="px-4 py-3">
        <span class="px-2 py-1 rounded-full text-xs font-medium badge-${q.status}">${STATUS_LABELS[q.status]||q.status}</span>
      </td>
      <td class="px-4 py-3 text-sm text-slate-500">${formatDate(q.createdAt)}</td>
      <td class="px-4 py-3 text-sm text-slate-500">${formatDate(q.validUntil)}</td>
      <td class="px-4 py-3">
        <div class="flex gap-2 justify-end">
          <button onclick="editQuote('${q.id}')" class="text-blue-600 hover:text-blue-800 px-2 py-1 text-sm" title="Chỉnh sửa"><i class="fas fa-edit"></i></button>
          <button onclick="previewQuote('${q.id}')" class="text-emerald-600 hover:text-emerald-800 px-2 py-1 text-sm" title="Xem & In"><i class="fas fa-eye"></i></button>
          <button onclick="duplicateQuote('${q.id}')" class="text-amber-600 hover:text-amber-800 px-2 py-1 text-sm" title="Nhân bản"><i class="fas fa-copy"></i></button>
          <button onclick="confirmDelete('${q.id}')" class="text-red-500 hover:text-red-700 px-2 py-1 text-sm" title="Xóa"><i class="fas fa-trash"></i></button>
        </div>
      </td>
    </tr>`;
  }).join('');
}

/* ============================================================
   EDITOR
   ============================================================ */
function editQuote(id) {
  const q = state.quotes.find(q => q.id === id);
  if (!q) return;
  state.currentQuote = JSON.parse(JSON.stringify(q));
  state.editingId = id;
  state.activeTab = 'general';
  renderEditor();
}

function renderEditor() {
  showView('editor');
  const q = state.currentQuote;
  document.getElementById('editorTitle').textContent = q.quoteNumber || 'Báo giá mới';
  document.getElementById('editorStatus').innerHTML =
    `<span class="badge-${q.status} px-3 py-1 rounded-full text-sm font-medium">${STATUS_LABELS[q.status]}</span>`;
  fillGeneralTab(q);
  fillQuoteTab(q);
  fillRoadmapTab(q);
  fillKpiTab(q);
  fillKeywordTab(q);
  fillAudienceTab(q);
  fillContentTab(q);
  switchTab(state.activeTab);
  updateProgressBar();
}

/* ---- TAB: GENERAL ---- */
function fillGeneralTab(q) {
  const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val || ''; };
  setVal('f_quoteNumber', q.quoteNumber);
  setVal('f_createdAt', q.createdAt);
  setVal('f_validUntil', q.validUntil);
  setVal('f_accountManager', q.accountManager);
  setVal('f_accountPhone', q.accountPhone);
  setVal('f_accountEmail', q.accountEmail);
  document.getElementById('f_status').value = q.status;
  setVal('f_clientCompany', q.clientCompany);
  setVal('f_clientContact', q.clientContact);
  setVal('f_clientPosition', q.clientPosition);
  setVal('f_clientPhone', q.clientPhone);
  setVal('f_clientEmail', q.clientEmail);
  setVal('f_clientAddress', q.clientAddress);
  document.getElementById('f_clientIndustry').value = q.clientIndustry || '';
  setVal('f_campaignName', q.campaignName);
  setVal('f_targetAudience', q.targetAudience);
  setVal('f_ageRange', q.ageRange);
  document.getElementById('f_gender').value = q.gender || 'all';
  setVal('f_location', q.location);
  setVal('f_startDate', q.startDate);
  setVal('f_endDate', q.endDate);
  setVal('f_campaignNotes', q.campaignNotes);
  OBJECTIVES.forEach(obj => {
    const cb = document.getElementById(`obj_${obj.replace(/[\s&]/g, '_')}`);
    if (cb) cb.checked = (q.campaignObjectives || []).includes(obj);
  });
}

function collectGeneralTab() {
  const q = state.currentQuote;
  const getVal = id => { const el = document.getElementById(id); return el ? el.value : ''; };
  q.quoteNumber = getVal('f_quoteNumber');
  q.createdAt   = getVal('f_createdAt');
  q.validUntil  = getVal('f_validUntil');
  q.status      = getVal('f_status');
  q.accountManager = getVal('f_accountManager');
  q.accountPhone   = getVal('f_accountPhone');
  q.accountEmail   = getVal('f_accountEmail');
  q.clientCompany  = getVal('f_clientCompany');
  q.clientContact  = getVal('f_clientContact');
  q.clientPosition = getVal('f_clientPosition');
  q.clientPhone    = getVal('f_clientPhone');
  q.clientEmail    = getVal('f_clientEmail');
  q.clientAddress  = getVal('f_clientAddress');
  q.clientIndustry = getVal('f_clientIndustry');
  q.campaignName   = getVal('f_campaignName');
  q.targetAudience = getVal('f_targetAudience');
  q.ageRange       = getVal('f_ageRange');
  q.gender         = getVal('f_gender');
  q.location       = getVal('f_location');
  q.startDate      = getVal('f_startDate');
  q.endDate        = getVal('f_endDate');
  q.campaignNotes  = getVal('f_campaignNotes');
  q.campaignObjectives = OBJECTIVES.filter(obj => {
    const cb = document.getElementById(`obj_${obj.replace(/[\s&]/g, '_')}`);
    return cb && cb.checked;
  });
}

/* ---- TAB: QUOTE (Sheet 1 – Báo giá + Finance) ---- */
function fillQuoteTab(q) {
  renderMediaRows();
  const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val ?? ''; };
  setVal('f_agencyFeeRate', q.agencyFeeRate ?? 15);
  setVal('f_discountRate', q.discountRate ?? 0);
  setVal('f_discountNote', q.discountNote || '');
  setVal('f_vatRate', q.vatRate ?? 10);
  setVal('f_termsAndConditions', q.termsAndConditions || '');
  setVal('f_internalNotes', q.internalNotes || '');
  updateFinanceSummary();
}

function collectQuoteTab() {
  const q = state.currentQuote;
  q.agencyFeeRate = parseFloat(document.getElementById('f_agencyFeeRate')?.value) || 0;
  q.discountRate  = parseFloat(document.getElementById('f_discountRate')?.value)  || 0;
  q.discountNote  = document.getElementById('f_discountNote')?.value  || '';
  q.vatRate       = parseFloat(document.getElementById('f_vatRate')?.value)       || 10;
  q.termsAndConditions = document.getElementById('f_termsAndConditions')?.value || '';
  q.internalNotes      = document.getElementById('f_internalNotes')?.value       || '';
}

/* ---- Media Table ---- */
function renderMediaRows() {
  const tbody = document.getElementById('mediaTbody');
  const q = state.currentQuote;
  if (!q.items.length) {
    tbody.innerHTML = `<tr id="emptyMediaRow"><td colspan="10" class="py-8 text-center text-slate-400 text-sm">
      Chưa có kênh nào. Bấm "+ Thêm kênh" để bắt đầu.</td></tr>`;
    updateMediaSummary(); return;
  }
  tbody.innerHTML = q.items.map((item, idx) => renderMediaRow(item, idx)).join('');
  updateMediaSummary();
  updateBudgetChart();
}

function renderMediaRow(item, idx) {
  const ch = getChannel(item.channelId);
  const chOpts  = CHANNELS.map(c => `<option value="${c.id}" ${c.id===item.channelId?'selected':''}>${c.icon} ${c.name}</option>`).join('');
  const fmtOpts = ch.formats.map(f => `<option value="${f}" ${f===item.format?'selected':''}>${f}</option>`).join('');
  const objOpts = OBJECTIVES.map(o => `<option value="${o}" ${o===item.objective?'selected':''}>${o}</option>`).join('');
  const prcOpts = PRICING_TYPES.map(p => `<option value="${p}" ${p===item.pricingType?'selected':''}>${p}</option>`).join('');
  const isFixed = item.pricingType === 'Fixed';
  return `
  <tr class="border-b border-slate-100" data-row-id="${item.id}">
    <td class="px-3 py-2 text-center text-slate-400 text-sm w-8">${idx+1}</td>
    <td class="px-2 py-1 min-w-[160px]">
      <select class="w-full text-sm p-1 rounded border-0 bg-transparent focus:bg-blue-50 focus:outline-none"
        onchange="updateRowField('${item.id}','channelId',this.value)">${chOpts}</select>
    </td>
    <td class="px-2 py-1 min-w-[150px]">
      <select class="w-full text-sm p-1 rounded border-0 bg-transparent focus:bg-blue-50 focus:outline-none"
        id="fmt_${item.id}" onchange="updateRowField('${item.id}','format',this.value)">${fmtOpts}</select>
    </td>
    <td class="px-2 py-1 min-w-[130px]">
      <select class="w-full text-sm p-1 rounded border-0 bg-transparent focus:bg-blue-50 focus:outline-none"
        onchange="updateRowField('${item.id}','objective',this.value)">${objOpts}</select>
    </td>
    <td class="px-2 py-1 min-w-[80px]">
      <select class="w-full text-sm p-1 rounded border-0 bg-transparent focus:bg-blue-50 focus:outline-none"
        onchange="updateRowPricing('${item.id}',this.value)">${prcOpts}</select>
    </td>
    <td class="px-2 py-1 min-w-[110px]">
      <input type="text" value="${formatCurrency(item.unitPrice)}"
        class="w-full text-sm p-1 rounded text-right focus:bg-blue-50 focus:outline-none border-0"
        onchange="updateRowPrice('${item.id}',this.value)">
    </td>
    <td class="px-2 py-1 min-w-[110px]">
      <input type="text" value="${isFixed ? '1 gói' : formatCurrency(item.quantity)}"
        class="w-full text-sm p-1 rounded text-right focus:bg-blue-50 focus:outline-none border-0 ${isFixed?'text-slate-400':''}"
        ${isFixed?'readonly':''}
        onchange="updateRowQuantity('${item.id}',this.value)">
    </td>
    <td class="px-2 py-1 min-w-[120px]">
      <input type="text" value="${formatCurrency(item.budget)}"
        class="w-full text-sm p-1 rounded text-right font-medium text-blue-700 focus:bg-blue-50 focus:outline-none border-0"
        onchange="updateRowBudget('${item.id}',this.value)">
    </td>
    <td class="px-2 py-1 min-w-[80px]">
      <div class="flex items-center gap-1">
        <input type="number" value="${item.duration||30}" min="1"
          class="w-full text-sm p-1 rounded text-right focus:bg-blue-50 focus:outline-none border-0"
          onchange="updateRowField('${item.id}','duration',+this.value)">
        <span class="text-xs text-slate-400 whitespace-nowrap">ngày</span>
      </div>
    </td>
    <td class="px-2 py-1 text-center w-10">
      <button onclick="removeMediaRow('${item.id}')" class="text-red-400 hover:text-red-600 px-1" title="Xóa">
        <i class="fas fa-times"></i>
      </button>
    </td>
  </tr>`;
}

function addMediaRow()  { state.currentQuote.items.push(newMediaItem()); renderMediaRows(); }
function removeMediaRow(id) {
  state.currentQuote.items = state.currentQuote.items.filter(i => i.id !== id);
  renderMediaRows(); updateFinanceSummary();
}

function updateRowField(id, field, value) {
  const item = state.currentQuote.items.find(i => i.id === id);
  if (!item) return;
  item[field] = value;
  if (field === 'channelId') {
    const ch = getChannel(value);
    item.channelName = ch.name; item.format = ch.formats[0];
    item.pricingType = ch.defPricing; item.unitPrice = ch.defPrice;
    item.budget = calcItemBudget(item);
    renderMediaRows();
  }
  updateMediaSummary(); updateFinanceSummary();
}

function updateRowPricing(id, pricingType) {
  const item = state.currentQuote.items.find(i => i.id === id);
  if (!item) return;
  item.pricingType = pricingType;
  if (pricingType === 'Fixed') item.quantity = 1;
  item.budget = calcItemBudget(item);
  renderMediaRows(); updateMediaSummary(); updateFinanceSummary();
}

function updateRowPrice(id, value) {
  const item = state.currentQuote.items.find(i => i.id === id);
  if (!item) return;
  item.unitPrice = parseCurrency(value);
  item.budget = calcItemBudget(item);
  const row = document.querySelector(`[data-row-id="${id}"]`);
  if (row) { const ins = row.querySelectorAll('input[type=text]'); if (ins[2]) ins[2].value = formatCurrency(item.budget); }
  updateMediaSummary(); updateFinanceSummary();
}

function updateRowQuantity(id, value) {
  const item = state.currentQuote.items.find(i => i.id === id);
  if (!item) return;
  item.quantity = parseCurrency(value);
  item.budget = calcItemBudget(item);
  const row = document.querySelector(`[data-row-id="${id}"]`);
  if (row) { const ins = row.querySelectorAll('input[type=text]'); if (ins[2]) ins[2].value = formatCurrency(item.budget); }
  updateMediaSummary(); updateFinanceSummary();
}

function updateRowBudget(id, value) {
  const item = state.currentQuote.items.find(i => i.id === id);
  if (!item) return;
  item.budget = parseCurrency(value);
  if (item.pricingType !== 'Fixed' && item.unitPrice) {
    item.quantity = calcItemQuantity(item);
    const row = document.querySelector(`[data-row-id="${id}"]`);
    if (row) { const ins = row.querySelectorAll('input[type=text]'); if (ins[1]) ins[1].value = formatCurrency(item.quantity); }
  }
  updateMediaSummary(); updateFinanceSummary();
}

function updateMediaSummary() {
  const q = state.currentQuote;
  const sub = q.items.reduce((s, i) => s + (i.budget || 0), 0);
  const setEl = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  setEl('mediaSubtotal', formatCurrency(sub) + ' đ');
  setEl('mediaSubtotalFooter', formatCurrency(sub) + ' đ');
  setEl('mediaChannelCount', q.items.length + ' kênh');
  updateBudgetChart();
}

function updateBudgetChart() {
  const q = state.currentQuote;
  const ctx = document.getElementById('budgetChart');
  if (!ctx || !q.items.length) {
    if (state.budgetChart) { state.budgetChart.destroy(); state.budgetChart = null; }
    return;
  }
  const budMap = {};
  q.items.forEach(item => { const n = item.channelName || item.channelId; budMap[n] = (budMap[n]||0) + (item.budget||0); });
  const labels = Object.keys(budMap);
  const data   = Object.values(budMap);
  const colors = ['#3b82f6','#10b981','#f59e0b','#ef4444','#8b5cf6','#ec4899','#14b8a6','#f97316','#6366f1','#84cc16','#06b6d4','#d946ef','#a78bfa','#fb923c'];
  if (state.budgetChart) state.budgetChart.destroy();
  state.budgetChart = new Chart(ctx, {
    type: 'doughnut',
    data: { labels, datasets: [{ data, backgroundColor: colors.slice(0, labels.length), borderWidth: 2, borderColor: '#fff' }] },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom', labels: { font: { size: 11 }, padding: 12 } },
        tooltip: { callbacks: { label: c => `${c.label}: ${formatCurrency(c.raw)} đ` } }
      }
    }
  });
}

function updateFinanceSummary() {
  const q = state.currentQuote;
  if (!q) return;
  const feeEl  = document.getElementById('f_agencyFeeRate');
  const discEl = document.getElementById('f_discountRate');
  const vatEl  = document.getElementById('f_vatRate');
  if (feeEl)  q.agencyFeeRate = parseFloat(feeEl.value)  || 0;
  if (discEl) q.discountRate  = parseFloat(discEl.value) || 0;
  if (vatEl)  q.vatRate       = parseFloat(vatEl.value)  || 0;
  const t = calcTotals(q);
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set('fin_subtotal',  formatCurrency(t.subtotal)    + ' đ');
  set('fin_agencyFee', formatCurrency(t.agencyFeeAmt)+ ' đ');
  set('fin_discount',  t.discountAmt > 0 ? `-${formatCurrency(t.discountAmt)} đ` : '0 đ');
  set('fin_beforeVAT', formatCurrency(t.beforeVAT)   + ' đ');
  set('fin_vat',       formatCurrency(t.vatAmt)      + ' đ');
  set('fin_total',     formatCurrency(t.total)       + ' đ');
}

/* ============================================================
   SHEET 2: ROAD MAP
   ============================================================ */
function fillRoadmapTab(q) {
  q.roadmapMonths.forEach((name, i) => {
    const el = document.getElementById(`rm_month_name_${i+1}`);
    if (el) el.value = name;
  });
  renderRoadmapColumns();
}

function collectRoadmapTab() {
  const q = state.currentQuote;
  [1,2,3].forEach((m, i) => {
    const el = document.getElementById(`rm_month_name_${m}`);
    if (el) q.roadmapMonths[i] = el.value || `Tháng ${m}`;
  });
}

function renderRoadmapColumns() {
  const q = state.currentQuote;
  [1,2,3].forEach(month => {
    const acts = q.roadmapActivities.filter(a => a.month === month);
    const container = document.getElementById(`rm_activities_${month}`);
    if (!container) return;

    const chBadges = document.getElementById(`rm_channels_${month}`);
    if (chBadges) {
      chBadges.innerHTML = q.items.length
        ? q.items.map(it => `<span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-700 mr-1 mb-1">${getChannel(it.channelId).icon} ${it.channelName}</span>`).join('')
        : '<span class="text-xs text-slate-400 italic">Thêm kênh ở tab Báo giá</span>';
    }

    if (!acts.length) {
      container.innerHTML = `<div class="text-slate-400 text-sm text-center py-6 italic">Chưa có hoạt động</div>`;
      return;
    }

    container.innerHTML = acts.map(act => {
      const type = ACTIVITY_TYPES.find(t => t.id === act.type) || ACTIVITY_TYPES[0];
      const typeOpts = ACTIVITY_TYPES.map(t => `<option value="${t.id}" ${t.id===act.type?'selected':''}>${t.label}</option>`).join('');
      return `
        <div class="activity-card ${type.cls}">
          <div class="flex items-center gap-1 mb-1.5">
            <select class="activity-type-select flex-1 focus:outline-none"
              onchange="updateActivityField('${act.id}','type',this.value)">${typeOpts}</select>
            <button onclick="removeActivity('${act.id}')" class="text-slate-400 hover:text-red-500 text-base ml-1 flex-shrink-0">×</button>
          </div>
          <input type="text" value="${act.label}" placeholder="Mô tả hoạt động..."
            class="w-full text-sm bg-transparent border-0 focus:outline-none placeholder-slate-400 mb-1"
            onchange="updateActivityField('${act.id}','label',this.value)">
          <div class="flex items-center gap-2 text-xs text-slate-400">
            <span>Tuần:</span>
            <input type="text" value="${act.week}" placeholder="1-2"
              class="w-10 bg-transparent border-b border-slate-300 focus:outline-none text-center"
              onchange="updateActivityField('${act.id}','week',this.value)">
          </div>
        </div>`;
    }).join('');
  });
}

function addActivity(month) {
  state.currentQuote.roadmapActivities.push({ id: uuid(), month, type: 'planning', label: '', week: '' });
  renderRoadmapColumns();
}

function removeActivity(id) {
  state.currentQuote.roadmapActivities = state.currentQuote.roadmapActivities.filter(a => a.id !== id);
  renderRoadmapColumns();
}

function updateActivityField(id, field, value) {
  const act = state.currentQuote.roadmapActivities.find(a => a.id === id);
  if (act) { act[field] = value; if (field === 'type') renderRoadmapColumns(); }
}

/* ============================================================
   SHEET 3: KPI DỰ KIẾN
   ============================================================ */
function fillKpiTab(q) {
  if (!q.kpiRows.length && q.items.length) { autoCalcKPI(false); return; }
  renderKpiRows();
  const el = document.getElementById('f_kpiNotes');
  if (el) el.value = q.kpiNotes || '';
}

function collectKpiTab() {
  const el = document.getElementById('f_kpiNotes');
  if (el) state.currentQuote.kpiNotes = el.value;
}

function autoCalcKPI(showMsg = true) {
  const q = state.currentQuote;
  q.kpiRows = q.items.map(item => {
    const c = calcKpiFromItem(item);
    return { id: uuid(), channelId: item.channelId, channelName: item.channelName,
      budget: item.budget, impressions: c.impressions, reach: c.reach,
      clicks: c.clicks, ctr: c.ctr, effectiveCpc: c.effectiveCpc,
      conversions: c.conversions, cpa: c.cpa, notes: '' };
  });
  renderKpiRows();
  const el = document.getElementById('f_kpiNotes');
  if (el) el.value = q.kpiNotes || '';
  if (showMsg) showToast('Đã tự động tính KPI từ Media Plan!', 'success');
}

function renderKpiRows() {
  const tbody = document.getElementById('kpiTbody');
  const q = state.currentQuote;
  if (!q.kpiRows.length) {
    tbody.innerHTML = `<tr><td colspan="10" class="py-10 text-center text-slate-400">
      <i class="fas fa-chart-bar text-3xl mb-2 block text-slate-300"></i>
      Bấm "Tự động tính từ Media Plan" để tạo KPI dự kiến
    </td></tr>`;
    updateKpiSummary(); return;
  }
  tbody.innerHTML = q.kpiRows.map(row => {
    const ch = getChannel(row.channelId);
    return `
    <tr class="border-b border-slate-100 hover:bg-slate-50">
      <td class="px-3 py-2 text-sm font-medium">${ch.icon} ${row.channelName}</td>
      <td class="px-3 py-2 text-sm text-right font-medium text-blue-700">${formatCurrency(row.budget)} đ</td>
      <td class="px-2 py-1">
        <input type="text" value="${formatCurrency(row.impressions)}"
          class="w-full text-sm p-1 text-right focus:bg-blue-50 focus:outline-none rounded"
          onchange="updateKpiField('${row.id}','impressions',this.value)">
      </td>
      <td class="px-2 py-1">
        <input type="text" value="${formatCurrency(row.reach)}"
          class="w-full text-sm p-1 text-right focus:bg-blue-50 focus:outline-none rounded"
          onchange="updateKpiField('${row.id}','reach',this.value)">
      </td>
      <td class="px-2 py-1">
        <input type="text" value="${formatCurrency(row.clicks)}"
          class="w-full text-sm p-1 text-right focus:bg-blue-50 focus:outline-none rounded"
          onchange="updateKpiField('${row.id}','clicks',this.value)">
      </td>
      <td class="px-2 py-1 text-center">
        <input type="text" value="${row.ctr}%"
          class="w-16 text-sm p-1 text-center focus:bg-blue-50 focus:outline-none rounded"
          onchange="updateKpiField('${row.id}','ctr',this.value)">
      </td>
      <td class="px-3 py-2 text-sm text-right text-slate-600">${formatCurrency(row.effectiveCpc)} đ</td>
      <td class="px-2 py-1">
        <input type="text" value="${formatCurrency(row.conversions)}"
          class="w-full text-sm p-1 text-right focus:bg-blue-50 focus:outline-none rounded"
          onchange="updateKpiField('${row.id}','conversions',this.value)">
      </td>
      <td class="px-3 py-2 text-sm text-right text-slate-600">${formatCurrency(row.cpa)} đ</td>
      <td class="px-2 py-1">
        <input type="text" value="${row.notes}" placeholder="Ghi chú..."
          class="w-full text-sm p-1 focus:bg-blue-50 focus:outline-none rounded text-slate-500"
          onchange="updateKpiField('${row.id}','notes',this.value)">
      </td>
    </tr>`;
  }).join('');
  updateKpiSummary();
}

function updateKpiField(id, field, value) {
  const row = state.currentQuote.kpiRows.find(r => r.id === id);
  if (!row) return;
  if (['impressions','reach','clicks','conversions'].includes(field)) row[field] = Math.round(parseCurrency(value));
  else if (field === 'ctr') row[field] = parseFloat(value) || 0;
  else row[field] = value;
  updateKpiSummary();
}

function updateKpiSummary() {
  const rows = state.currentQuote.kpiRows;
  const totBudget = rows.reduce((s,r) => s+(r.budget||0), 0);
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set('kpi_impressions', formatCurrency(rows.reduce((s,r) => s+(r.impressions||0), 0)));
  set('kpi_reach',       formatCurrency(rows.reduce((s,r) => s+(r.reach||0), 0)));
  set('kpi_clicks',      formatCurrency(rows.reduce((s,r) => s+(r.clicks||0), 0)));
  const totConv = rows.reduce((s,r) => s+(r.conversions||0), 0);
  set('kpi_conversions', formatCurrency(totConv));
  set('kpi_cpa',         totConv > 0 ? formatCurrency(Math.round(totBudget/totConv)) + ' đ' : '—');
}

/* ============================================================
   SHEET 4: KEYWORD & VOLUME
   ============================================================ */
function fillKeywordTab(q) {
  renderKeywordRows();
  const el = document.getElementById('f_keywordNotes');
  if (el) el.value = q.keywordNotes || '';
}

function collectKeywordTab() {
  const el = document.getElementById('f_keywordNotes');
  if (el) state.currentQuote.keywordNotes = el.value;
}

function addKeyword() {
  state.currentQuote.keywords.push({ id: uuid(), keyword: '', volume: 0, cpc: 0, competition: 'medium', type: 'generic', priority: 'p2', difficulty: 50, notes: '' });
  renderKeywordRows();
}

function removeKeyword(id) {
  state.currentQuote.keywords = state.currentQuote.keywords.filter(k => k.id !== id);
  renderKeywordRows();
}

function updateKeywordField(id, field, value) {
  const kw = state.currentQuote.keywords.find(k => k.id === id);
  if (!kw) return;
  if (field === 'volume' || field === 'cpc' || field === 'difficulty') kw[field] = parseCurrency(value);
  else kw[field] = value;
}

function renderKeywordRows() {
  const tbody = document.getElementById('keywordTbody');
  const kws = state.currentQuote.keywords;
  if (!kws.length) {
    tbody.innerHTML = `<tr><td colspan="10" class="py-10 text-center text-slate-400">
      <i class="fas fa-search text-3xl mb-2 block text-slate-300"></i>
      Chưa có từ khóa nào. Bấm "+ Thêm từ khóa" hoặc "AI Gợi ý" để bắt đầu.
    </td></tr>`;
    return;
  }
  const compCls = { low:'bg-green-100 text-green-700', medium:'bg-yellow-100 text-yellow-700', high:'bg-red-100 text-red-700' };
  const priCls  = { p1:'bg-blue-100 text-blue-700 font-bold', p2:'bg-slate-100 text-slate-600', p3:'bg-slate-50 text-slate-400' };
  tbody.innerHTML = kws.map((kw, idx) => {
    const diff = kw.difficulty || 0;
    const diffColor = diff < 35 ? '#10b981' : diff < 60 ? '#f59e0b' : '#ef4444';
    const diffLabel = diff < 35 ? 'Dễ' : diff < 60 ? 'TB' : 'Khó';
    return `
    <tr class="border-b border-slate-100 hover:bg-slate-50">
      <td class="px-3 py-2 text-center text-slate-400 text-sm">${idx+1}</td>
      <td class="px-2 py-1 min-w-[180px]">
        <input type="text" value="${kw.keyword}" placeholder="Nhập từ khóa..."
          class="w-full text-sm p-1 focus:bg-blue-50 focus:outline-none rounded font-medium"
          onchange="updateKeywordField('${kw.id}','keyword',this.value)">
      </td>
      <td class="px-2 py-1 min-w-[90px]">
        <input type="text" value="${formatCurrency(kw.volume)}"
          class="w-full text-sm p-1 text-right focus:bg-blue-50 focus:outline-none rounded"
          onchange="updateKeywordField('${kw.id}','volume',this.value)">
      </td>
      <td class="px-2 py-1 min-w-[90px]">
        <input type="text" value="${formatCurrency(kw.cpc)}"
          class="w-full text-sm p-1 text-right focus:bg-blue-50 focus:outline-none rounded"
          onchange="updateKeywordField('${kw.id}','cpc',this.value)">
      </td>
      <td class="px-2 py-1 text-center min-w-[80px]">
        <div class="flex flex-col items-center gap-0.5">
          <input type="number" value="${diff}" min="0" max="100"
            class="w-14 text-sm p-1 text-center focus:bg-blue-50 focus:outline-none rounded border border-slate-200"
            onchange="updateKeywordField('${kw.id}','difficulty',this.value)">
          <span class="text-xs font-semibold" style="color:${diffColor}">${diffLabel}</span>
        </div>
      </td>
      <td class="px-2 py-1 text-center">
        <select class="text-xs p-1 rounded border border-slate-200 focus:outline-none focus:border-blue-400 ${compCls[kw.competition]||''}"
          onchange="updateKeywordField('${kw.id}','competition',this.value)">
          <option value="low"    ${kw.competition==='low'?'selected':''}>Thấp</option>
          <option value="medium" ${kw.competition==='medium'?'selected':''}>Trung bình</option>
          <option value="high"   ${kw.competition==='high'?'selected':''}>Cao</option>
        </select>
      </td>
      <td class="px-2 py-1 text-center">
        <select class="text-xs p-1 rounded border border-slate-200 focus:outline-none focus:border-blue-400"
          onchange="updateKeywordField('${kw.id}','type',this.value)">
          <option value="brand"      ${kw.type==='brand'?'selected':''}>Brand</option>
          <option value="generic"    ${kw.type==='generic'?'selected':''}>Generic</option>
          <option value="longtail"   ${kw.type==='longtail'?'selected':''}>Long-tail</option>
          <option value="competitor" ${kw.type==='competitor'?'selected':''}>Competitor</option>
          <option value="seasonal"   ${kw.type==='seasonal'?'selected':''}>Seasonal</option>
        </select>
      </td>
      <td class="px-2 py-1 text-center">
        <select class="text-xs p-1 rounded border border-slate-200 focus:outline-none focus:border-blue-400"
          onchange="updateKeywordField('${kw.id}','priority',this.value)">
          <option value="p1" ${kw.priority==='p1'?'selected':''}>P1 – Core</option>
          <option value="p2" ${kw.priority==='p2'?'selected':''}>P2 – Phụ</option>
          <option value="p3" ${kw.priority==='p3'?'selected':''}>P3 – Hỗ trợ</option>
        </select>
      </td>
      <td class="px-2 py-1 min-w-[120px]">
        <input type="text" value="${kw.notes}" placeholder="Ghi chú..."
          class="w-full text-sm p-1 focus:bg-blue-50 focus:outline-none rounded text-slate-500"
          onchange="updateKeywordField('${kw.id}','notes',this.value)">
      </td>
      <td class="px-2 py-1 text-center">
        <button onclick="removeKeyword('${kw.id}')" class="text-red-400 hover:text-red-600 text-sm px-1">
          <i class="fas fa-times"></i>
        </button>
      </td>
    </tr>`;
  }).join('');
}

/* ============================================================
   SHEET 5: TARGET AUDIENCE
   ============================================================ */
function fillAudienceTab(q) {
  const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val ?? ''; };
  setVal('f_audienceAgeMin', q.audienceAgeMin || 18);
  setVal('f_audienceAgeMax', q.audienceAgeMax || 45);
  document.getElementById('f_audienceGender').value = q.audienceGender || 'all';
  setVal('f_audienceLocations', q.audienceLocations || '');
  setVal('f_audienceIncome', q.audienceIncome || '');
  setVal('f_audienceEducation', q.audienceEducation || '');
  INTEREST_CATEGORIES.forEach((cat, idx) => {
    const el = document.getElementById(`interest_${idx}`);
    if (el) el.parentElement.classList.toggle('selected', (q.audienceInterests||[]).includes(cat));
    if (el) el.checked = (q.audienceInterests||[]).includes(cat);
  });
  setVal('f_audienceCustomInterests', q.audienceCustomInterests || '');
  setVal('f_audienceBehaviors', q.audienceBehaviors || '');
  ['mobile','desktop','tablet'].forEach(dev => {
    const cb = document.getElementById(`device_${dev}`);
    if (cb) cb.checked = (q.audienceDevices||['mobile']).includes(dev);
  });
  renderPersonas();
}

function collectAudienceTab() {
  const q = state.currentQuote;
  const getVal = id => { const el = document.getElementById(id); return el ? el.value : ''; };
  q.audienceAgeMin  = parseInt(getVal('f_audienceAgeMin')) || 18;
  q.audienceAgeMax  = parseInt(getVal('f_audienceAgeMax')) || 45;
  q.audienceGender  = getVal('f_audienceGender');
  q.audienceLocations = getVal('f_audienceLocations');
  q.audienceIncome    = getVal('f_audienceIncome');
  q.audienceEducation = getVal('f_audienceEducation');
  q.audienceInterests = INTEREST_CATEGORIES.filter((cat, idx) => {
    const el = document.getElementById(`interest_${idx}`);
    return el && el.checked;
  });
  q.audienceCustomInterests = getVal('f_audienceCustomInterests');
  q.audienceBehaviors = getVal('f_audienceBehaviors');
  q.audienceDevices = ['mobile','desktop','tablet'].filter(dev => {
    const cb = document.getElementById(`device_${dev}`);
    return cb && cb.checked;
  });
}

function addPersona() {
  const names = ['Persona A','Persona B','Persona C','Persona D'];
  const count = state.currentQuote.audiencePersonas.length;
  state.currentQuote.audiencePersonas.push({
    id: uuid(), name: names[count] || `Persona ${count+1}`,
    age: '25-35', job: '', income: '',
    goals: '', painPoints: '', mediaHabits: '', buyBehavior: ''
  });
  renderPersonas();
}

function removePersona(id) {
  state.currentQuote.audiencePersonas = state.currentQuote.audiencePersonas.filter(p => p.id !== id);
  renderPersonas();
}

function updatePersonaField(id, field, value) {
  const p = state.currentQuote.audiencePersonas.find(p => p.id === id);
  if (p) p[field] = value;
}

function renderPersonas() {
  const container = document.getElementById('personasContainer');
  const personas  = state.currentQuote.audiencePersonas;
  if (!personas.length) {
    container.innerHTML = `<div class="text-slate-400 text-sm text-center py-8 italic">Chưa có persona nào. Bấm "+ Thêm Persona".</div>`;
    return;
  }
  container.innerHTML = personas.map(p => `
    <div class="persona-card">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-3">
          <div class="persona-avatar">${(p.name||'P').charAt(0).toUpperCase()}</div>
          <input type="text" value="${p.name}"
            class="font-bold text-slate-800 text-base bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-400 focus:outline-none"
            onchange="updatePersonaField('${p.id}','name',this.value)">
        </div>
        <button onclick="removePersona('${p.id}')" class="text-slate-400 hover:text-red-500 text-xl leading-none">×</button>
      </div>
      <div class="grid grid-cols-2 gap-3 text-sm">
        <div>
          <label class="block text-xs font-semibold text-slate-500 mb-1">Tuổi</label>
          <input type="text" value="${p.age}" placeholder="25-35"
            class="w-full border border-slate-200 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:border-blue-400"
            onchange="updatePersonaField('${p.id}','age',this.value)">
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-500 mb-1">Nghề nghiệp</label>
          <input type="text" value="${p.job}" placeholder="Marketing Manager"
            class="w-full border border-slate-200 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:border-blue-400"
            onchange="updatePersonaField('${p.id}','job',this.value)">
        </div>
        <div class="col-span-2">
          <label class="block text-xs font-semibold text-slate-500 mb-1">Thu nhập</label>
          <input type="text" value="${p.income}" placeholder="10–20 triệu/tháng"
            class="w-full border border-slate-200 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:border-blue-400"
            onchange="updatePersonaField('${p.id}','income',this.value)">
        </div>
        <div class="col-span-2">
          <label class="block text-xs font-semibold text-slate-500 mb-1">Mục tiêu & Mong muốn</label>
          <textarea rows="2" placeholder="Họ muốn gì? Hướng đến điều gì?"
            class="w-full border border-slate-200 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:border-blue-400 resize-none"
            onchange="updatePersonaField('${p.id}','goals',this.value)">${p.goals}</textarea>
        </div>
        <div class="col-span-2">
          <label class="block text-xs font-semibold text-slate-500 mb-1">Điểm đau (Pain Points)</label>
          <textarea rows="2" placeholder="Vấn đề, lo lắng, rào cản của họ?"
            class="w-full border border-slate-200 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:border-blue-400 resize-none"
            onchange="updatePersonaField('${p.id}','painPoints',this.value)">${p.painPoints}</textarea>
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-500 mb-1">Thói quen mạng xã hội</label>
          <textarea rows="2" placeholder="Hay dùng Facebook, TikTok lúc nào?"
            class="w-full border border-slate-200 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:border-blue-400 resize-none"
            onchange="updatePersonaField('${p.id}','mediaHabits',this.value)">${p.mediaHabits}</textarea>
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-500 mb-1">Hành vi mua hàng</label>
          <textarea rows="2" placeholder="Cách họ tìm kiếm và quyết định mua..."
            class="w-full border border-slate-200 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:border-blue-400 resize-none"
            onchange="updatePersonaField('${p.id}','buyBehavior',this.value)">${p.buyBehavior}</textarea>
        </div>
      </div>
    </div>`).join('');
}

/* ============================================================
   SHEET 6: CONTENT & DESIGN
   ============================================================ */
function fillContentTab(q) {
  TONE_OPTIONS.forEach(t => {
    const cb = document.getElementById(`tone_${t.id}`);
    if (cb) cb.checked = (q.toneOfVoice||[]).includes(t.id);
  });
  const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val || ''; };
  setVal('f_visualStyle', q.visualStyle);
  setVal('f_visualColors', q.visualColors);
  setVal('f_visualMood', q.visualMood);
  setVal('f_adCopyNotes', q.adCopyNotes);
  setVal('f_ctaExamples', q.ctaExamples);
  setVal('f_designNotes', q.designNotes);
  setVal('f_videoDirection', q.videoDirection);
  renderPillars();
}

function collectContentTab() {
  const q = state.currentQuote;
  q.toneOfVoice = TONE_OPTIONS.filter(t => { const cb = document.getElementById(`tone_${t.id}`); return cb && cb.checked; }).map(t => t.id);
  const getVal = id => { const el = document.getElementById(id); return el ? el.value : ''; };
  q.visualStyle     = getVal('f_visualStyle');
  q.visualColors    = getVal('f_visualColors');
  q.visualMood      = getVal('f_visualMood');
  q.adCopyNotes     = getVal('f_adCopyNotes');
  q.ctaExamples     = getVal('f_ctaExamples');
  q.designNotes     = getVal('f_designNotes');
  q.videoDirection  = getVal('f_videoDirection');
}

function addContentPillar() {
  const count = state.currentQuote.contentPillars.length;
  if (count >= 5) { showToast('Tối đa 5 content pillars', 'info'); return; }
  state.currentQuote.contentPillars.push({ id: uuid(), title: `Pillar ${count+1}`, description: '', examples: '' });
  renderPillars();
}

function removeContentPillar(id) {
  state.currentQuote.contentPillars = state.currentQuote.contentPillars.filter(p => p.id !== id);
  renderPillars();
}

function updatePillarField(id, field, value) {
  const p = state.currentQuote.contentPillars.find(p => p.id === id);
  if (p) p[field] = value;
}

function renderPillars() {
  const container = document.getElementById('pillarsContainer');
  const pillars = state.currentQuote.contentPillars;
  const palettes = [
    { bg: 'bg-blue-50',   border: 'border-blue-200',   num: 'bg-blue-600',   title: 'text-blue-800'   },
    { bg: 'bg-green-50',  border: 'border-green-200',  num: 'bg-green-600',  title: 'text-green-800'  },
    { bg: 'bg-purple-50', border: 'border-purple-200', num: 'bg-purple-600', title: 'text-purple-800' },
    { bg: 'bg-amber-50',  border: 'border-amber-200',  num: 'bg-amber-600',  title: 'text-amber-800'  },
    { bg: 'bg-pink-50',   border: 'border-pink-200',   num: 'bg-pink-600',   title: 'text-pink-800'   },
  ];
  if (!pillars.length) {
    container.innerHTML = `<div class="text-slate-400 text-sm text-center py-8 italic">Chưa có pillar nào. Bấm "+ Thêm Pillar".</div>`;
    return;
  }
  container.innerHTML = pillars.map((p, idx) => {
    const pal = palettes[idx % palettes.length];
    return `
    <div class="pillar-card ${pal.bg} ${pal.border}">
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center gap-2">
          <span class="w-7 h-7 rounded-full ${pal.num} text-white text-xs flex items-center justify-center font-bold">${idx+1}</span>
          <input type="text" value="${p.title}"
            class="font-bold text-base ${pal.title} bg-transparent border-0 focus:outline-none focus:border-b focus:border-blue-400"
            onchange="updatePillarField('${p.id}','title',this.value)">
        </div>
        <button onclick="removeContentPillar('${p.id}')" class="text-slate-400 hover:text-red-500 text-xl leading-none">×</button>
      </div>
      <textarea rows="2" placeholder="Mô tả pillar này về điều gì..."
        class="w-full text-sm bg-white/60 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400 resize-none mb-2"
        onchange="updatePillarField('${p.id}','description',this.value)">${p.description}</textarea>
      <textarea rows="2" placeholder="Ví dụ nội dung cụ thể, ý tưởng bài đăng..."
        class="w-full text-sm bg-white/60 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400 resize-none text-slate-500"
        onchange="updatePillarField('${p.id}','examples',this.value)">${p.examples}</textarea>
    </div>`;
  }).join('');
}

/* ============================================================
   TABS
   ============================================================ */
function switchTab(tab) {
  state.activeTab = tab;
  const TABS = ['general','quote','roadmap','kpi','keyword','audience','content'];
  TABS.forEach(t => {
    const btn  = document.getElementById(`tab_${t}`);
    const cont = document.getElementById(`tabContent_${t}`);
    if (btn)  btn.classList.toggle('active', t === tab);
    if (cont) cont.classList.toggle('hidden', t !== tab);
  });
  if (tab === 'quote')   updateFinanceSummary();
  if (tab === 'roadmap') renderRoadmapColumns();
  if (tab === 'kpi') {
    if (!state.currentQuote.kpiRows.length && state.currentQuote.items.length) autoCalcKPI(false);
    else renderKpiRows();
  }
}

/* ---- Save ---- */
function saveQuote() {
  collectGeneralTab();
  collectQuoteTab();
  collectRoadmapTab();
  collectKpiTab();
  collectKeywordTab();
  collectAudienceTab();
  collectContentTab();
  const q = state.currentQuote;
  q.updatedAt = today();
  const idx = state.quotes.findIndex(x => x.id === q.id);
  if (idx >= 0) state.quotes[idx] = q;
  else state.quotes.unshift(q);
  state.editingId = q.id;
  Store.saveQuotes(state.quotes);
  updateProgressBar();
  showToast('Đã lưu báo giá thành công!', 'success');
}

/* ---- Delete ---- */
let pendingDeleteId = null;
function confirmDelete(id) {
  pendingDeleteId = id;
  const q = state.quotes.find(q => q.id === id);
  document.getElementById('deleteQuoteName').textContent = q ? `${q.quoteNumber} – ${q.clientCompany||'Chưa điền'}` : '';
  document.getElementById('deleteModal').classList.remove('hidden');
}
function doDelete() {
  if (!pendingDeleteId) return;
  state.quotes = state.quotes.filter(q => q.id !== pendingDeleteId);
  Store.saveQuotes(state.quotes);
  closeDeleteModal();
  renderDashboard();
  showToast('Đã xóa báo giá', 'info');
}
function closeDeleteModal() {
  document.getElementById('deleteModal').classList.add('hidden');
  pendingDeleteId = null;
}

/* ---- Duplicate ---- */
function duplicateQuote(id) {
  const q = state.quotes.find(q => q.id === id);
  if (!q) return;
  const newQ = JSON.parse(JSON.stringify(q));
  newQ.id = uuid(); newQ.status = 'draft';
  newQ.createdAt = today(); newQ.updatedAt = today();
  newQ.quoteNumber = generateQuoteNumber();
  state.quotes.unshift(newQ);
  Store.saveQuotes(state.quotes);
  renderDashboard();
  showToast('Đã nhân bản báo giá!', 'success');
}

/* ============================================================
   PREVIEW – 6 SECTIONS
   ============================================================ */
function previewQuote(id) {
  const q = state.quotes.find(q => q.id === id);
  if (!q) return;
  renderPreview(q);
}

function previewCurrentQuote() {
  saveQuote();
  renderPreview(state.currentQuote);
}

function renderPreview(q) {
  showView('preview');
  const agency = state.agency;
  const totals = calcTotals(q);
  const objectivesStr = (q.campaignObjectives||[]).join(' · ') || '—';

  /* ---- Section 1: Báo giá ---- */
  const itemRows = q.items.map((item, idx) => `
    <tr>
      <td class="text-center">${idx+1}</td>
      <td>${getChannel(item.channelId).icon} ${item.channelName||item.channelId}</td>
      <td>${item.format}</td>
      <td>${item.objective}</td>
      <td class="text-center">${item.pricingType}</td>
      <td class="text-right">${formatCurrency(item.unitPrice)} đ</td>
      <td class="text-right">${item.pricingType==='Fixed'?'1 gói':formatCurrency(item.quantity)}</td>
      <td class="text-right font-medium text-blue-700">${formatCurrency(item.budget)} đ</td>
      <td class="text-center">${item.duration||'—'} ngày</td>
    </tr>`).join('');

  /* ---- Section 2: Road Map ---- */
  const rmCols = [0,1,2].map(i => {
    const monthName = (q.roadmapMonths||[])[i] || `Tháng ${i+1}`;
    const acts = (q.roadmapActivities||[]).filter(a => a.month === i+1);
    const actRows = acts.length
      ? acts.map(a => {
          const type = ACTIVITY_TYPES.find(t => t.id === a.type) || ACTIVITY_TYPES[0];
          return `<div class="flex items-start gap-2 mb-2">
            <div class="preview-act-dot mt-1" style="background:${type.dot}"></div>
            <div>
              <div class="text-xs font-semibold" style="color:${type.dot}">${type.label}</div>
              <div class="text-xs text-slate-600">${a.label||'—'}${a.week ? ` <span class="text-slate-400">(Tuần ${a.week})</span>` : ''}</div>
            </div>
          </div>`;
        }).join('')
      : '<p class="text-xs text-slate-400 italic">Chưa có hoạt động</p>';
    return `
      <div class="preview-rm-col">
        <div class="preview-rm-head">${monthName}</div>
        <div class="preview-rm-body">${actRows}</div>
      </div>`;
  }).join('');

  /* ---- Section 3: KPI ---- */
  const kpiRows = (q.kpiRows||[]).length
    ? q.kpiRows.map((r, idx) => `
      <tr>
        <td>${idx+1}</td>
        <td>${getChannel(r.channelId).icon} ${r.channelName}</td>
        <td class="text-right font-medium text-blue-700">${formatCurrency(r.budget)} đ</td>
        <td class="text-right">${formatCurrency(r.impressions)}</td>
        <td class="text-right">${formatCurrency(r.reach)}</td>
        <td class="text-right">${formatCurrency(r.clicks)}</td>
        <td class="text-center">${r.ctr}%</td>
        <td class="text-right">${formatCurrency(r.effectiveCpc)} đ</td>
        <td class="text-right">${formatCurrency(r.conversions)}</td>
        <td class="text-right">${formatCurrency(r.cpa)} đ</td>
      </tr>`).join('')
    : `<tr><td colspan="10" class="text-center text-slate-400 py-4">Chưa có dữ liệu KPI</td></tr>`;

  /* ---- Section 4: Keywords ---- */
  const compLabel = { low: 'Thấp', medium: 'Trung bình', high: 'Cao' };
  const compColor = { low: '#10b981', medium: '#f59e0b', high: '#ef4444' };
  const typeLabel = { brand:'Brand', generic:'Generic', longtail:'Long-tail', competitor:'Competitor', seasonal:'Seasonal' };
  const priLabel  = { p1:'P1 – Core', p2:'P2 – Phụ', p3:'P3 – Hỗ trợ' };
  const kwRows = (q.keywords||[]).length
    ? q.keywords.map((kw, idx) => {
        const diff = kw.difficulty || 0;
        const diffCol = diff < 35 ? '#10b981' : diff < 60 ? '#f59e0b' : '#ef4444';
        return `
      <tr>
        <td class="text-center">${idx+1}</td>
        <td class="font-medium">${kw.keyword||'—'}</td>
        <td class="text-right">${formatCurrency(kw.volume)}</td>
        <td class="text-right">${formatCurrency(kw.cpc)} đ</td>
        <td class="text-center"><span style="color:${diffCol};font-weight:700">${diff}/100</span></td>
        <td class="text-center"><span style="color:${compColor[kw.competition]||'#64748b'};font-weight:600">${compLabel[kw.competition]||kw.competition}</span></td>
        <td class="text-center">${typeLabel[kw.type]||kw.type}</td>
        <td class="text-center font-semibold text-blue-700">${priLabel[kw.priority]||kw.priority}</td>
        <td>${kw.notes||''}</td>
      </tr>`;
      }).join('')
    : `<tr><td colspan="9" class="text-center text-slate-400 py-4">Chưa có từ khóa nào</td></tr>`;

  /* ---- Section 5: Audience ---- */
  const interests = (q.audienceInterests||[]);
  const deviceMap = { mobile:'📱 Mobile', desktop:'💻 Desktop', tablet:'📟 Tablet' };
  const devStr = (q.audienceDevices||['mobile']).map(d => deviceMap[d]||d).join(' · ');
  const genderMap = { all:'Tất cả', male:'Nam', female:'Nữ' };
  const personaCards = (q.audiencePersonas||[]).map(p => `
    <div style="border:1px solid #e2e8f0;border-radius:10px;padding:14px;break-inside:avoid;margin-bottom:10px;">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
        <div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#1e40af,#3b82f6);color:white;font-weight:700;font-size:16px;display:flex;align-items:center;justify-content:center;">${(p.name||'P').charAt(0)}</div>
        <div>
          <div style="font-weight:700;color:#1e3a8a">${p.name}</div>
          <div style="font-size:12px;color:#64748b">${p.age||''}${p.job?' · '+p.job:''}${p.income?' · '+p.income:''}</div>
        </div>
      </div>
      ${p.goals?`<div style="margin-bottom:6px;"><b style="font-size:11px;color:#475569">MỤC TIÊU:</b><br><span style="font-size:12px;">${p.goals}</span></div>`:''}
      ${p.painPoints?`<div style="margin-bottom:6px;"><b style="font-size:11px;color:#ef4444">PAIN POINTS:</b><br><span style="font-size:12px;">${p.painPoints}</span></div>`:''}
      ${p.mediaHabits?`<div style="margin-bottom:6px;"><b style="font-size:11px;color:#475569">THÓI QUEN MXH:</b><br><span style="font-size:12px;">${p.mediaHabits}</span></div>`:''}
      ${p.buyBehavior?`<div><b style="font-size:11px;color:#475569">HÀNH VI MUA:</b><br><span style="font-size:12px;">${p.buyBehavior}</span></div>`:''}
    </div>`).join('');

  /* ---- Section 6: Content & Design ---- */
  const toneLabels = (q.toneOfVoice||[]).map(id => { const t = TONE_OPTIONS.find(o => o.id === id); return t ? t.label : id; });
  const pillarCards = (q.contentPillars||[]).map((p, idx) => {
    const colors = ['#3b82f6','#10b981','#8b5cf6','#f59e0b','#ec4899'];
    return `
    <div style="border:2px solid ${colors[idx%colors.length]}20;border-left:4px solid ${colors[idx%colors.length]};border-radius:8px;padding:12px;margin-bottom:10px;break-inside:avoid">
      <div style="font-weight:700;color:${colors[idx%colors.length]};margin-bottom:4px;">Pillar ${idx+1}: ${p.title}</div>
      <div style="font-size:12px;color:#374151;margin-bottom:4px;">${p.description||''}</div>
      ${p.examples?`<div style="font-size:11px;color:#64748b;font-style:italic">Ví dụ: ${p.examples}</div>`:''}
    </div>`;
  }).join('');

  const html = `
  <div class="preview-doc font-sans text-sm text-slate-800">

    <!-- ======= SECTION 1: BÁO GIÁ ======= -->
    <div class="preview-header">
      <div class="flex items-start justify-between">
        <div>
          ${agency.logoUrl ? `<img src="${agency.logoUrl}" alt="Logo" class="h-12 mb-3 object-contain bg-white rounded p-1">` : `<div class="text-2xl font-bold mb-1">${agency.name}</div>`}
          <p class="text-blue-200 text-xs">${agency.address}</p>
          <p class="text-blue-200 text-xs">${agency.phone} | ${agency.email}${agency.taxCode ? ' | MST: '+agency.taxCode : ''}</p>
        </div>
        <div class="text-right">
          <div class="text-3xl font-bold tracking-wide">KẾ HOẠCH MEDIA</div>
          <div class="text-blue-200 text-lg font-mono">${q.quoteNumber}</div>
          <div class="text-blue-200 text-xs mt-2">Ngày lập: ${formatDate(q.createdAt)}</div>
          <div class="text-blue-200 text-xs">Hiệu lực đến: ${formatDate(q.validUntil)}</div>
        </div>
      </div>
    </div>

    <div class="p-8">
      <!-- Client & Campaign -->
      <div class="grid grid-cols-2 gap-6 mb-8">
        <div class="border border-slate-200 rounded-lg p-5">
          <h3 class="font-bold text-blue-800 mb-3 text-xs uppercase tracking-wide border-b border-slate-100 pb-2">Thông Tin Khách Hàng</h3>
          <table class="w-full text-sm">
            <tr><td class="text-slate-500 py-1 w-28">Công ty:</td><td class="font-medium">${q.clientCompany||'—'}</td></tr>
            <tr><td class="text-slate-500 py-1">Liên hệ:</td><td>${q.clientContact||'—'}${q.clientPosition?` (${q.clientPosition})`:''}</td></tr>
            <tr><td class="text-slate-500 py-1">Điện thoại:</td><td>${q.clientPhone||'—'}</td></tr>
            <tr><td class="text-slate-500 py-1">Email:</td><td>${q.clientEmail||'—'}</td></tr>
            <tr><td class="text-slate-500 py-1">Ngành:</td><td>${q.clientIndustry||'—'}</td></tr>
          </table>
        </div>
        <div class="border border-slate-200 rounded-lg p-5">
          <h3 class="font-bold text-blue-800 mb-3 text-xs uppercase tracking-wide border-b border-slate-100 pb-2">Thông Tin Chiến Dịch</h3>
          <table class="w-full text-sm">
            <tr><td class="text-slate-500 py-1 w-28">Chiến dịch:</td><td class="font-medium">${q.campaignName||'—'}</td></tr>
            <tr><td class="text-slate-500 py-1">Mục tiêu:</td><td>${objectivesStr}</td></tr>
            <tr><td class="text-slate-500 py-1">Đối tượng:</td><td>${q.targetAudience||'—'}</td></tr>
            <tr><td class="text-slate-500 py-1">Thời gian:</td><td>${q.startDate?`${formatDate(q.startDate)} → ${formatDate(q.endDate)}`:'—'}</td></tr>
            <tr><td class="text-slate-500 py-1">Khu vực:</td><td>${q.location||'—'}</td></tr>
          </table>
        </div>
      </div>

      <!-- SHEET 1: Media Table -->
      <div class="mb-6">
        <h3 class="font-bold text-blue-800 mb-3 text-xs uppercase tracking-wide">Sheet 1 – Bảng Báo Giá Chi Phí Dịch Vụ</h3>
        <table class="preview-table w-full rounded-lg overflow-hidden border border-slate-200">
          <thead>
            <tr>
              <th class="w-8">#</th><th class="text-left">Kênh</th><th class="text-left">Định dạng</th>
              <th class="text-left">Mục tiêu</th><th>Loại giá</th><th class="text-right">Đơn giá</th>
              <th class="text-right">Số lượng</th><th class="text-right">Ngân sách</th><th>Thời gian</th>
            </tr>
          </thead>
          <tbody>${itemRows||'<tr><td colspan="9" class="text-center py-4 text-slate-400">Chưa có kênh</td></tr>'}</tbody>
        </table>
      </div>

      <!-- Finance Summary -->
      <div class="flex justify-end mb-6">
        <table class="finance-table w-80 rounded-lg overflow-hidden border border-slate-200 text-sm">
          <tr class="border-b border-slate-100"><td class="text-slate-500">Tổng ngân sách Media</td><td class="text-right font-medium">${formatCurrency(totals.subtotal)} đ</td></tr>
          <tr class="border-b border-slate-100"><td class="text-slate-500">Phí quản lý (${q.agencyFeeRate||0}%)</td><td class="text-right">${formatCurrency(totals.agencyFeeAmt)} đ</td></tr>
          ${totals.discountAmt>0?`<tr class="border-b border-slate-100"><td class="text-slate-500">Chiết khấu (${q.discountRate}%)${q.discountNote?' – '+q.discountNote:''}</td><td class="text-right text-emerald-600">-${formatCurrency(totals.discountAmt)} đ</td></tr>`:''}
          <tr class="border-b border-slate-100 bg-slate-50"><td class="font-medium">Tổng trước thuế</td><td class="text-right font-medium">${formatCurrency(totals.beforeVAT)} đ</td></tr>
          <tr class="border-b border-slate-100"><td class="text-slate-500">VAT (${q.vatRate||10}%)</td><td class="text-right">${formatCurrency(totals.vatAmt)} đ</td></tr>
          <tr class="total-row"><td class="px-4 py-3 font-bold text-base">TỔNG THANH TOÁN</td><td class="px-4 py-3 text-right font-bold text-lg">${formatCurrency(totals.total)} đ</td></tr>
        </table>
      </div>

      ${q.termsAndConditions?`<div class="p-4 bg-slate-50 rounded-lg border border-slate-200 mb-6">
        <h4 class="font-bold text-slate-700 text-xs uppercase tracking-wide mb-2">Điều khoản & Điều kiện</h4>
        <p class="text-xs text-slate-500 leading-relaxed">${q.termsAndConditions}</p>
      </div>`:''}

      <!-- Signatures -->
      <div class="grid grid-cols-2 gap-8 mt-8 pt-6 border-t border-slate-200">
        <div class="text-center">
          <p class="font-bold text-slate-700 mb-1">Đại diện Khách hàng</p>
          <p class="text-xs text-slate-400 mb-8">Ký tên, đóng dấu</p>
          <div class="border-b border-slate-300 mt-12 mb-1"></div>
          <p class="text-sm text-slate-500">${q.clientCompany||'Công ty Khách hàng'}</p>
          <p class="text-xs text-slate-400">Ngày: ........../........../............</p>
        </div>
        <div class="text-center">
          <p class="font-bold text-slate-700 mb-1">Đại diện Agency</p>
          <p class="text-xs text-slate-400 mb-8">Ký tên, đóng dấu</p>
          <div class="border-b border-slate-300 mt-12 mb-1"></div>
          <p class="text-sm text-slate-500">${agency.name}</p>
          <p class="text-xs text-slate-400">${q.accountManager||'Account Manager'}</p>
        </div>
      </div>
    </div>

    <!-- ======= SECTION 2: ROAD MAP ======= -->
    <div class="preview-new-page">
      <div class="preview-section-header">
        <div class="sec-tag">Sheet 2</div>
        <h2>Kế hoạch triển khai trong 3 tháng (Road Map)</h2>
      </div>
      <div class="p-8">
        <div class="grid grid-cols-3 gap-4 mb-6">${rmCols}</div>
        ${q.roadmapActivities.length ? `
        <div class="mt-4 p-4 bg-slate-50 rounded-lg text-xs">
          <span class="font-semibold text-slate-600">Chú thích: </span>
          ${ACTIVITY_TYPES.map(t => `<span class="inline-flex items-center gap-1 mr-4"><span style="width:8px;height:8px;border-radius:50%;background:${t.dot};display:inline-block"></span>${t.label}</span>`).join('')}
        </div>` : ''}
      </div>
    </div>

    <!-- ======= SECTION 3: KPI ======= -->
    <div class="preview-new-page">
      <div class="preview-section-header">
        <div class="sec-tag">Sheet 3</div>
        <h2>Dự kiến chỉ số Quảng Cáo (KPI Projection)</h2>
      </div>
      <div class="p-8">
        <table class="preview-table w-full rounded-lg overflow-hidden border border-slate-200 mb-6">
          <thead>
            <tr>
              <th>#</th><th class="text-left">Kênh</th><th class="text-right">Ngân sách</th>
              <th class="text-right">Impressions</th><th class="text-right">Reach</th>
              <th class="text-right">Clicks</th><th class="text-center">CTR</th>
              <th class="text-right">CPC</th><th class="text-right">Conversions</th><th class="text-right">CPA</th>
            </tr>
          </thead>
          <tbody>${kpiRows}</tbody>
        </table>
        ${q.kpiNotes?`<div class="p-4 bg-blue-50 rounded-lg text-sm text-blue-800 border border-blue-100">
          <b>Ghi chú:</b> ${q.kpiNotes}</div>`:''}
        <p class="text-xs text-slate-400 mt-4">* Số liệu mang tính dự kiến dựa trên benchmark thị trường. Kết quả thực tế có thể thay đổi tùy điều kiện chiến dịch.</p>
      </div>
    </div>

    <!-- ======= SECTION 4: KEYWORDS ======= -->
    <div class="preview-new-page">
      <div class="preview-section-header">
        <div class="sec-tag">Sheet 4</div>
        <h2>Check Keyword & Volume Tìm kiếm</h2>
      </div>
      <div class="p-8">
        <table class="preview-table w-full rounded-lg overflow-hidden border border-slate-200 mb-4">
          <thead>
            <tr>
              <th class="w-8">#</th><th class="text-left">Từ khóa</th>
              <th class="text-right">Volume/tháng</th><th class="text-right">CPC (đ)</th>
              <th class="text-center">Độ khó (1-100)</th>
              <th class="text-center">Cạnh tranh</th><th class="text-center">Loại</th>
              <th class="text-center">Ưu tiên</th><th class="text-left">Ghi chú</th>
            </tr>
          </thead>
          <tbody>${kwRows}</tbody>
        </table>
        ${q.keywordNotes?`<div class="p-4 bg-amber-50 rounded-lg text-sm text-amber-800 border border-amber-100">
          <b>Ghi chú:</b> ${q.keywordNotes}</div>`:''}
      </div>
    </div>

    <!-- ======= SECTION 5: AUDIENCE ======= -->
    <div class="preview-new-page">
      <div class="preview-section-header">
        <div class="sec-tag">Sheet 5</div>
        <h2>Phân tích Target Audience</h2>
      </div>
      <div class="p-8">
        <div class="grid grid-cols-2 gap-6 mb-6">
          <div>
            <h3 class="font-bold text-blue-800 mb-3 text-xs uppercase tracking-wide border-b border-slate-100 pb-2">Nhân khẩu học</h3>
            <table class="w-full text-sm">
              <tr><td class="text-slate-500 py-1 w-28">Tuổi:</td><td class="font-medium">${q.audienceAgeMin||18} – ${q.audienceAgeMax||45} tuổi</td></tr>
              <tr><td class="text-slate-500 py-1">Giới tính:</td><td>${genderMap[q.audienceGender]||'Tất cả'}</td></tr>
              <tr><td class="text-slate-500 py-1">Khu vực:</td><td>${q.audienceLocations||'—'}</td></tr>
              <tr><td class="text-slate-500 py-1">Thu nhập:</td><td>${q.audienceIncome||'—'}</td></tr>
              <tr><td class="text-slate-500 py-1">Học vấn:</td><td>${q.audienceEducation||'—'}</td></tr>
              <tr><td class="text-slate-500 py-1">Thiết bị:</td><td>${devStr}</td></tr>
            </table>
            ${interests.length?`<div class="mt-4">
              <div class="font-semibold text-slate-600 text-xs uppercase tracking-wide mb-2">Sở thích & Quan tâm</div>
              <div class="flex flex-wrap gap-1.5">${interests.map(i=>`<span class="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs">${i}</span>`).join('')}</div>
            </div>`:''}
            ${q.audienceCustomInterests?`<div class="mt-3 p-3 bg-slate-50 rounded-lg text-xs text-slate-600"><b>Sở thích khác:</b> ${q.audienceCustomInterests}</div>`:''}
            ${q.audienceBehaviors?`<div class="mt-3 p-3 bg-slate-50 rounded-lg text-xs text-slate-600"><b>Hành vi:</b> ${q.audienceBehaviors}</div>`:''}
          </div>
          <div>
            <h3 class="font-bold text-blue-800 mb-3 text-xs uppercase tracking-wide border-b border-slate-100 pb-2">Chân dung khách hàng</h3>
            ${personaCards||'<p class="text-slate-400 text-sm italic">Chưa có persona</p>'}
          </div>
        </div>
      </div>
    </div>

    <!-- ======= SECTION 6: CONTENT & DESIGN ======= -->
    <div class="preview-new-page">
      <div class="preview-section-header">
        <div class="sec-tag">Sheet 6</div>
        <h2>Định hướng Content + Design Ads</h2>
      </div>
      <div class="p-8">
        <div class="grid grid-cols-2 gap-6">
          <div>
            ${(q.contentPillars||[]).length?`
            <h3 class="font-bold text-blue-800 mb-3 text-xs uppercase tracking-wide border-b border-slate-100 pb-2">Content Pillars</h3>
            ${pillarCards}`:''}
            ${toneLabels.length?`
            <div class="mt-4">
              <h3 class="font-bold text-blue-800 mb-2 text-xs uppercase tracking-wide border-b border-slate-100 pb-2">Tone of Voice</h3>
              <div class="flex flex-wrap gap-2">${toneLabels.map(l=>`<span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">${l}</span>`).join('')}</div>
            </div>`:''}
          </div>
          <div>
            ${(q.visualStyle||q.visualColors||q.visualMood)?`
            <h3 class="font-bold text-blue-800 mb-3 text-xs uppercase tracking-wide border-b border-slate-100 pb-2">Định hướng Visual</h3>
            <table class="w-full text-sm mb-4">
              ${q.visualStyle?`<tr><td class="text-slate-500 py-1 w-24">Phong cách:</td><td>${q.visualStyle}</td></tr>`:''}
              ${q.visualColors?`<tr><td class="text-slate-500 py-1">Màu sắc:</td><td>${q.visualColors}</td></tr>`:''}
              ${q.visualMood?`<tr><td class="text-slate-500 py-1">Mood:</td><td>${q.visualMood}</td></tr>`:''}
            </table>`:''}
            ${q.adCopyNotes?`
            <div class="mb-4">
              <h3 class="font-bold text-blue-800 mb-2 text-xs uppercase tracking-wide border-b border-slate-100 pb-2">Định hướng Ad Copy</h3>
              <p class="text-sm text-slate-600">${q.adCopyNotes}</p>
            </div>`:''}
            ${q.ctaExamples?`
            <div class="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
              <b class="text-xs text-green-700 uppercase tracking-wide">CTA mẫu:</b>
              <p class="text-sm text-green-800 mt-1">${q.ctaExamples}</p>
            </div>`:''}
            ${q.designNotes?`
            <div class="mb-4">
              <h3 class="font-bold text-blue-800 mb-2 text-xs uppercase tracking-wide border-b border-slate-100 pb-2">Ghi chú Design</h3>
              <p class="text-sm text-slate-600">${q.designNotes}</p>
            </div>`:''}
            ${q.videoDirection?`
            <div class="p-3 bg-purple-50 rounded-lg border border-purple-200">
              <b class="text-xs text-purple-700 uppercase tracking-wide">Định hướng Video:</b>
              <p class="text-sm text-purple-800 mt-1">${q.videoDirection}</p>
            </div>`:''}
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="bg-slate-800 text-slate-400 text-xs text-center py-3 px-8">
      ${agency.name} | ${agency.phone} | ${agency.email}${agency.website?' | '+agency.website:''}
    </div>
  </div>`;

  document.getElementById('previewContent').innerHTML = html;
}

/* ============================================================
   SETTINGS
   ============================================================ */
function openSettings() {
  const a = state.agency; const s = state.settings;
  const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val||''; };
  setVal('s_agencyName', a.name); setVal('s_agencyAddress', a.address);
  setVal('s_agencyPhone', a.phone); setVal('s_agencyEmail', a.email);
  setVal('s_agencyWebsite', a.website); setVal('s_agencyTaxCode', a.taxCode);
  setVal('s_agencyLogoUrl', a.logoUrl);
  setVal('s_agencyFeeRate', s.agencyFeeRate);
  setVal('s_vatRate', s.vatRate); setVal('s_quotePrefix', s.quotePrefix);
  document.getElementById('settingsModal').classList.remove('hidden');
}

function saveSettings() {
  const getVal = id => document.getElementById(id)?.value || '';
  state.agency = {
    name: getVal('s_agencyName'), address: getVal('s_agencyAddress'),
    phone: getVal('s_agencyPhone'), email: getVal('s_agencyEmail'),
    website: getVal('s_agencyWebsite'), taxCode: getVal('s_agencyTaxCode'),
    logoUrl: getVal('s_agencyLogoUrl'),
  };
  state.settings = {
    agencyFeeRate: parseFloat(getVal('s_agencyFeeRate')) || 15,
    vatRate:       parseFloat(getVal('s_vatRate'))       || 10,
    quotePrefix:   getVal('s_quotePrefix') || 'MP',
  };
  Store.saveAgency(state.agency);
  Store.saveSettings(state.settings);
  document.getElementById('settingsModal').classList.add('hidden');
  showToast('Đã lưu cài đặt!', 'success');
}

function closeSettings() { document.getElementById('settingsModal').classList.add('hidden'); }

/* ============================================================
   TEMPLATE SELECTION MODAL
   ============================================================ */
function newQuoteAction() {
  document.getElementById('templateModal').classList.remove('hidden');
}

function closeTemplateModal() {
  document.getElementById('templateModal').classList.add('hidden');
}

function startBlankQuote() {
  closeTemplateModal();
  state.currentQuote = newQuote();
  state.editingId = null;
  state.activeTab = 'general';
  renderEditor();
}

function loadTemplate(templateId) {
  closeTemplateModal();
  const tpl = TEMPLATES.find(t => t.id === templateId);
  if (!tpl) { startBlankQuote(); return; }

  const q = newQuote();
  const d = tpl.data;

  Object.assign(q, {
    clientCompany: d.clientCompany || '', clientIndustry: d.clientIndustry || '',
    clientContact: d.clientContact || '', clientPosition: d.clientPosition || '',
    campaignName: d.campaignName || '', campaignObjectives: d.campaignObjectives || [],
    targetAudience: d.targetAudience || '', ageRange: d.ageRange || '18-45',
    gender: d.gender || 'all', location: d.location || 'Toàn quốc',
    agencyFeeRate: d.agencyFeeRate ?? 15, discountRate: d.discountRate ?? 0,
    vatRate: d.vatRate ?? 10, termsAndConditions: d.termsAndConditions || q.termsAndConditions,
    roadmapMonths: d.roadmapMonths || q.roadmapMonths,
    roadmapActivities: (d.roadmapActivities || []).map(a => ({ ...a, id: uuid() })),
    kpiNotes: d.kpiNotes || '',
    keywords: (d.keywords || []).map(k => ({ ...k, id: uuid() })),
    audienceAgeMin: d.audienceAgeMin ?? 18, audienceAgeMax: d.audienceAgeMax ?? 45,
    audienceGender: d.audienceGender || 'all',
    audienceLocations: d.audienceLocations || '',
    audienceIncome: d.audienceIncome || '', audienceEducation: d.audienceEducation || '',
    audienceInterests: d.audienceInterests || [],
    audienceBehaviors: d.audienceBehaviors || '',
    audienceDevices: d.audienceDevices || ['mobile'],
    audiencePersonas: (d.audiencePersonas || []).map(p => ({ ...p, id: uuid() })),
    audienceCustomInterests: d.audienceCustomInterests || '',
    contentPillars: (d.contentPillars || []).map(p => ({ ...p, id: uuid() })),
    toneOfVoice: d.toneOfVoice || [],
    visualStyle: d.visualStyle || '', visualColors: d.visualColors || '',
    visualMood: d.visualMood || '', adCopyNotes: d.adCopyNotes || '',
    ctaExamples: d.ctaExamples || '', designNotes: d.designNotes || '',
    videoDirection: d.videoDirection || '',
  });

  q.items = (d.items || []).map(item => ({ ...item, id: uuid() }));

  if (q.items.length) {
    q.kpiRows = q.items.map(item => {
      const c = calcKpiFromItem(item);
      return { id: uuid(), channelId: item.channelId, channelName: item.channelName,
        budget: item.budget, impressions: c.impressions, reach: c.reach,
        clicks: c.clicks, ctr: c.ctr, effectiveCpc: c.effectiveCpc,
        conversions: c.conversions, cpa: c.cpa, notes: '' };
    });
  }

  state.currentQuote = q;
  state.editingId = null;
  state.activeTab = 'general';
  renderEditor();
  showToast(`Đã tải template: ${tpl.name}`, 'success');
}

/* ============================================================
   AI SUGGESTION FUNCTIONS (Industry-based Smart Suggestions)
   ============================================================ */
function aiSuggestKeywords() {
  const q = state.currentQuote;
  const industry = document.getElementById('f_clientIndustry')?.value || q.clientIndustry || '';
  const aiData = INDUSTRY_AI[industry];
  if (!aiData) {
    showToast('Chọn ngành nghề ở tab Thông tin để gợi ý từ khóa phù hợp', 'info'); return;
  }
  const existing = new Set(q.keywords.map(k => k.keyword));
  let added = 0;
  aiData.keywords.forEach(kw => {
    if (!existing.has(kw.keyword)) {
      q.keywords.push({ ...kw, id: uuid() });
      added++;
    }
  });
  renderKeywordRows();
  showToast(`AI đã gợi ý ${added} từ khóa cho ngành ${industry}!`, 'success');
}

function aiSuggestAudience() {
  const q = state.currentQuote;
  const industry = document.getElementById('f_clientIndustry')?.value || q.clientIndustry || '';
  const aiData = INDUSTRY_AI[industry];
  if (!aiData) {
    showToast('Chọn ngành nghề ở tab Thông tin để gợi ý đối tượng phù hợp', 'info'); return;
  }
  const aud = aiData.audience;
  const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val; };
  setVal('f_audienceAgeMin', aud.ageMin);
  setVal('f_audienceAgeMax', aud.ageMax);
  document.getElementById('f_audienceGender').value = aud.gender;
  setVal('f_audienceLocations', aud.locations);
  setVal('f_audienceIncome', aud.income);
  setVal('f_audienceEducation', aud.education);
  setVal('f_audienceBehaviors', aud.behaviors);
  aud.interests.forEach(interest => {
    const idx = INTEREST_CATEGORIES.indexOf(interest);
    if (idx >= 0) {
      const cb = document.getElementById(`interest_${idx}`);
      if (cb) { cb.checked = true; cb.parentElement.classList.add('selected'); }
    }
  });
  showToast(`AI đã gợi ý đối tượng cho ngành ${industry}!`, 'success');
}

function aiSuggestContent() {
  const q = state.currentQuote;
  const industry = document.getElementById('f_clientIndustry')?.value || q.clientIndustry || '';
  const aiData = INDUSTRY_AI[industry];
  if (!aiData) {
    showToast('Chọn ngành nghề ở tab Thông tin để gợi ý content', 'info'); return;
  }
  q.contentPillars = aiData.pillars.map(p => ({ ...p, id: uuid() }));
  q.toneOfVoice = aiData.tones;
  TONE_OPTIONS.forEach(t => {
    const cb = document.getElementById(`tone_${t.id}`);
    if (cb) cb.checked = aiData.tones.includes(t.id);
  });
  renderPillars();
  showToast(`AI đã gợi ý ${aiData.pillars.length} content pillars cho ngành ${industry}!`, 'success');
}

function aiSuggestRoadmap() {
  const q = state.currentQuote;
  const industry = q.clientIndustry || '';
  const isEcommerce = ['Thời trang & Phụ kiện','Thực phẩm & Đồ uống','FMCG','E-commerce','Mỹ phẩm & Sức khỏe'].includes(industry);
  const isB2B = ['Công nghệ & Phần mềm','Tài chính & Ngân hàng','Bảo hiểm'].includes(industry);

  const defaultActivities = isB2B ? [
    { month:1, type:'planning', label:'Audit website, landing page, tracking conversion', week:'1' },
    { month:1, type:'planning', label:'Research từ khóa B2B, phân tích đối thủ', week:'1-2' },
    { month:1, type:'creative', label:'Viết content SEO/blog, sản xuất video demo', week:'2-3' },
    { month:1, type:'launch', label:'Khởi động Google Search & Display campaigns', week:'3-4' },
    { month:2, type:'optimize', label:'Tối ưu Quality Score, A/B test landing page', week:'1-2' },
    { month:2, type:'launch', label:'Remarketing đối tượng đã thăm trang pricing', week:'2' },
    { month:2, type:'meeting', label:'Mid-campaign review với khách hàng', week:'3' },
    { month:2, type:'optimize', label:'Scale ngân sách kênh có CPL tốt nhất', week:'3-4' },
    { month:3, type:'optimize', label:'Lookalike audience từ danh sách leads chất lượng', week:'1' },
    { month:3, type:'report', label:'Báo cáo tổng kết: leads, CPL, pipeline value', week:'4' },
  ] : [
    { month:1, type:'planning', label:'Lên brief chiến dịch, nghiên cứu thị trường', week:'1' },
    { month:1, type:'creative', label:'Sản xuất creative (video, ảnh, banner)', week:'2-3' },
    { month:1, type:'launch', label:'Setup tài khoản & cài đặt tracking pixel', week:'3' },
    { month:1, type:'launch', label:'Khởi chạy chiến dịch Awareness', week:'4' },
    { month:2, type:'optimize', label:'A/B test creative & audience, tối ưu CTR', week:'1-2' },
    { month:2, type:'optimize', label:'Scale ngân sách kênh hiệu quả nhất', week:'3' },
    { month:2, type:'meeting', label:'Mid-campaign review với khách hàng', week:'3' },
    { month:2, type:'launch', label:'Chạy retargeting & remarketing', week:'4' },
    { month:3, type:'optimize', label:'Full optimization, tối ưu conversion', week:'1-2' },
    { month:3, type:'report', label:'Báo cáo tổng kết, đề xuất giai đoạn tiếp theo', week:'4' },
  ];
  q.roadmapActivities = defaultActivities.map(a => ({ ...a, id: uuid() }));
  renderRoadmapColumns();
  showToast('AI đã tạo roadmap 3 tháng!', 'success');
}

/* ============================================================
   PROGRESS INDICATOR
   ============================================================ */
function calcProgress(q) {
  if (!q) return 0;
  let score = 0;
  if (q.clientCompany) score += 15;
  if (q.campaignName) score += 10;
  if (q.items.length > 0) score += 20;
  if (q.roadmapActivities.length > 0) score += 15;
  if (q.kpiRows.length > 0) score += 10;
  if (q.keywords.length > 0) score += 10;
  if (q.audiencePersonas.length > 0 || q.audienceInterests.length > 0) score += 10;
  if (q.contentPillars.length > 0) score += 10;
  return Math.min(score, 100);
}

function updateProgressBar() {
  const bar = document.getElementById('progressBar');
  const pct = document.getElementById('progressPct');
  if (!bar || !pct) return;
  const p = calcProgress(state.currentQuote);
  bar.style.width = p + '%';
  pct.textContent = p + '%';
  bar.className = `h-2 rounded-full transition-all duration-500 ${p < 40 ? 'bg-red-400' : p < 70 ? 'bg-amber-400' : 'bg-emerald-500'}`;
}

/* ============================================================
   INIT
   ============================================================ */
function init() {
  state.quotes   = Store.loadQuotes();
  state.agency   = Store.loadAgency();
  state.settings = Store.loadSettings();

  document.getElementById('searchInput').addEventListener('input', e => renderQuoteList(e.target.value));

  ['f_agencyFeeRate','f_discountRate','f_vatRate'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', updateFinanceSummary);
  });

  renderDashboard();
}

window.addEventListener('DOMContentLoaded', init);
