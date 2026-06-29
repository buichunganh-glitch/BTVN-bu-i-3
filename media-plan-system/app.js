/* ============================================================
   Media Plan Pro – Application Logic
   ============================================================ */

/* ---- Constants ---- */
const CHANNELS = [
  { id: 'facebook', name: 'Facebook Ads', icon: '📘',
    formats: ['Image Ads', 'Video Ads', 'Carousel Ads', 'Collection Ads', 'Stories Ads', 'Reels Ads', 'Lead Generation'],
    defPricing: 'CPM', defPrice: 50000 },
  { id: 'instagram', name: 'Instagram Ads', icon: '📸',
    formats: ['Image Ads', 'Video Ads', 'Carousel Ads', 'Stories Ads', 'Reels Ads'],
    defPricing: 'CPM', defPrice: 55000 },
  { id: 'gg_search', name: 'Google Search Ads', icon: '🔍',
    formats: ['Responsive Search Ads', 'Dynamic Search Ads', 'Call Ads'],
    defPricing: 'CPC', defPrice: 12000 },
  { id: 'gg_display', name: 'Google Display (GDN)', icon: '🖥️',
    formats: ['Responsive Display Ads', 'Image Banner', 'Gmail Ads', 'Smart Display'],
    defPricing: 'CPM', defPrice: 20000 },
  { id: 'youtube', name: 'YouTube Ads', icon: '▶️',
    formats: ['TrueView In-Stream', 'Bumper Ads (6s)', 'Non-Skippable In-Stream', 'Discovery Ads'],
    defPricing: 'CPV', defPrice: 300 },
  { id: 'tiktok', name: 'TikTok Ads', icon: '🎵',
    formats: ['TopView', 'Brand Takeover', 'In-Feed Video', 'Spark Ads', 'Branded Hashtag Challenge'],
    defPricing: 'CPM', defPrice: 45000 },
  { id: 'zalo', name: 'Zalo Ads', icon: '💬',
    formats: ['Zalo Display Ads', 'Zalo Follow Ads', 'Zalo Article Ads', 'Zalo OA'],
    defPricing: 'CPM', defPrice: 25000 },
  { id: 'native', name: 'Native Ads / Báo điện tử', icon: '📰',
    formats: ['Native Article', 'Display Banner', 'Video Native', 'Content Marketing'],
    defPricing: 'CPM', defPrice: 30000 },
  { id: 'ooh', name: 'OOH / Billboard', icon: '🏙️',
    formats: ['Billboard Tĩnh', 'DOOH / LED Screen', 'Airport Ads', 'Metro Ads'],
    defPricing: 'Fixed', defPrice: 50000000 },
  { id: 'influencer', name: 'Influencer Marketing', icon: '⭐',
    formats: ['Facebook Post', 'Instagram Post', 'TikTok Video', 'YouTube Review', 'Facebook Live'],
    defPricing: 'Fixed', defPrice: 20000000 },
  { id: 'seo_content', name: 'SEO / Content', icon: '✍️',
    formats: ['Blog Articles', 'Landing Page', 'Infographic', 'Video Script'],
    defPricing: 'Fixed', defPrice: 5000000 },
  { id: 'email', name: 'Email Marketing', icon: '📧',
    formats: ['Newsletter', 'Promotion Email', 'Transactional Email'],
    defPricing: 'Fixed', defPrice: 3000000 },
  { id: 'sms', name: 'SMS Marketing', icon: '📱',
    formats: ['SMS Brandname', 'SMS OTP'],
    defPricing: 'CPM', defPrice: 280000 },
  { id: 'other', name: 'Khác (Custom)', icon: '🎯',
    formats: ['Custom'],
    defPricing: 'Fixed', defPrice: 0 },
];

const PRICING_TYPES = ['CPM', 'CPC', 'CPV', 'CPL', 'Fixed'];

const OBJECTIVES = [
  'Brand Awareness', 'Reach & Frequency', 'Traffic', 'Engagement',
  'Lead Generation', 'App Install', 'Video Views', 'Conversions', 'Sales'
];

const INDUSTRIES = [
  'Thực phẩm & Đồ uống', 'Thời trang & Phụ kiện', 'Mỹ phẩm & Sức khỏe',
  'Bất động sản', 'Tài chính & Ngân hàng', 'Bảo hiểm', 'Giáo dục & Đào tạo',
  'Du lịch & Khách sạn', 'Công nghệ & Phần mềm', 'Ô tô & Xe máy',
  'Nội thất & Gia dụng', 'Thể thao & Giải trí', 'Y tế & Dược phẩm',
  'Viễn thông', 'FMCG', 'E-commerce', 'Khác'
];

const STATUS_LABELS = {
  draft: 'Nháp',
  sent: 'Đã gửi',
  approved: 'Đã duyệt',
  rejected: 'Từ chối',
  expired: 'Hết hạn'
};

