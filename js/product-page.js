document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const container = document.getElementById('product-container');

    if (!container) return;

    if (!productId || isNaN(productId)) {
        renderError("Invalid Product ID");
        return;
    }

    const product = window.products ? window.products.find(p => p.id === productId) : null;

    if (!product) {
        renderError("Product Not Found");
        return;
    }

    renderProduct(product);
});

function renderError(message) {
    const container = document.getElementById('product-container');
    if (!container) return;
    container.innerHTML = `
        <div class="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl shadow-sm border border-gray-100 max-w-2xl mx-auto my-12 px-6">
            <svg class="w-20 h-20 text-[#b58b4c] mb-6 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            <h2 class="text-3xl font-serif text-[#4a1c1d] font-bold mb-3">${message}</h2>
            <p class="text-gray-500 mb-8 text-sm max-w-md">The jewellery item you are looking for does not exist or has been removed from our royal catalog.</p>
            <a href="index.html" class="bg-[#4a1c1d] text-white px-8 py-3.5 rounded-sm hover:bg-[#b58b4c] transition-colors font-bold uppercase tracking-wider text-xs shadow-md">
                Discover Catalog
            </a>
        </div>
    `;
}

let pageQuantity = 1;

function renderProduct(product) {
    const container = document.getElementById('product-container');
    if (!container) return;

    pageQuantity = 1;
    const description = product.description || "Experience the epitome of luxury with this exquisite piece. Handcrafted by master artisans, it features intricate detailing and premium materials that make it a timeless addition to your collection.";
    const availability = (product.stock && product.stock > 0) ? `In Stock (${product.stock} available)` : "Out of Stock";
    const isOutOfStock = !(product.stock && product.stock > 0);
    const originalPrice = product.originalPrice || (product.pricing ? product.pricing.mrp : Math.round(product.price * 1.15));
    const hasDiscount = originalPrice > product.price;

    const isWishlisted = window.wishlist && window.wishlist.isInWishlist(product.id);
    const wishlistFill = isWishlisted ? 'currentColor' : 'none';
    const wishlistClass = isWishlisted ? 'text-[#4a1c1d] bg-gray-50 border-[#4a1c1d]' : 'text-gray-400 bg-white border-gray-200';

    const imagesList = (product.images && product.images.length > 0) ? product.images : [product.image];

    // Metal Details
    const metal = product.metalDetails || {
        metalType: product.metal || "Gold",
        purity: product.purity || "22K (916 Hallmarked)",
        metalColour: "Yellow Gold",
        grossWeight: product.weight || "24.50 gms",
        netMetalWeight: "22.10 gms",
        makingCharges: "₹3,500",
        wastagePercent: "3.5%",
        hallmark: "Yes (BIS 916)",
        huid: product.huid || `HUID-RJ${product.id}849`,
        certification: "BIS Hallmarked"
    };

    // Diamond Details
    const diamond = product.diamondDetails;

    // Gemstone Details
    const gemstone = product.gemstoneDetails;

    // Dimensions
    const dims = product.dimensions || {
        length: "18 Inches",
        width: "1.2 cm",
        height: "2.5 cm",
        thickness: "3.0 mm",
        diameter: "N/A",
        size: "Standard",
        sizeAdjustable: "Yes"
    };

    // Jewellery Specifics
    const specifics = product.specifics || {
        designStyle: "Royal Rajasthani Heritage",
        closureType: "S-Hook Lock",
        suitableFor: "Wedding & Festive Wear",
        customizationAvailable: "Yes",
        sizeAdjustable: "Yes"
    };

    // Hallmark & Certification
    const cert = product.certification || {
        hallmarked: "Yes (BIS Hallmarked)",
        huid: metal.huid || `HUID-RJ${product.id}849`,
        authority: "Bureau of Indian Standards (BIS)",
        certificateAvailable: "Yes",
        certificateNumber: `BIS-RJW-2026-00${product.id}`,
        documentUrl: "BIS Certificate Included"
    };

    // Transparent Pricing Breakdown
    const pricing = product.pricing || {
        mrp: originalPrice,
        sellingPrice: product.price,
        discount: product.discount || (hasDiscount ? "15% OFF" : "0%"),
        metalValue: Math.round(product.price * 0.78),
        makingCharges: Math.round(product.price * 0.14),
        stoneCharges: diamond || gemstone ? Math.round(product.price * 0.05) : 0,
        otherCharges: 0,
        gst: Math.round(product.price * 0.03),
        finalPrice: product.price
    };

    // Related Products (Max 6 Products)
    let relatedProducts = window.products ? window.products.filter(p => p.id !== product.id && (p.category === product.category || p.collection === product.collection)) : [];
    if (relatedProducts.length < 6 && window.products) {
        const fallback = window.products.filter(p => p.id !== product.id && !relatedProducts.some(r => r.id === p.id));
        relatedProducts = [...relatedProducts, ...fallback];
    }
    relatedProducts = relatedProducts.slice(0, 6);

    container.innerHTML = `
        <!-- Breadcrumb & Top Controls -->
        <div class="mb-6 flex flex-wrap items-center justify-between gap-4">
            <a href="index.html" class="text-gray-500 hover:text-[#4a1c1d] transition-colors text-xs font-semibold flex items-center gap-2 w-fit uppercase tracking-wider">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                Back to Catalog
            </a>
            <div class="flex items-center gap-3">
                <span class="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-[#b58b4c] border border-amber-200/60 rounded-full text-[11px] font-bold">
                    <svg class="w-3.5 h-3.5 text-[#b58b4c]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
                    ${cert.huid || 'HUID Certified'}
                </span>
                <span class="text-xs text-gray-400">SKU: <strong class="text-gray-700">${product.sku || 'RJW-JW-' + product.id}</strong></span>
            </div>
        </div>

        <!-- Main Product Card -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-gray-100 mb-12">
            <!-- Left: Gallery & Certification Badge -->
            <div class="flex flex-col gap-5">
                <div class="relative group cursor-pointer rounded-xl overflow-hidden shadow-sm border border-gray-100 bg-gray-50 aspect-square flex items-center justify-center" onclick="openImagePreview(document.getElementById('main-product-img').src, '${product.name.replace(/'/g, "\\'")}')">
                    <img id="main-product-img" src="${product.image}" alt="${product.name}" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80';">
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 flex items-center justify-center">
                        <div class="opacity-0 group-hover:opacity-100 bg-white/90 text-[#4a1c1d] rounded-full p-3.5 transform scale-75 group-hover:scale-100 transition-all duration-300 shadow-xl">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>
                        </div>
                    </div>
                </div>

                ${imagesList.length > 1 ? `
                    <div class="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                        ${imagesList.map((imgUrl, idx) => `
                            <button onclick="changeMainImage('${imgUrl}')" class="w-20 h-20 rounded-lg overflow-hidden border-2 border-transparent hover:border-[#b58b4c] focus:border-[#4a1c1d] transition-all shrink-0">
                                <img src="${imgUrl}" class="w-full h-full object-cover" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80';">
                            </button>
                        `).join('')}
                    </div>
                ` : ''}

                <!-- Hallmark & Quality Seal Card -->
                <div class="bg-gradient-to-r from-amber-50/70 via-white to-amber-50/70 border border-amber-200/80 rounded-xl p-4 flex items-center gap-4 shadow-sm">
                    <div class="w-12 h-12 rounded-full bg-[#4a1c1d] text-white flex items-center justify-center shrink-0 shadow-md">
                        <svg class="w-6 h-6 text-[#b58b4c]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.8">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                        </svg>
                    </div>
                    <div>
                        <div class="flex items-center gap-2">
                            <h4 class="font-serif font-bold text-[#4a1c1d] text-sm">${cert.hallmarked || '100% BIS Hallmarked'}</h4>
                            <span class="bg-[#b58b4c] text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase">Verified</span>
                        </div>
                        <p class="text-xs text-gray-600 mt-0.5">HUID Code: <strong class="text-gray-800 font-mono">${cert.huid}</strong> • Authority: ${cert.authority}</p>
                    </div>
                </div>
            </div>

            <!-- Right: Details & Key Highlights -->
            <div class="flex flex-col justify-between">
                <div>
                    <!-- Badges -->
                    <div class="flex flex-wrap items-center gap-2 mb-3">
                        ${product.badge ? `<span class="bg-[#b58b4c] text-white text-[10px] font-bold px-3 py-1 uppercase tracking-wider rounded-sm shadow-sm">${product.badge}</span>` : ''}
                        ${product.collection ? `<span class="bg-[#4a1c1d] text-white text-[10px] font-bold px-3 py-1 uppercase tracking-wider rounded-sm shadow-sm">${product.collection} Collection</span>` : ''}
                        ${product.gender ? `<span class="bg-gray-100 text-gray-700 text-[10px] font-bold px-2.5 py-1 uppercase tracking-wider rounded-sm">${product.gender}</span>` : ''}
                        ${product.occasion ? `<span class="bg-amber-100/80 text-amber-900 text-[10px] font-bold px-2.5 py-1 uppercase tracking-wider rounded-sm">${product.occasion}</span>` : ''}
                    </div>

                    <p class="text-xs text-[#b58b4c] font-bold uppercase tracking-widest mb-1.5">${product.category} ${product.jewelleryType ? `• ${product.jewelleryType}` : ''}</p>
                    <h1 class="text-3xl md:text-4xl font-serif text-[#4a1c1d] font-bold mb-3 leading-tight">${product.name}</h1>
                    
                    <div class="flex items-center gap-2 text-[#b58b4c] mb-4 text-xs">
                        ${'★'.repeat(Math.floor(product.rating || 5))}${ (product.rating || 5) % 1 !== 0 ? '½' : ''} 
                        <span class="text-gray-500 font-medium ml-1">(${product.reviewCount || 12} Authentic Reviews)</span>
                    </div>
                    
                    <!-- Pricing Display -->
                    <div class="bg-gray-50/80 rounded-xl p-4 mb-6 border border-gray-100">
                        <div class="flex items-end gap-3 mb-1">
                            <div class="text-3xl font-bold text-[#4a1c1d]">₹${product.price.toLocaleString()}</div>
                            ${hasDiscount ? `<div class="text-lg text-gray-400 line-through mb-1">₹${originalPrice.toLocaleString()}</div>` : ''}
                            ${pricing.discount ? `<span class="bg-red-100 text-red-800 text-xs font-bold px-2.5 py-1 rounded-md mb-1">${pricing.discount}</span>` : ''}
                        </div>
                        <p class="text-[11px] text-gray-500 flex items-center gap-1">
                            <span>Inclusive of 3% GST (₹${pricing.gst.toLocaleString()})</span>
                            • <a href="#specifications-section" class="text-[#b58b4c] font-bold underline hover:text-[#4a1c1d]">View Transparent Price Breakdown</a>
                        </p>
                    </div>

                    <!-- Availability -->
                    <div class="flex items-center gap-2 mb-5">
                        <div class="w-2.5 h-2.5 rounded-full ${!isOutOfStock ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}"></div>
                        <span class="text-xs font-semibold ${!isOutOfStock ? 'text-emerald-700' : 'text-red-600'}">${availability}</span>
                    </div>
                    
                    <p class="text-gray-600 mb-6 font-light leading-relaxed text-sm">${description}</p>

                    <!-- Key Spec Highlights Chips Grid -->
                    <div class="grid grid-cols-2 gap-3 mb-6 bg-amber-50/40 p-4 rounded-xl border border-amber-100/60 text-xs">
                        <div>
                            <span class="text-gray-400 block text-[10px] uppercase font-semibold">Metal & Purity</span>
                            <span class="font-bold text-gray-800">${metal.purity} ${metal.metalColour}</span>
                        </div>
                        <div>
                            <span class="text-gray-400 block text-[10px] uppercase font-semibold">Gross Weight</span>
                            <span class="font-bold text-gray-800">${metal.grossWeight}</span>
                        </div>
                        ${diamond ? `
                            <div>
                                <span class="text-gray-400 block text-[10px] uppercase font-semibold">Diamond Carat</span>
                                <span class="font-bold text-gray-800">${diamond.totalWeightCT} (${diamond.diamondClarity})</span>
                            </div>
                        ` : `
                            <div>
                                <span class="text-gray-400 block text-[10px] uppercase font-semibold">Net Metal Weight</span>
                                <span class="font-bold text-gray-800">${metal.netMetalWeight}</span>
                            </div>
                        `}
                        <div>
                            <span class="text-gray-400 block text-[10px] uppercase font-semibold">Certification</span>
                            <span class="font-bold text-[#b58b4c]">${metal.certification}</span>
                        </div>
                    </div>

                    <!-- Quantity -->
                    ${!isOutOfStock ? `
                        <div class="mb-6 flex items-center gap-4">
                            <span class="text-xs font-bold text-gray-700 uppercase tracking-wider">Quantity:</span>
                            <div class="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 shadow-inner">
                                <button onclick="updatePageQty(-1)" class="text-gray-500 hover:text-[#4a1c1d] font-bold text-base px-2">-</button>
                                <span id="page-qty-val" class="w-8 text-center text-sm font-bold text-[#4a1c1d]">1</span>
                                <button onclick="updatePageQty(1)" class="text-gray-500 hover:text-[#4a1c1d] font-bold text-base px-2">+</button>
                            </div>
                        </div>
                    ` : ''}
                </div>

                <!-- Action Buttons -->
                <div>
                    <div class="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-100 mb-6">
                        <button onclick="window.cart.addItem(${product.id}, pageQuantity)" ${isOutOfStock ? 'disabled' : ''} class="flex-1 bg-[#4a1c1d] text-white px-8 py-4 rounded-lg hover:bg-[#b58b4c] transition-colors font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-lg ${isOutOfStock ? 'opacity-50 cursor-not-allowed' : ''}">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                            ${isOutOfStock ? 'Out of Stock' : 'Add to Bag'}
                        </button>
                        
                        <button id="product-page-wishlist-btn" onclick="toggleProductWishlist(${product.id})" class="px-6 py-4 rounded-lg border hover:border-[#4a1c1d] transition-all font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 ${wishlistClass} shadow-sm">
                            <svg class="w-5 h-5" fill="${wishlistFill}" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                            <span>Wishlist</span>
                        </button>
                    </div>

                    <!-- Trust Signals Bar -->
                    <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[10px] text-gray-500 pt-3 border-t border-gray-100">
                        <div class="p-2 rounded bg-gray-50">
                            <span class="block text-base mb-1">🛡️</span>
                            <span class="font-bold text-gray-700">100% Certified</span>
                        </div>
                        <div class="p-2 rounded bg-gray-50">
                            <span class="block text-base mb-1">👑</span>
                            <span class="font-bold text-gray-700">BIS Hallmarked</span>
                        </div>
                        <div class="p-2 rounded bg-gray-50">
                            <span class="block text-base mb-1">🚚</span>
                            <span class="font-bold text-gray-700">Insured Shipping</span>
                        </div>
                        <div class="p-2 rounded bg-gray-50">
                            <span class="block text-base mb-1">🔄</span>
                            <span class="font-bold text-gray-700">Lifetime Exchange</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Comprehensive 10-Point Technical Specifications & Pricing Section -->
        <div id="specifications-section" class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10 mb-16">
            <div class="border-b border-gray-200 mb-8">
                <div class="flex flex-wrap gap-4 md:gap-8 -mb-px">
                    <button onclick="switchTab('pricing-tab')" id="tab-btn-pricing-tab" class="spec-tab-btn active border-b-2 border-[#4a1c1d] text-[#4a1c1d] font-bold pb-3 text-xs md:text-sm uppercase tracking-wider flex items-center gap-2">
                        <svg class="w-4 h-4 text-[#b58b4c]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                        1. Transparent Pricing
                    </button>
                    <button onclick="switchTab('metal-tab')" id="tab-btn-metal-tab" class="spec-tab-btn border-b-2 border-transparent text-gray-500 hover:text-[#4a1c1d] font-bold pb-3 text-xs md:text-sm uppercase tracking-wider flex items-center gap-2">
                        <svg class="w-4 h-4 text-[#b58b4c]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                        2. Metal & Gold Details
                    </button>
                    ${diamond ? `
                        <button onclick="switchTab('diamond-tab')" id="tab-btn-diamond-tab" class="spec-tab-btn border-b-2 border-transparent text-gray-500 hover:text-[#4a1c1d] font-bold pb-3 text-xs md:text-sm uppercase tracking-wider flex items-center gap-2">
                            <svg class="w-4 h-4 text-[#b58b4c]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 3h12l4 6-10 12L2 9l4-6z"></path></svg>
                            3. Diamond Details
                        </button>
                    ` : ''}
                    ${gemstone ? `
                        <button onclick="switchTab('gemstone-tab')" id="tab-btn-gemstone-tab" class="spec-tab-btn border-b-2 border-transparent text-gray-500 hover:text-[#4a1c1d] font-bold pb-3 text-xs md:text-sm uppercase tracking-wider flex items-center gap-2">
                            <svg class="w-4 h-4 text-[#b58b4c]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
                            4. Gemstone Details
                        </button>
                    ` : ''}
                    <button onclick="switchTab('dimensions-tab')" id="tab-btn-dimensions-tab" class="spec-tab-btn border-b-2 border-transparent text-gray-500 hover:text-[#4a1c1d] font-bold pb-3 text-xs md:text-sm uppercase tracking-wider flex items-center gap-2">
                        <svg class="w-4 h-4 text-[#b58b4c]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-2V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path></svg>
                        5. Dimensions & Fit
                    </button>
                    <button onclick="switchTab('certification-tab')" id="tab-btn-certification-tab" class="spec-tab-btn border-b-2 border-transparent text-gray-500 hover:text-[#4a1c1d] font-bold pb-3 text-xs md:text-sm uppercase tracking-wider flex items-center gap-2">
                        <svg class="w-4 h-4 text-[#b58b4c]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                        6. Hallmark & Certificate
                    </button>
                </div>
            </div>

            <!-- Tab Contents -->
            <div id="tab-content-container">
                <!-- Tab 1: Pricing Breakdown -->
                <div id="pricing-tab" class="tab-pane block">
                    <h3 class="font-serif font-bold text-xl text-[#4a1c1d] mb-4">Complete Transparent Pricing Breakdown</h3>
                    <p class="text-xs text-gray-500 mb-6">At Rajwada, we uphold total transparency. Every piece includes exact metal rates, making charges, gemstone costs, and statutory GST.</p>

                    <div class="max-w-2xl border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                        <table class="w-full text-left text-xs md:text-sm">
                            <thead class="bg-gray-50 border-b border-gray-200 text-[#4a1c1d] uppercase font-serif">
                                <tr>
                                    <th class="p-3.5">Component</th>
                                    <th class="p-3.5">Calculation Details</th>
                                    <th class="p-3.5 text-right">Amount (₹)</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-100 text-gray-700">
                                <tr>
                                    <td class="p-3.5 font-semibold text-gray-900">Metal Value (${metal.purity})</td>
                                    <td class="p-3.5 text-xs text-gray-500">${metal.netMetalWeight} Net Weight @ Live Daily Rate</td>
                                    <td class="p-3.5 text-right font-medium">₹${pricing.metalValue.toLocaleString()}</td>
                                </tr>
                                <tr>
                                    <td class="p-3.5 font-semibold text-gray-900">Making Charges</td>
                                    <td class="p-3.5 text-xs text-gray-500">Handcrafting & Artisan Labour (${metal.wastagePercent} Wastage)</td>
                                    <td class="p-3.5 text-right font-medium">₹${pricing.makingCharges.toLocaleString()}</td>
                                </tr>
                                ${pricing.stoneCharges > 0 ? `
                                    <tr>
                                        <td class="p-3.5 font-semibold text-gray-900">Diamond & Gemstone Charges</td>
                                        <td class="p-3.5 text-xs text-gray-500">${diamond ? diamond.totalWeightCT : ''} ${gemstone ? gemstone.stoneType : ''}</td>
                                        <td class="p-3.5 text-right font-medium">₹${pricing.stoneCharges.toLocaleString()}</td>
                                    </tr>
                                ` : ''}
                                <tr>
                                    <td class="p-3.5 font-semibold text-gray-900">Other Charges / Hallmarking Fee</td>
                                    <td class="p-3.5 text-xs text-gray-500">BIS Hallmarking & Insurance</td>
                                    <td class="p-3.5 text-right font-medium">₹${pricing.otherCharges.toLocaleString()}</td>
                                </tr>
                                <tr class="bg-amber-50/50">
                                    <td class="p-3.5 font-semibold text-gray-900">GST (3% Statutory Tax)</td>
                                    <td class="p-3.5 text-xs text-gray-500">Government Goods & Services Tax</td>
                                    <td class="p-3.5 text-right font-medium text-amber-900">₹${pricing.gst.toLocaleString()}</td>
                                </tr>
                                <tr class="bg-[#4a1c1d] text-white font-bold text-base">
                                    <td class="p-4 uppercase font-serif" colspan="2">Final Total Selling Price</td>
                                    <td class="p-4 text-right">₹${pricing.finalPrice.toLocaleString()}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Tab 2: Metal Details -->
                <div id="metal-tab" class="tab-pane hidden">
                    <h3 class="font-serif font-bold text-xl text-[#4a1c1d] mb-4">Metal & Gold Specifications</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm">
                        <div class="flex justify-between p-3.5 bg-gray-50 rounded-lg"><span class="font-bold text-gray-700">Metal Type:</span> <span>${metal.metalType}</span></div>
                        <div class="flex justify-between p-3.5 bg-gray-50 rounded-lg"><span class="font-bold text-gray-700">Purity Grade:</span> <span class="font-bold text-[#b58b4c]">${metal.purity}</span></div>
                        <div class="flex justify-between p-3.5 bg-gray-50 rounded-lg"><span class="font-bold text-gray-700">Metal Colour:</span> <span>${metal.metalColour}</span></div>
                        <div class="flex justify-between p-3.5 bg-gray-50 rounded-lg"><span class="font-bold text-gray-700">Gross Weight:</span> <span>${metal.grossWeight}</span></div>
                        <div class="flex justify-between p-3.5 bg-gray-50 rounded-lg"><span class="font-bold text-gray-700">Net Metal Weight:</span> <span>${metal.netMetalWeight}</span></div>
                        <div class="flex justify-between p-3.5 bg-gray-50 rounded-lg"><span class="font-bold text-gray-700">Making Charges:</span> <span>${metal.makingCharges}</span></div>
                        <div class="flex justify-between p-3.5 bg-gray-50 rounded-lg"><span class="font-bold text-gray-700">Wastage %:</span> <span>${metal.wastagePercent}</span></div>
                        <div class="flex justify-between p-3.5 bg-gray-50 rounded-lg"><span class="font-bold text-gray-700">Hallmark Badge:</span> <span>${metal.hallmark}</span></div>
                        <div class="flex justify-between p-3.5 bg-gray-50 rounded-lg"><span class="font-bold text-gray-700">Unique HUID:</span> <span class="font-mono font-bold">${metal.huid}</span></div>
                        <div class="flex justify-between p-3.5 bg-gray-50 rounded-lg"><span class="font-bold text-gray-700">Certification Authority:</span> <span>${metal.certification}</span></div>
                    </div>
                </div>

                <!-- Tab 3: Diamond Details -->
                ${diamond ? `
                    <div id="diamond-tab" class="tab-pane hidden">
                        <h3 class="font-serif font-bold text-xl text-[#4a1c1d] mb-4">Certified Diamond Specifications</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm">
                            <div class="flex justify-between p-3.5 bg-gray-50 rounded-lg"><span class="font-bold text-gray-700">Diamond Type:</span> <span>${diamond.diamondType}</span></div>
                            <div class="flex justify-between p-3.5 bg-gray-50 rounded-lg"><span class="font-bold text-gray-700">Total Diamond Weight:</span> <span class="font-bold text-[#b58b4c]">${diamond.totalWeightCT}</span></div>
                            <div class="flex justify-between p-3.5 bg-gray-50 rounded-lg"><span class="font-bold text-gray-700">Number of Diamonds:</span> <span>${diamond.numberOfDiamonds} Stones</span></div>
                            <div class="flex justify-between p-3.5 bg-gray-50 rounded-lg"><span class="font-bold text-gray-700">Diamond Shape / Cut:</span> <span>${diamond.diamondShape}</span></div>
                            <div class="flex justify-between p-3.5 bg-gray-50 rounded-lg"><span class="font-bold text-gray-700">Diamond Colour Grade:</span> <span>${diamond.diamondColour}</span></div>
                            <div class="flex justify-between p-3.5 bg-gray-50 rounded-lg"><span class="font-bold text-gray-700">Diamond Clarity Grade:</span> <span>${diamond.diamondClarity}</span></div>
                            <div class="flex justify-between p-3.5 bg-gray-50 rounded-lg"><span class="font-bold text-gray-700">Cut Quality:</span> <span>${diamond.cut}</span></div>
                            <div class="flex justify-between p-3.5 bg-gray-50 rounded-lg"><span class="font-bold text-gray-700">Certificate Agency:</span> <span>${diamond.certification}</span></div>
                            <div class="flex justify-between p-3.5 bg-gray-50 rounded-lg col-span-1 md:col-span-2"><span class="font-bold text-gray-700">Certificate Number:</span> <span class="font-mono font-bold text-indigo-700">${diamond.certificateNumber}</span></div>
                        </div>
                    </div>
                ` : ''}

                <!-- Tab 4: Gemstone Details -->
                ${gemstone ? `
                    <div id="gemstone-tab" class="tab-pane hidden">
                        <h3 class="font-serif font-bold text-xl text-[#4a1c1d] mb-4">Precious Gemstone Details</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm">
                            <div class="flex justify-between p-3.5 bg-gray-50 rounded-lg"><span class="font-bold text-gray-700">Stone Type:</span> <span>${gemstone.stoneType}</span></div>
                            <div class="flex justify-between p-3.5 bg-gray-50 rounded-lg"><span class="font-bold text-gray-700">Origin / Authenticity:</span> <span>${gemstone.naturalOrSynthetic} (${gemstone.origin})</span></div>
                            <div class="flex justify-between p-3.5 bg-gray-50 rounded-lg"><span class="font-bold text-gray-700">Stone Colour:</span> <span>${gemstone.stoneColour}</span></div>
                            <div class="flex justify-between p-3.5 bg-gray-50 rounded-lg"><span class="font-bold text-gray-700">Stone Shape:</span> <span>${gemstone.stoneShape}</span></div>
                            <div class="flex justify-between p-3.5 bg-gray-50 rounded-lg"><span class="font-bold text-gray-700">Stone Count:</span> <span>${gemstone.stoneCount} Stones</span></div>
                            <div class="flex justify-between p-3.5 bg-gray-50 rounded-lg"><span class="font-bold text-gray-700">Total Gemstone Weight:</span> <span class="font-bold text-[#b58b4c]">${gemstone.stoneWeight}</span></div>
                        </div>
                    </div>
                ` : ''}

                <!-- Tab 5: Dimensions -->
                <div id="dimensions-tab" class="tab-pane hidden">
                    <h3 class="font-serif font-bold text-xl text-[#4a1c1d] mb-4">Dimensions & Sizing Guide</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm">
                        <div class="flex justify-between p-3.5 bg-gray-50 rounded-lg"><span class="font-bold text-gray-700">Length:</span> <span>${dims.length || 'N/A'}</span></div>
                        <div class="flex justify-between p-3.5 bg-gray-50 rounded-lg"><span class="font-bold text-gray-700">Width:</span> <span>${dims.width || 'N/A'}</span></div>
                        <div class="flex justify-between p-3.5 bg-gray-50 rounded-lg"><span class="font-bold text-gray-700">Height / Drop:</span> <span>${dims.height || 'N/A'}</span></div>
                        <div class="flex justify-between p-3.5 bg-gray-50 rounded-lg"><span class="font-bold text-gray-700">Thickness:</span> <span>${dims.thickness || 'N/A'}</span></div>
                        <div class="flex justify-between p-3.5 bg-gray-50 rounded-lg"><span class="font-bold text-gray-700">Inner Diameter:</span> <span>${dims.diameter || 'N/A'}</span></div>
                        <div class="flex justify-between p-3.5 bg-gray-50 rounded-lg"><span class="font-bold text-gray-700">Ring / Bangle Size:</span> <span class="font-bold text-[#4a1c1d]">${dims.ringSize !== 'N/A' ? dims.ringSize : (dims.bangleSize !== 'N/A' ? dims.bangleSize : dims.size)}</span></div>
                        <div class="flex justify-between p-3.5 bg-gray-50 rounded-lg col-span-1 md:col-span-2"><span class="font-bold text-gray-700">Size Adjustable:</span> <span class="font-bold text-emerald-700">${dims.sizeAdjustable || 'Yes'}</span></div>
                    </div>
                </div>

                <!-- Tab 6: Hallmark & Certification -->
                <div id="certification-tab" class="tab-pane hidden">
                    <h3 class="font-serif font-bold text-xl text-[#4a1c1d] mb-4">Hallmark & Authenticity Guarantee</h3>
                    <div class="bg-amber-50/60 p-6 rounded-xl border border-amber-200/80 mb-6 flex flex-col md:flex-row items-center gap-6">
                        <div class="w-20 h-20 bg-[#4a1c1d] text-white rounded-full flex items-center justify-center shrink-0 shadow-lg">
                            <span class="font-serif text-2xl font-bold text-[#b58b4c]">BIS</span>
                        </div>
                        <div>
                            <h4 class="font-serif font-bold text-[#4a1c1d] text-lg mb-1">${cert.hallmarked}</h4>
                            <p class="text-xs text-gray-600 mb-2">Authenticated under government hallmark standards with unique HUID registration number.</p>
                            <div class="flex flex-wrap gap-2 text-xs">
                                <span class="bg-white px-3 py-1 rounded border font-mono font-bold text-gray-800">HUID: ${cert.huid}</span>
                                <span class="bg-white px-3 py-1 rounded border font-bold text-[#b58b4c]">Cert: ${cert.certificateNumber}</span>
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm">
                        <div class="flex justify-between p-3.5 bg-gray-50 rounded-lg"><span class="font-bold text-gray-700">Hallmarking Body:</span> <span>${cert.authority}</span></div>
                        <div class="flex justify-between p-3.5 bg-gray-50 rounded-lg"><span class="font-bold text-gray-700">Physical Certificate:</span> <span class="font-bold text-emerald-700">${cert.certificateAvailable}</span></div>
                        <div class="flex justify-between p-3.5 bg-gray-50 rounded-lg"><span class="font-bold text-gray-700">Document Included:</span> <span>${cert.documentUrl}</span></div>
                        <div class="flex justify-between p-3.5 bg-gray-50 rounded-lg"><span class="font-bold text-gray-700">Guarantee:</span> <span>100% Lifetime Buyback & Exchange</span></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Related Products Section (Max 6 Products with Carousel Arrows) -->
        ${relatedProducts.length > 0 ? `
            <div class="mt-16 bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm">
                <div class="flex items-center justify-between mb-6">
                    <div>
                        <span class="text-xs font-bold text-[#b58b4c] uppercase tracking-widest block mb-1">Royal Collections</span>
                        <h3 class="text-2xl md:text-3xl font-serif font-bold text-[#4a1c1d]">You May Also Like</h3>
                    </div>
                    <!-- Navigation Arrows -->
                    <div class="flex items-center gap-2">
                        <button onclick="scrollRelatedProducts(-1)" class="w-10 h-10 rounded-full border border-gray-200 hover:border-[#4a1c1d] hover:bg-[#4a1c1d] hover:text-white transition-all flex items-center justify-center text-gray-600 shadow-sm" title="Previous Products">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                        </button>
                        <button onclick="scrollRelatedProducts(1)" class="w-10 h-10 rounded-full border border-gray-200 hover:border-[#4a1c1d] hover:bg-[#4a1c1d] hover:text-white transition-all flex items-center justify-center text-gray-600 shadow-sm" title="Next Products">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                        </button>
                    </div>
                </div>

                <!-- Carousel Track -->
                <div id="related-products-track" class="flex gap-6 overflow-x-auto scrollbar-hide snap-x scroll-smooth py-2">
                    ${relatedProducts.map(rel => `
                        <div class="w-72 sm:w-80 shrink-0 snap-start bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer" onclick="window.location.href='product.html?id=${rel.id}'">
                            <div class="aspect-square overflow-hidden relative bg-gray-50">
                                <img src="${rel.image}" alt="${rel.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80';">
                                ${rel.badge ? `<span class="absolute top-3 left-3 bg-[#b58b4c] text-white text-[9px] font-bold px-2 py-0.5 uppercase tracking-wider rounded-sm shadow-sm">${rel.badge}</span>` : ''}
                            </div>
                            <div class="p-4 flex flex-col flex-grow text-center">
                                <span class="text-[10px] text-[#b58b4c] uppercase font-bold tracking-widest mb-1">${rel.category}</span>
                                <h4 class="font-serif text-sm text-[#4a1c1d] font-bold mb-1 line-clamp-1">${rel.name}</h4>
                                <p class="text-sm font-bold text-[#4a1c1d] mt-auto">₹${rel.price.toLocaleString()}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        ` : ''}

        <!-- Image Preview Modal -->
        <div id="image-preview-modal" class="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] hidden flex-col items-center justify-center p-4 transition-opacity duration-300 opacity-0" onclick="closeImagePreview(event)">
            <button class="absolute top-6 right-6 text-white hover:text-[#b58b4c] transition-colors z-[110] p-2" onclick="closeImagePreview(event, true)">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <img id="preview-image-el" src="" alt="" class="max-w-full max-h-[90vh] object-contain transform scale-95 transition-transform duration-300 shadow-2xl rounded-lg z-[105]">
        </div>
    `;
}

