const checkout = {
    init() {
        this.renderSummary();
        this.bindEvents();
        this.loadCustomerData();
    },

    loadCustomerData() {
        try {
            const savedCustomer = localStorage.getItem('rajwada_customer');
            if (savedCustomer) {
                const cust = JSON.parse(savedCustomer);
                if (cust.name) document.getElementById('chk-name').value = cust.name;
                if (cust.email) document.getElementById('chk-email').value = cust.email;
                if (cust.phone) document.getElementById('chk-phone').value = cust.phone;
                if (cust.address) document.getElementById('chk-address').value = cust.address;
                if (cust.city) document.getElementById('chk-city').value = cust.city;
                if (cust.state) document.getElementById('chk-state').value = cust.state;
                if (cust.pincode) document.getElementById('chk-pincode').value = cust.pincode;
            }
        } catch (e) {
            console.warn('Could not load saved customer data:', e);
        }
    },

    renderSummary() {
        const itemsList = document.getElementById('checkout-items-list');
        const subtotalEl = document.getElementById('chk-subtotal');
        const savingsEl = document.getElementById('chk-savings');
        const totalEl = document.getElementById('chk-total');

        if (!itemsList) return;

        const cartItems = window.cart ? window.cart.items : [];

        if (cartItems.length === 0) {
            window.location.href = 'shopping-bag.html';
            return;
        }

        itemsList.innerHTML = cartItems.map(item => `
            <div class="flex items-center gap-3 py-2 border-b border-gray-50 last:border-none">
                <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-cover rounded shadow-sm">
                <div class="flex-1 min-w-0">
                    <h5 class="text-xs font-serif font-bold text-[#4a1c1d] truncate">${item.name}</h5>
                    <p class="text-[10px] text-gray-400">Qty: ${item.quantity}</p>
                </div>
                <div class="text-xs font-bold text-[#4a1c1d]">₹${(item.price * item.quantity).toLocaleString()}</div>
            </div>
        `).join('');

        const subtotal = window.cart ? window.cart.getSubtotal() : 0;
        const savings = window.cart ? window.cart.getTotalSavings() : 0;
        const finalTotal = window.cart ? window.cart.getFinalTotal() : 0;

        if (subtotalEl) subtotalEl.textContent = `₹${subtotal.toLocaleString()}`;
        if (savingsEl) savingsEl.textContent = `- ₹${savings.toLocaleString()}`;
        if (totalEl) totalEl.textContent = `₹${finalTotal.toLocaleString()}`;
    },

    bindEvents() {
        const form = document.getElementById('checkout-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (this.validateForm()) {
                this.processOrder();
            }
        });
    },

    validateForm() {
        let valid = true;

        const name = document.getElementById('chk-name').value.trim();
        const email = document.getElementById('chk-email').value.trim();
        const phone = document.getElementById('chk-phone').value.trim();
        const address = document.getElementById('chk-address').value.trim();
        const city = document.getElementById('chk-city').value.trim();
        const state = document.getElementById('chk-state').value.trim();
        const pincode = document.getElementById('chk-pincode').value.trim();

        // Name
        if (!name) { this.showErr('chk-name'); valid = false; } else { this.hideErr('chk-name'); }

        // Email
        const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
        if (!emailRegex.test(email)) { this.showErr('chk-email'); valid = false; } else { this.hideErr('chk-email'); }

        // Phone
        const phoneRegex = /^\\+?[0-9\\s\\-\\(\\)]{7,15}$/;
        if (!phoneRegex.test(phone)) { this.showErr('chk-phone'); valid = false; } else { this.hideErr('chk-phone'); }

        // Address
        if (!address) { this.showErr('chk-address'); valid = false; } else { this.hideErr('chk-address'); }

        // City
        if (!city) { this.showErr('chk-city'); valid = false; } else { this.hideErr('chk-city'); }

        // State
        if (!state) { this.showErr('chk-state'); valid = false; } else { this.hideErr('chk-state'); }

        // PIN code
        if (!/^[0-9]{6}$/.test(pincode)) { this.showErr('chk-pincode'); valid = false; } else { this.hideErr('chk-pincode'); }

        return valid;
    },

    showErr(id) {
        const err = document.getElementById('err-' + id);
        const input = document.getElementById(id);
        if (err) err.classList.remove('hidden');
        if (input) input.classList.add('border-red-500');
    },

    hideErr(id) {
        const err = document.getElementById('err-' + id);
        const input = document.getElementById(id);
        if (err) err.classList.add('hidden');
        if (input) input.classList.remove('border-red-500');
    },

    processOrder() {
        const name = document.getElementById('chk-name').value.trim();
        const email = document.getElementById('chk-email').value.trim();
        const phone = document.getElementById('chk-phone').value.trim();
        const address = document.getElementById('chk-address').value.trim();
        const city = document.getElementById('chk-city').value.trim();
        const state = document.getElementById('chk-state').value.trim();
        const pincode = document.getElementById('chk-pincode').value.trim();

        const paymentOption = document.querySelector('input[name="payment-method"]:checked');
        const paymentMethod = paymentOption ? paymentOption.value : 'COD';

        const orderId = 'RJW-2026-' + Math.floor(10000 + Math.random() * 90000);
        const cartItems = window.cart ? window.cart.items : [];
        const total = window.cart ? window.cart.getFinalTotal() : 0;
        const dateStr = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });

        const orderObject = {
            orderId: orderId,
            date: dateStr,
            customer: { name, email, phone },
            shippingAddress: { address, city, state, pincode, country: 'India' },
            paymentMethod: paymentMethod,
            items: cartItems,
            totalAmount: total,
            status: 'Order Placed'
        };

        // Save Customer for future checkouts
        try {
            localStorage.setItem('rajwada_customer', JSON.stringify({ name, email, phone, address, city, state, pincode }));
        } catch (e) {}

        // Save Order to rajwada_orders
        try {
            const existingOrders = JSON.parse(localStorage.getItem('rajwada_orders') || '[]');
            existingOrders.unshift(orderObject);
            localStorage.setItem('rajwada_orders', JSON.stringify(existingOrders));
        } catch (e) {
            console.error('Failed to save order:', e);
        }

        // Clear Cart
        if (window.cart) window.cart.clearCart();

        // Redirect to Order Confirmation
        window.location.href = `order-confirmation.html?id=${encodeURIComponent(orderId)}`;
    }
};

window.checkout = checkout;