/* ---- State ---- */
let state = {
  view: 'dashboard',    // dashboard | editor | preview
  quotes: [],
  currentQuote: null,
  editingId: null,
  activeTab: 'general', // general | media | finance
  agency: {},
  settings: {},
  budgetChart: null,
};

/* ---- Storage ---- */
const Store = {
  QUOTES_KEY: 'mp_quotes',
  AGENCY_KEY: 'mp_agency',
  SETTINGS_KEY: 'mp_settings',

  loadQuotes() {
    try { return JSON.parse(localStorage.getItem(this.QUOTES_KEY)) || []; }
    catch { return []; }
  },
  saveQuotes(quotes) {
    localStorage.setItem(this.QUOTES_KEY, JSON.stringify(quotes));
  },
  loadAgency() {
    const def = {
      name: 'Công ty Quảng cáo ABC',
      address: '123 Đường ABC, Quận 1, TP.HCM',
      phone: '028 1234 5678',
      email: 'contact@agency.vn',
      website: 'www.agency.vn',
      taxCode: '0123456789',
      logoUrl: '',
    };
    try { return { ...def, ...JSON.parse(localStorage.getItem(this.AGENCY_KEY)) }; }
    catch { return def; }
  },
  saveAgency(agency) {
    localStorage.setItem(this.AGENCY_KEY, JSON.stringify(agency));
  },
  loadSettings() {
    const def = { agencyFeeRate: 15, vatRate: 10, currency: 'VND', quotePrefix: 'MP' };
    try { return { ...def, ...JSON.parse(localStorage.getItem(this.SETTINGS_KEY)) }; }
    catch { return def; }
  },
  saveSettings(settings) {
    localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(settings));
  },
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
  const d = new Date(dateStr);
  return d.toLocaleDateString('vi-VN');
}

function today() {
  return new Date().toISOString().split('T')[0];
}

function addDays(dateStr, days) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

function generateQuoteNumber() {
  const s = state.settings;
  const prefix = s.quotePrefix || 'MP';
  const year = new Date().getFullYear();
  const count = state.quotes.length + 1;
  return `${prefix}${year}-${String(count).padStart(3, '0')}`;
}