function updatePageQty(delta) {
    pageQuantity = Math.max(1, pageQuantity + delta);
    const valEl = document.getElementById('page-qty-val');
    if (valEl) valEl.textContent = pageQuantity;
}

function changeMainImage(src) {
    const mainImg = document.getElementById('main-product-img');
    if (mainImg) mainImg.src = src;
}

function switchTab(tabId) {
    // Hide all panes
    const panes = document.querySelectorAll('.tab-pane');
    panes.forEach(pane => {
        pane.classList.add('hidden');
        pane.classList.remove('block');
    });

    // Show active pane
    const activePane = document.getElementById(tabId);
    if (activePane) {
        activePane.classList.remove('hidden');
        activePane.classList.add('block');
    }

    // Reset buttons
    const btns = document.querySelectorAll('.spec-tab-btn');
    btns.forEach(btn => {
        btn.classList.remove('border-[#4a1c1d]', 'text-[#4a1c1d]');
        btn.classList.add('border-transparent', 'text-gray-500');
    });

    // Highlight active button
    const activeBtn = document.getElementById(`tab-btn-${tabId}`);
    if (activeBtn) {
        activeBtn.classList.remove('border-transparent', 'text-gray-500');
        activeBtn.classList.add('border-[#4a1c1d]', 'text-[#4a1c1d]');
    }
}

