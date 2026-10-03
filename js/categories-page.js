/**
 * Categories Page JS - Luxury Category Pavilion Showcase
 * Renders large image-driven luxury category cards with zero letter icons
 */

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('categories-container');
    if (!container) return;

    const categoryList = [
        {
            key: 'All',
            name: 'ALL JEWELLERY',
            tag: 'HAUTE JOAILLERIE',
            subtitle: 'Explore our entire suite of handcrafted royal masterpieces',
            image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
            subcategories: ['Anniversary', 'Engagement', 'Office Wear', 'Daily Wear', 'Wedding']
        },
        {
            key: 'Gold',
            name: 'GOLD',
            tag: '22K & 24K PURE GOLD',
            subtitle: 'Nakshi carved traditional & modern gold heirlooms',
            image: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=800&q=80',
            subcategories: ['Rings', 'Earrings', 'Necklaces', 'Pendants', 'Mangalsutra']
        },
        {
            key: 'Diamond',
            name: 'DIAMOND',
            tag: 'SOLITAIRE RESERVE',
            subtitle: 'Rare VVS certified diamonds of unmatched brilliance',
            image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80',
            subcategories: ['Solitaires', 'Halo Rings', 'Tennis Bracelets', 'Pendants']
        },
        {
            key: 'Earrings',
            name: 'EARRINGS',
            tag: 'SCULPTED ELEGANCE',
            subtitle: 'Jhumkas, Chandbalis, Studs & Gemstone Drops',
            image: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=800&q=80',
            subcategories: ['Chandbali', 'Jhumkas', 'Diamond Studs', 'Ear Cuffs']
        },
        {
            key: 'Rings',
            name: 'RINGS',
            tag: 'SYMBOLS OF FOREVER',
            subtitle: 'Hero solitaire engagement bands & cocktail statement rings',
            image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
            subcategories: ['Solitaire Rings', 'Couple Bands', 'Cocktail Rings', 'Stackable']
        },
        {
            key: 'Necklaces',
            name: 'NECKLACES',
            tag: 'STATEMENT NECKWEAR',
            subtitle: 'Haute joaillerie chokers, long harams & pendant sets',
            image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
            subcategories: ['Chokers', 'Pendant Sets', 'Long Haram', 'Layered Chains']
        },
        {
            key: 'Bracelets',
            name: 'BRACELETS',
            tag: 'ROYAL WRISTWEAR',
            subtitle: 'Fluid diamond tennis bracelets & carved 22K gold bangles',
            image: 'https://images.unsplash.com/photo-1611591475193-4a159905c317?auto=format&fit=crop&w=800&q=80',
            subcategories: ['Tennis Bracelets', 'Gold Kadas', 'Chain Bracelets', 'Cuffs']
        },
        {
            key: 'Wedding',
            name: 'WEDDING',
            tag: 'BRIDAL TROUSSEAU',
            subtitle: 'Grand Indian bridal sets & sacred wedding jewellery',
            image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80',
            subcategories: ['Bridal Sets', 'Polki & Emeralds', 'Mangalsutra', 'Wedding Rings']
        },
        {
            key: 'Gifting',
            name: 'GIFTING',
            tag: 'LUXURY GIFT SUITE',
            subtitle: 'Precious treasures presented in regal signature packaging',
            image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
            subcategories: ['Gifts for Her', 'Anniversary Gifts', 'Under ₹25K', 'Premium Gifts']
        }
    ];

    container.innerHTML = `
        <!-- Page Header -->
        <div class="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <span class="text-xs uppercase font-bold tracking-[0.3em] text-[#b58b4c] mb-2 block font-sans">
                Haute Joaillerie Collections
            </span>
            <h1 class="text-3xl md:text-5xl font-serif font-bold text-[#4a1c1d] mb-4 tracking-wide">
                Royal Category Pavilion
            </h1>
            <div class="flex items-center justify-center gap-3 my-4">
                <div class="h-[1px] w-12 bg-[#b58b4c]/40"></div>
                <span class="text-[#b58b4c] text-sm">👑</span>
                <div class="h-[1px] w-12 bg-[#b58b4c]/40"></div>
            </div>
            <p class="text-gray-600 text-sm md:text-base font-light leading-relaxed">
                Explore our masterfully handcrafted fine jewellery collections, designed to celebrate life's most sacred moments and regal occasions.
            </p>
        </div>

        <!-- Categories Visual Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            ${categoryList.map(cat => `
                <a href="products.html?category=${cat.key}" class="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-[#b58b4c]/20 transition-all duration-500 bg-[#fffdf9] flex flex-col h-full transform hover:-translate-y-1.5">
                    
                    <!-- Top Image Area -->
                    <div class="relative aspect-[4/3] w-full overflow-hidden bg-gray-900">
                        <img src="${cat.image}" alt="${cat.name}" class="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 opacity-90 group-hover:opacity-100">
                        <div class="absolute inset-0 bg-gradient-to-t from-[#2c1e16]/80 via-transparent to-transparent"></div>
                        
                        <!-- Top Floating Tag -->
                        <div class="absolute top-4 left-4 bg-[#fffdf9]/90 backdrop-blur-md text-[#4a1c1d] border border-[#b58b4c]/40 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-sm">
                            ${cat.tag}
                        </div>
                    </div>

                    <!-- Bottom Content Card -->
                    <div class="p-6 md:p-8 flex flex-col justify-between flex-1 bg-gradient-to-b from-[#fffdf9] to-[#f9f6f0]">
                        <div>
                            <h3 class="font-serif text-2xl font-bold text-[#4a1c1d] group-hover:text-[#b58b4c] transition-colors mb-2">
                                ${cat.name}
                            </h3>
                            <p class="text-xs text-gray-600 font-light leading-relaxed mb-4">
                                ${cat.subtitle}
                            </p>

                            <!-- Subcategory Chips -->
                            <div class="flex flex-wrap gap-1.5 mb-6">
                                ${cat.subcategories.map(sub => `
                                    <span class="text-[10px] bg-white text-gray-700 px-2.5 py-1 rounded-full border border-gray-200/80 font-medium group-hover:border-[#b58b4c]/30 transition-colors">
                                        ${sub}
                                    </span>
                                `).join('')}
                            </div>
                        </div>

                        <!-- CTA Button -->
                        <div class="pt-4 border-t border-[#b58b4c]/15 flex items-center justify-between">
                            <span class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#4a1c1d] group-hover:text-[#b58b4c] transition-colors">
                                Explore Collection
                                <svg class="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                </svg>
                            </span>
                            <span class="text-[#b58b4c] opacity-0 group-hover:opacity-100 transition-opacity text-sm">✦</span>
                        </div>
                    </div>
                </a>
            `).join('')}
        </div>
    `;
});