function showToast(msg, type = 'success') {
  const toast = document.getElementById('toast');
  const colors = { success: 'bg-emerald-500', error: 'bg-red-500', info: 'bg-blue-600' };
  toast.className = `fixed bottom-6 right-6 z-50 transition-all duration-300 px-5 py-3 rounded-xl text-white font-medium shadow-xl ${colors[type] || colors.success}`;
  toast.innerHTML = `<i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'times' : 'info'}-circle mr-2"></i>${msg}`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

function getChannel(id) {
  return CHANNELS.find(c => c.id === id) || CHANNELS[CHANNELS.length - 1];
}

/* ---- Quote Factory ---- */
function newQuote() {
  const t = today();
  return {
    id: uuid(),
    quoteNumber: generateQuoteNumber(),
    status: 'draft',
    createdAt: t,
    updatedAt: t,
    validUntil: addDays(t, 30),
    // Client
    clientCompany: '',
    clientContact: '',
    clientPosition: '',
    clientPhone: '',
    clientEmail: '',
    clientAddress: '',
    clientIndustry: '',
    // Campaign
    campaignName: '',
    campaignObjectives: [],
    targetAudience: '',
    ageRange: '18-45',
    gender: 'all',
    location: 'Toàn quốc',
    startDate: '',
    endDate: '',
    campaignNotes: '',
    // Media items
    items: [],
    // Finance
    agencyFeeRate: state.settings.agencyFeeRate || 15,
    discountRate: 0,
    discountNote: '',
    vatRate: state.settings.vatRate || 10,
    // Extra
    accountManager: '',
    accountPhone: '',
    accountEmail: '',
    termsAndConditions: 'Báo giá có hiệu lực trong vòng 30 ngày kể từ ngày phát hành. Giá trên chưa bao gồm VAT. Mọi thay đổi về ngân sách hoặc kế hoạch cần được thông báo trước 7 ngày.',
    internalNotes: '',
  };
}

function newMediaItem() {
  const ch = CHANNELS[0];
  return {
    id: uuid(),
    channelId: ch.id,
    channelName: ch.name,
    format: ch.formats[0],
    objective: 'Brand Awareness',
    pricingType: ch.defPricing,
    unitPrice: ch.defPrice,
    quantity: 1000000,
    budget: ch.defPricing === 'CPM' ? (ch.defPrice * 1000000 / 1000) : ch.defPrice,
    duration: 30,
    notes: '',
  };
}

/* ---- Calculations ---- */
function calcItemBudget(item) {
  const { pricingType, unitPrice, quantity } = item;
  if (pricingType === 'Fixed') return unitPrice;
  if (pricingType === 'CPM') return (unitPrice * quantity) / 1000;
  return unitPrice * quantity;
}

function calcItemQuantity(item) {
  const { pricingType, unitPrice, budget } = item;
  if (!unitPrice) return 0;
  if (pricingType === 'Fixed') return 1;
  if (pricingType === 'CPM') return (budget * 1000) / unitPrice;
  return budget / unitPrice;
}

function calcTotals(quote) {
  const subtotal = quote.items.reduce((s, i) => s + (i.budget || 0), 0);
  const agencyFeeAmt = subtotal * (quote.agencyFeeRate || 0) / 100;
  const discountBase = subtotal + agencyFeeAmt;
  const discountAmt = discountBase * (quote.discountRate || 0) / 100;
  const beforeVAT = discountBase - discountAmt;
  const vatAmt = beforeVAT * (quote.vatRate || 10) / 100;
  const total = beforeVAT + vatAmt;
  return { subtotal, agencyFeeAmt, discountBase, discountAmt, beforeVAT, vatAmt, total };
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
  const total = quotes.length;
  const approved = quotes.filter(q => q.status === 'approved').length;
  const totalBudget = quotes.reduce((s, q) => {
    const t = calcTotals(q);
    return s + t.total;
  }, 0);
  const activeCampaigns = quotes.filter(q => ['sent', 'approved'].includes(q.status)).length;

  document.getElementById('statTotal').textContent = total;
  document.getElementById('statApproved').textContent = approved;
  document.getElementById('statBudget').textContent = formatCurrency(totalBudget);
  document.getElementById('statActive').textContent = activeCampaigns;
}

function renderQuoteList(filter = '') {
  const tbody = document.getElementById('quoteTbody');
  let quotes = [...state.quotes].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  if (filter) {
    const f = filter.toLowerCase();
    quotes = quotes.filter(q =>
      (q.quoteNumber || '').toLowerCase().includes(f) ||
      (q.clientCompany || '').toLowerCase().includes(f) ||
      (q.campaignName || '').toLowerCase().includes(f)
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
    const statusClass = `badge-${q.status}`;
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
        <span class="px-2 py-1 rounded-full text-xs font-medium ${statusClass}">${STATUS_LABELS[q.status] || q.status}</span>
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

function newQuoteAction() {
  state.currentQuote = newQuote();
  state.editingId = null;
  state.activeTab = 'general';
  renderEditor();
}

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

  // Header info
  document.getElementById('editorTitle').textContent = q.quoteNumber || 'Báo giá mới';
  document.getElementById('editorStatus').innerHTML = `<span class="badge-${q.status} px-3 py-1 rounded-full text-sm font-medium">${STATUS_LABELS[q.status]}</span>`;

  // Populate general tab
  fillGeneralTab(q);
  // Populate media tab
  fillMediaTab(q);
  // Populate finance tab
  fillFinanceTab(q);

  // Show correct tab
  switchTab(state.activeTab);
}

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

  const industrySelect = document.getElementById('f_clientIndustry');
  industrySelect.value = q.clientIndustry || '';

  setVal('f_campaignName', q.campaignName);
  setVal('f_targetAudience', q.targetAudience);
  setVal('f_ageRange', q.ageRange);
  document.getElementById('f_gender').value = q.gender || 'all';
  setVal('f_location', q.location);
  setVal('f_startDate', q.startDate);
  setVal('f_endDate', q.endDate);
  setVal('f_campaignNotes', q.campaignNotes);

  // Objectives checkboxes
  OBJECTIVES.forEach(obj => {
    const cb = document.getElementById(`obj_${obj.replace(/\s+/g, '_')}`);
    if (cb) cb.checked = (q.campaignObjectives || []).includes(obj);
  });
}

function fillMediaTab(q) {
  renderMediaRows();
}

function fillFinanceTab(q) {
  document.getElementById('f_agencyFeeRate').value = q.agencyFeeRate ?? 15;
  document.getElementById('f_discountRate').value = q.discountRate ?? 0;
  document.getElementById('f_discountNote').value = q.discountNote || '';
  document.getElementById('f_vatRate').value = q.vatRate ?? 10;
  document.getElementById('f_termsAndConditions').value = q.termsAndConditions || '';
  document.getElementById('f_internalNotes').value = q.internalNotes || '';
  updateFinanceSummary();
}

/* ---- Media Table ---- */

function renderMediaRows() {
  const tbody = document.getElementById('mediaTbody');
  const q = state.currentQuote;

  if (!q.items.length) {
    tbody.innerHTML = `<tr id="emptyMediaRow"><td colspan="10" class="py-8 text-center text-slate-400 text-sm">
      Chưa có kênh nào. Bấm "+ Thêm kênh" để bắt đầu.
    </td></tr>`;
    updateMediaSummary();
    return;
  }

  tbody.innerHTML = q.items.map((item, idx) => renderMediaRow(item, idx)).join('');
  updateMediaSummary();
  updateBudgetChart();
}

function renderMediaRow(item, idx) {
  const ch = getChannel(item.channelId);
  const channelOptions = CHANNELS.map(c =>
    `<option value="${c.id}" ${c.id === item.channelId ? 'selected' : ''}>${c.icon} ${c.name}</option>`
  ).join('');
  const formatOptions = ch.formats.map(f =>
    `<option value="${f}" ${f === item.format ? 'selected' : ''}>${f}</option>`
  ).join('');
  const objectiveOptions = OBJECTIVES.map(o =>
    `<option value="${o}" ${o === item.objective ? 'selected' : ''}>${o}</option>`
  ).join('');
  const pricingOptions = PRICING_TYPES.map(p =>
    `<option value="${p}" ${p === item.pricingType ? 'selected' : ''}>${p}</option>`
  ).join('');

  const isFixed = item.pricingType === 'Fixed';

  return `
  <tr class="border-b border-slate-100" data-row-id="${item.id}">
    <td class="px-3 py-2 text-center text-slate-400 text-sm w-8">${idx + 1}</td>
    <td class="px-2 py-1 min-w-[160px]">
      <select class="w-full text-sm p-1 rounded border-0 bg-transparent focus:bg-blue-50 focus:outline-none"
        onchange="updateRowField('${item.id}', 'channelId', this.value)">
        ${channelOptions}
      </select>
    </td>
    <td class="px-2 py-1 min-w-[160px]">
      <select class="w-full text-sm p-1 rounded border-0 bg-transparent focus:bg-blue-50 focus:outline-none"
        id="fmt_${item.id}"
        onchange="updateRowField('${item.id}', 'format', this.value)">
        ${formatOptions}
      </select>
    </td>
    <td class="px-2 py-1 min-w-[130px]">
      <select class="w-full text-sm p-1 rounded border-0 bg-transparent focus:bg-blue-50 focus:outline-none"
        onchange="updateRowField('${item.id}', 'objective', this.value)">
        ${objectiveOptions}
      </select>
    </td>
    <td class="px-2 py-1 min-w-[90px]">
      <select class="w-full text-sm p-1 rounded border-0 bg-transparent focus:bg-blue-50 focus:outline-none"
        onchange="updateRowPricing('${item.id}', this.value)">
        ${pricingOptions}
      </select>
    </td>
    <td class="px-2 py-1 min-w-[110px]">
      <div class="flex items-center gap-1">
        <input type="text" value="${formatCurrency(item.unitPrice)}"
          class="w-full text-sm p-1 rounded text-right focus:bg-blue-50 focus:outline-none border-0"
          onchange="updateRowPrice('${item.id}', this.value)" />
      </div>
    </td>
    <td class="px-2 py-1 min-w-[110px]">
      <input type="text" value="${isFixed ? '1 gói' : formatCurrency(item.quantity)}"
        class="w-full text-sm p-1 rounded text-right focus:bg-blue-50 focus:outline-none border-0 ${isFixed ? 'text-slate-400' : ''}"
        ${isFixed ? 'readonly' : ''}
        onchange="updateRowQuantity('${item.id}', this.value)" />
    </td>
    <td class="px-2 py-1 min-w-[110px]">
      <input type="text" value="${formatCurrency(item.budget)}"
        class="w-full text-sm p-1 rounded text-right font-medium text-blue-700 focus:bg-blue-50 focus:outline-none border-0"
        onchange="updateRowBudget('${item.id}', this.value)" />
    </td>
    <td class="px-2 py-1 min-w-[80px]">
      <div class="flex items-center gap-1">
        <input type="number" value="${item.duration || 30}" min="1"
          class="w-full text-sm p-1 rounded text-right focus:bg-blue-50 focus:outline-none border-0"
          onchange="updateRowField('${item.id}', 'duration', +this.value)" />
        <span class="text-xs text-slate-400 whitespace-nowrap">ngày</span>
      </div>
    </td>
    <td class="px-2 py-1 text-center w-10">
      <button onclick="removeMediaRow('${item.id}')"
        class="text-red-400 hover:text-red-600 px-1" title="Xóa dòng">
        <i class="fas fa-times"></i>
      </button>
    </td>
  </tr>`;
}

function addMediaRow() {
  const q = state.currentQuote;
  q.items.push(newMediaItem());
  renderMediaRows();
}

function removeMediaRow(id) {
  state.currentQuote.items = state.currentQuote.items.filter(i => i.id !== id);
  renderMediaRows();
  updateFinanceSummary();
}

function updateRowField(id, field, value) {
  const item = state.currentQuote.items.find(i => i.id === id);
  if (!item) return;
  item[field] = value;

  if (field === 'channelId') {
    const ch = getChannel(value);
    item.channelName = ch.name;
    item.format = ch.formats[0];
    item.pricingType = ch.defPricing;
    item.unitPrice = ch.defPrice;
    item.budget = calcItemBudget(item);
    renderMediaRows();
  }
  updateMediaSummary();
  updateFinanceSummary();
}

function updateRowPricing(id, pricingType) {
  const item = state.currentQuote.items.find(i => i.id === id);
  if (!item) return;
  item.pricingType = pricingType;
  if (pricingType === 'Fixed') { item.quantity = 1; }
  item.budget = calcItemBudget(item);
  renderMediaRows();
  updateMediaSummary();
  updateFinanceSummary();
}

function updateRowPrice(id, value) {
  const item = state.currentQuote.items.find(i => i.id === id);
  if (!item) return;
  item.unitPrice = parseCurrency(value);
  item.budget = calcItemBudget(item);
  // Update budget cell display
  const row = document.querySelector(`[data-row-id="${id}"]`);
  if (row) {
    const inputs = row.querySelectorAll('input[type=text]');
    if (inputs[2]) inputs[2].value = formatCurrency(item.budget);
  }
  updateMediaSummary();
  updateFinanceSummary();
}

function updateRowQuantity(id, value) {
  const item = state.currentQuote.items.find(i => i.id === id);
  if (!item) return;
  item.quantity = parseCurrency(value);
  item.budget = calcItemBudget(item);
  const row = document.querySelector(`[data-row-id="${id}"]`);
  if (row) {
    const inputs = row.querySelectorAll('input[type=text]');
    if (inputs[2]) inputs[2].value = formatCurrency(item.budget);
  }
  updateMediaSummary();
  updateFinanceSummary();
}

function updateRowBudget(id, value) {
  const item = state.currentQuote.items.find(i => i.id === id);
  if (!item) return;
  item.budget = parseCurrency(value);
  if (item.pricingType !== 'Fixed' && item.unitPrice) {
    item.quantity = calcItemQuantity(item);
    const row = document.querySelector(`[data-row-id="${id}"]`);
    if (row) {
      const inputs = row.querySelectorAll('input[type=text]');
      if (inputs[1]) inputs[1].value = formatCurrency(item.quantity);
    }
  }
  updateMediaSummary();
  updateFinanceSummary();
}

function updateMediaSummary() {
  const q = state.currentQuote;
  const subtotal = q.items.reduce((s, i) => s + (i.budget || 0), 0);
  const el = document.getElementById('mediaSubtotal');
  if (el) el.textContent = formatCurrency(subtotal) + ' đ';
  updateBudgetChart();
}

function updateBudgetChart() {
  const q = state.currentQuote;
  if (!q.items.length) {
    if (state.budgetChart) { state.budgetChart.destroy(); state.budgetChart = null; }
    return;
  }

  const channelBudgets = {};
  q.items.forEach(item => {
    const name = item.channelName || item.channelId;
    channelBudgets[name] = (channelBudgets[name] || 0) + (item.budget || 0);
  });

  const labels = Object.keys(channelBudgets);
  const data = Object.values(channelBudgets);
  const colors = [
    '#3b82f6','#10b981','#f59e0b','#ef4444','#8b5cf6',
    '#ec4899','#14b8a6','#f97316','#6366f1','#84cc16',
    '#06b6d4','#d946ef','#a78bfa','#fb923c'
  ];

  const ctx = document.getElementById('budgetChart');
  if (!ctx) return;

  if (state.budgetChart) state.budgetChart.destroy();
  state.budgetChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{ data, backgroundColor: colors.slice(0, labels.length), borderWidth: 2, borderColor: '#fff' }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom', labels: { font: { size: 11 }, padding: 12 } },
        tooltip: {
          callbacks: {
            label: ctx => `${ctx.label}: ${formatCurrency(ctx.raw)} đ`
          }
        }
      }
    }
  });
}

