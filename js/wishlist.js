const wishlist = {
    items: [],

    init() {
        this.loadWishlist();
        this.updateWishlistUI();
        this.renderWishlistPage();
    },

    loadWishlist() {
        try {
            const saved = localStorage.getItem('rajwada_wishlist') || localStorage.getItem('wishlist');
            if (saved) {
                const parsed = JSON.parse(saved);
                this.items = Array.isArray(parsed) ? parsed : [];
            } else {
                this.items = [];
            }
        } catch (e) {
            console.warn('Failed to parse wishlist from LocalStorage:', e);
            this.items = [];
        }
    },

    saveWishlist() {
        try {
            localStorage.setItem('rajwada_wishlist', JSON.stringify(this.items));
            localStorage.setItem('wishlist', JSON.stringify(this.items));
        } catch (e) {
            console.error('Failed to save wishlist to LocalStorage:', e);
        }
    },

    toggleItem(productId) {
        const id = parseInt(productId);
        const index = this.items.indexOf(id);
        if (index > -1) {
            this.items.splice(index, 1);
            if (window.toast) window.toast.show('✓ Removed from Wishlist');
        } else {
            this.items.push(id);
            if (window.toast) window.toast.show('♡ Added to Wishlist');
        }
        this.saveWishlist();
        this.updateWishlistUI();
        this.updateProductButtons();
        this.renderWishlistPage();
    },

    isInWishlist(productId) {
        return this.items.includes(parseInt(productId));
    },

    updateWishlistUI() {
        const countEls = document.querySelectorAll('.wishlist-count');
        const count = this.items.length;
        countEls.forEach(el => {
            el.textContent = count;
            el.style.display = count > 0 ? 'flex' : 'none';
        });
    },

    updateProductButtons() {
        document.querySelectorAll('.wishlist-btn').forEach(btn => {
            const id = parseInt(btn.dataset.id);
            const svg = btn.querySelector('svg');
            if (svg) {
                if (this.isInWishlist(id)) {
                    svg.setAttribute('fill', 'currentColor');
                    btn.classList.add('text-[#4a1c1d]');
                    btn.classList.remove('text-gray-400');
                } else {
                    svg.setAttribute('fill', 'none');
                    btn.classList.remove('text-[#4a1c1d]');
                    btn.classList.add('text-gray-400');
                }
            }
        });
    },

    renderWishlistPage() {
        const container = document.getElementById('wishlist-items');
        if (!container) return;

        container.innerHTML = '';
        
        if (this.items.length === 0) {
            container.innerHTML = `
                <div class="col-span-full text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
                    <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                    <h2 class="text-2xl font-serif text-[#4a1c1d] mb-4 font-bold">Your wishlist is empty</h2>
                    <p class="text-gray-500 mb-8 max-w-md mx-auto text-sm">Save your favorite royal jewellery pieces to easily view or purchase them later.</p>
                    <a href="index.html" class="inline-block bg-[#4a1c1d] text-white px-8 py-3.5 rounded-sm font-bold uppercase tracking-wider text-sm hover:bg-[#b58b4c] transition-colors shadow-md">Discover Jewellery</a>
                </div>
            `;
            return;
        }

        const wishlistedProducts = window.products ? window.products.filter(p => this.items.includes(p.id)) : [];
        
        if (wishlistedProducts.length === 0) {
            this.items = [];
            this.saveWishlist();
            this.renderWishlistPage();
            return;
        }

        container.innerHTML = wishlistedProducts.map(p => `
            <div class="bg-white border border-gray-100 rounded-xl hover:shadow-xl transition-all duration-500 flex flex-col overflow-hidden group">
                <div class="relative overflow-hidden aspect-square cursor-pointer" onclick="window.location.href='product.html?id=${p.id}'">
                    <button class="absolute top-3 right-3 z-10 p-2.5 rounded-full bg-white/90 shadow-sm text-[#4a1c1d] hover:bg-white transition-colors" onclick="event.stopPropagation(); window.wishlist.toggleItem(${p.id})">
                        <svg class="w-5 h-5" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                    </button>
                    ${p.badge ? `<span class="absolute top-3 left-3 z-10 bg-[#b58b4c] text-white text-[10px] font-bold px-3 py-1 uppercase tracking-wider rounded-sm shadow-sm">${p.badge}</span>` : ''}
                    <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700">
                </div>
                <div class="p-5 flex flex-col flex-grow text-center">
                    <p class="text-[10px] text-[#b58b4c] font-bold uppercase tracking-widest mb-1">${p.category}</p>
                    <h3 class="font-serif text-base text-[#4a1c1d] font-bold mb-2 line-clamp-1">${p.name}</h3>
                    <p class="text-lg font-bold text-[#4a1c1d] mb-4">₹${p.price.toLocaleString()}</p>
                    <button onclick="window.cart.addItem(${p.id}); window.wishlist.toggleItem(${p.id});" class="mt-auto w-full bg-[#4a1c1d] text-white py-3 text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-[#b58b4c] transition-colors shadow-sm">
                        Move to Bag
                    </button>
                </div>
            </div>
        `).join('');
    }
};

window.wishlist = wishlist;
