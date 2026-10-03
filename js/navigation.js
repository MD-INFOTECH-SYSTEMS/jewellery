const navigation = {
    init() {
        this.bindEvents();
        this.bindMobileMenu();
        this.ensureContactLinks();
    },

    bindEvents() {
        const productIcon = document.getElementById('nav-product-icon');
        const megaMenu = document.getElementById('product-mega-menu');

        if (productIcon && megaMenu) {
            // Populate mega menu with all categories + Contact Us card
            const categories = [
                { name: 'All Jewellery', path: 'All' },
                { name: 'Gold', path: 'Gold' },
                { name: 'Diamond', path: 'Diamond' },
                { name: 'Earrings', path: 'Earrings' },
                { name: 'Rings', path: 'Rings' },
                { name: 'Necklaces', path: 'Necklaces' },
                { name: 'Bracelets', path: 'Bracelets' },
                { name: 'Wedding', path: 'Wedding' },
                { name: 'Gifting', path: 'Gifting' }
            ];
            
            megaMenu.innerHTML = `
                <div class="container mx-auto px-4 py-8">
                    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        <div class="col-span-full flex justify-between items-center border-b border-gray-100 pb-3">
                            <div>
                                <h4 class="font-serif font-bold text-xl text-[#4a1c1d]">All Product Categories</h4>
                                <p class="text-xs text-gray-500">Explore handcrafted royal jewellery collections</p>
                            </div>
                            <div class="flex items-center gap-4">
                                <a href="products.html" class="text-xs font-bold text-[#b58b4c] uppercase tracking-wider hover:text-[#4a1c1d] transition-colors">
                                    Central Store &rarr;
                                </a>
                                <a href="contact.html" class="text-xs font-bold bg-amber-50 text-[#4a1c1d] px-3 py-1.5 rounded-full border border-amber-200 hover:bg-[#4a1c1d] hover:text-white transition-colors">
                                    📍 Store Locations
                                </a>
                            </div>
                        </div>

                        ${categories.map(cat => `
                            <a href="products.html?category=${cat.path}" class="group flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                                <div class="w-10 h-10 rounded-full bg-[#f9f6f0] flex items-center justify-center group-hover:bg-[#4a1c1d] transition-colors">
                                    <span class="text-[#b58b4c] font-serif font-bold text-lg group-hover:text-white transition-colors">${cat.name.charAt(0)}</span>
                                </div>
                                <div>
                                    <h5 class="text-[#4a1c1d] font-bold text-sm group-hover:text-[#b58b4c] transition-colors">${cat.name}</h5>
                                    <p class="text-xs text-gray-400">Explore Collection</p>
                                </div>
                            </a>
                        `).join('')}

                        <div class="col-span-full border-t border-gray-100 pt-4 flex flex-wrap justify-between items-center bg-amber-50/50 p-4 rounded-xl">
                            <div class="flex items-center gap-3">
                                <span class="text-2xl">👑</span>
                                <div>
                                    <h5 class="font-serif font-bold text-[#4a1c1d] text-sm">Need Personal Bridal Assistance?</h5>
                                    <p class="text-xs text-gray-500">Connect with our master jeweller or book a private lounge visit.</p>
                                </div>
                            </div>
                            <a href="contact.html" class="bg-[#4a1c1d] text-white px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#b58b4c] transition-colors shadow-sm">
                                Contact Us Page
                            </a>
                        </div>
                    </div>
                </div>
            `;

            productIcon.addEventListener('click', (e) => {
                e.preventDefault();
                const isHidden = megaMenu.classList.contains('hidden');
                
                if (isHidden) {
                    megaMenu.classList.remove('hidden');
                    setTimeout(() => megaMenu.classList.remove('opacity-0', '-translate-y-4'), 10);
                } else {
                    megaMenu.classList.add('opacity-0', '-translate-y-4');
                    setTimeout(() => megaMenu.classList.add('hidden'), 300);
                }
            });

            // Close on outside click
            document.addEventListener('click', (e) => {
                if (!productIcon.contains(e.target) && !megaMenu.contains(e.target)) {
                    megaMenu.classList.add('opacity-0', '-translate-y-4');
                    setTimeout(() => megaMenu.classList.add('hidden'), 300);
                }
            });
        }
    },

    bindMobileMenu() {
        const mobileBtn = document.getElementById('mobile-menu-btn');
        if (!mobileBtn) return;

        // Create Mobile Drawer Overlay if not exists
        let drawer = document.getElementById('mobile-nav-drawer');
        if (!drawer) {
            drawer = document.createElement('div');
            drawer.id = 'mobile-nav-drawer';
            drawer.className = 'fixed inset-0 bg-black/60 backdrop-blur-md z-[120] hidden opacity-0 transition-opacity duration-300';
            drawer.innerHTML = `
                <div id="mobile-drawer-content" class="bg-white w-4/5 max-w-sm h-full shadow-2xl p-6 flex flex-col justify-between transform -translate-x-full transition-transform duration-300 overflow-y-auto">
                    <div>
                        <!-- Header -->
                        <div class="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
                            <div class="flex items-center gap-2">
                                <span class="text-[#b58b4c] text-xl">👑</span>
                                <span class="font-serif font-bold text-xl text-[#4a1c1d]">RAJWADA</span>
                            </div>
                            <button id="close-mobile-drawer" class="text-gray-400 hover:text-[#4a1c1d] p-1">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>

                        <!-- Menu Links -->
                        <nav class="space-y-1">
                            <a href="index.html" class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold text-gray-700 hover:bg-amber-50 hover:text-[#4a1c1d] transition-colors">
                                🏠 Home
                            </a>
                            <a href="products.html" class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold text-gray-700 hover:bg-amber-50 hover:text-[#4a1c1d] transition-colors">
                                💎 Central Store & Catalog
                            </a>
                            <a href="contact.html" class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold text-[#4a1c1d] bg-amber-50 border border-amber-200/80 transition-colors">
                                📍 Contact Us & Store Locations
                            </a>
                            <a href="wishlist.html" class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold text-gray-700 hover:bg-amber-50 hover:text-[#4a1c1d] transition-colors">
                                ❤️ Wishlist
                            </a>
                            <a href="shopping-bag.html" class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold text-gray-700 hover:bg-amber-50 hover:text-[#4a1c1d] transition-colors">
                                🛍️ Shopping Bag
                            </a>
                            <a href="account.html" class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold text-gray-700 hover:bg-amber-50 hover:text-[#4a1c1d] transition-colors">
                                👤 My Account / Orders
                            </a>
                        </nav>

                        <div class="mt-6 pt-6 border-t border-gray-100">
                            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3">Jewellery Categories</span>
                            <div class="grid grid-cols-2 gap-2 text-xs">
                                <a href="products.html?category=Gold" class="p-2 bg-gray-50 rounded font-semibold text-gray-700 hover:text-[#4a1c1d]">Gold</a>
                                <a href="products.html?category=Diamond" class="p-2 bg-gray-50 rounded font-semibold text-gray-700 hover:text-[#4a1c1d]">Diamond</a>
                                <a href="products.html?category=Earrings" class="p-2 bg-gray-50 rounded font-semibold text-gray-700 hover:text-[#4a1c1d]">Earrings</a>
                                <a href="products.html?category=Rings" class="p-2 bg-gray-50 rounded font-semibold text-gray-700 hover:text-[#4a1c1d]">Rings</a>
                                <a href="products.html?category=Necklaces" class="p-2 bg-gray-50 rounded font-semibold text-gray-700 hover:text-[#4a1c1d]">Necklaces</a>
                                <a href="products.html?category=Wedding" class="p-2 bg-gray-50 rounded font-semibold text-gray-700 hover:text-[#4a1c1d]">Wedding</a>
                            </div>
                        </div>
                    </div>

                    <!-- Footer Contact CTA -->
                    <div class="pt-6 border-t border-gray-100">
                        <a href="contact.html" class="w-full bg-[#4a1c1d] text-white py-3 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md">
                            <span>📞 Call / Contact Us</span>
                        </a>
                    </div>
                </div>
            `;
            document.body.appendChild(drawer);

            // Drawer backdrop click
            drawer.addEventListener('click', (e) => {
                if (e.target === drawer) this.closeMobileDrawer();
            });

            const closeBtn = document.getElementById('close-mobile-drawer');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => this.closeMobileDrawer());
            }
        }

        mobileBtn.addEventListener('click', () => {
            const drawer = document.getElementById('mobile-nav-drawer');
            const content = document.getElementById('mobile-drawer-content');
            if (drawer && content) {
                drawer.classList.remove('hidden');
                setTimeout(() => {
                    drawer.classList.remove('opacity-0');
                    content.classList.remove('-translate-x-full');
                }, 10);
                document.body.style.overflow = 'hidden';
            }
        });
    },

    closeMobileDrawer() {
        const drawer = document.getElementById('mobile-nav-drawer');
        const content = document.getElementById('mobile-drawer-content');
        if (drawer && content) {
            drawer.classList.add('opacity-0');
            content.classList.add('-translate-x-full');
            document.body.style.overflow = '';
            setTimeout(() => {
                drawer.classList.add('hidden');
            }, 300);
        }
    },

    ensureContactLinks() {
        // Ensure Contact Us is present in bottom pill navigation bar on every page
        const navBars = document.querySelectorAll('header nav');
        navBars.forEach(nav => {
            const existingContact = nav.querySelector('a[href="contact.html"]');
            if (!existingContact) {
                const sep = document.createElement('span');
                sep.className = 'text-gold/30 mx-0.5';
                sep.textContent = '|';
                
                const link = document.createElement('a');
                link.href = 'contact.html';
                link.className = 'group flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[11px] font-bold text-[#4a1c1d] bg-amber-50 hover:bg-[#4a1c1d] hover:text-white transition-all duration-300 tracking-wider uppercase whitespace-nowrap border border-amber-200/80 shadow-2xs';
                link.innerHTML = `
                    <svg class="w-3.5 h-3.5 text-[#b58b4c] group-hover:text-amber-200 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    Contact Us
                `;

                nav.appendChild(sep);
                nav.appendChild(link);
            }
        });

        // Ensure Contact Us icon in top right icon bar
        const iconContainers = document.querySelectorAll('header .flex.items-center.gap-5, header .flex.items-center.gap-8');
        iconContainers.forEach(container => {
            const existingIcon = container.querySelector('a[href="contact.html"]');
            if (!existingIcon) {
                const iconLink = document.createElement('a');
                iconLink.href = 'contact.html';
                iconLink.className = 'hover:text-gold transition-colors';
                iconLink.title = 'Contact Us & Showrooms';
                iconLink.innerHTML = `
                    <svg class="w-5 h-5 md:w-6 md:h-6 text-[#4a1c1d] hover:text-[#b58b4c]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                `;
                container.appendChild(iconLink);
            }
        });
    }
};

window.navigation = navigation;
