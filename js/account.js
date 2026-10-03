const account = {
    activeTab: 'orders',

    init() {
        this.loadCustomerInfo();
        this.renderOrders();
        this.bindEvents();
    },

    loadCustomerInfo() {
        try {
            const savedCust = localStorage.getItem('rajwada_customer');
            if (savedCust) {
                const cust = JSON.parse(savedCust);
                
                const initialsEl = document.getElementById('account-avatar-initials');
                const nameEl = document.getElementById('account-header-name');
                const emailEl = document.getElementById('account-header-email');

                if (cust.name) {
                    if (nameEl) nameEl.textContent = cust.name;
                    if (initialsEl) initialsEl.textContent = cust.name.charAt(0).toUpperCase();
                    const profName = document.getElementById('prof-name');
                    if (profName) profName.value = cust.name;
                }
                if (cust.email) {
                    if (emailEl) emailEl.textContent = cust.email;
                    const profEmail = document.getElementById('prof-email');
                    if (profEmail) profEmail.value = cust.email;
                }
                if (cust.phone) {
                    const profPhone = document.getElementById('prof-phone');
                    if (profPhone) profPhone.value = cust.phone;
                }
                if (cust.address) {
                    const addrStreet = document.getElementById('addr-street');
                    if (addrStreet) addrStreet.value = cust.address;
                }
                if (cust.city) {
                    const addrCity = document.getElementById('addr-city');
                    if (addrCity) addrCity.value = cust.city;
                }
                if (cust.state) {
                    const addrState = document.getElementById('addr-state');
                    if (addrState) addrState.value = cust.state;
                }
                if (cust.pincode) {
                    const addrPin = document.getElementById('addr-pincode');
                    if (addrPin) addrPin.value = cust.pincode;
                }
            }
        } catch (e) {
            console.warn('Could not load customer info:', e);
        }
    },

    switchTab(tabName) {
        this.activeTab = tabName;
        const tabs = ['orders', 'profile', 'addresses', 'auth'];
        
        tabs.forEach(t => {
            const btn = document.getElementById(`tab-btn-${t}`);
            const content = document.getElementById(`account-tab-${t}`);

            if (t === tabName) {
                if (btn) {
                    btn.classList.add('border-[#4a1c1d]', 'text-[#4a1c1d]');
                    btn.classList.remove('border-transparent', 'text-gray-500');
                }
                if (content) content.classList.remove('hidden');
            } else {
                if (btn) {
                    btn.classList.remove('border-[#4a1c1d]', 'text-[#4a1c1d]');
                    btn.classList.add('border-transparent', 'text-gray-500');
                }
                if (content) content.classList.add('hidden');
            }
        });
    },

    renderOrders() {
        const container = document.getElementById('orders-list-container');
        if (!container) return;

        let orders = [];
        try {
            orders = JSON.parse(localStorage.getItem('rajwada_orders') || '[]');
        } catch (e) {
            orders = [];
        }

        if (orders.length === 0) {
            container.innerHTML = `
                <div class="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
                    <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                    <h3 class="text-2xl font-serif text-[#4a1c1d] font-bold mb-3">No Order History Yet</h3>
                    <p class="text-gray-500 text-sm mb-6 max-w-md mx-auto">Your placed orders will appear here for tracking and review.</p>
                    <a href="index.html" class="inline-block bg-[#4a1c1d] text-white px-8 py-3 rounded-sm font-bold uppercase tracking-wider text-xs hover:bg-[#b58b4c] transition-colors shadow-md">Explore Royal Collections</a>
                </div>
            `;
            return;
        }

        container.innerHTML = orders.map(ord => `
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6 transition-all hover:shadow-md">
                <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-gray-100 mb-4 gap-2">
                    <div>
                        <span class="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Order Reference</span>
                        <h4 class="text-lg font-serif font-bold text-[#4a1c1d]">${ord.orderId}</h4>
                        <p class="text-xs text-gray-400">Placed on ${ord.date || 'Recent'}</p>
                    </div>
                    <div class="flex items-center gap-3">
                        <span class="bg-green-100 text-green-800 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">${ord.status || 'Order Placed'}</span>
                        <a href="order-confirmation.html?id=${ord.orderId}" class="text-xs font-bold text-[#b58b4c] hover:text-[#4a1c1d] transition-colors">Receipt &rarr;</a>
                    </div>
                </div>

                <div class="space-y-3 mb-4">
                    ${ord.items.map(item => `
                        <div class="flex items-center gap-4">
                            <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-cover rounded shadow-sm">
                            <div class="flex-1 min-w-0">
                                <h5 class="text-xs font-bold text-[#4a1c1d] truncate">${item.name}</h5>
                                <p class="text-[10px] text-gray-400">Qty: ${item.quantity} × ₹${item.price.toLocaleString()}</p>
                            </div>
                            <div class="text-xs font-bold text-[#4a1c1d]">₹${(item.price * item.quantity).toLocaleString()}</div>
                        </div>
                    `).join('')}
                </div>

                <div class="pt-3 border-t border-gray-100 flex justify-between items-center text-xs">
                    <span class="text-gray-500 font-medium">Payment: <strong class="text-gray-800">${ord.paymentMethod || 'COD'}</strong></span>
                    <span class="text-sm font-bold text-[#4a1c1d]">Total: ₹${ord.totalAmount.toLocaleString()}</span>
                </div>
            </div>
        `).join('');
    },

    bindEvents() {
        const profForm = document.getElementById('profile-form');
        if (profForm) {
            profForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('prof-name').value.trim();
                const email = document.getElementById('prof-email').value.trim();
                const phone = document.getElementById('prof-phone').value.trim();

                try {
                    const existing = JSON.parse(localStorage.getItem('rajwada_customer') || '{}');
                    localStorage.setItem('rajwada_customer', JSON.stringify({ ...existing, name, email, phone }));
                    if (window.toast) window.toast.show('✓ Profile details saved successfully');
                    this.loadCustomerInfo();
                } catch (err) {}
            });
        }

        const addrForm = document.getElementById('address-form');
        if (addrForm) {
            addrForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const address = document.getElementById('addr-street').value.trim();
                const city = document.getElementById('addr-city').value.trim();
                const state = document.getElementById('addr-state').value.trim();
                const pincode = document.getElementById('addr-pincode').value.trim();

                try {
                    const existing = JSON.parse(localStorage.getItem('rajwada_customer') || '{}');
                    localStorage.setItem('rajwada_customer', JSON.stringify({ ...existing, address, city, state, pincode }));
                    if (window.toast) window.toast.show('✓ Default address updated');
                } catch (err) {}
            });
        }

        const authForm = document.getElementById('auth-demo-form');
        if (authForm) {
            authForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = document.getElementById('auth-email').value.trim();
                const name = email.split('@')[0];
                try {
                    const existing = JSON.parse(localStorage.getItem('rajwada_customer') || '{}');
                    localStorage.setItem('rajwada_customer', JSON.stringify({ ...existing, name: name.toUpperCase(), email }));
                    if (window.toast) window.toast.show(`✓ Signed in as ${email} (Demo Mode)`);
                    this.loadCustomerInfo();
                    this.switchTab('orders');
                } catch (err) {}
            });
        }
    }
};

window.account = account;