/* ---- Finance ---- */

function updateFinanceSummary() {
  const q = state.currentQuote;
  if (!q) return;

  // Sync rates from inputs
  const feeEl = document.getElementById('f_agencyFeeRate');
  const discEl = document.getElementById('f_discountRate');
  const vatEl = document.getElementById('f_vatRate');
  if (feeEl) q.agencyFeeRate = parseFloat(feeEl.value) || 0;
  if (discEl) q.discountRate = parseFloat(discEl.value) || 0;
  if (vatEl) q.vatRate = parseFloat(vatEl.value) || 0;

  const t = calcTotals(q);

  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set('fin_subtotal', formatCurrency(t.subtotal) + ' đ');
  set('fin_agencyFee', formatCurrency(t.agencyFeeAmt) + ' đ');
  set('fin_discount', t.discountAmt > 0 ? `-${formatCurrency(t.discountAmt)} đ` : '0 đ');
  set('fin_beforeVAT', formatCurrency(t.beforeVAT) + ' đ');
  set('fin_vat', formatCurrency(t.vatAmt) + ' đ');
  set('fin_total', formatCurrency(t.total) + ' đ');
}

/* ---- Tabs ---- */

function switchTab(tab) {
  state.activeTab = tab;
  ['general', 'media', 'finance'].forEach(t => {
    document.getElementById(`tab_${t}`).classList.toggle('active', t === tab);
    document.getElementById(`tabContent_${t}`).classList.toggle('hidden', t !== tab);
  });
  if (tab === 'finance') updateFinanceSummary();
}

