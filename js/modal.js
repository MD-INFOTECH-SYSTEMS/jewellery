const modal = {
    currentQuantity: 1,

    init() {
        this.modal = document.getElementById('quick-view-modal');
        this.modalContent = document.getElementById('quick-view-content');
        
        if (this.modal) {
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) this.close();
            });
            
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.modal && !this.modal.classList.contains('hidden')) {
                    this.close();
                }
            });
        }
    },

    openQuickView(productId) {
        const product = window.products ? window.products.find(p => p.id === productId) : null;
        if (!product || !this.modal || !this.modalContent) return;

        this.currentQuantity = 1;
        const isWishlisted = window.wishlist && window.wishlist.isInWishlist(product.id);
        const wishlistFill = isWishlisted ? 'currentColor' : 'none';
        const wishlistClass = isWishlisted ? 'text-[#4a1c1d] border-[#4a1c1d] bg-gray-50' : 'text-gray-400 border-gray-300 bg-white';
        const origPrice = product.originalPrice || (product.pricing ? product.pricing.mrp : Math.round(product.price * 1.15));

        const metal = product.metalDetails || {
            purity: product.purity || "22K (916 Hallmarked)",
            grossWeight: product.weight || "24.50 gms",
            huid: product.huid || `HUID-RJ${product.id}849`
        };

        const diamond = product.diamondDetails;

        this.modalContent.innerHTML = `
            <button onclick="window.modal.close()" class="absolute top-4 right-4 text-gray-400 hover:text-[#4a1c1d] z-10 bg-white/90 rounded-full p-2 transition-colors shadow-md">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-0 h-full max-h-[90vh] overflow-y-auto">
                <!-- Image Side -->
                <div class="relative bg-gray-50 aspect-square md:aspect-auto flex items-center justify-center p-6">
                    ${product.badge ? `<span class="absolute top-4 left-4 z-10 bg-[#b58b4c] text-white text-[10px] font-bold px-3 py-1 uppercase tracking-wider rounded-sm shadow-sm">${product.badge}</span>` : ''}
                    <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover rounded-lg shadow-sm" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80';">
                </div>
                
                <!-- Content Side -->
                <div class="p-6 md:p-8 flex flex-col justify-between bg-white">
                    <div>
                        <div class="flex justify-between items-center mb-1">
                            <span class="text-[10px] text-[#b58b4c] font-bold uppercase tracking-widest">${product.category} ${product.collection ? `• ${product.collection}` : ''}</span>
                            <span class="text-[10px] text-gray-400">SKU: ${product.sku || 'RJW-JW-' + product.id}</span>
                        </div>
                        
                        <h2 class="text-2xl md:text-3xl font-serif text-[#4a1c1d] font-bold mb-2">${product.name}</h2>

                        <!-- Hallmark & HUID Chip -->
                        <div class="inline-flex items-center gap-2 px-2.5 py-1 bg-amber-50 text-[#b58b4c] border border-amber-200/70 rounded-md text-[11px] font-bold mb-3">
                            <span>👑 BIS Hallmarked</span>
                            <span>•</span>
                            <span class="font-mono text-gray-700">${metal.huid}</span>
                        </div>
                        
                        <div class="flex items-center gap-3 mb-3">
                            <span class="text-2xl font-bold text-[#4a1c1d]">₹${product.price.toLocaleString()}</span>
                            ${origPrice > product.price ? `<span class="text-sm text-gray-400 line-through">₹${origPrice.toLocaleString()}</span>` : ''}
                            <span class="text-[10px] text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded">(Incl. 3% GST)</span>
                        </div>
                        
                        <div class="flex items-center gap-1 text-[#b58b4c] mb-4 text-xs">
                            ${'★'.repeat(Math.floor(product.rating || 5))}${ (product.rating || 5) % 1 !== 0 ? '½' : ''}
                            <span class="text-gray-400 ml-2">(${product.reviewCount || 12} Reviews)</span>
                        </div>
                        
                        <p class="text-gray-600 mb-4 font-light leading-relaxed text-xs md:text-sm line-clamp-2">
                            ${product.description || 'Experience the essence of royal heritage with this exquisite piece. Masterfully handcrafted for timeless elegance.'}
                        </p>

                        <!-- Highlights Grid -->
                        <div class="grid grid-cols-2 gap-2 mb-4 p-3 bg-amber-50/40 rounded-lg border border-amber-100 text-xs">
                            <div><span class="text-gray-500 block text-[10px]">Purity:</span> <strong class="text-gray-800">${metal.purity}</strong></div>
                            <div><span class="text-gray-500 block text-[10px]">Gross Weight:</span> <strong class="text-gray-800">${metal.grossWeight}</strong></div>
                            ${diamond ? `
                                <div class="col-span-2"><span class="text-gray-500 text-[10px]">Diamond:</span> <strong class="text-[#b58b4c]">${diamond.totalWeightCT} (${diamond.diamondClarity})</strong></div>
                            ` : ''}
                        </div>
                        
                        <div class="mb-5 flex items-center gap-4">
                            <span class="text-xs font-bold text-gray-700 uppercase tracking-wider">Quantity:</span>
                            <div class="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-sm px-3 py-1">
                                <button onclick="window.modal.adjustQty(-1)" class="text-gray-500 hover:text-[#4a1c1d] font-bold px-1">-</button>
                                <span id="modal-qty-display" class="w-6 text-center text-sm font-bold text-[#4a1c1d]">1</span>
                                <button onclick="window.modal.adjustQty(1)" class="text-gray-500 hover:text-[#4a1c1d] font-bold px-1">+</button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="pt-4 border-t border-gray-100">
                        <div class="flex flex-col sm:flex-row items-center gap-3">
                            <button onclick="window.wishlist.toggleItem(${product.id}); window.modal.updateWishlistBtn(${product.id});" id="modal-wishlist-btn" class="flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-3 rounded-lg border hover:border-[#4a1c1d] transition-colors ${wishlistClass}">
                                <svg class="w-5 h-5" fill="${wishlistFill}" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                                <span class="text-xs font-bold uppercase tracking-wider text-[#4a1c1d]">Wishlist</span>
                            </button>
                            
                            <button onclick="window.cart.addItem(${product.id}, window.modal.currentQuantity); window.modal.close();" class="flex-1 w-full bg-[#4a1c1d] hover:bg-[#b58b4c] text-white py-3 px-6 rounded-lg shadow-md transition-all font-bold tracking-wider uppercase text-xs flex items-center justify-center gap-2">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                                Add to Bag
                            </button>
                        </div>
                        <div class="mt-4 text-center">
                            <a href="product.html?id=${product.id}" class="text-xs text-[#b58b4c] font-bold uppercase tracking-wider hover:text-[#4a1c1d] transition-colors flex items-center justify-center gap-1">
                                View Full 10-Point Specifications & Pricing Breakdown &rarr;
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.modal.classList.remove('hidden');
        this.modal.classList.add('flex');
        setTimeout(() => this.modalContent.classList.remove('scale-95', 'opacity-0'), 10);
        document.body.style.overflow = 'hidden';
    },

    adjustQty(delta) {
        this.currentQuantity = Math.max(1, this.currentQuantity + delta);
        const qtyEl = document.getElementById('modal-qty-display');
        if (qtyEl) qtyEl.textContent = this.currentQuantity;
    },

    updateWishlistBtn(productId) {
        const isWishlisted = window.wishlist && window.wishlist.isInWishlist(productId);
        const btn = document.getElementById('modal-wishlist-btn');
        if (btn) {
            const svg = btn.querySelector('svg');
            if (isWishlisted) {
                if (svg) svg.setAttribute('fill', 'currentColor');
                btn.classList.add('text-[#4a1c1d]', 'border-[#4a1c1d]', 'bg-gray-50');
                btn.classList.remove('text-gray-400', 'border-gray-300', 'bg-white');
            } else {
                if (svg) svg.setAttribute('fill', 'none');
                btn.classList.remove('text-[#4a1c1d]', 'border-[#4a1c1d]', 'bg-gray-50');
                btn.classList.add('text-gray-400', 'border-gray-300', 'bg-white');
            }
        }
    },

    close() {
        if (this.modal && this.modalContent) {
            this.modalContent.classList.add('scale-95', 'opacity-0');
            setTimeout(() => {
                this.modal.classList.add('hidden');
                this.modal.classList.remove('flex');
                document.body.style.overflow = '';
            }, 300);
        }
    }
};

window.modal = modal;
