const cart = {
    items: [],
    appliedCoupon: null,
    discountRate: 0,

    init() {
        this.loadCart();
        this.updateCartUI();
        this.renderShoppingBagPage();
    },

    loadCart() {
        try {
            const saved = localStorage.getItem('rajwada_cart') || localStorage.getItem('cart');
            if (saved) {
                const parsed = JSON.parse(saved);
                this.items = Array.isArray(parsed) ? parsed : [];
            } else {
                this.items = [];
            }
        } catch (e) {
            console.warn('Failed to parse cart from LocalStorage:', e);
            this.items = [];
        }
    },

    saveCart() {
        try {
            localStorage.setItem('rajwada_cart', JSON.stringify(this.items));
            localStorage.setItem('cart', JSON.stringify(this.items)); // Fallback sync
        } catch (e) {
            console.error('Failed to save cart to LocalStorage:', e);
        }
    },

    addItem(productId, quantity = 1) {
        const product = window.products ? window.products.find(p => p.id === productId) : null;
        if (!product) return;

        const maxStock = product.stock || 10;
        const existingItem = this.items.find(item => item.id === productId);

        if (existingItem) {
            if (existingItem.quantity + quantity > maxStock) {
                if (window.toast) window.toast.show(`⚠️ Only ${maxStock} items available in stock`);
                existingItem.quantity = maxStock;
            } else {
                existingItem.quantity += quantity;
                if (window.toast) window.toast.show(`✓ ${product.name} quantity updated (${existingItem.quantity})`);
            }
        } else {
            const addQty = Math.min(quantity, maxStock);
            this.items.push({ ...product, quantity: addQty });
            if (window.toast) window.toast.show(`✓ ${product.name} added to your bag`);
        }
        
        this.saveCart();
        this.updateCartUI();
        this.renderShoppingBagPage();
    },

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartUI();
        if (window.toast) window.toast.show('✓ Item removed from bag');
        this.renderShoppingBagPage();
    },

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            const maxStock = item.stock || 10;
            if (quantity > maxStock) {
                if (window.toast) window.toast.show(`⚠️ Maximum available stock is ${maxStock}`);
                item.quantity = maxStock;
            } else if (quantity < 1) {
                item.quantity = 1;
            } else {
                item.quantity = quantity;
            }
            this.saveCart();
            this.updateCartUI();
            this.renderShoppingBagPage();
        }
    },

    clearCart() {
        this.items = [];
        this.saveCart();
        this.updateCartUI();
        this.renderShoppingBagPage();
    },

    getSubtotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },

    getOriginalTotal() {
        return this.items.reduce((total, item) => {
            const orig = item.originalPrice || item.price;
            return total + (orig * item.quantity);
        }, 0);
    },

    getTotalSavings() {
        const origTotal = this.getOriginalTotal();
        const subtotal = this.getSubtotal();
        const baseSavings = Math.max(0, origTotal - subtotal);
        const couponDiscount = Math.round(subtotal * this.discountRate);
        return baseSavings + couponDiscount;
    },

    getFinalTotal() {
        const subtotal = this.getSubtotal();
        const couponDiscount = Math.round(subtotal * this.discountRate);
        return Math.max(0, subtotal - couponDiscount);
    },

    applyCoupon(code) {
        if (!code || !code.trim()) return false;
        const formattedCode = code.trim().toUpperCase();
        if (formattedCode === 'ROYAL10') {
            this.appliedCoupon = 'ROYAL10';
            this.discountRate = 0.10;
            if (window.toast) window.toast.show('🎉 Coupon ROYAL10 applied! 10% Extra Discount');
            this.renderShoppingBagPage();
            return true;
        } else if (formattedCode === 'BRIDAL15') {
            this.appliedCoupon = 'BRIDAL15';
            this.discountRate = 0.15;
            if (window.toast) window.toast.show('🎉 Coupon BRIDAL15 applied! 15% Extra Discount');
            this.renderShoppingBagPage();
            return true;
        } else {
            if (window.toast) window.toast.show('⚠️ Invalid Promo Code. Try "ROYAL10"');
            return false;
        }
    },

    updateCartUI() {
        const countEls = document.querySelectorAll('.cart-count');
        const count = this.items.reduce((total, item) => total + item.quantity, 0);
        countEls.forEach(el => {
            el.textContent = count;
            el.style.display = count > 0 ? 'flex' : 'none';
        });
    },

    renderShoppingBagPage() {
        const container = document.getElementById('shopping-bag-items');
        if (!container) return; // Not on shopping bag page

        const summarySubtotal = document.getElementById('summary-subtotal');
        const summarySavings = document.getElementById('summary-savings');
        const summaryTotal = document.getElementById('summary-total');
        const checkoutBtn = document.getElementById('proceed-to-checkout-btn');
        
        container.innerHTML = '';
        
        if (this.items.length === 0) {
            container.innerHTML = `
                <div class="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
                    <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                    <h2 class="text-2xl font-serif text-[#4a1c1d] mb-4 font-bold">Your shopping bag is empty</h2>
                    <p class="text-gray-500 mb-8 max-w-md mx-auto text-sm">Explore our royal jewellery collection and add timeless masterpieces to your bag.</p>
                    <a href="index.html" class="inline-block bg-[#4a1c1d] text-white px-8 py-3.5 rounded-sm font-bold uppercase tracking-wider text-sm hover:bg-[#b58b4c] transition-colors shadow-md">Continue Shopping</a>
                </div>
            `;
            if (summarySubtotal) summarySubtotal.textContent = '₹0';
            if (summarySavings) summarySavings.textContent = '- ₹0';
            if (summaryTotal) summaryTotal.textContent = '₹0';
            if (checkoutBtn) {
                checkoutBtn.disabled = true;
                checkoutBtn.classList.add('opacity-50', 'cursor-not-allowed');
                checkoutBtn.onclick = (e) => { e.preventDefault(); if (window.toast) window.toast.show('⚠️ Your shopping bag is empty'); };
            }
            return;
        }

        if (checkoutBtn) {
            checkoutBtn.disabled = false;
            checkoutBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            checkoutBtn.onclick = () => { window.location.href = 'checkout.html'; };
        }

        this.items.forEach(item => {
            const el = document.createElement('div');
            el.className = 'flex flex-col sm:flex-row items-center gap-6 p-6 bg-white rounded-xl shadow-sm border border-gray-100 mb-4 transition-all hover:shadow-md';
            const origPrice = item.originalPrice || Math.round(item.price * 1.15);
            
            el.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="w-24 h-24 object-cover rounded-lg shadow-sm cursor-pointer" onclick="window.location.href='product.html?id=${item.id}'">
                <div class="flex-1 text-center sm:text-left">
                    <span class="text-[10px] uppercase font-bold tracking-widest text-[#b58b4c]">${item.category}</span>
                    <h3 class="text-lg font-serif font-bold text-[#4a1c1d] mb-1 hover:text-[#b58b4c] cursor-pointer transition-colors" onclick="window.location.href='product.html?id=${item.id}'">${item.name}</h3>
                    <p class="text-xs text-gray-400 mb-2">SKU: ${item.sku || 'RJW-JW-' + item.id}</p>
                    <div class="flex items-center gap-2 justify-center sm:justify-start">
                        <p class="text-lg font-bold text-[#4a1c1d]">₹${item.price.toLocaleString()}</p>
                        ${origPrice > item.price ? `<p class="text-xs text-gray-400 line-through">₹${origPrice.toLocaleString()}</p>` : ''}
                    </div>
                </div>
                <div class="flex flex-col items-center sm:items-end gap-4">
                    <div class="flex items-center gap-3 bg-gray-50 rounded-full border border-gray-200 px-3 py-1">
                        <button class="text-gray-500 hover:text-[#4a1c1d] px-2 font-bold" onclick="window.cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <span class="w-6 text-center text-sm font-medium text-gray-800">${item.quantity}</span>
                        <button class="text-gray-500 hover:text-[#4a1c1d] px-2 font-bold" onclick="window.cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                    <div class="flex gap-4 text-xs font-semibold">
                        <button class="text-gray-400 hover:text-[#4a1c1d] transition-colors flex items-center gap-1" onclick="window.wishlist.toggleItem(${item.id})">
                            <svg class="w-4 h-4" fill="${window.wishlist && window.wishlist.isInWishlist(item.id) ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                            Move to Wishlist
                        </button>
                        <button class="text-gray-400 hover:text-red-600 transition-colors flex items-center gap-1" onclick="window.cart.removeItem(${item.id})">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            Remove
                        </button>
                    </div>
                </div>
            `;
            container.appendChild(el);
        });

        const subtotal = this.getSubtotal();
        const savings = this.getTotalSavings();
        const finalTotal = this.getFinalTotal();

        if (summarySubtotal) summarySubtotal.textContent = `₹${subtotal.toLocaleString()}`;
        if (summarySavings) summarySavings.textContent = `- ₹${savings.toLocaleString()}`;
        if (summaryTotal) summaryTotal.textContent = `₹${finalTotal.toLocaleString()}`;
    }
};

window.cart = cart;
