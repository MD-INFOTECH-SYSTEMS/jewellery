/**
 * Rajwada Collections Page JS
 * Renders dedicated showcase sections for each Royal Collection (Bridal, Royal Heritage, Diamond Pavilion, Gold Heritage, Solitaire Reserve)
 * with 3D twist card hover animations, section heroes, and smooth anchor scrolling.
 */

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('collections-page-container');
    if (!container) return;

    renderCollectionsPage();

    // Check URL parameter to auto-scroll to requested collection section
    const urlParams = new URLSearchParams(window.location.search);
    const targetCol = urlParams.get('collection');
    if (targetCol) {
        setTimeout(() => {
            const secId = `section-${targetCol.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
            const targetEl = document.getElementById(secId) || document.querySelector(`[data-collection-id*="${targetCol.toLowerCase()}"]`);
            if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 300);
    }
});

function renderCollectionsPage() {
    const container = document.getElementById('collections-page-container');
    if (!container) return;

    const allProducts = window.products || [];

    // Group Products by Collection Categories
    const collectionSections = [
        {
            id: 'section-bridal',
            slug: 'bridal',
            title: 'Bridal Masterpieces Collection',
            tagline: 'Handcrafted Grandeur for Royal Weddings',
            description: 'Immortalizing traditional Rajasthani Kundan, Polki, and grand bridal chokers crafted for brides who command royalty.',
            bannerImage: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=1200&q=80',
            badge: '👑 Royal Wedding Series',
            filter: p => p.wedding || (p.category && (p.category === 'Necklaces' || p.jewelleryType.includes('Choker') || p.jewelleryType.includes('Kundan')))
        },
        {
            id: 'section-royal',
            slug: 'royal',
            title: 'Royal Heritage & Polki Reserve',
            tagline: 'Centuries of Artisanal Excellence',
            description: 'Uncut Polki diamonds, meenakari enamel, and traditional heritage jewellery carved by Rajasthan’s master jewellers.',
            bannerImage: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=80',
            badge: '✨ Masterpiece Collection',
            filter: p => p.collection === 'Royal Heritage' || (p.specifics && p.specifics.designStyle && p.specifics.designStyle.includes('Kundan'))
        },
        {
            id: 'section-diamond',
            slug: 'diamond',
            title: 'Diamond Pavilion & Fine Jewelry',
            tagline: 'VVS Certified Natural Diamonds in 18K Gold',
            description: 'Exquisite diamond chokers, tennis bracelets, drop earrings, and solitaire rings certified by IGI and GIA.',
            bannerImage: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80',
            badge: '💎 Certified VVS Diamonds',
            filter: p => p.category === 'Diamond' || p.diamondDetails || p.collection === 'Diamond Pavilion'
        },
        {
            id: 'section-heritage',
            slug: 'heritage',
            title: 'Heritage Gold & Temple Craft',
            tagline: '22K Hallmarked Gold Nakshi & Filigree',
            description: 'Sublime 22K gold bangles, kadas, and divine Lakshmi temple pendants embodying pure tradition and hallmark trust.',
            bannerImage: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1200&q=80',
            badge: '🏆 BIS 916 Hallmarked',
            filter: p => p.category === 'Gold' || p.collection === 'Heritage Gold' || (p.metalDetails && p.metalDetails.purity && p.metalDetails.purity.includes('22K'))
        },
        {
            id: 'section-solitaire',
            slug: 'solitaire',
            title: 'Royal Solitaire & Engagement Reserve',
            tagline: 'GIA Certified Solitaires in Platinum & 18K Gold',
            description: 'Breathtaking single-stone solitaire engagement rings and drops crafted to celebrate lifetime milestones.',
            bannerImage: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=1200&q=80',
            badge: '💍 GIA Certified Solitaires',
            filter: p => p.category === 'Rings' || p.collection === 'Royal Solitaire' || (p.diamondDetails && p.diamondDetails.diamondType && p.diamondDetails.diamondType.includes('Solitaire'))
        }
    ];

    container.innerHTML = `
        <!-- Main Collections Page Hero Header -->
        <div class="text-center mb-10 md:mb-14 bg-gradient-to-r from-[#4a1c1d] via-[#6b1f24] to-[#4a1c1d] text-white py-12 px-6 rounded-3xl shadow-xl relative overflow-hidden">
            <div class="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
                <svg class="w-72 h-72 text-gold" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            </div>
            
            <span class="text-xs font-bold text-[#b58b4c] uppercase tracking-[0.3em] block mb-2">Exclusive Flagship Showcase</span>
            <h1 class="text-3xl md:text-5xl font-serif font-bold uppercase tracking-wider mb-4 text-amber-100">Rajwada Royal Collections</h1>
            <p class="text-gray-200 max-w-2xl mx-auto text-xs md:text-sm font-light leading-relaxed mb-6">
                Explore our dedicated collection galleries. Each royal section showcases handcrafted masterpieces grouped by craftsmanship, metal purity, and heritage design.
            </p>

            <!-- Sticky Navigation Jump Pills -->
            <div class="flex items-center justify-center gap-2.5 overflow-x-auto pt-2 pb-2 scrollbar-hide max-w-4xl mx-auto">
                ${collectionSections.map(sec => `
                    <button onclick="scrollToCollectionSection('${sec.id}')" 
                        class="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shrink-0 bg-white/10 hover:bg-[#b58b4c] text-white backdrop-blur-md border border-white/20 hover:border-[#b58b4c] shadow-sm">
                        ${sec.badge.split(' ')[0]} ${sec.slug.toUpperCase()}
                    </button>
                `).join('')}
            </div>
        </div>

        <!-- Render Each Collection Section -->
        <div class="space-y-16 md:space-y-24">
            ${collectionSections.map(sec => renderCollectionSection(sec, allProducts)).join('')}
        </div>
    `;
}

function scrollToCollectionSection(secId) {
    const target = document.getElementById(secId);
    if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function renderCollectionSection(sec, allProducts) {
    const sectionProducts = allProducts.filter(sec.filter);

    return `
        <section id="${sec.id}" data-collection-id="${sec.slug}" class="scroll-mt-28 space-y-6">
            
            <!-- Section Hero Banner -->
            <div class="relative rounded-3xl overflow-hidden shadow-lg border border-gray-100 h-64 md:h-80 group">
                <img src="${sec.bannerImage}" alt="${sec.title}" class="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000">
                <div class="absolute inset-0 bg-gradient-to-r from-[#4a1c1d]/95 via-[#4a1c1d]/75 to-transparent flex flex-col justify-center p-6 md:p-12 max-w-2xl text-white">
                    <span class="inline-block w-fit bg-[#b58b4c] text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest rounded-md mb-2 shadow-md">${sec.badge}</span>
                    <h2 class="text-2xl md:text-4xl font-serif font-bold text-amber-100 mb-2">${sec.title}</h2>
                    <p class="text-xs md:text-sm text-amber-200/90 font-medium mb-3">${sec.tagline}</p>
                    <p class="text-xs text-gray-200 font-light leading-relaxed hidden sm:block mb-4">${sec.description}</p>

                    <div class="flex items-center gap-4">
                        <a href="products.html?collection=${encodeURIComponent(sec.slug)}" class="inline-flex items-center gap-2 bg-[#b58b4c] hover:bg-white hover:text-[#4a1c1d] text-white px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-md w-fit">
                            Explore All In Central Store &rarr;
                        </a>
                        <span class="text-xs text-amber-200/80 font-bold">${sectionProducts.length} Exclusive Masterpieces</span>
                    </div>
                </div>
            </div>

            <!-- Products Showcase Grid for this Collection (with 3D Twist Cards) -->
            ${sectionProducts.length > 0 ? `
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-2">
                    ${sectionProducts.map(p => renderCollectionCard(p)).join('')}
                </div>
            ` : `
                <div class="p-8 text-center bg-white rounded-2xl border border-gray-100">
                    <p class="text-sm text-gray-500">More masterpieces are currently being handcrafted for this collection.</p>
                </div>
            `}
        </section>
    `;
}

function renderCollectionCard(p) {
    const origPrice = p.originalPrice || (p.pricing ? p.pricing.mrp : Math.round(p.price * 1.15));
    const hasDiscount = origPrice > p.price;
    const metalTag = (p.metalDetails ? p.metalDetails.purity : p.metal) || '22K Gold';
    const isWishlisted = window.wishlist && window.wishlist.isInWishlist(p.id);

    const hasMultipleImgs = p.images && p.images.length > 1;
    const secondImg = hasMultipleImgs ? p.images[1] : (p.image || 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80');

    return `
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col group overflow-hidden transform hover:-translate-y-1">
            
            <!-- 3D Twist Image Box -->
            <div class="aspect-square relative overflow-hidden bg-gray-50 cursor-pointer twist-card" onclick="window.location.href='product.html?id=${p.id}'">
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

                <!-- Overlays -->
                <div class="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start pointer-events-none">
                    ${p.badge ? `<span class="bg-[#b58b4c] text-white text-[9px] font-bold px-2.5 py-1 uppercase tracking-wider rounded-md shadow-md">${p.badge}</span>` : ''}
                    <span class="bg-black/60 backdrop-blur-xs text-white text-[9px] font-medium px-2 py-0.5 rounded shadow-xs">${p.sku || 'RJW-JW'}</span>
                </div>

                <!-- Wishlist Heart Button -->
                <button onclick="event.stopPropagation(); window.wishlist.toggleItem(${p.id});" 
                    class="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs text-[#4a1c1d] flex items-center justify-center shadow-md hover:bg-[#4a1c1d] hover:text-white transition-colors" title="Wishlist">
                    <svg class="w-4 h-4" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                </button>

                ${hasMultipleImgs ? `
                    <div class="absolute bottom-12 right-3 z-10 bg-black/60 text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 backdrop-blur-xs pointer-events-none group-hover:opacity-0 transition-opacity">
                        <svg class="w-3 h-3 text-[#b58b4c]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        <span>3D Twist</span>
                    </div>
                ` : ''}

                <!-- Quick View Overlay Button -->
                <div class="absolute inset-x-0 bottom-0 z-10 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center">
                    <button onclick="event.stopPropagation(); window.modal.openQuickView(${p.id});" class="bg-white/90 backdrop-blur-sm text-[#4a1c1d] hover:bg-[#4a1c1d] hover:text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors shadow-md">
                        ⚡ Quick View
                    </button>
                </div>
            </div>

            <!-- Card Info -->
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

                <button onclick="window.cart.addItem(${p.id}, 1)" class="mt-3 w-full bg-[#4a1c1d] text-white py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#b58b4c] transition-colors shadow-sm flex items-center justify-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                    Add to Bag
                </button>
            </div>
        </div>
    `;
}