/* ---- Collect form data ---- */

function collectGeneralTab() {
  const q = state.currentQuote;
  const getVal = id => { const el = document.getElementById(id); return el ? el.value : ''; };

  q.quoteNumber = getVal('f_quoteNumber');
  q.createdAt = getVal('f_createdAt');
  q.validUntil = getVal('f_validUntil');
  q.status = getVal('f_status');
  q.accountManager = getVal('f_accountManager');
  q.accountPhone = getVal('f_accountPhone');
  q.accountEmail = getVal('f_accountEmail');

  q.clientCompany = getVal('f_clientCompany');
  q.clientContact = getVal('f_clientContact');
  q.clientPosition = getVal('f_clientPosition');
  q.clientPhone = getVal('f_clientPhone');
  q.clientEmail = getVal('f_clientEmail');
  q.clientAddress = getVal('f_clientAddress');
  q.clientIndustry = getVal('f_clientIndustry');

  q.campaignName = getVal('f_campaignName');
  q.targetAudience = getVal('f_targetAudience');
  q.ageRange = getVal('f_ageRange');
  q.gender = getVal('f_gender');
  q.location = getVal('f_location');
  q.startDate = getVal('f_startDate');
  q.endDate = getVal('f_endDate');
  q.campaignNotes = getVal('f_campaignNotes');

  q.campaignObjectives = OBJECTIVES.filter(obj => {
    const cb = document.getElementById(`obj_${obj.replace(/\s+/g, '_')}`);
    return cb && cb.checked;
  });
}

