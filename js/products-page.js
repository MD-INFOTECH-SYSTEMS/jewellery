/**
 * Centralized Products Store JS - Rajwada Royal Jewellery
 * Handles filtering, search, sorting, grid/list view mode, active filter chips, pagination, and mobile drawer.
 */

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('products-page-container') || document.getElementById('categories-container');
    if (!container) return;

    // Initialize Store & Filter State
    window.currentStoreState = {
        category: 'All',
        collection: 'All',
        metal: 'All',
        gemstone: 'All',
        priceRange: 'All',
        minPrice: '',
        maxPrice: '',
        inStockOnly: false,
        onSaleOnly: false,
        searchQuery: '',
        sortBy: 'featured',
        viewMode: 'grid', // 'grid' | 'list'
        currentPage: 1,
        itemsPerPage: 6
    };

    // Read URL Parameters
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('category')) window.currentStoreState.category = urlParams.get('category');
    if (urlParams.has('collection')) window.currentStoreState.collection = urlParams.get('collection');
    if (urlParams.has('search')) window.currentStoreState.searchQuery = urlParams.get('search');
    if (urlParams.has('metal')) window.currentStoreState.metal = urlParams.get('metal');
    if (urlParams.has('sortBy')) window.currentStoreState.sortBy = urlParams.get('sortBy');
    if (urlParams.has('view')) window.currentStoreState.viewMode = urlParams.get('view');
    if (urlParams.has('page')) window.currentStoreState.currentPage = parseInt(urlParams.get('page')) || 1;
    if (urlParams.has('perPage')) window.currentStoreState.itemsPerPage = parseInt(urlParams.get('perPage')) || 6;

    renderCentralizedStore(window.currentStoreState);
});

