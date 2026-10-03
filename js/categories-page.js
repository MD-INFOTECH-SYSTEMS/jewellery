document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('categories-container');
    if (!container) return;

    // Initialize Store State
    const storeState = {
        category: 'All',
        collection: 'All',
        metal: 'All',
        priceRange: 'All',
        inStockOnly: false,
        searchQuery: '',
        sortBy: 'featured'
    };

    // Read URL query params if present
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('category')) storeState.category = urlParams.get('category');
    if (urlParams.has('collection')) storeState.collection = urlParams.get('collection');
    if (urlParams.has('search')) storeState.searchQuery = urlParams.get('search');

    renderStorePage(storeState);
});

function renderStorePage(state) {
    const container = document.getElementById('categories-container');
    if (!container) return;

    const allProducts = window.products || [];

    // Filter categories list
    const categories = ['All', 'Gold', 'Diamond', 'Earrings', 'Rings', 'Necklaces', 'Bracelets', 'Wedding', 'Gifting'];
    const collections = ['All', 'Royal Heritage', 'Kundan & Polki', 'Diamond Pavilion', 'Heritage Gold', 'Everyday Luxury'];
    const metalTypes = ['All', 'Gold', '18K Gold', '22K Gold', 'Platinum', 'White Gold'];

    container.innerHTML = `
        <!-- Store Hero Header -->
        <div class="text-center mb-10">
            <span class="text-xs font-bold text-[#b58b4c] uppercase tracking-[0.3em] block mb-2">Centralized Royal Catalog</span>
            <h1 class="text-4xl md:text-5xl font-serif text-[#4a1c1d] font-bold uppercase tracking-wider mb-3">Rajwada Flagship Store</h1>
            <p class="text-gray-600 max-w-2xl mx-auto text-sm font-light">Explore our entire handcrafted royal jewellery collection. Use the filters below to refine by category, metal purity, price, or collection.</p>
        </div>

        <!-- Category Quick Pills Bar -->
        <div class="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
            ${categories.map(cat => `
                <button onclick="updateStoreFilter('category', '${cat}')" class="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shrink-0 ${state.category.toLowerCase() === cat.toLowerCase() ? 'bg-[#4a1c1d] text-white shadow-md' : 'bg-white text-gray-700 hover:bg-amber-50 hover:text-[#4a1c1d] border border-gray-200'}">
                    ${cat}
                </button>
            `).join('')}
        </div>

        <!-- Filter & Control Toolbar -->
        <div class="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <!-- Search Input -->
                <div class="relative">
                    <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Search Store</label>
                    <div class="relative">
                        <input type="text" id="store-search-input" value="${state.searchQuery}" oninput="onStoreSearchInput(this.value)" placeholder="Search item, SKU..." class="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 text-xs focus:border-[#4a1c1d] focus:ring-0 bg-gray-50 focus:bg-white transition-colors">
                        <svg class="w-4 h-4 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                </div>

                <!-- Collection Filter -->
                <div>
                    <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Collection</label>
                    <select onchange="updateStoreFilter('collection', this.value)" class="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-xs text-gray-700 focus:border-[#4a1c1d] focus:ring-0 bg-gray-50 focus:bg-white transition-colors">
                        ${collections.map(col => `<option value="${col}" ${state.collection === col ? 'selected' : ''}>${col === 'All' ? 'All Collections' : col}</option>`).join('')}
                    </select>
                </div>

                <!-- Metal Filter -->
                <div>
                    <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Metal & Purity</label>
                    <select onchange="updateStoreFilter('metal', this.value)" class="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-xs text-gray-700 focus:border-[#4a1c1d] focus:ring-0 bg-gray-50 focus:bg-white transition-colors">
                        ${metalTypes.map(m => `<option value="${m}" ${state.metal === m ? 'selected' : ''}>${m === 'All' ? 'All Metals' : m}</option>`).join('')}
                    </select>
                </div>

                <!-- Price Range Filter -->
                <div>
                    <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Price Range</label>
                    <select onchange="updateStoreFilter('priceRange', this.value)" class="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-xs text-gray-700 focus:border-[#4a1c1d] focus:ring-0 bg-gray-50 focus:bg-white transition-colors">
                        <option value="All" ${state.priceRange === 'All' ? 'selected' : ''}>All Prices</option>
                        <option value="0-50000" ${state.priceRange === '0-50000' ? 'selected' : ''}>Under ₹50,000</option>
                        <option value="50000-100000" ${state.priceRange === '50000-100000' ? 'selected' : ''}>₹50,000 - ₹1 Lakh</option>
                        <option value="100000-200000" ${state.priceRange === '100000-200000' ? 'selected' : ''}>₹1 Lakh - ₹2 Lakhs</option>
                        <option value="200000-9999999" ${state.priceRange === '200000-9999999' ? 'selected' : ''}>Above ₹2 Lakhs</option>
                    </select>
                </div>

                <!-- Sort By -->
                <div>
                    <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Sort By</label>
                    <select onchange="updateStoreFilter('sortBy', this.value)" class="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-xs text-gray-700 focus:border-[#4a1c1d] focus:ring-0 bg-gray-50 focus:bg-white transition-colors">
                        <option value="featured" ${state.sortBy === 'featured' ? 'selected' : ''}>Featured</option>
                        <option value="price-low" ${state.sortBy === 'price-low' ? 'selected' : ''}>Price: Low to High</option>
                        <option value="price-high" ${state.sortBy === 'price-high' ? 'selected' : ''}>Price: High to Low</option>
                        <option value="rating" ${state.sortBy === 'rating' ? 'selected' : ''}>Customer Rating</option>
                    </select>
                </div>
            </div>

            <!-- Active Filters Bar & Reset -->
            <div id="store-active-filters" class="flex flex-wrap items-center justify-between gap-3 mt-5 pt-4 border-t border-gray-100">
                <div class="flex flex-wrap items-center gap-2 text-xs">
                    <span id="store-results-count" class="font-bold text-[#4a1c1d]">Showing 0 Items</span>
                    <div id="active-filter-chips" class="flex flex-wrap items-center gap-1.5 ml-2"></div>
                </div>
                
                <button onclick="resetStoreFilters()" class="text-xs text-[#b58b4c] hover:text-[#4a1c1d] font-bold underline transition-colors">
                    Reset All Filters
                </button>
            </div>
        </div>

        <!-- Product Grid Container -->
        <div id="store-product-grid" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"></div>
    `;

    window.currentStoreState = state;
    applyStoreFilters();
}