function toggleProductWishlist(id) {
    if (window.wishlist) {
        window.wishlist.toggleItem(id);
        const isWishlisted = window.wishlist.isInWishlist(id);
        const btn = document.getElementById('product-page-wishlist-btn');
        if (btn) {
            const svg = btn.querySelector('svg');
            if (isWishlisted) {
                if (svg) svg.setAttribute('fill', 'currentColor');
                btn.classList.add('text-[#4a1c1d]', 'bg-gray-50', 'border-[#4a1c1d]');
                btn.classList.remove('text-gray-400', 'bg-white', 'border-gray-200');
            } else {
                if (svg) svg.setAttribute('fill', 'none');
                btn.classList.remove('text-[#4a1c1d]', 'bg-gray-50', 'border-[#4a1c1d]');
                btn.classList.add('text-gray-400', 'bg-white', 'border-gray-200');
            }
        }
    }
}

function openImagePreview(src, alt) {
    const modal = document.getElementById('image-preview-modal');
    const img = document.getElementById('preview-image-el');
    if (modal && img) {
        img.src = src;
        img.alt = alt;
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        void modal.offsetWidth;
        modal.classList.remove('opacity-0');
        img.classList.remove('scale-95');
        img.classList.add('scale-100');
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleEscKey);
    }
}

function closeImagePreview(e, force = false) {
    if (!force && e && e.target.id === 'preview-image-el') return;
    const modal = document.getElementById('image-preview-modal');
    const img = document.getElementById('preview-image-el');
    if (modal && img) {
        modal.classList.add('opacity-0');
        img.classList.remove('scale-100');
        img.classList.add('scale-95');
        document.body.style.overflow = '';
        setTimeout(() => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }, 300);
        window.removeEventListener('keydown', handleEscKey);
    }
}

function handleEscKey(e) {
    if (e.key === 'Escape') {
        closeImagePreview(null, true);
    }
}

function scrollRelatedProducts(direction) {
    const track = document.getElementById('related-products-track');
    if (track) {
        track.scrollBy({ left: direction * 320, behavior: 'smooth' });
    }
}