function renderCentralizedStore(state) {
    const container = document.getElementById('products-page-container') || document.getElementById('categories-container');
    if (!container) return;

    const categories = ['All', 'Gold', 'Diamond', 'Earrings', 'Rings', 'Necklaces', 'Bracelets', 'Wedding', 'Gifting'];
    const collections = ['All', 'Royal Heritage', 'Kundan & Polki', 'Diamond Pavilion', 'Heritage Gold', 'Everyday Luxury', 'Royal Solitaire'];
    const metalTypes = ['All', 'Gold', '18K Gold', '22K Gold', 'Platinum', 'White Gold', 'Rose Gold'];
    const gemstoneTypes = ['All', 'Emerald', 'Ruby', 'Sapphire', 'Pearl', 'Polki / Uncut'];

    container.innerHTML = `
        <!-- Hero Header -->
        <div class="text-center mb-8 md:mb-12 bg-gradient-to-r from-[#4a1c1d] via-[#6b1f24] to-[#4a1c1d] text-white py-10 px-4 rounded-3xl shadow-xl relative overflow-hidden">
            <div class="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
                <svg class="w-64 h-64 text-gold" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            </div>
            
            <span class="text-xs font-bold text-[#b58b4c] uppercase tracking-[0.3em] block mb-2">Centralized Product Directory</span>
            <h1 class="text-3xl md:text-5xl font-serif font-bold uppercase tracking-wider mb-3 text-amber-100">Rajwada Central Flagship Store</h1>
            <p class="text-gray-200 max-w-2xl mx-auto text-xs md:text-sm font-light leading-relaxed">
                Browse our entire collection of handcrafted gold, certified diamond, and precious gemstone jewellery. Filter by category, metal purity, price, collection, or stock status.
            </p>

            <!-- Quick Category Badges Bar -->
            <div class="flex items-center justify-center gap-2 overflow-x-auto pt-6 pb-2 scrollbar-hide max-w-4xl mx-auto">
                ${categories.map(cat => `
                    <button onclick="updateStoreFilter('category', '${cat}')" 
                        class="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shrink-0 ${state.category.toLowerCase() === cat.toLowerCase() ? 'bg-[#b58b4c] text-white shadow-lg scale-105' : 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20'}">
                        ${cat === 'All' ? '✨ All Items' : cat}
                    </button>
                `).join('')}
            </div>
        </div>

        <!-- Main Layout: Sidebar Filters + Right Product Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            
            <!-- Desktop Sidebar Filter Panel -->
            <aside class="hidden lg:block lg:col-span-1 bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm sticky top-24">
                <div class="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
                    <div class="flex items-center gap-2">
                        <svg class="w-5 h-5 text-[#b58b4c]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                        <h3 class="font-serif font-bold text-lg text-[#4a1c1d]">Filter Jewellery</h3>
                    </div>
                    <button onclick="resetStoreFilters()" class="text-xs text-[#b58b4c] hover:text-[#4a1c1d] font-bold underline transition-colors">
                        Reset All
                    </button>
                </div>

                <!-- 1. Search Query Input -->
                <div class="mb-6">
                    <label class="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Search Store</label>
                    <div class="relative">
                        <input type="text" id="sidebar-search-input" value="${state.searchQuery}" oninput="onStoreSearchInput(this.value)" placeholder="Name, SKU, Stone..." class="w-full pl-9 pr-8 py-2.5 rounded-xl border border-gray-200 text-xs focus:border-[#4a1c1d] focus:ring-0 bg-gray-50 focus:bg-white transition-colors">
                        <svg class="w-4 h-4 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        ${state.searchQuery ? `
                            <button onclick="updateStoreFilter('searchQuery', '')" class="absolute right-2.5 top-2.5 text-gray-400 hover:text-[#4a1c1d]">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        ` : ''}
                    </div>
                </div>

                <!-- 2. Category Filter -->
                <div class="mb-6">
                    <label class="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Jewellery Category</label>
                    <select onchange="updateStoreFilter('category', this.value)" class="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-700 focus:border-[#4a1c1d] focus:ring-0 bg-gray-50 focus:bg-white transition-colors">
                        ${categories.map(cat => `<option value="${cat}" ${state.category.toLowerCase() === cat.toLowerCase() ? 'selected' : ''}>${cat === 'All' ? 'All Categories' : cat}</option>`).join('')}
                    </select>
                </div>

                <!-- 3. Collection Filter -->
                <div class="mb-6">
                    <label class="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Royal Collection</label>
                    <select onchange="updateStoreFilter('collection', this.value)" class="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-700 focus:border-[#4a1c1d] focus:ring-0 bg-gray-50 focus:bg-white transition-colors">
                        ${collections.map(col => `<option value="${col}" ${state.collection === col ? 'selected' : ''}>${col === 'All' ? 'All Collections' : col}</option>`).join('')}
                    </select>
                </div>

                <!-- 4. Metal & Purity Filter -->
                <div class="mb-6">
                    <label class="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Metal Type & Purity</label>
                    <select onchange="updateStoreFilter('metal', this.value)" class="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-700 focus:border-[#4a1c1d] focus:ring-0 bg-gray-50 focus:bg-white transition-colors">
                        ${metalTypes.map(m => `<option value="${m}" ${state.metal === m ? 'selected' : ''}>${m === 'All' ? 'All Metal Types' : m}</option>`).join('')}
                    </select>
                </div>

                <!-- 5. Gemstone Accent -->
                <div class="mb-6">
                    <label class="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Precious Gemstone</label>
                    <select onchange="updateStoreFilter('gemstone', this.value)" class="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-700 focus:border-[#4a1c1d] focus:ring-0 bg-gray-50 focus:bg-white transition-colors">
                        ${gemstoneTypes.map(g => `<option value="${g}" ${state.gemstone === g ? 'selected' : ''}>${g === 'All' ? 'All Gemstones' : g}</option>`).join('')}
                    </select>
                </div>

                <!-- 6. Price Range Filter -->
                <div class="mb-6">
                    <label class="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Price Budget</label>
                    <select onchange="updateStoreFilter('priceRange', this.value)" class="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-700 focus:border-[#4a1c1d] focus:ring-0 bg-gray-50 focus:bg-white transition-colors mb-3">
                        <option value="All" ${state.priceRange === 'All' ? 'selected' : ''}>All Prices</option>
                        <option value="0-50000" ${state.priceRange === '0-50000' ? 'selected' : ''}>Under ₹50,000</option>
                        <option value="50000-100000" ${state.priceRange === '50000-100000' ? 'selected' : ''}>₹50,000 - ₹1 Lakh</option>
                        <option value="100000-200000" ${state.priceRange === '100000-200000' ? 'selected' : ''}>₹1 Lakh - ₹2 Lakhs</option>
                        <option value="200000-9999999" ${state.priceRange === '200000-9999999' ? 'selected' : ''}>Above ₹2 Lakhs</option>
                    </select>

                    <!-- Custom Range Min-Max -->
                    <div class="grid grid-cols-2 gap-2">
                        <input type="number" id="min-price-input" value="${state.minPrice}" placeholder="Min ₹" class="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 text-xs bg-gray-50">
                        <input type="number" id="max-price-input" value="${state.maxPrice}" placeholder="Max ₹" class="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 text-xs bg-gray-50">
                    </div>
                    <button onclick="applyCustomPriceRange()" class="w-full mt-2 bg-gray-100 hover:bg-[#4a1c1d] hover:text-white text-gray-700 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors">
                        Apply Price Range
                    </button>
                </div>

                <!-- 7. Toggles (In Stock & Sale) -->
                <div class="space-y-3 pt-4 border-t border-gray-100">
                    <label class="flex items-center gap-2 cursor-pointer text-xs text-gray-700 font-medium select-none">
                        <input type="checkbox" ${state.inStockOnly ? 'checked' : ''} onchange="updateStoreFilter('inStockOnly', this.checked)" class="rounded text-[#4a1c1d] focus:ring-[#4a1c1d]">
                        In Stock Ready to Dispatch
                    </label>
                    <label class="flex items-center gap-2 cursor-pointer text-xs text-gray-700 font-medium select-none">
                        <input type="checkbox" ${state.onSaleOnly ? 'checked' : ''} onchange="updateStoreFilter('onSaleOnly', this.checked)" class="rounded text-[#4a1c1d] focus:ring-[#4a1c1d]">
                        On Sale & Discounted
                    </label>
                </div>
            </aside>

            <!-- Right Content Area -->
            <main class="lg:col-span-3 space-y-6">
                
                <!-- Toolbar: Mobile Filter Toggle, Search, Sort & View Mode -->
                <div class="bg-white p-4 md:p-5 rounded-2xl border border-gray-200/80 shadow-sm flex flex-wrap items-center justify-between gap-4">
                    
                    <!-- Left: Result Count & Mobile Drawer Button -->
                    <div class="flex items-center gap-3">
                        <button onclick="toggleMobileFilterDrawer(true)" class="lg:hidden bg-[#4a1c1d] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm">
                            <svg class="w-4 h-4 text-[#b58b4c]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                            Filters
                        </button>
                        <span id="store-results-count" class="font-bold text-sm text-[#4a1c1d]">Loading items...</span>
                    </div>

                    <!-- Right: Sort Dropdown & View Mode Switcher -->
                    <div class="flex items-center gap-3 ml-auto">
                        <div class="flex items-center gap-2">
                            <label class="hidden sm:block text-[11px] font-bold text-gray-400 uppercase">Sort:</label>
                            <select onchange="updateStoreFilter('sortBy', this.value)" class="px-3 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 focus:border-[#4a1c1d] focus:ring-0 bg-gray-50 transition-colors">
                                <option value="featured" ${state.sortBy === 'featured' ? 'selected' : ''}>Featured</option>
                                <option value="price-low" ${state.sortBy === 'price-low' ? 'selected' : ''}>Price: Low to High</option>
                                <option value="price-high" ${state.sortBy === 'price-high' ? 'selected' : ''}>Price: High to Low</option>
                                <option value="rating" ${state.sortBy === 'rating' ? 'selected' : ''}>Customer Rating</option>
                                <option value="discount" ${state.sortBy === 'discount' ? 'selected' : ''}>Highest Discount</option>
                                <option value="name-asc" ${state.sortBy === 'name-asc' ? 'selected' : ''}>Name A to Z</option>
                            </select>
                        </div>

                        <!-- Grid / List Switcher -->
                        <div class="flex items-center bg-gray-100 p-1 rounded-xl border border-gray-200">
                            <button onclick="updateStoreFilter('viewMode', 'grid')" title="Grid View" class="p-1.5 rounded-lg transition-colors ${state.viewMode === 'grid' ? 'bg-white text-[#4a1c1d] shadow-xs' : 'text-gray-400 hover:text-gray-700'}">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                            </button>
                            <button onclick="updateStoreFilter('viewMode', 'list')" title="List View" class="p-1.5 rounded-lg transition-colors ${state.viewMode === 'list' ? 'bg-white text-[#4a1c1d] shadow-xs' : 'text-gray-400 hover:text-gray-700'}">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Active Filter Badges / Chips -->
                <div id="active-filter-chips-container" class="flex flex-wrap items-center justify-between gap-2 min-h-[30px]">
                    <div id="active-filter-chips" class="flex flex-wrap items-center gap-2"></div>
                </div>

                <!-- Product Display Grid / List Container -->
                <div id="store-product-grid" class="transition-all duration-300"></div>

                <!-- Pagination Container -->
                <div id="store-pagination-container"></div>

            </main>
        </div>

        <!-- Mobile Drawer Filter Modal -->
        <div id="mobile-filter-drawer" class="fixed inset-0 z-50 hidden bg-black/60 backdrop-blur-xs transition-opacity duration-300">
            <div class="absolute right-0 top-0 bottom-0 w-full max-w-xs bg-white p-6 overflow-y-auto flex flex-col justify-between shadow-2xl">
                <div>
                    <div class="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
                        <h3 class="font-serif font-bold text-lg text-[#4a1c1d]">Filter Jewellery</h3>
                        <button onclick="toggleMobileFilterDrawer(false)" class="p-1 text-gray-400 hover:text-[#4a1c1d]">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    </div>

                    <!-- Category Mobile -->
                    <div class="mb-4">
                        <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Category</label>
                        <select onchange="updateStoreFilter('category', this.value); toggleMobileFilterDrawer(false);" class="w-full p-2.5 border rounded-xl text-xs bg-gray-50">
                            ${categories.map(c => `<option value="${c}" ${state.category.toLowerCase() === c.toLowerCase() ? 'selected' : ''}>${c}</option>`).join('')}
                        </select>
                    </div>

                    <!-- Collection Mobile -->
                    <div class="mb-4">
                        <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Collection</label>
                        <select onchange="updateStoreFilter('collection', this.value); toggleMobileFilterDrawer(false);" class="w-full p-2.5 border rounded-xl text-xs bg-gray-50">
                            ${collections.map(c => `<option value="${c}" ${state.collection === c ? 'selected' : ''}>${c}</option>`).join('')}
                        </select>
                    </div>

                    <!-- Metal Mobile -->
                    <div class="mb-4">
                        <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Metal</label>
                        <select onchange="updateStoreFilter('metal', this.value); toggleMobileFilterDrawer(false);" class="w-full p-2.5 border rounded-xl text-xs bg-gray-50">
                            ${metalTypes.map(m => `<option value="${m}" ${state.metal === m ? 'selected' : ''}>${m}</option>`).join('')}
                        </select>
                    </div>

                    <!-- Price Mobile -->
                    <div class="mb-4">
                        <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Price Range</label>
                        <select onchange="updateStoreFilter('priceRange', this.value); toggleMobileFilterDrawer(false);" class="w-full p-2.5 border rounded-xl text-xs bg-gray-50">
                            <option value="All" ${state.priceRange === 'All' ? 'selected' : ''}>All Prices</option>
                            <option value="0-50000" ${state.priceRange === '0-50000' ? 'selected' : ''}>Under ₹50,000</option>
                            <option value="50000-100000" ${state.priceRange === '50000-100000' ? 'selected' : ''}>₹50,000 - ₹1 Lakh</option>
                            <option value="100000-200000" ${state.priceRange === '100000-200000' ? 'selected' : ''}>₹1 Lakh - ₹2 Lakhs</option>
                            <option value="200000-9999999" ${state.priceRange === '200000-9999999' ? 'selected' : ''}>Above ₹2 Lakhs</option>
                        </select>
                    </div>
                </div>

                <div class="pt-4 border-t border-gray-100 space-y-2">
                    <button onclick="resetStoreFilters(); toggleMobileFilterDrawer(false);" class="w-full py-2.5 border border-[#4a1c1d] text-[#4a1c1d] rounded-xl text-xs font-bold uppercase">Reset All Filters</button>
                    <button onclick="toggleMobileFilterDrawer(false)" class="w-full py-2.5 bg-[#4a1c1d] text-white rounded-xl text-xs font-bold uppercase">Apply & View Items</button>
                </div>
            </div>
        </div>
    `;

    applyCentralizedFilters();
}