function collectFinanceTab() {
  const q = state.currentQuote;
  q.agencyFeeRate = parseFloat(document.getElementById('f_agencyFeeRate')?.value) || 0;
  q.discountRate = parseFloat(document.getElementById('f_discountRate')?.value) || 0;
  q.discountNote = document.getElementById('f_discountNote')?.value || '';
  q.vatRate = parseFloat(document.getElementById('f_vatRate')?.value) || 10;
  q.termsAndConditions = document.getElementById('f_termsAndConditions')?.value || '';
  q.internalNotes = document.getElementById('f_internalNotes')?.value || '';
}

/* ---- Save ---- */

function saveQuote() {
  collectGeneralTab();
  collectFinanceTab();
  const q = state.currentQuote;
  q.updatedAt = today();

  const idx = state.quotes.findIndex(x => x.id === q.id);
  if (idx >= 0) state.quotes[idx] = q;
  else state.quotes.unshift(q);

  state.editingId = q.id;
  Store.saveQuotes(state.quotes);
  showToast('Đã lưu báo giá thành công!', 'success');
}

/* ---- Delete ---- */

let pendingDeleteId = null;

function confirmDelete(id) {
  pendingDeleteId = id;
  const q = state.quotes.find(q => q.id === id);
  document.getElementById('deleteQuoteName').textContent = q ? `${q.quoteNumber} - ${q.clientCompany || 'Chưa điền'}` : '';
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
  newQ.id = uuid();
  newQ.status = 'draft';
  newQ.createdAt = today();
  newQ.updatedAt = today();
  newQ.quoteNumber = generateQuoteNumber();
  state.quotes.unshift(newQ);
  Store.saveQuotes(state.quotes);
  renderDashboard();
  showToast('Đã nhân bản báo giá!', 'success');
}