let searchDebounce = null;
function onStoreSearchInput(val) {
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(() => {
        if (window.currentStoreState) {
            window.currentStoreState.searchQuery = val.trim();
            applyStoreFilters();
        }
    }, 250);
}

function updateStoreFilter(key, val) {
    if (window.currentStoreState) {
        window.currentStoreState[key] = val;
        applyStoreFilters();
    }
}

function resetStoreFilters() {
    window.currentStoreState = {
        category: 'All',
        collection: 'All',
        metal: 'All',
        priceRange: 'All',
        inStockOnly: false,
        searchQuery: '',
        sortBy: 'featured'
    };
    renderStorePage(window.currentStoreState);
}

function applyStoreFilters() {
    const state = window.currentStoreState;
    if (!state) return;

    let filtered = [...(window.products || [])];

    // Filter Category
    if (state.category && state.category !== 'All') {
        filtered = filtered.filter(p => p.category && p.category.toLowerCase() === state.category.toLowerCase());
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
            return mType.toLowerCase().includes(state.metal.toLowerCase()) || purity.toLowerCase().includes(state.metal.toLowerCase());
        });
    }

    // Filter Price Range
    if (state.priceRange && state.priceRange !== 'All') {
        const [min, max] = state.priceRange.split('-').map(Number);
        filtered = filtered.filter(p => p.price >= min && p.price <= max);
    }

    // Filter Search Query
    if (state.searchQuery) {
        const q = state.searchQuery.toLowerCase();
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            (p.sku && p.sku.toLowerCase().includes(q)) ||
            (p.description && p.description.toLowerCase().includes(q))
        );
    }

    // Sort
    if (state.sortBy === 'price-low') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (state.sortBy === 'price-high') {
        filtered.sort((a, b) => b.price - a.price);
    } else if (state.sortBy === 'rating') {
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    // Render Grid
    const countEl = document.getElementById('store-results-count');
    if (countEl) countEl.textContent = `Showing ${filtered.length} ${filtered.length === 1 ? 'Jewellery Piece' : 'Jewellery Pieces'}`;

    // Active Chips
    const chipsEl = document.getElementById('active-filter-chips');
    if (chipsEl) {
        let chips = [];
        if (state.category !== 'All') chips.push(`Category: ${state.category}`);
        if (state.collection !== 'All') chips.push(`Collection: ${state.collection}`);
        if (state.metal !== 'All') chips.push(`Metal: ${state.metal}`);
        if (state.priceRange !== 'All') chips.push(`Price Filter Active`);
        if (state.searchQuery) chips.push(`Search: "${state.searchQuery}"`);

        chipsEl.innerHTML = chips.map(c => `
            <span class="inline-flex items-center gap-1 bg-amber-50 text-[#b58b4c] border border-amber-200 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                ${c}
            </span>
        `).join('');
    }

    const gridEl = document.getElementById('store-product-grid');
    if (!gridEl) return;

    if (filtered.length === 0) {
        gridEl.innerHTML = `
            <div class="col-span-full py-16 text-center bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                <svg class="w-16 h-16 text-[#b58b4c] mx-auto mb-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                <h3 class="text-2xl font-serif text-[#4a1c1d] font-bold mb-2">No Jewellery Found</h3>
                <p class="text-gray-500 text-xs mb-6 max-w-md mx-auto">We couldn't find any items matching your selected criteria. Try adjusting your filters or search terms.</p>
                <button onclick="resetStoreFilters()" class="bg-[#4a1c1d] text-white px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#b58b4c] transition-colors shadow-md">
                    Clear Filters & View All
                </button>
            </div>
        `;
        return;
    }

    gridEl.innerHTML = filtered.map(p => {
        const origPrice = p.originalPrice || (p.pricing ? p.pricing.mrp : Math.round(p.price * 1.15));
        const hasDiscount = origPrice > p.price;
        const metalTag = (p.metalDetails ? p.metalDetails.purity : p.metal) || '22K Gold';
        const isWishlisted = window.wishlist && window.wishlist.isInWishlist(p.id);

        return `
            <div class="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col group overflow-hidden">
                <!-- Image Wrapper -->
                <div class="aspect-square relative overflow-hidden bg-gray-50 cursor-pointer" onclick="window.location.href='product.html?id=${p.id}'">
                    <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80';">
                    
                    ${p.badge ? `<span class="absolute top-3 left-3 bg-[#b58b4c] text-white text-[9px] font-bold px-2.5 py-1 uppercase tracking-wider rounded-md shadow-md">${p.badge}</span>` : ''}
                    
                    <button onclick="event.stopPropagation(); window.wishlist.toggleItem(${p.id}); this.querySelector('svg').setAttribute('fill', window.wishlist.isInWishlist(${p.id}) ? 'currentColor' : 'none');" class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 text-[#4a1c1d] flex items-center justify-center shadow-md hover:bg-[#4a1c1d] hover:text-white transition-colors" title="Wishlist">
                        <svg class="w-4 h-4" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                    </button>
                    
                    <!-- Quick View Overlay Button -->
                    <div class="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center">
                        <button onclick="event.stopPropagation(); window.modal.openQuickView(${p.id});" class="bg-white/90 backdrop-blur-sm text-[#4a1c1d] hover:bg-[#4a1c1d] hover:text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors shadow-md">
                            ⚡ Quick View
                        </button>
                    </div>
                </div>

                <!-- Info Block -->
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

                    <!-- Action Button -->
                    <button onclick="window.cart.addItem(${p.id}, 1)" class="mt-3 w-full bg-[#4a1c1d] text-white py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#b58b4c] transition-colors shadow-sm flex items-center justify-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                        Add to Bag
                    </button>
                </div>
            </div>
        `;
    }).join('');
}
