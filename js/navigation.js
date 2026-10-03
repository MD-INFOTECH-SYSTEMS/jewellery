/**
 * Rajwada Luxury Jewellery Navigation System
 * Handles: World-Class 70/30 Mega Menu Dropdown, Top Navigation Hover Effects,
 * and Mobile Navigation Drawer.
 */

const navigation = {
    megaMenuData: {
        All: {
            title: "All Fine Jewellery",
            columns: [
                {
                    heading: "BY OCCASION",
                    links: [
                        { name: "Anniversary", href: "products.html?category=All&occasion=Anniversary" },
                        { name: "Engagement", href: "products.html?category=All&occasion=Engagement" },
                        { name: "Office Wear", href: "products.html?category=All&occasion=Office" },
                        { name: "Daily Wear", href: "products.html?category=All&occasion=Daily" },
                        { name: "Wedding", href: "products.html?category=Wedding" },
                        { name: "Festive", href: "products.html?category=All&occasion=Festive" },
                        { name: "Gifting", href: "products.html?category=Gifting" }
                    ]
                },
                {
                    heading: "BY MATERIAL",
                    links: [
                        { name: "Gold Jewellery", href: "products.html?category=Gold" },
                        { name: "Diamond Jewellery", href: "products.html?category=Diamond" },
                        { name: "Silver Creations", href: "products.html?metal=Silver" },
                        { name: "Precious Gemstones", href: "products.html?gemstone=Gemstone" },
                        { name: "Platinum Select", href: "products.html?metal=Platinum" }
                    ]
                },
                {
                    heading: "BY PRICE RANGE",
                    links: [
                        { name: "Below ₹10K", href: "products.html?maxPrice=10000" },
                        { name: "₹10K – ₹20K", href: "products.html?minPrice=10000&maxPrice=20000" },
                        { name: "₹20K – ₹30K", href: "products.html?minPrice=20000&maxPrice=30000" },
                        { name: "₹30K – ₹40K", href: "products.html?minPrice=30000&maxPrice=40000" },
                        { name: "₹40K – ₹50K", href: "products.html?minPrice=40000&maxPrice=50000" },
                        { name: "Above ₹50K", href: "products.html?minPrice=50000" }
                    ]
                },
                {
                    heading: "BY GENDER",
                    links: [
                        { name: "Women", href: "products.html?gender=Women" },
                        { name: "Men", href: "products.html?gender=Men" },
                        { name: "Kids", href: "products.html?gender=Kids" },
                        { name: "Unisex", href: "products.html?gender=Unisex" }
                    ]
                }
            ],
            editorial: {
                subtitle: "Curated Masterpieces",
                title: "Explore All Jewellery",
                description: "Discover our full spectrum of handcrafted royal masterpieces and everyday fine luxuries.",
                image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80",
                ctaText: "Explore All Jewellery →",
                href: "products.html?category=All"
            }
        },
        Gold: {
            title: "Gold Collection",
            columns: [
                {
                    heading: "BY JEWELLERY",
                    links: [
                        { name: "Rings", href: "products.html?category=Rings&metal=Gold" },
                        { name: "Earrings", href: "products.html?category=Earrings&metal=Gold" },
                        { name: "Necklaces", href: "products.html?category=Necklaces&metal=Gold" },
                        { name: "Chains", href: "products.html?category=Necklaces&metal=Gold" },
                        { name: "Bracelets", href: "products.html?category=Bracelets&metal=Gold" },
                        { name: "Pendants", href: "products.html?category=Necklaces&metal=Gold" },
                        { name: "Mangalsutra", href: "products.html?category=Gold" },
                        { name: "Nose Pins", href: "products.html?category=Gold" }
                    ]
                },
                {
                    heading: "BY PURITY",
                    links: [
                        { name: "18K Gold", href: "products.html?category=Gold&purity=18K" },
                        { name: "20K Gold", href: "products.html?category=Gold&purity=20K" },
                        { name: "22K Gold", href: "products.html?category=Gold&purity=22K" },
                        { name: "24K Pure Gold", href: "products.html?category=Gold&purity=24K" }
                    ]
                },
                {
                    heading: "BY STYLE",
                    links: [
                        { name: "Traditional", href: "products.html?category=Gold" },
                        { name: "Contemporary", href: "products.html?category=Gold" },
                        { name: "Minimalist", href: "products.html?category=Gold" },
                        { name: "Statement", href: "products.html?category=Gold" },
                        { name: "Everyday Gold", href: "products.html?category=Gold" }
                    ]
                },
                {
                    heading: "BY OCCASION",
                    links: [
                        { name: "Daily Wear", href: "products.html?category=Gold" },
                        { name: "Wedding", href: "products.html?category=Wedding" },
                        { name: "Festive", href: "products.html?category=Gold" },
                        { name: "Gifting", href: "products.html?category=Gifting" }
                    ]
                }
            ],
            editorial: {
                subtitle: "22K & 24K Royal Gold",
                title: "Pure Gold Heritage",
                description: "Master carved Nakshi and Temple gold jewellery fashioned by royal artisans.",
                image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=800&q=80",
                ctaText: "Explore Gold Collection →",
                href: "products.html?category=Gold"
            }
        },
        Diamond: {
            title: "Diamond Pavilion",
            columns: [
                {
                    heading: "BY JEWELLERY",
                    links: [
                        { name: "Rings", href: "products.html?category=Rings&gemstone=Diamond" },
                        { name: "Earrings", href: "products.html?category=Earrings&gemstone=Diamond" },
                        { name: "Necklaces", href: "products.html?category=Necklaces&gemstone=Diamond" },
                        { name: "Bracelets", href: "products.html?category=Bracelets&gemstone=Diamond" },
                        { name: "Pendants", href: "products.html?category=Necklaces&gemstone=Diamond" }
                    ]
                },
                {
                    heading: "BY STYLE",
                    links: [
                        { name: "Solitaire", href: "products.html?category=Diamond" },
                        { name: "Halo", href: "products.html?category=Diamond" },
                        { name: "Cluster", href: "products.html?category=Diamond" },
                        { name: "Tennis", href: "products.html?category=Diamond" },
                        { name: "Contemporary", href: "products.html?category=Diamond" }
                    ]
                },
                {
                    heading: "BY OCCASION",
                    links: [
                        { name: "Engagement", href: "products.html?category=Diamond" },
                        { name: "Anniversary", href: "products.html?category=Diamond" },
                        { name: "Wedding", href: "products.html?category=Wedding" },
                        { name: "Daily Wear", href: "products.html?category=Diamond" }
                    ]
                },
                {
                    heading: "BY SHAPE",
                    links: [
                        { name: "Round Brilliant", href: "products.html?category=Diamond" },
                        { name: "Oval Cut", href: "products.html?category=Diamond" },
                        { name: "Princess Cut", href: "products.html?category=Diamond" },
                        { name: "Emerald Cut", href: "products.html?category=Diamond" },
                        { name: "Pear Shape", href: "products.html?category=Diamond" },
                        { name: "Marquise", href: "products.html?category=Diamond" }
                    ]
                }
            ],
            editorial: {
                subtitle: "Rare & Certified Solitaires",
                title: "The Diamond Pavilion",
                description: "Internationally certified VVS diamonds cut to absolute perfection for unmatched brilliance.",
                image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80",
                ctaText: "Explore Diamonds →",
                href: "products.html?category=Diamond"
            }
        },
        Earrings: {
            title: "Earrings Gallery",
            columns: [
                {
                    heading: "BY STYLE",
                    links: [
                        { name: "Studs", href: "products.html?category=Earrings" },
                        { name: "Hoops", href: "products.html?category=Earrings" },
                        { name: "Drops", href: "products.html?category=Earrings" },
                        { name: "Jhumkas", href: "products.html?category=Earrings" },
                        { name: "Chandbali", href: "products.html?category=Earrings" },
                        { name: "Huggies", href: "products.html?category=Earrings" },
                        { name: "Ear Cuffs", href: "products.html?category=Earrings" }
                    ]
                },
                {
                    heading: "BY OCCASION",
                    links: [
                        { name: "Daily Wear", href: "products.html?category=Earrings" },
                        { name: "Office Wear", href: "products.html?category=Earrings" },
                        { name: "Wedding", href: "products.html?category=Wedding" },
                        { name: "Party", href: "products.html?category=Earrings" },
                        { name: "Festive", href: "products.html?category=Earrings" }
                    ]
                },
                {
                    heading: "BY MATERIAL",
                    links: [
                        { name: "Gold Earrings", href: "products.html?category=Earrings&metal=Gold" },
                        { name: "Diamond Earrings", href: "products.html?category=Earrings&gemstone=Diamond" },
                        { name: "Silver Earrings", href: "products.html?category=Earrings&metal=Silver" },
                        { name: "Gemstone Drops", href: "products.html?category=Earrings&gemstone=Ruby" }
                    ]
                }
            ],
            editorial: {
                subtitle: "Sculpted Framing",
                title: "Royal Earwear Suite",
                description: "From delicate everyday studs to grand royal Chandbalis designed to turn every head.",
                image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=800&q=80",
                ctaText: "Explore Earrings →",
                href: "products.html?category=Earrings"
            }
        },
        Rings: {
            title: "Signature Rings",
            columns: [
                {
                    heading: "BY TYPE",
                    links: [
                        { name: "Solitaire Rings", href: "products.html?category=Rings" },
                        { name: "Engagement Rings", href: "products.html?category=Rings" },
                        { name: "Wedding Bands", href: "products.html?category=Rings" },
                        { name: "Couple Rings", href: "products.html?category=Rings" },
                        { name: "Cocktail Rings", href: "products.html?category=Rings" },
                        { name: "Stackable Rings", href: "products.html?category=Rings" },
                        { name: "Band Rings", href: "products.html?category=Rings" }
                    ]
                },
                {
                    heading: "BY MATERIAL",
                    links: [
                        { name: "Gold Rings", href: "products.html?category=Rings&metal=Gold" },
                        { name: "Diamond Rings", href: "products.html?category=Rings&gemstone=Diamond" },
                        { name: "Silver Bands", href: "products.html?category=Rings&metal=Silver" },
                        { name: "Platinum Rings", href: "products.html?category=Rings&metal=Platinum" },
                        { name: "Gemstone Rings", href: "products.html?category=Rings" }
                    ]
                },
                {
                    heading: "BY STYLE",
                    links: [
                        { name: "Minimalist", href: "products.html?category=Rings" },
                        { name: "Classic Elegance", href: "products.html?category=Rings" },
                        { name: "Contemporary", href: "products.html?category=Rings" },
                        { name: "Statement Royal", href: "products.html?category=Rings" }
                    ]
                }
            ],
            editorial: {
                subtitle: "Symbols of Forever",
                title: "The Ring Atelier",
                description: "Hero solitaires and bespoke couple bands crafted with precision gemstone setting.",
                image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
                ctaText: "Explore Rings →",
                href: "products.html?category=Rings"
            }
        },
        Necklaces: {
            title: "Haute Neckwear",
            columns: [
                {
                    heading: "BY STYLE",
                    links: [
                        { name: "Necklace Sets", href: "products.html?category=Necklaces" },
                        { name: "Royal Chokers", href: "products.html?category=Necklaces" },
                        { name: "Pendant Necklaces", href: "products.html?category=Necklaces" },
                        { name: "Long Haram Necklaces", href: "products.html?category=Necklaces" },
                        { name: "Layered Chains", href: "products.html?category=Necklaces" },
                        { name: "Traditional Kundan", href: "products.html?category=Necklaces" }
                    ]
                },
                {
                    heading: "BY OCCASION",
                    links: [
                        { name: "Wedding Trousseau", href: "products.html?category=Wedding" },
                        { name: "Festive Gala", href: "products.html?category=Necklaces" },
                        { name: "Cocktail Party", href: "products.html?category=Necklaces" },
                        { name: "Daily Luxury", href: "products.html?category=Necklaces" }
                    ]
                },
                {
                    heading: "BY MATERIAL",
                    links: [
                        { name: "22K Gold Necklaces", href: "products.html?category=Necklaces&metal=Gold" },
                        { name: "Diamond Necklaces", href: "products.html?category=Necklaces&gemstone=Diamond" },
                        { name: "Sterling Silver", href: "products.html?category=Necklaces&metal=Silver" },
                        { name: "Emerald & Ruby Sets", href: "products.html?category=Necklaces" }
                    ]
                }
            ],
            editorial: {
                subtitle: "Imperial Opulence",
                title: "Haute Joaillerie Neckwear",
                description: "Stunning royal chokers and diamond-studded collar necklaces handcrafted for grand entry.",
                image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
                ctaText: "Explore Necklaces →",
                href: "products.html?category=Necklaces"
            }
        },
        Bracelets: {
            title: "Royal Wristwear",
            columns: [
                {
                    heading: "BY STYLE",
                    links: [
                        { name: "Chain Bracelets", href: "products.html?category=Bracelets" },
                        { name: "Diamond Tennis Bracelets", href: "products.html?category=Bracelets" },
                        { name: "Statement Cuffs", href: "products.html?category=Bracelets" },
                        { name: "Kada Bangles", href: "products.html?category=Bracelets" },
                        { name: "Charm Bracelets", href: "products.html?category=Bracelets" }
                    ]
                },
                {
                    heading: "BY MATERIAL",
                    links: [
                        { name: "Gold Bracelets", href: "products.html?category=Bracelets&metal=Gold" },
                        { name: "Diamond Tennis", href: "products.html?category=Bracelets&gemstone=Diamond" },
                        { name: "Silver Cuffs", href: "products.html?category=Bracelets&metal=Silver" },
                        { name: "Precious Gemstones", href: "products.html?category=Bracelets" }
                    ]
                },
                {
                    heading: "BY OCCASION",
                    links: [
                        { name: "Daily Wear", href: "products.html?category=Bracelets" },
                        { name: "Party Wear", href: "products.html?category=Bracelets" },
                        { name: "Wedding", href: "products.html?category=Wedding" },
                        { name: "Gifting", href: "products.html?category=Gifting" }
                    ]
                }
            ],
            editorial: {
                subtitle: "Fluid Grace",
                title: "The Bracelet Atelier",
                description: "Dazzling tennis bracelets and carved gold kadas engineered with seamless comfort and brilliance.",
                image: "https://images.unsplash.com/photo-1611591475193-4a159905c317?auto=format&fit=crop&w=800&q=80",
                ctaText: "Explore Bracelets →",
                href: "products.html?category=Bracelets"
            }
        },
        Wedding: {
            title: "Bridal World",
            columns: [
                {
                    heading: "BRIDAL SELECTION",
                    links: [
                        { name: "Bridal Masterpieces", href: "products.html?category=Wedding" },
                        { name: "Grand Bridal Sets", href: "products.html?category=Wedding" },
                        { name: "Engagement Solitaires", href: "products.html?category=Rings" },
                        { name: "Royal Mangalsutra", href: "products.html?category=Gold" },
                        { name: "Wedding Earrings", href: "products.html?category=Earrings" },
                        { name: "Bridal Necklaces", href: "products.html?category=Necklaces" },
                        { name: "Wedding Bangles", href: "products.html?category=Bracelets" },
                        { name: "Couple Rings", href: "products.html?category=Rings" }
                    ]
                },
                {
                    heading: "BY MATERIAL & CUT",
                    links: [
                        { name: "22K Heritage Gold", href: "products.html?category=Wedding&metal=Gold" },
                        { name: "VVS Diamond Sets", href: "products.html?category=Wedding&gemstone=Diamond" },
                        { name: "Royal Polki & Emeralds", href: "products.html?category=Wedding" },
                        { name: "Uncut Solitaire Reserve", href: "products.html?category=Wedding" }
                    ]
                }
            ],
            editorial: {
                subtitle: "For Your Sacred Moments",
                title: "The Rajwada Trousseau",
                description: "High-end Indian bridal trousseau collections designed for royal elegance on your wedding day.",
                image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80",
                ctaText: "Explore Bridal World →",
                href: "products.html?category=Wedding"
            }
        },
        Gifting: {
            title: "The Gift Suite",
            columns: [
                {
                    heading: "GIFTS BY RECIPIENT & OCCASION",
                    links: [
                        { name: "Gifts for Her", href: "products.html?category=Gifting" },
                        { name: "Gifts for Him", href: "products.html?category=Gifting" },
                        { name: "Anniversary Gifts", href: "products.html?category=Gifting" },
                        { name: "Wedding Gifts", href: "products.html?category=Gifting" },
                        { name: "Birthday Gifts", href: "products.html?category=Gifting" }
                    ]
                },
                {
                    heading: "BY PRICE RANGE",
                    links: [
                        { name: "Under ₹10K", href: "products.html?maxPrice=10000" },
                        { name: "Under ₹25K", href: "products.html?maxPrice=25000" },
                        { name: "Premium Gift Reserve", href: "products.html?minPrice=25000" }
                    ]
                }
            ],
            editorial: {
                subtitle: "Precious Treasures",
                title: "The Art of Royal Gifting",
                description: "Hand-curated fine jewellery presented in signature velvet gift boxes with personal notes.",
                image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80",
                ctaText: "Explore Gifting →",
                href: "products.html?category=Gifting"
            }
        }
    },

    megaMenuContainer: null,
    currentCategory: null,
    hideTimeout: null,

    init() {
        this.ensureMegaMenuContainer();
        this.bindNavLinks();
        this.bindMobileMenu();
    },

    ensureMegaMenuContainer() {
        let container = document.getElementById('product-mega-menu');
        if (!container) {
            container = document.createElement('div');
            container.id = 'product-mega-menu';
            const header = document.querySelector('header');
            if (header) {
                header.appendChild(container);
            }
        }
        container.className = 'absolute top-full left-0 w-full bg-[#fffdf9] shadow-2xl border-t border-b border-[#b58b4c]/20 z-[100] transition-all duration-300 opacity-0 invisible pointer-events-none transform -translate-y-2';
        this.megaMenuContainer = container;

        // Container mouse hover safety
        container.addEventListener('mouseenter', () => {
            if (this.hideTimeout) clearTimeout(this.hideTimeout);
        });

        container.addEventListener('mouseleave', () => {
            this.closeMegaMenu();
        });
    },

    bindNavLinks() {
        const links = document.querySelectorAll('header nav a, [data-category], #nav-product-icon');

        links.forEach(link => {
            let catKey = link.getAttribute('data-category');
            const href = link.getAttribute('href') || '';
            const text = link.textContent.trim();

            if (!catKey) {
                if (href.includes('category=Gold') || text === 'Gold') catKey = 'Gold';
                else if (href.includes('category=Diamond') || text === 'Diamond') catKey = 'Diamond';
                else if (href.includes('category=Earrings') || text === 'Earrings') catKey = 'Earrings';
                else if (href.includes('category=Rings') || text === 'Rings') catKey = 'Rings';
                else if (href.includes('category=Necklaces') || text === 'Necklaces') catKey = 'Necklaces';
                else if (href.includes('category=Bracelets') || text === 'Bracelets') catKey = 'Bracelets';
                else if (href.includes('category=Wedding') || text === 'Wedding') catKey = 'Wedding';
                else if (href.includes('category=Gifting') || text === 'Gifting') catKey = 'Gifting';
                else if (href.includes('category=All') || text === 'All Jewellery' || link.id === 'nav-product-icon') catKey = 'All';
            }

            if (catKey && this.megaMenuData[catKey]) {
                link.addEventListener('mouseenter', () => {
                    this.openMegaMenu(catKey);
                });

                link.addEventListener('mouseleave', () => {
                    this.closeMegaMenu();
                });
            } else if (text.includes('Contact')) {
                link.addEventListener('mouseenter', () => {
                    this.closeMegaMenu();
                });
            }
        });
    },

    openMegaMenu(catKey) {
        if (this.hideTimeout) clearTimeout(this.hideTimeout);
        if (!this.megaMenuContainer) this.ensureMegaMenuContainer();

        const container = this.megaMenuContainer;
        if (!container) return;

        if (this.currentCategory !== catKey) {
            this.currentCategory = catKey;

            // Fade out transition
            container.classList.add('opacity-0', '-translate-y-2');

            setTimeout(() => {
                this.renderMegaMenuContent(catKey);
                container.classList.remove('opacity-0', 'invisible', 'pointer-events-none', '-translate-y-2');
                container.classList.add('opacity-100', 'visible', 'pointer-events-auto', 'translate-y-0');
            }, 120);
        } else {
            container.classList.remove('opacity-0', 'invisible', 'pointer-events-none', '-translate-y-2');
            container.classList.add('opacity-100', 'visible', 'pointer-events-auto', 'translate-y-0');
        }
    },

    closeMegaMenu() {
        if (this.hideTimeout) clearTimeout(this.hideTimeout);

        this.hideTimeout = setTimeout(() => {
            const container = this.megaMenuContainer;
            if (container) {
                container.classList.add('opacity-0', '-translate-y-2');
                container.classList.remove('opacity-100', 'translate-y-0');

                setTimeout(() => {
                    container.classList.add('invisible', 'pointer-events-none');
                    this.currentCategory = null;
                }, 250);
            }
        }, 200);
    },

    renderMegaMenuContent(catKey) {
        const data = this.megaMenuData[catKey];
        if (!data || !this.megaMenuContainer) return;

        const numCols = data.columns.length;
        let colSpanClass = 'grid-cols-4';
        if (numCols === 3) colSpanClass = 'grid-cols-3';
        if (numCols === 2) colSpanClass = 'grid-cols-2';

        this.megaMenuContainer.innerHTML = `
            <div class="container mx-auto px-6 md:px-10 py-8">
                <div class="flex flex-col lg:flex-row gap-8 items-stretch min-h-[320px]">
                    
                    <!-- 70% Left Navigation Content -->
                    <div class="w-full lg:w-[70%] grid ${colSpanClass} gap-6 pr-6 border-r border-[#b58b4c]/20">
                        ${data.columns.map(col => `
                            <div>
                                <h5 class="font-serif font-bold text-xs uppercase tracking-widest text-[#4a1c1d] pb-2 mb-3 border-b border-[#b58b4c]/25 flex items-center gap-1.5">
                                    <span class="w-1.5 h-1.5 rounded-full bg-[#b58b4c]"></span>
                                    ${col.heading}
                                </h5>
                                <ul class="space-y-2">
                                    ${col.links.map(link => `
                                        <li>
                                            <a href="${link.href}" class="text-xs text-gray-600 hover:text-[#4a1c1d] hover:font-bold hover:translate-x-1.5 transition-all duration-200 inline-block py-0.5">
                                                ${link.name}
                                            </a>
                                        </li>
                                    `).join('')}
                                </ul>
                            </div>
                        `).join('')}
                    </div>

                    <!-- 30% Right Editorial Image Card -->
                    <div class="w-full lg:w-[30%] relative rounded-xl overflow-hidden group border border-[#b58b4c]/30 shadow-md flex flex-col justify-end bg-dark-brown">
                        <img src="${data.editorial.image}" alt="${data.editorial.title}" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90">
                        <div class="absolute inset-0 bg-gradient-to-t from-[#2c1e16]/95 via-[#2c1e16]/40 to-transparent"></div>
                        
                        <div class="relative z-10 p-6 text-white flex flex-col justify-end">
                            <span class="text-[10px] uppercase font-bold tracking-[0.25em] text-[#b58b4c] mb-1 font-sans">${data.editorial.subtitle}</span>
                            <h4 class="font-serif text-2xl font-bold text-white mb-2 leading-tight">${data.editorial.title}</h4>
                            <p class="text-xs text-gray-300 font-light mb-4 line-clamp-2 leading-relaxed">${data.editorial.description}</p>
                            
                            <a href="${data.editorial.href}" class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-200 hover:text-white transition-colors border-b border-amber-200/40 pb-1 w-max">
                                ${data.editorial.ctaText}
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        `;
    },

    bindMobileMenu() {
        const mobileBtn = document.getElementById('mobile-menu-btn');
        if (!mobileBtn) return;

        let drawer = document.getElementById('mobile-nav-drawer');
        if (!drawer) {
            drawer = document.createElement('div');
            drawer.id = 'mobile-nav-drawer';
            drawer.className = 'fixed inset-0 bg-black/60 backdrop-blur-md z-[120] hidden opacity-0 transition-opacity duration-300';
            
            const categories = [
                { key: 'Gold', name: 'Gold Jewellery', img: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=200&q=80' },
                { key: 'Diamond', name: 'Diamond Pavilion', img: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=200&q=80' },
                { key: 'Earrings', name: 'Earrings Suite', img: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=200&q=80' },
                { key: 'Rings', name: 'Rings Atelier', img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=200&q=80' },
                { key: 'Necklaces', name: 'Haute Neckwear', img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=200&q=80' },
                { key: 'Bracelets', name: 'Royal Wristwear', img: 'https://images.unsplash.com/photo-1611591475193-4a159905c317?auto=format&fit=crop&w=200&q=80' },
                { key: 'Wedding', name: 'Bridal Trousseau', img: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=200&q=80' },
                { key: 'Gifting', name: 'Luxury Gifting', img: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=200&q=80' }
            ];

            drawer.innerHTML = `
                <div id="mobile-drawer-content" class="bg-[#fffdf9] w-4/5 max-w-sm h-full shadow-2xl p-6 flex flex-col justify-between transform -translate-x-full transition-transform duration-300 overflow-y-auto">
                    <div>
                        <!-- Header -->
                        <div class="flex items-center justify-between border-b border-[#b58b4c]/20 pb-4 mb-6">
                            <div class="flex items-center gap-2">
                                <span class="text-[#b58b4c] text-xl">👑</span>
                                <span class="font-serif font-bold text-xl text-[#4a1c1d] tracking-widest">RAJWADA</span>
                            </div>
                            <button id="close-mobile-drawer" class="text-gray-400 hover:text-[#4a1c1d] p-1">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>

                        <!-- Main Quick Links -->
                        <nav class="space-y-1 mb-6">
                            <a href="index.html" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold text-gray-800 hover:bg-amber-50 hover:text-[#4a1c1d]">
                                🏠 Home
                            </a>
                            <a href="products.html?category=All" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold text-gray-800 hover:bg-amber-50 hover:text-[#4a1c1d]">
                                💎 Central Store & Catalog
                            </a>
                            <a href="categories.html" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold text-gray-800 hover:bg-amber-50 hover:text-[#4a1c1d]">
                                👑 Royal Category Pavilion
                            </a>
                            <a href="collections.html" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold text-gray-800 hover:bg-amber-50 hover:text-[#4a1c1d]">
                                📜 Rajwada Collections
                            </a>
                            <a href="contact.html" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold text-[#4a1c1d] bg-amber-50 border border-amber-200">
                                📍 Contact Us & Showrooms
                            </a>
                        </nav>

                        <!-- Mobile Categories Accordion -->
                        <div class="border-t border-[#b58b4c]/20 pt-4">
                            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3">Explore Categories</span>
                            <div class="space-y-2">
                                ${categories.map(c => `
                                    <a href="products.html?category=${c.key}" class="flex items-center gap-3 p-2 rounded-xl bg-white border border-gray-100 hover:border-[#b58b4c]/30 shadow-2xs transition-colors">
                                        <img src="${c.img}" alt="${c.name}" class="w-10 h-10 rounded-lg object-cover">
                                        <div>
                                            <h5 class="text-xs font-bold text-[#4a1c1d]">${c.name}</h5>
                                            <span class="text-[10px] text-[#b58b4c] font-semibold">Explore →</span>
                                        </div>
                                    </a>
                                `).join('')}
                            </div>
                        </div>
                    </div>

                    <!-- Footer CTA -->
                    <div class="pt-6 border-t border-[#b58b4c]/20 mt-6">
                        <a href="contact.html" class="w-full bg-[#4a1c1d] text-white py-3 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:bg-[#b58b4c] transition-colors">
                            <span>📞 Call Concierge Lounge</span>
                        </a>
                    </div>
                </div>
            `;
            document.body.appendChild(drawer);

            drawer.addEventListener('click', (e) => {
                if (e.target === drawer) this.closeMobileDrawer();
            });

            const closeBtn = document.getElementById('close-mobile-drawer');
            if (closeBtn) closeBtn.addEventListener('click', () => this.closeMobileDrawer());
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
    }
};

document.addEventListener('DOMContentLoaded', () => {
    navigation.init();
});

window.navigation = navigation;