/* ============================================================
   PREVIEW
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

  const itemRows = q.items.map((item, idx) => `
    <tr>
      <td class="text-center">${idx + 1}</td>
      <td>${getChannel(item.channelId).icon || ''} ${item.channelName || item.channelId}</td>
      <td>${item.format}</td>
      <td>${item.objective}</td>
      <td class="text-center">${item.pricingType}</td>
      <td class="text-right">${formatCurrency(item.unitPrice)} đ</td>
      <td class="text-right">${item.pricingType === 'Fixed' ? '1 gói' : formatCurrency(item.quantity)}</td>
      <td class="text-right font-medium text-blue-700">${formatCurrency(item.budget)} đ</td>
      <td class="text-center">${item.duration || '—'} ngày</td>
    </tr>`).join('');

  const objectivesStr = (q.campaignObjectives || []).join(' · ') || '—';

  const html = `
  <div class="preview-doc p-0 font-sans text-sm text-slate-800">
    <!-- Header -->
    <div class="preview-header">
      <div class="flex items-start justify-between">
        <div>
          ${agency.logoUrl ? `<img src="${agency.logoUrl}" alt="Logo" class="h-12 mb-3 object-contain bg-white rounded p-1">` : `<div class="text-2xl font-bold mb-1">${agency.name}</div>`}
          <p class="text-blue-200 text-xs">${agency.address}</p>
          <p class="text-blue-200 text-xs">${agency.phone} | ${agency.email}</p>
        </div>
        <div class="text-right">
          <div class="text-3xl font-bold tracking-wide">BÁO GIÁ</div>
          <div class="text-blue-200 text-lg font-mono">${q.quoteNumber}</div>
          <div class="text-blue-200 text-xs mt-2">Ngày lập: ${formatDate(q.createdAt)}</div>
          <div class="text-blue-200 text-xs">Hiệu lực đến: ${formatDate(q.validUntil)}</div>
        </div>
      </div>
    </div>

    <div class="p-8">
      <!-- Client & Campaign Info -->
      <div class="grid grid-cols-2 gap-6 mb-8">
        <div class="border border-slate-200 rounded-lg p-5">
          <h3 class="font-bold text-blue-800 mb-3 text-sm uppercase tracking-wide">Thông Tin Khách Hàng</h3>
          <table class="w-full text-sm">
            <tr><td class="text-slate-500 py-1 w-32">Công ty:</td><td class="font-medium">${q.clientCompany || '—'}</td></tr>
            <tr><td class="text-slate-500 py-1">Liên hệ:</td><td>${q.clientContact || '—'}${q.clientPosition ? ` (${q.clientPosition})` : ''}</td></tr>
            <tr><td class="text-slate-500 py-1">Điện thoại:</td><td>${q.clientPhone || '—'}</td></tr>
            <tr><td class="text-slate-500 py-1">Email:</td><td>${q.clientEmail || '—'}</td></tr>
            <tr><td class="text-slate-500 py-1">Ngành:</td><td>${q.clientIndustry || '—'}</td></tr>
          </table>
        </div>
        <div class="border border-slate-200 rounded-lg p-5">
          <h3 class="font-bold text-blue-800 mb-3 text-sm uppercase tracking-wide">Thông Tin Chiến Dịch</h3>
          <table class="w-full text-sm">
            <tr><td class="text-slate-500 py-1 w-32">Tên chiến dịch:</td><td class="font-medium">${q.campaignName || '—'}</td></tr>
            <tr><td class="text-slate-500 py-1">Mục tiêu:</td><td>${objectivesStr}</td></tr>
            <tr><td class="text-slate-500 py-1">Đối tượng:</td><td>${q.targetAudience || '—'}</td></tr>
            <tr><td class="text-slate-500 py-1">Giới tính:</td><td>${{ all:'Tất cả', male:'Nam', female:'Nữ' }[q.gender] || '—'}</td></tr>
            <tr><td class="text-slate-500 py-1">Thời gian:</td><td>${q.startDate ? `${formatDate(q.startDate)} → ${formatDate(q.endDate)}` : '—'}</td></tr>
            <tr><td class="text-slate-500 py-1">Khu vực:</td><td>${q.location || '—'}</td></tr>
          </table>
        </div>
      </div>

      <!-- Media Plan Table -->
      <div class="mb-8">
        <h3 class="font-bold text-blue-800 mb-3 text-sm uppercase tracking-wide">Kế Hoạch Truyền Thông Chi Tiết</h3>
        <div class="overflow-x-auto">
          <table class="preview-table w-full rounded-lg overflow-hidden border border-slate-200">
            <thead>
              <tr>
                <th class="px-3 py-2 text-center w-8">STT</th>
                <th class="px-3 py-2 text-left">Kênh</th>
                <th class="px-3 py-2 text-left">Định dạng</th>
                <th class="px-3 py-2 text-left">Mục tiêu</th>
                <th class="px-3 py-2 text-center">Loại giá</th>
                <th class="px-3 py-2 text-right">Đơn giá</th>
                <th class="px-3 py-2 text-right">Số lượng</th>
                <th class="px-3 py-2 text-right">Ngân sách</th>
                <th class="px-3 py-2 text-center">Thời gian</th>
              </tr>
            </thead>
            <tbody>${itemRows || '<tr><td colspan="9" class="text-center py-6 text-slate-400">Chưa có kênh nào</td></tr>'}</tbody>
          </table>
        </div>
      </div>

      <!-- Financial Summary -->
      <div class="flex justify-end mb-8">
        <table class="finance-table w-80 rounded-lg overflow-hidden border border-slate-200">
          <tr>
            <td class="text-slate-500">Tổng ngân sách Media</td>
            <td class="text-right font-medium">${formatCurrency(totals.subtotal)} đ</td>
          </tr>
          <tr>
            <td class="text-slate-500">Phí quản lý (${q.agencyFeeRate || 0}%)</td>
            <td class="text-right">${formatCurrency(totals.agencyFeeAmt)} đ</td>
          </tr>
          ${totals.discountAmt > 0 ? `<tr>
            <td class="text-slate-500">Chiết khấu (${q.discountRate}%)${q.discountNote ? ` - ${q.discountNote}` : ''}</td>
            <td class="text-right text-emerald-600">-${formatCurrency(totals.discountAmt)} đ</td>
          </tr>` : ''}
          <tr>
            <td class="text-slate-500">Tổng trước thuế</td>
            <td class="text-right font-medium">${formatCurrency(totals.beforeVAT)} đ</td>
          </tr>
          <tr>
            <td class="text-slate-500">VAT (${q.vatRate || 10}%)</td>
            <td class="text-right">${formatCurrency(totals.vatAmt)} đ</td>
          </tr>
          <tr class="total-row">
            <td class="px-4 py-3 text-white font-bold">TỔNG THANH TOÁN</td>
            <td class="px-4 py-3 text-right text-white font-bold text-lg">${formatCurrency(totals.total)} đ</td>
          </tr>
        </table>
      </div>

      <!-- Notes -->
      ${q.campaignNotes ? `<div class="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <h4 class="font-bold text-amber-800 text-xs uppercase tracking-wide mb-2">Ghi chú chiến dịch</h4>
        <p class="text-sm text-amber-700">${q.campaignNotes}</p>
      </div>` : ''}

      <!-- Terms -->
      ${q.termsAndConditions ? `<div class="mb-8 p-4 bg-slate-50 rounded-lg border border-slate-200">
        <h4 class="font-bold text-slate-700 text-xs uppercase tracking-wide mb-2">Điều khoản & Điều kiện</h4>
        <p class="text-xs text-slate-500 leading-relaxed">${q.termsAndConditions}</p>
      </div>` : ''}

      <!-- Signature -->
      <div class="grid grid-cols-2 gap-8 mt-8 pt-6 border-t border-slate-200">
        <div class="text-center">
          <p class="font-bold text-slate-700 mb-1">Đại diện Khách hàng</p>
          <p class="text-xs text-slate-400 mb-8">Ký tên, đóng dấu</p>
          <div class="border-b border-slate-300 mb-1 mt-12"></div>
          <p class="text-sm text-slate-500">${q.clientCompany || 'Công ty Khách hàng'}</p>
          <p class="text-xs text-slate-400">Ngày: ........../........../............</p>
        </div>
        <div class="text-center">
          <p class="font-bold text-slate-700 mb-1">Đại diện Agency</p>
          <p class="text-xs text-slate-400 mb-8">Ký tên, đóng dấu</p>
          <div class="border-b border-slate-300 mb-1 mt-12"></div>
          <p class="text-sm text-slate-500">${agency.name}</p>
          <p class="text-xs text-slate-400">${q.accountManager || 'Account Manager'}</p>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="bg-slate-800 text-slate-400 text-xs text-center py-3 px-8">
      ${agency.name} | ${agency.phone} | ${agency.email} | ${agency.website || ''}
    </div>
  </div>`;

  document.getElementById('previewContent').innerHTML = html;
}

/* ============================================================
   SETTINGS MODAL
   ============================================================ */

