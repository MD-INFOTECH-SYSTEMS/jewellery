const app = {
    currentCategory: 'All',
    currentSort: 'default',
    currentSearch: '',

    init() {
        this.bindFilters();
        this.bindSorting();

        // Parse URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const searchQuery = urlParams.get('search');
        const categoryQuery = urlParams.get('category');
        const collectionQuery = urlParams.get('collection');
        
        if (searchQuery) {
            this.currentSearch = searchQuery;
            const input = document.getElementById('header-search-input');
            if (input) input.value = searchQuery;
            this.renderProducts(searchQuery, 'All');
        } else if (categoryQuery || collectionQuery) {
            const activeFilter = categoryQuery || collectionQuery;
            this.currentCategory = activeFilter;
            this.currentSearch = '';
            
            const heading = document.getElementById('products-heading');
            if (heading) heading.textContent = activeFilter === 'All' ? 'Discover Our Collection' : `${activeFilter} Collection`;
            
            // Update active filter button state
            const filterBtns = document.querySelectorAll('.filter-btn');
            filterBtns.forEach(b => {
                if (b.dataset.category && b.dataset.category.toLowerCase() === activeFilter.toLowerCase()) {
                    b.classList.remove('bg-transparent', 'text-gray-500', 'border-gray-300');
                    b.classList.add('bg-[#1e293b]', 'text-white', 'border-[#1e293b]');
                } else {
                    b.classList.remove('bg-[#1e293b]', 'text-white', 'border-[#1e293b]');
                    b.classList.add('bg-transparent', 'text-gray-500', 'border-gray-300');
                }
            });
            
            this.renderProducts(null, activeFilter);
        } else {
            this.renderProducts('', 'All');
        }
    },

    bindFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                filterBtns.forEach(b => {
                    b.classList.remove('bg-[#1e293b]', 'text-white', 'border-[#1e293b]');
                    b.classList.add('bg-transparent', 'text-gray-500', 'border-gray-300');
                });
                const target = e.currentTarget;
                target.classList.remove('bg-transparent', 'text-gray-500', 'border-gray-300');
                target.classList.add('bg-[#1e293b]', 'text-white', 'border-[#1e293b]');

                this.currentCategory = target.dataset.category || 'All';
                this.currentSearch = '';
                
                const searchInput = document.getElementById('header-search-input');
                if (searchInput) searchInput.value = '';
                
                const heading = document.getElementById('products-heading');
                if (heading) heading.textContent = this.currentCategory === 'All' ? 'Discover Our Collection' : `${this.currentCategory} Collection`;

                this.renderProducts('', this.currentCategory);
            });
        });
    },

    bindSorting() {
        const sortSelect = document.getElementById('product-sort-select');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.currentSort = e.target.value;
                this.renderProducts();
            });
        }
    },

    renderProducts(searchQuery = null, filterCategory = null) {
        if (searchQuery !== null) this.currentSearch = searchQuery;
        if (filterCategory !== null) this.currentCategory = filterCategory;

        const grid = document.getElementById('product-grid');
        if (!grid) return;

        const allProducts = window.products || products || [];
        if (!allProducts || allProducts.length === 0) {
            grid.innerHTML = '<div class="col-span-full py-16 text-center text-gray-500"><p class="text-xl">Loading products catalog...</p></div>';
            return;
        }

        let filtered = [...allProducts];

        // 1. Search Filter (if currentSearch is non-empty)
        if (this.currentSearch && this.currentSearch.trim() !== '') {
            const term = this.currentSearch.toLowerCase().trim();
            filtered = filtered.filter(p => 
                (p.name && p.name.toLowerCase().includes(term)) || 
                (p.category && p.category.toLowerCase().includes(term)) ||
                (p.collection && p.collection.toLowerCase().includes(term)) ||
                (p.jewelleryType && p.jewelleryType.toLowerCase().includes(term)) ||
                (p.tag && p.tag.toLowerCase().includes(term)) ||
                (p.sku && p.sku.toLowerCase().includes(term))
            );
        } else if (this.currentCategory && this.currentCategory !== 'All') {
            // 2. Category / Collection / Tag Filter (case-insensitive)
            const catTerm = this.currentCategory.toLowerCase().trim();
            filtered = filtered.filter(p => 
                (p.tag && p.tag.toLowerCase() === catTerm) || 
                (p.category && p.category.toLowerCase() === catTerm) ||
                (p.collection && p.collection.toLowerCase() === catTerm)
            );
        }

        // 3. Sorting
        if (this.currentSort === 'price-low') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (this.currentSort === 'price-high') {
            filtered.sort((a, b) => b.price - a.price);
        } else if (this.currentSort === 'rating') {
            filtered.sort((a, b) => b.rating - a.rating);
        } else if (this.currentSort === 'popular') {
            filtered.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
        }

        // 4. Render Empty State
        if (filtered.length === 0) {
            grid.innerHTML = `
                <div class="col-span-full py-16 text-center bg-white rounded-xl shadow-sm border border-gray-100 px-4">
                    <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    <h3 class="text-2xl font-serif text-[#4a1c1d] font-bold mb-2">No jewellery found</h3>
                    <p class="text-gray-500 mb-6 text-sm">We couldn't find any products matching "${this.currentSearch || this.currentCategory}".</p>
                    <button onclick="window.app.resetFilters()" class="bg-[#4a1c1d] text-white px-6 py-2.5 rounded-sm font-bold uppercase tracking-wider text-xs hover:bg-[#b58b4c] transition-colors shadow-sm">
                        Reset All Filters
                    </button>
                </div>
            `;
            return;
        }

        // 5. Render Product Cards with 3D Twist Showcase on Hover
        grid.innerHTML = filtered.map(p => {
            const isWishlisted = window.wishlist && window.wishlist.isInWishlist(p.id);
            const wishlistFill = isWishlisted ? 'currentColor' : 'none';
            const wishlistClass = isWishlisted ? 'text-[#4a1c1d]' : 'text-gray-400';
            const origPrice = p.originalPrice || Math.round(p.price * 1.15);
            const hasMultipleImgs = p.images && p.images.length > 1;
            const secondImg = hasMultipleImgs ? p.images[1] : p.image;

            return `
            <div class="group relative bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500 flex flex-col overflow-hidden transform hover:-translate-y-1">
                ${p.badge ? `<span class="absolute top-3 left-3 z-10 bg-[#b58b4c] text-white text-[10px] font-bold px-3 py-1 uppercase tracking-wider rounded-sm shadow-sm">${p.badge}</span>` : ''}
                
                <button class="absolute top-3 right-3 z-10 p-2.5 rounded-full bg-white/90 shadow-sm hover:bg-white transition-colors wishlist-btn ${wishlistClass}" data-id="${p.id}" onclick="window.wishlist.toggleItem(${p.id})">
                    <svg class="w-5 h-5" fill="${wishlistFill}" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                </button>

                <div class="relative overflow-hidden aspect-[4/5] cursor-pointer twist-card" onclick="window.location.href='product.html?id=${p.id}'">
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

                    ${hasMultipleImgs ? `
                        <div class="absolute bottom-3 right-3 z-10 bg-black/60 text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 backdrop-blur-xs pointer-events-none group-hover:opacity-0 transition-opacity">
                            <svg class="w-3 h-3 text-[#b58b4c]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            <span>2 Views</span>
                        </div>
                    ` : ''}

                    <div class="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors duration-500 pointer-events-none"></div>
                    <div class="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex gap-2 justify-center z-20">
                        <button onclick="event.stopPropagation(); window.modal.openQuickView(${p.id});" class="bg-white/90 text-[#4a1c1d] text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded shadow hover:bg-[#4a1c1d] hover:text-white transition-colors flex-1">Quick View</button>
                        <button onclick="event.stopPropagation(); window.location.href='product.html?id=${p.id}';" class="bg-[#b58b4c] text-white text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded shadow hover:bg-[#4a1c1d] transition-colors flex-1">Details</button>
                    </div>
                </div>

                <div class="p-5 flex flex-col flex-grow text-center bg-white">
                    <p class="text-[10px] text-[#b58b4c] font-bold uppercase tracking-widest mb-1">${p.category} ${p.collection ? `• ${p.collection}` : ''}</p>
                    <h3 class="font-serif text-base text-[#4a1c1d] font-bold mb-2 line-clamp-1 hover:text-[#b58b4c] cursor-pointer transition-colors" onclick="window.location.href='product.html?id=${p.id}'">${p.name}</h3>
                    
                    <div class="flex items-center justify-center gap-1 text-[#b58b4c] mb-3 text-xs">
                        ${'★'.repeat(Math.floor(p.rating))}${p.rating % 1 !== 0 ? '½' : ''} 
                        <span class="text-gray-400 ml-1">(${p.reviewCount || p.rating})</span>
                    </div>

                    <div class="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                        <div class="text-left">
                            <span class="text-base font-bold text-[#4a1c1d]">₹${p.price.toLocaleString()}</span>
                            ${origPrice > p.price ? `<span class="block text-[10px] text-gray-400 line-through">₹${origPrice.toLocaleString()}</span>` : ''}
                        </div>
                        <button onclick="window.cart.addItem(${p.id})" class="flex items-center gap-1.5 text-[#4a1c1d] hover:text-[#b58b4c] font-bold uppercase text-xs tracking-wider transition-colors">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                            Add to Bag
                        </button>
                    </div>
                </div>
            </div>
        `}).join('');
    },

    resetFilters() {
        this.currentCategory = 'All';
        this.currentSearch = '';
        this.currentSort = 'default';

        const searchInput = document.getElementById('header-search-input');
        if (searchInput) searchInput.value = '';

        const heading = document.getElementById('products-heading');
        if (heading) heading.textContent = 'Discover Our Collection';

        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(b => {
            if (b.dataset.category === 'All') {
                b.classList.remove('bg-transparent', 'text-gray-500', 'border-gray-300');
                b.classList.add('bg-[#1e293b]', 'text-white', 'border-[#1e293b]');
            } else {
                b.classList.remove('bg-[#1e293b]', 'text-white', 'border-[#1e293b]');
                b.classList.add('bg-transparent', 'text-gray-500', 'border-gray-300');
            }
        });

        const sortSelect = document.getElementById('product-sort-select');
        if (sortSelect) sortSelect.value = 'default';

        this.renderProducts('', 'All');
    }
};

window.app = app;

document.addEventListener('DOMContentLoaded', () => {
    if(window.toast) window.toast.init();
    if(window.cart) window.cart.init();
    if(window.wishlist) window.wishlist.init();
    if(window.search) window.search.init();
    if(window.carousel) window.carousel.init();
    if(window.modal) window.modal.init();
    if(window.navigation) window.navigation.init();
    if(window.app) window.app.init();
});