let searchDebounce = null;
function onStoreSearchInput(val) {
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(() => {
        if (window.currentStoreState) {
            window.currentStoreState.searchQuery = val.trim();
            window.currentStoreState.currentPage = 1;
            applyCentralizedFilters();
        }
    }, 250);
}

function updateStoreFilter(key, val) {
    if (window.currentStoreState) {
        window.currentStoreState[key] = val;
        if (key !== 'currentPage') {
            window.currentStoreState.currentPage = 1;
        }
        applyCentralizedFilters();
    }
}

function applyCustomPriceRange() {
    const minVal = document.getElementById('min-price-input')?.value || '';
    const maxVal = document.getElementById('max-price-input')?.value || '';
    if (window.currentStoreState) {
        window.currentStoreState.minPrice = minVal;
        window.currentStoreState.maxPrice = maxVal;
        window.currentStoreState.priceRange = 'custom';
        window.currentStoreState.currentPage = 1;
        applyCentralizedFilters();
    }
}

function changeStorePage(newPage) {
    if (!window.currentStoreState) return;
    window.currentStoreState.currentPage = newPage;
    applyCentralizedFilters();
    const gridEl = document.getElementById('store-product-grid');
    if (gridEl) gridEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function updateItemsPerPage(newPerPage) {
    if (!window.currentStoreState) return;
    window.currentStoreState.itemsPerPage = parseInt(newPerPage) || 6;
    window.currentStoreState.currentPage = 1;
    applyCentralizedFilters();
}

function resetStoreFilters() {
    window.currentStoreState = {
        category: 'All',
        collection: 'All',
        metal: 'All',
        gemstone: 'All',
        priceRange: 'All',
        minPrice: '',
        maxPrice: '',
        inStockOnly: false,
        onSaleOnly: false,
        searchQuery: '',
        sortBy: 'featured',
        viewMode: window.currentStoreState ? window.currentStoreState.viewMode : 'grid',
        currentPage: 1,
        itemsPerPage: window.currentStoreState ? window.currentStoreState.itemsPerPage : 6
    };
    renderCentralizedStore(window.currentStoreState);
}

function toggleMobileFilterDrawer(show) {
    const drawer = document.getElementById('mobile-filter-drawer');
    if (!drawer) return;
    if (show) {
        drawer.classList.remove('hidden');
    } else {
        drawer.classList.add('hidden');
    }
}

function applyCentralizedFilters() {
    const state = window.currentStoreState;
    if (!state) return;

    let filtered = [...(window.products || [])];

    // Filter Category
    if (state.category && state.category !== 'All') {
        filtered = filtered.filter(p => {
            const cat = p.category || '';
            const type = p.jewelleryType || '';
            return cat.toLowerCase().includes(state.category.toLowerCase()) || 
                   type.toLowerCase().includes(state.category.toLowerCase());
        });
    }

    // Filter Collection
    if (state.collection && state.collection !== 'All') {
        filtered = filtered.filter(p => p.collection && p.collection.toLowerCase().includes(state.collection.toLowerCase()));
    }

    // Filter Metal
    if (state.metal && state.metal !== 'All') {
        filtered = filtered.filter(p => {
            const mType = (p.metalDetails ? p.metalDetails.metalType : p.metal) || '';
            const purity = (p.metalDetails ? p.metalDetails.purity : p.purity) || '';
            return mType.toLowerCase().includes(state.metal.toLowerCase()) || 
                   purity.toLowerCase().includes(state.metal.toLowerCase());
        });
    }

    // Filter Gemstone
    if (state.gemstone && state.gemstone !== 'All') {
        filtered = filtered.filter(p => {
            if (!p.gemstoneDetails) return false;
            const stone = p.gemstoneDetails.stoneType || '';
            return stone.toLowerCase().includes(state.gemstone.toLowerCase());
        });
    }

    // Filter Price Range
    if (state.priceRange === 'custom') {
        const min = parseFloat(state.minPrice) || 0;
        const max = parseFloat(state.maxPrice) || Infinity;
        filtered = filtered.filter(p => p.price >= min && p.price <= max);
    } else if (state.priceRange && state.priceRange !== 'All') {
        const [min, max] = state.priceRange.split('-').map(Number);
        filtered = filtered.filter(p => p.price >= min && p.price <= max);
    }

    // In Stock Only
    if (state.inStockOnly) {
        filtered = filtered.filter(p => (p.stock > 0 || p.stockStatus === 'In Stock'));
    }

    // On Sale Only
    if (state.onSaleOnly) {
        filtered = filtered.filter(p => p.originalPrice && p.originalPrice > p.price);
    }

    // Filter Search Query
    if (state.searchQuery) {
        const q = state.searchQuery.toLowerCase();
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(q) ||
            (p.category && p.category.toLowerCase().includes(q)) ||
            (p.sku && p.sku.toLowerCase().includes(q)) ||
            (p.description && p.description.toLowerCase().includes(q))
        );
    }

    // Sorting Engine
    if (state.sortBy === 'price-low') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (state.sortBy === 'price-high') {
        filtered.sort((a, b) => b.price - a.price);
    } else if (state.sortBy === 'rating') {
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (state.sortBy === 'discount') {
        filtered.sort((a, b) => {
            const discA = a.originalPrice ? (a.originalPrice - a.price) : 0;
            const discB = b.originalPrice ? (b.originalPrice - b.price) : 0;
            return discB - discA;
        });
    } else if (state.sortBy === 'name-asc') {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    // Pagination Calculation
    const itemsPerPage = state.itemsPerPage || 6;
    const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
    let currentPage = state.currentPage || 1;
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;
    state.currentPage = currentPage;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedItems = filtered.slice(startIndex, startIndex + itemsPerPage);

    // Update Result Counter
    const countEl = document.getElementById('store-results-count');
    if (countEl) {
        if (filtered.length === 0) {
            countEl.textContent = `0 Items Found`;
        } else {
            const endIdx = Math.min(startIndex + itemsPerPage, filtered.length);
            countEl.textContent = `Showing ${startIndex + 1}–${endIdx} of ${filtered.length} Royal Masterpieces (Page ${currentPage} of ${totalPages})`;
        }
    }

    // Active Chips Rendering
    const chipsEl = document.getElementById('active-filter-chips');
    if (chipsEl) {
        let chips = [];
        if (state.category !== 'All') chips.push({ label: `Category: ${state.category}`, key: 'category', val: 'All' });
        if (state.collection !== 'All') chips.push({ label: `Collection: ${state.collection}`, key: 'collection', val: 'All' });
        if (state.metal !== 'All') chips.push({ label: `Metal: ${state.metal}`, key: 'metal', val: 'All' });
        if (state.gemstone !== 'All') chips.push({ label: `Gemstone: ${state.gemstone}`, key: 'gemstone', val: 'All' });
        if (state.priceRange !== 'All') chips.push({ label: `Price Filter Active`, key: 'priceRange', val: 'All' });
        if (state.inStockOnly) chips.push({ label: `In Stock Only`, key: 'inStockOnly', val: false });
        if (state.onSaleOnly) chips.push({ label: `On Sale Only`, key: 'onSaleOnly', val: false });
        if (state.searchQuery) chips.push({ label: `Search: "${state.searchQuery}"`, key: 'searchQuery', val: '' });

        chipsEl.innerHTML = chips.map(c => `
            <span class="inline-flex items-center gap-1.5 bg-amber-50 text-[#4a1c1d] border border-amber-200 px-3 py-1 rounded-full text-xs font-bold shadow-2xs">
                ${c.label}
                <button onclick="updateStoreFilter('${c.key}', ${typeof c.val === 'string' ? `'${c.val}'` : c.val})" class="text-[#b58b4c] hover:text-[#4a1c1d]">
                    &times;
                </button>
            </span>
        `).join('');
    }

    const gridEl = document.getElementById('store-product-grid');
    const paginationEl = document.getElementById('store-pagination-container');

    if (!gridEl) return;

    if (filtered.length === 0) {
        gridEl.className = 'col-span-full';
        gridEl.innerHTML = `
            <div class="py-16 text-center bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                <svg class="w-16 h-16 text-[#b58b4c] mx-auto mb-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                <h3 class="text-2xl font-serif text-[#4a1c1d] font-bold mb-2">No Jewellery Found</h3>
                <p class="text-gray-500 text-xs mb-6 max-w-md mx-auto">We couldn't find any items matching your active criteria. Try clearing search keywords or selecting different filters.</p>
                <button onclick="resetStoreFilters()" class="bg-[#4a1c1d] text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#b58b4c] transition-colors shadow-md">
                    Clear Filters & View All Catalog
                </button>
            </div>
        `;
        if (paginationEl) paginationEl.innerHTML = '';
        return;
    }

    // Render Grid View or List View for current page items
    if (state.viewMode === 'list') {
        gridEl.className = 'space-y-4';
        gridEl.innerHTML = paginatedItems.map(p => renderProductListCard(p)).join('');
    } else {
        gridEl.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6';
        gridEl.innerHTML = paginatedItems.map(p => renderProductGridCard(p)).join('');
    }

    // Render Pagination Bar
    if (paginationEl) {
        if (totalPages <= 1 && filtered.length <= itemsPerPage) {
            paginationEl.innerHTML = `
                <div class="mt-8 pt-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500 font-medium">
                    <span>Displaying all <b>${filtered.length}</b> products</span>
                    <div class="flex items-center gap-2">
                        <span>Items per page:</span>
                        <select onchange="updateItemsPerPage(this.value)" class="px-2.5 py-1 rounded-lg border border-gray-200 text-xs text-gray-700 bg-gray-50 font-bold focus:outline-none">
                            <option value="6" ${itemsPerPage === 6 ? 'selected' : ''}>6</option>
                            <option value="12" ${itemsPerPage === 12 ? 'selected' : ''}>12</option>
                            <option value="24" ${itemsPerPage === 24 ? 'selected' : ''}>24</option>
                            <option value="999" ${itemsPerPage >= 999 ? 'selected' : ''}>All</option>
                        </select>
                    </div>
                </div>
            `;
        } else {
            const pageButtons = [];
            for (let i = 1; i <= totalPages; i++) {
                pageButtons.push(`
                    <button onclick="changeStorePage(${i})" 
                        class="w-9 h-9 rounded-xl text-xs font-bold transition-all duration-300 ${i === currentPage ? 'bg-[#4a1c1d] text-white shadow-md scale-105' : 'bg-white hover:bg-amber-50 text-gray-700 border border-gray-200'}">
                        ${i}
                    </button>
                `);
            }

            paginationEl.innerHTML = `
                <div class="mt-10 bg-white p-4 md:p-5 rounded-2xl border border-gray-200/80 shadow-sm flex flex-wrap items-center justify-between gap-4">
                    <!-- Range text -->
                    <div class="text-xs text-gray-600 font-medium">
                        Showing <strong class="text-[#4a1c1d]">${startIndex + 1}–${Math.min(startIndex + itemsPerPage, filtered.length)}</strong> of <strong class="text-[#4a1c1d]">${filtered.length}</strong> items
                    </div>

                    <!-- Number controls -->
                    <div class="flex items-center gap-2">
                        <button onclick="changeStorePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''} 
                            class="px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${currentPage === 1 ? 'opacity-40 cursor-not-allowed bg-gray-100 text-gray-400' : 'bg-white hover:bg-[#4a1c1d] hover:text-white text-[#4a1c1d] border border-gray-200 shadow-2xs'}">
                            &larr; Prev
                        </button>

                        <div class="flex items-center gap-1.5">
                            ${pageButtons.join('')}
                        </div>

                        <button onclick="changeStorePage(${currentPage + 1})" ${currentPage >= totalPages ? 'disabled' : ''} 
                            class="px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${currentPage >= totalPages ? 'opacity-40 cursor-not-allowed bg-gray-100 text-gray-400' : 'bg-white hover:bg-[#4a1c1d] hover:text-white text-[#4a1c1d] border border-gray-200 shadow-2xs'}">
                            Next &rarr;
                        </button>
                    </div>

                    <!-- Per Page dropdown -->
                    <div class="flex items-center gap-2 text-xs text-gray-600">
                        <span class="font-medium">Per Page:</span>
                        <select onchange="updateItemsPerPage(this.value)" class="px-3 py-1.5 rounded-xl border border-gray-200 text-xs text-gray-700 bg-gray-50 font-bold focus:border-[#4a1c1d] transition-colors">
                            <option value="6" ${itemsPerPage === 6 ? 'selected' : ''}>6 per page</option>
                            <option value="12" ${itemsPerPage === 12 ? 'selected' : ''}>12 per page</option>
                            <option value="24" ${itemsPerPage === 24 ? 'selected' : ''}>24 per page</option>
                            <option value="999" ${itemsPerPage >= 999 ? 'selected' : ''}>Show All</option>
                        </select>
                    </div>
                </div>
            `;
        }
    }
}

function renderProductGridCard(p) {
    const origPrice = p.originalPrice || (p.pricing ? p.pricing.mrp : Math.round(p.price * 1.15));
    const hasDiscount = origPrice > p.price;
    const metalTag = (p.metalDetails ? p.metalDetails.purity : p.metal) || '22K Gold';
    const isWishlisted = window.wishlist && window.wishlist.isInWishlist(p.id);

    const hasMultipleImgs = p.images && p.images.length > 1;
    const secondImg = hasMultipleImgs ? p.images[1] : (p.image || 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80');

    return `
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col group overflow-hidden transform hover:-translate-y-1">
            <!-- 3D Twist Image Container -->
            <div class="aspect-square relative overflow-hidden bg-gray-50 cursor-pointer twist-card" onclick="window.location.href='product.html?id=${p.id}'">
                <div class="twist-inner">
                    <!-- Front Image -->
                    <div class="twist-front">
                        <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80';">
                    </div>
                    <!-- Back Image (Shown on 3D Twist Hover) -->
                    <div class="twist-back">
                        <img src="${secondImg}" alt="${p.name} - View 2" class="w-full h-full object-cover" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80';">
                    </div>
                </div>
                
                <!-- Badge Overlays -->
                <div class="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start pointer-events-none">
                    ${p.badge ? `<span class="bg-[#b58b4c] text-white text-[9px] font-bold px-2.5 py-1 uppercase tracking-wider rounded-md shadow-md">${p.badge}</span>` : ''}
                    <span class="bg-black/60 backdrop-blur-xs text-white text-[9px] font-medium px-2 py-0.5 rounded shadow-xs">${p.sku || 'RJW-JW'}</span>
                </div>

                <!-- Wishlist Button -->
                <button onclick="event.stopPropagation(); window.wishlist.toggleItem(${p.id}); applyCentralizedFilters();" 
                    class="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs text-[#4a1c1d] flex items-center justify-center shadow-md hover:bg-[#4a1c1d] hover:text-white transition-colors" title="Wishlist">
                    <svg class="w-4 h-4" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                </button>

                ${hasMultipleImgs ? `
                    <div class="absolute bottom-12 right-3 z-10 bg-black/60 text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 backdrop-blur-xs pointer-events-none group-hover:opacity-0 transition-opacity">
                        <svg class="w-3 h-3 text-[#b58b4c]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        <span>3D Twist</span>
                    </div>
                ` : ''}

                <!-- Quick View Overlay -->
                <div class="absolute inset-x-0 bottom-0 z-10 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center">
                    <button onclick="event.stopPropagation(); window.modal.openQuickView(${p.id});" class="bg-white/90 backdrop-blur-sm text-[#4a1c1d] hover:bg-[#4a1c1d] hover:text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors shadow-md">
                        ⚡ Quick View
                    </button>
                </div>
            </div>

            <!-- Details Section -->
            <div class="p-5 flex flex-col flex-grow text-center">
                <div class="flex items-center justify-center gap-2 mb-1 text-[10px] font-bold text-[#b58b4c] uppercase tracking-widest">
                    <span>${p.category}</span>
                    <span>•</span>
                    <span>${metalTag}</span>
                </div>

                <h3 class="font-serif font-bold text-base text-[#4a1c1d] mb-1 line-clamp-1 hover:text-[#b58b4c] transition-colors cursor-pointer" onclick="window.location.href='product.html?id=${p.id}'">${p.name}</h3>
                
                <div class="flex items-center justify-center gap-1 text-[#b58b4c] text-[11px] mb-3">
                    ${'★'.repeat(Math.floor(p.rating || 5))} <span class="text-gray-400 font-medium">(${p.reviewCount || 12})</span>
                </div>

                <div class="flex items-center justify-center gap-2 mt-auto pt-2 border-t border-gray-50">
                    <span class="text-lg font-bold text-[#4a1c1d]">₹${p.price.toLocaleString()}</span>
                    ${hasDiscount ? `<span class="text-xs text-gray-400 line-through">₹${origPrice.toLocaleString()}</span>` : ''}
                </div>

                <button onclick="window.cart.addItem(${p.id}, 1)" class="mt-3 w-full bg-[#4a1c1d] text-white py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#b58b4c] transition-colors shadow-sm flex items-center justify-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                    Add to Bag
                </button>
            </div>
        </div>
    `;
}

function renderProductListCard(p) {
    const origPrice = p.originalPrice || (p.pricing ? p.pricing.mrp : Math.round(p.price * 1.15));
    const hasDiscount = origPrice > p.price;
    const metalTag = (p.metalDetails ? p.metalDetails.purity : p.metal) || '22K Gold';
    const isWishlisted = window.wishlist && window.wishlist.isInWishlist(p.id);

    const hasMultipleImgs = p.images && p.images.length > 1;
    const secondImg = hasMultipleImgs ? p.images[1] : (p.image || 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80');

    return `
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 p-4 flex flex-col md:flex-row gap-6 items-center group">
            <!-- Left Thumbnail with 3D Twist -->
            <div class="w-full md:w-48 h-48 rounded-xl overflow-hidden bg-gray-50 relative shrink-0 cursor-pointer twist-card" onclick="window.location.href='product.html?id=${p.id}'">
                <div class="twist-inner">
                    <div class="twist-front">
                        <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80';">
                    </div>
                    <div class="twist-back">
                        <img src="${secondImg}" alt="${p.name} - View 2" class="w-full h-full object-cover" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80';">
                    </div>
                </div>
                ${p.badge ? `<span class="absolute top-2 left-2 z-10 bg-[#b58b4c] text-white text-[9px] font-bold px-2 py-0.5 rounded shadow-xs">${p.badge}</span>` : ''}
            </div>

            <!-- Middle Info -->
            <div class="flex-grow text-left space-y-2">
                <div class="flex items-center gap-3">
                    <span class="text-[10px] font-bold text-[#b58b4c] uppercase tracking-widest bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">${p.category}</span>
                    <span class="text-[10px] font-bold text-gray-500 uppercase">${metalTag}</span>
                    <span class="text-[10px] text-gray-400 font-mono">${p.sku || ''}</span>
                </div>

                <h3 class="font-serif font-bold text-xl text-[#4a1c1d] hover:text-[#b58b4c] transition-colors cursor-pointer" onclick="window.location.href='product.html?id=${p.id}'">${p.name}</h3>
                <p class="text-xs text-gray-600 line-clamp-2">${p.description || ''}</p>

                <!-- Spec Badges -->
                <div class="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-gray-500">
                    ${p.metalDetails ? `<span>✨ Gross Wt: <b>${p.metalDetails.grossWeight}</b></span>` : ''}
                    ${p.diamondDetails ? `<span>💎 Diamond: <b>${p.diamondDetails.totalWeightCT}</b></span>` : ''}
                    ${p.certification ? `<span>📜 Hallmark: <b>${p.certification.hallmarked}</b></span>` : ''}
                </div>
            </div>

            <!-- Right Actions & Price -->
            <div class="w-full md:w-48 flex flex-col items-center md:items-end justify-between border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 shrink-0 h-full">
                <div class="text-center md:text-right mb-4">
                    <div class="text-2xl font-bold text-[#4a1c1d]">₹${p.price.toLocaleString()}</div>
                    ${hasDiscount ? `<div class="text-xs text-gray-400 line-through">₹${origPrice.toLocaleString()}</div>` : ''}
                    <div class="text-[10px] font-bold text-emerald-600 mt-1">✔ In Stock - Ready</div>
                </div>

                <div class="flex flex-col w-full gap-2">
                    <button onclick="window.cart.addItem(${p.id}, 1)" class="w-full bg-[#4a1c1d] text-white py-2 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#b58b4c] transition-colors shadow-sm">
                        Add to Bag
                    </button>
                    <div class="grid grid-cols-2 gap-2">
                        <button onclick="window.modal.openQuickView(${p.id})" class="bg-gray-100 hover:bg-gray-200 text-[#4a1c1d] py-1.5 rounded-lg text-[10px] font-bold uppercase">Quick View</button>
                        <button onclick="window.wishlist.toggleItem(${p.id}); applyCentralizedFilters();" class="border border-gray-200 hover:border-[#4a1c1d] text-gray-700 py-1.5 rounded-lg text-[10px] font-bold uppercase">
                            ${isWishlisted ? '♥ Saved' : '♡ Wishlist'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}