function openSettings() {
  const a = state.agency;
  const s = state.settings;
  const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val || ''; };
  setVal('s_agencyName', a.name);
  setVal('s_agencyAddress', a.address);
  setVal('s_agencyPhone', a.phone);
  setVal('s_agencyEmail', a.email);
  setVal('s_agencyWebsite', a.website);
  setVal('s_agencyTaxCode', a.taxCode);
  setVal('s_agencyLogoUrl', a.logoUrl);
  setVal('s_agencyFeeRate', s.agencyFeeRate);
  setVal('s_vatRate', s.vatRate);
  setVal('s_quotePrefix', s.quotePrefix);
  document.getElementById('settingsModal').classList.remove('hidden');
}

function saveSettings() {
  const getVal = id => document.getElementById(id)?.value || '';
  state.agency = {
    name: getVal('s_agencyName'),
    address: getVal('s_agencyAddress'),
    phone: getVal('s_agencyPhone'),
    email: getVal('s_agencyEmail'),
    website: getVal('s_agencyWebsite'),
    taxCode: getVal('s_agencyTaxCode'),
    logoUrl: getVal('s_agencyLogoUrl'),
  };
  state.settings = {
    agencyFeeRate: parseFloat(getVal('s_agencyFeeRate')) || 15,
    vatRate: parseFloat(getVal('s_vatRate')) || 10,
    quotePrefix: getVal('s_quotePrefix') || 'MP',
  };
  Store.saveAgency(state.agency);
  Store.saveSettings(state.settings);
  document.getElementById('settingsModal').classList.add('hidden');
  showToast('Đã lưu cài đặt!', 'success');
}

function closeSettings() {
  document.getElementById('settingsModal').classList.add('hidden');
}

/* ============================================================
   INIT
   ============================================================ */

function init() {
  state.quotes = Store.loadQuotes();
  state.agency = Store.loadAgency();
  state.settings = Store.loadSettings();

  // Search
  document.getElementById('searchInput').addEventListener('input', e => {
    renderQuoteList(e.target.value);
  });

  // Finance inputs auto-update
  ['f_agencyFeeRate', 'f_discountRate', 'f_vatRate'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', updateFinanceSummary);
  });

  renderDashboard();
}

window.addEventListener('DOMContentLoaded', init);
