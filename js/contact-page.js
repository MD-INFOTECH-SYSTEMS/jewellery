document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('contact-container');
    if (container) {
        renderContactPage();
    }
    
    // Mount Global Floating Concierge Button & Modal on all pages
    mountGlobalContactPopup();
});

// Store Dataset with exact address, phone, manager, timings, map embed, and MULTIPLE STORE IMAGES
const STORES_DATA = [
    {
        id: 'jaipur',
        city: 'Jaipur',
        name: 'Jaipur Flagship Palace',
        tagline: 'Global Headquarters & Heritage Studio',
        address: 'Rajwada Palace, 123 Johari Bazaar, Pink City, Jaipur, Rajasthan - 302003',
        phone: '+91 141 2345 678',
        phoneAlt: '+91 98765 43210',
        email: 'jaipur@rajwada.com',
        manager: 'Mr. Vikramaditya Singh',
        timings: 'Monday – Sunday: 10:30 AM – 8:30 PM (Open All Days)',
        services: ['Private Bridal Suite', 'Valet Parking', 'Live Kundan Artisans', 'Certified Solitaire Vault'],
        mapEmbed: 'https://maps.google.com/maps?q=Johari%20Bazar%2C%20Jaipur%2C%20Rajasthan&t=&z=15&ie=UTF8&iwloc=&output=embed',
        directionsUrl: 'https://maps.google.com/?q=Johari+Bazar+Jaipur+Rajasthan',
        images: [
            { url: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1000&q=80', caption: 'Palace Exterior Facade' },
            { url: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1000&q=80', caption: 'Royal Bridal Suite' },
            { url: 'https://images.unsplash.com/photo-1605100804763-247f67b8548e?auto=format&fit=crop&w=1000&q=80', caption: 'Private VIP Consultation Lounge' },
            { url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80', caption: 'Kundan Crafting & Valuation Vault' }
        ]
    },
    {
        id: 'mumbai',
        city: 'Mumbai',
        name: 'Mumbai Bandra Royal Pavilion',
        tagline: 'Solitaire Diamond Lounge & Celebrity Studio',
        address: '45 Turner Road, Near Waterfield Road, Bandra West, Mumbai, Maharashtra - 400050',
        phone: '+91 22 2640 9988',
        phoneAlt: '+91 98765 43211',
        email: 'mumbai@rajwada.com',
        manager: 'Ms. Radhika Merchant',
        timings: 'Monday – Sunday: 11:00 AM – 9:00 PM (Open All Days)',
        services: ['Bespoke Solitaire Lounge', 'Valet Parking', 'Custom Engagement Studio', 'Celebrity Stylist Consultation'],
        mapEmbed: 'https://maps.google.com/maps?q=Turner%20Road%20Bandra%20West%20Mumbai&t=&z=15&ie=UTF8&iwloc=&output=embed',
        directionsUrl: 'https://maps.google.com/?q=Turner+Road+Bandra+West+Mumbai',
        images: [
            { url: 'https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?auto=format&fit=crop&w=1000&q=80', caption: 'Bandra Storefront Entrance' },
            { url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80', caption: 'Solitaire Diamond Gallery' },
            { url: 'https://images.unsplash.com/photo-1599643478524-fb66f70a00ef?auto=format&fit=crop&w=1000&q=80', caption: 'Private Consultation Room' },
            { url: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=1000&q=80', caption: 'Celebrity Styling Lounge' }
        ]
    },
    {
        id: 'delhi',
        city: 'New Delhi',
        name: 'New Delhi South Extension Mansion',
        tagline: 'Bridal Trousseau & Heritage Gold Hub',
        address: 'D-14 South Extension Part II, Ring Road, New Delhi - 110049',
        phone: '+91 11 4164 5566',
        phoneAlt: '+91 98765 43212',
        email: 'delhi@rajwada.com',
        manager: 'Mr. Harshvardhan Rathore',
        timings: 'Monday – Sunday: 10:30 AM – 8:30 PM (Open All Days)',
        services: ['Bridal Trousseau Suite', 'BIS Hallmark Verification Hub', 'Kundan Gallery', 'Private VIP Lounge'],
        mapEmbed: 'https://maps.google.com/maps?q=South%20Extension%20II%2C%20New%20Delhi&t=&z=15&ie=UTF8&iwloc=&output=embed',
        directionsUrl: 'https://maps.google.com/?q=South+Extension+II+New+Delhi',
        images: [
            { url: 'https://images.unsplash.com/photo-1518893494013-481c1d8ed3fd?auto=format&fit=crop&w=1000&q=80', caption: 'South Ext. Mansion Facade' },
            { url: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1000&q=80', caption: 'Heritage Gold Showcase' },
            { url: 'https://images.unsplash.com/photo-1605100804763-247f67b8548e?auto=format&fit=crop&w=1000&q=80', caption: 'Bridal Trousseau Suite' },
            { url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80', caption: 'BIS Hallmark Testing Desk' }
        ]
    },
    {
        id: 'bengaluru',
        city: 'Bengaluru',
        name: 'Bengaluru Lavelle Road Galleria',
        tagline: 'Temple Jewellery & Platinum Studio',
        address: '88 Lavelle Road, Near UB City, Shantala Nagar, Bengaluru, Karnataka - 560001',
        phone: '+91 80 4112 3344',
        phoneAlt: '+91 98765 43213',
        email: 'bengaluru@rajwada.com',
        manager: 'Ms. Ananya Hegde',
        timings: 'Monday – Sunday: 10:30 AM – 8:30 PM (Open All Days)',
        services: ['Heritage Temple Jewellery Suite', 'Platinum Design Studio', 'Private Parking', 'Valuation Desk'],
        mapEmbed: 'https://maps.google.com/maps?q=Lavelle%20Road%20Bengaluru&t=&z=15&ie=UTF8&iwloc=&output=embed',
        directionsUrl: 'https://maps.google.com/?q=Lavelle+Road+Bengaluru',
        images: [
            { url: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1000&q=80', caption: 'Lavelle Galleria Storefront' },
            { url: 'https://images.unsplash.com/photo-1599643478524-fb66f70a00ef?auto=format&fit=crop&w=1000&q=80', caption: 'Temple Jewellery Lounge' },
            { url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80', caption: 'Platinum Design Corner' },
            { url: 'https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?auto=format&fit=crop&w=1000&q=80', caption: 'Private Valuation Lounge' }
        ]
    }
];

let activeStoreId = 'jaipur';
let activeMainImageIndex = 0;

function renderContactPage() {
    const container = document.getElementById('contact-container');
    if (!container) return;

    const activeStore = STORES_DATA.find(s => s.id === activeStoreId) || STORES_DATA[0];
    const currentImages = activeStore.images || [];
    const activeImage = currentImages[activeMainImageIndex] || currentImages[0] || { url: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1000&q=80', caption: 'Showroom Facade' };

    container.innerHTML = `
        <!-- Contact Page Hero -->
        <div class="text-center mb-10">
            <span class="text-xs font-bold text-[#b58b4c] uppercase tracking-[0.3em] block mb-2">Rajwada Store Locations & Interior Gallery</span>
            <h1 class="text-4xl md:text-5xl font-serif text-[#4a1c1d] font-bold uppercase tracking-wider mb-3">Our Flagship Showrooms</h1>
            <p class="text-gray-600 max-w-3xl mx-auto text-sm font-light leading-relaxed">
                Experience royal Indian hospitality. Browse real interior & exterior photos of our 4 flagship stores across India, get live directions, or schedule a private consultation.
            </p>
        </div>

        <!-- Store Selector City Tabs -->
        <div class="flex items-center justify-center gap-3 overflow-x-auto pb-4 mb-8 scrollbar-hide">
            ${STORES_DATA.map(store => `
                <button onclick="selectStore('${store.id}')" class="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shrink-0 flex items-center gap-2 ${store.id === activeStoreId ? 'bg-[#4a1c1d] text-white shadow-lg scale-105' : 'bg-white text-gray-700 hover:bg-amber-50 hover:text-[#4a1c1d] border border-gray-200'}">
                    <span>👑</span>
                    <span>${store.city} Store</span>
                </button>
            `).join('')}
        </div>

        <!-- Active Store Showcase: Photo Gallery + Details + Google Maps -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10 mb-16">
            
            <!-- Store Section Title -->
            <div class="flex flex-wrap items-center justify-between gap-4 mb-8 border-b border-gray-100 pb-4">
                <div>
                    <div class="flex items-center gap-2 mb-1">
                        <span class="bg-[#b58b4c] text-white text-[10px] font-bold px-3 py-1 uppercase tracking-wider rounded-sm">${activeStore.city} Flagship</span>
                        <span class="bg-amber-50 text-[#b58b4c] text-[10px] font-bold px-3 py-1 uppercase tracking-wider rounded-sm border border-amber-200">Open Daily</span>
                    </div>
                    <h2 class="text-3xl font-serif font-bold text-[#4a1c1d]">${activeStore.name}</h2>
                    <p class="text-xs text-[#b58b4c] font-bold uppercase tracking-widest">${activeStore.tagline}</p>
                </div>
                <a href="${activeStore.directionsUrl}" target="_blank" class="bg-[#4a1c1d] hover:bg-[#b58b4c] text-white px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shadow-md flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    Google Maps Directions
                </a>
            </div>

            <!-- Store Photo Showcase Gallery Row -->
            <div class="mb-10">
                <div class="flex justify-between items-center mb-3">
                    <span class="text-xs font-bold text-[#4a1c1d] uppercase tracking-wider flex items-center gap-1.5">
                        <span>🖼️</span> Showroom Photo Gallery & Architecture
                    </span>
                    <span class="text-[11px] text-gray-400">Click any photo to switch view or expand</span>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    <!-- Main Store Image Viewer -->
                    <div class="lg:col-span-8 relative group cursor-pointer rounded-2xl overflow-hidden shadow-sm border border-gray-200 aspect-[16/9] bg-gray-100 flex items-center justify-center" onclick="openStoreImageLightbox('${activeImage.url}', '${activeImage.caption}')">
                        <img id="store-main-photo" src="${activeImage.url}" alt="${activeImage.caption}" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1000&q=80';">
                        
                        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-5">
                            <div class="text-white flex justify-between items-end w-full">
                                <div>
                                    <span class="bg-[#b58b4c] text-white text-[9px] font-bold px-2 py-0.5 uppercase tracking-wider rounded mb-1 inline-block">Featured View</span>
                                    <h4 id="store-photo-caption" class="font-serif font-bold text-lg leading-tight text-white">${activeImage.caption}</h4>
                                </div>
                                <span class="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold hover:bg-white hover:text-[#4a1c1d] transition-colors flex items-center gap-1">
                                    🔍 Expand Full View
                                </span>
                            </div>
                        </div>
                    </div>

                    <!-- 4 Thumbnail Selection Strip -->
                    <div class="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-3">
                        ${currentImages.map((img, idx) => `
                            <button onclick="switchStoreMainPhoto(${idx})" class="group relative rounded-xl overflow-hidden border-2 ${idx === activeMainImageIndex ? 'border-[#4a1c1d] ring-2 ring-[#b58b4c]' : 'border-gray-200 hover:border-[#b58b4c]'} transition-all text-left aspect-[16/9] lg:aspect-auto lg:h-[95px] bg-gray-50">
                                <img src="${img.url}" alt="${img.caption}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=600&q=80';">
                                <div class="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-end p-2">
                                    <span class="text-[10px] font-bold text-white line-clamp-1 drop-shadow-md">${img.caption}</span>
                                </div>
                            </button>
                        `).join('')}
                    </div>
                </div>
            </div>

            <!-- Details & Google Map Row -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-8 border-t border-gray-100">
                
                <!-- Left Details Column -->
                <div class="lg:col-span-6 flex flex-col justify-between">
                    <div>
                        <!-- Store Spec Details Grid -->
                        <div class="space-y-4 text-xs md:text-sm text-gray-700 mb-8 bg-amber-50/40 p-5 rounded-xl border border-amber-100/70">
                            <div class="flex items-start gap-3">
                                <span class="text-lg">📍</span>
                                <div>
                                    <strong class="text-gray-900 block font-serif">Showroom Address:</strong>
                                    <span class="text-gray-600 leading-relaxed">${activeStore.address}</span>
                                </div>
                            </div>

                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-amber-100">
                                <div class="flex items-center gap-3">
                                    <span class="text-lg">📞</span>
                                    <div>
                                        <strong class="text-gray-900 block text-[11px] uppercase tracking-wider">Phone Lines:</strong>
                                        <a href="tel:${activeStore.phone.replace(/\s+/g, '')}" class="text-[#b58b4c] font-bold hover:underline">${activeStore.phone}</a>
                                        <div class="text-[10px] text-gray-500">${activeStore.phoneAlt}</div>
                                    </div>
                                </div>
                                <div class="flex items-center gap-3">
                                    <span class="text-lg">✉️</span>
                                    <div>
                                        <strong class="text-gray-900 block text-[11px] uppercase tracking-wider">Showroom Email:</strong>
                                        <a href="mailto:${activeStore.email}" class="text-[#b58b4c] font-bold hover:underline">${activeStore.email}</a>
                                    </div>
                                </div>
                            </div>

                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-amber-100">
                                <div class="flex items-center gap-3">
                                    <span class="text-lg">⏰</span>
                                    <div>
                                        <strong class="text-gray-900 block text-[11px] uppercase tracking-wider">Showroom Hours:</strong>
                                        <span class="text-gray-600 text-xs">${activeStore.timings}</span>
                                    </div>
                                </div>
                                <div class="flex items-center gap-3">
                                    <span class="text-lg">👤</span>
                                    <div>
                                        <strong class="text-gray-900 block text-[11px] uppercase tracking-wider">Store Manager:</strong>
                                        <span class="text-gray-800 font-bold text-xs">${activeStore.manager}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Store Services Badges -->
                        <div class="mb-6">
                            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Showroom Amenities & Services</span>
                            <div class="flex flex-wrap gap-2">
                                ${activeStore.services.map(srv => `
                                    <span class="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold shadow-2xs">
                                        <span class="text-[#b58b4c]">✓</span> ${srv}
                                    </span>
                                `).join('')}
                            </div>
                        </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="flex flex-wrap gap-3 pt-4 border-t border-gray-100">
                        <button onclick="openGlobalConciergeModal('${activeStore.name}')" class="flex-1 bg-[#4a1c1d] text-white py-3 px-6 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#b58b4c] transition-colors shadow-md flex items-center justify-center gap-2">
                            <span>👑 Schedule Private Lounge Visit</span>
                        </button>
                    </div>
                </div>

                <!-- Right Integrated Google Map Column -->
                <div class="lg:col-span-6 h-full min-h-[380px] md:min-h-[420px] rounded-2xl overflow-hidden border border-gray-200 shadow-md relative bg-gray-100">
                    <iframe 
                        id="store-google-map-iframe"
                        src="${activeStore.mapEmbed}"
                        class="w-full h-full min-h-[380px] md:min-h-[420px] border-0" 
                        allowfullscreen="" 
                        loading="lazy" 
                        referrerpolicy="no-referrer-when-downgrade">
                    </iframe>
                    <div class="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-gray-200 shadow-lg text-[10px] font-bold text-gray-700 flex items-center gap-1.5">
                        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                        <span>Interactive Google Maps Location</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Flagship Showrooms Overview Grid (All 4 Stores with Photo Cards) -->
        <div class="mb-16">
            <div class="text-center mb-8">
                <span class="text-xs font-bold text-[#b58b4c] uppercase tracking-widest block">Nationwide Royal Presence</span>
                <h3 class="text-2xl md:text-3xl font-serif font-bold text-[#4a1c1d] mt-1">Explore All Flagship Showrooms</h3>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                ${STORES_DATA.map(store => {
                    const primaryImg = store.images[0] ? store.images[0].url : 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=600&q=80';
                    const thumbImgs = store.images.slice(1, 4);

                    return `
                        <div class="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group ${store.id === activeStoreId ? 'ring-2 ring-[#b58b4c]' : ''}">
                            <div>
                                <!-- Store Image Header -->
                                <div class="aspect-[16/10] relative overflow-hidden bg-gray-100 cursor-pointer" onclick="selectStore('${store.id}')">
                                    <img src="${primaryImg}" alt="${store.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=600&q=80';">
                                    <span class="absolute top-3 left-3 bg-[#b58b4c] text-white text-[9px] font-bold px-2.5 py-1 uppercase tracking-wider rounded-md shadow-md">${store.city}</span>
                                    
                                    <!-- Photo count badge -->
                                    <span class="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                                        📷 ${store.images.length} Photos
                                    </span>
                                </div>

                                <!-- Mini 3-Photo Preview Strip -->
                                <div class="grid grid-cols-3 gap-1 p-1.5 bg-gray-50 border-b border-gray-100">
                                    ${thumbImgs.map(t => `
                                        <div class="aspect-square rounded overflow-hidden cursor-pointer" onclick="selectStore('${store.id}')">
                                            <img src="${t.url}" alt="${t.caption}" class="w-full h-full object-cover hover:opacity-80 transition-opacity" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=300&q=80';">
                                        </div>
                                    `).join('')}
                                </div>

                                <!-- Info Content -->
                                <div class="p-5">
                                    <h4 class="font-serif font-bold text-base text-[#4a1c1d] mb-1.5 hover:text-[#b58b4c] transition-colors cursor-pointer" onclick="selectStore('${store.id}')">${store.name}</h4>
                                    <p class="text-xs text-gray-500 mb-4 line-clamp-2 leading-relaxed">${store.address}</p>
                                    
                                    <div class="space-y-1.5 text-xs text-gray-600 border-t border-gray-50 pt-3">
                                        <div><strong class="text-gray-800">Phone:</strong> ${store.phone}</div>
                                        <div><strong class="text-gray-800">Hours:</strong> ${store.timings.split('(')[0]}</div>
                                        <div><strong class="text-gray-800">Manager:</strong> ${store.manager}</div>
                                    </div>
                                </div>
                            </div>

                            <div class="p-5 pt-0 space-y-2">
                                <button onclick="selectStore('${store.id}')" class="w-full bg-[#4a1c1d] text-white py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#b58b4c] transition-colors shadow-sm">
                                    View Store Gallery & Map
                                </button>
                                <a href="${store.directionsUrl}" target="_blank" class="w-full text-center block text-[11px] text-[#b58b4c] font-bold uppercase tracking-wider hover:underline py-1">
                                    Open Google Maps &rarr;
                                </a>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>

        <!-- Main On-Page Contact Form -->
        <div class="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 mb-16">
            <div class="text-center mb-8">
                <span class="text-xs font-bold text-[#b58b4c] uppercase tracking-widest block mb-1">Direct Royal Concierge</span>
                <h3 class="text-3xl font-serif font-bold text-[#4a1c1d] mb-2">Send Us a Direct Inquiry</h3>
                <p class="text-xs text-gray-500 max-w-lg mx-auto">Have a query regarding bespoke bridal jewellery, solitaire customization, or a showroom visit? Fill in your details below and our concierge team will respond within 2 hours.</p>
            </div>

            <form id="contact-us-form" class="space-y-6" novalidate>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Full Name *</label>
                        <input type="text" id="contact-name" class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#4a1c1d] focus:ring-0 text-xs bg-gray-50 focus:bg-white transition-colors" placeholder="e.g. Princess Aditi Singh" required>
                        <span class="text-red-500 text-[10px] hidden mt-1" id="err-name">Please enter your full name.</span>
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Email Address *</label>
                        <input type="email" id="contact-email" class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#4a1c1d] focus:ring-0 text-xs bg-gray-50 focus:bg-white transition-colors" placeholder="aditi@example.com" required>
                        <span class="text-red-500 text-[10px] hidden mt-1" id="err-email">Please enter a valid email address.</span>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Phone Number *</label>
                        <input type="tel" id="contact-phone" class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#4a1c1d] focus:ring-0 text-xs bg-gray-50 focus:bg-white transition-colors" placeholder="+91 98765 43210" required>
                        <span class="text-red-500 text-[10px] hidden mt-1" id="err-phone">Please enter a valid phone number.</span>
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Preferred Showroom Location</label>
                        <select id="contact-showroom" class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#4a1c1d] focus:ring-0 text-xs bg-gray-50 focus:bg-white transition-colors">
                            ${STORES_DATA.map(s => `<option value="${s.name}" ${s.id === activeStoreId ? 'selected' : ''}>${s.name}</option>`).join('')}
                            <option value="Online Video Consultation">Online Video Consultation</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label class="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Message or Specific Inquiry *</label>
                    <textarea id="contact-message" rows="4" class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#4a1c1d] focus:ring-0 text-xs bg-gray-50 focus:bg-white transition-colors resize-none" placeholder="Describe the jewellery piece, bridal requirement, or appointment request..." required></textarea>
                    <span class="text-red-500 text-[10px] hidden mt-1" id="err-message">Message must be at least 10 characters long.</span>
                </div>

                <button type="submit" class="w-full bg-[#4a1c1d] text-white px-8 py-3.5 rounded-lg hover:bg-[#b58b4c] transition-colors font-bold uppercase tracking-wider text-xs shadow-md">
                    Submit Concierge Request
                </button>
            </form>
        </div>

        <!-- Store Photo Lightbox Modal -->
        <div id="store-image-lightbox" class="fixed inset-0 bg-black/85 backdrop-blur-md z-[130] hidden flex-col items-center justify-center p-4 transition-opacity duration-300 opacity-0" onclick="closeStoreImageLightbox(event)">
            <button class="absolute top-6 right-6 text-white hover:text-[#b58b4c] transition-colors z-[140] p-2" onclick="closeStoreImageLightbox(event, true)">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <div class="max-w-5xl w-full text-center">
                <img id="lightbox-image-el" src="" alt="" class="max-w-full max-h-[80vh] object-contain mx-auto shadow-2xl rounded-xl border border-gray-700 mb-3">
                <p id="lightbox-caption-el" class="text-white font-serif text-lg font-bold drop-shadow-md"></p>
            </div>
        </div>
    `;

    bindFormValidation();
}

function switchStoreMainPhoto(index) {
    activeMainImageIndex = index;
    const activeStore = STORES_DATA.find(s => s.id === activeStoreId) || STORES_DATA[0];
    const currentImages = activeStore.images || [];
    const targetImg = currentImages[index];

    if (targetImg) {
        const mainPhotoEl = document.getElementById('store-main-photo');
        const captionEl = document.getElementById('store-photo-caption');
        if (mainPhotoEl) mainPhotoEl.src = targetImg.url;
        if (captionEl) captionEl.textContent = targetImg.caption;
        
        // Re-render to update active thumbnail styling
        renderContactPage();
    }
}

function selectStore(storeId) {
    activeStoreId = storeId;
    activeMainImageIndex = 0;
    renderContactPage();
    
    // Smooth scroll to store detail area
    const container = document.getElementById('contact-container');
    if (container) {
        window.scrollTo({ top: container.offsetTop - 80, behavior: 'smooth' });
    }
}

function openStoreImageLightbox(src, caption) {
    const modal = document.getElementById('store-image-lightbox');
    const img = document.getElementById('lightbox-image-el');
    const cap = document.getElementById('lightbox-caption-el');
    if (modal && img) {
        img.src = src;
        if (cap) cap.textContent = caption;
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        setTimeout(() => modal.classList.remove('opacity-0'), 10);
        document.body.style.overflow = 'hidden';
    }
}

function closeStoreImageLightbox(e, force = false) {
    if (!force && e && e.target.id === 'lightbox-image-el') return;
    const modal = document.getElementById('store-image-lightbox');
    if (modal) {
        modal.classList.add('opacity-0');
        document.body.style.overflow = '';
        setTimeout(() => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }, 300);
    }
}

function bindFormValidation() {
    const form = document.getElementById('contact-us-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        const name = document.getElementById('contact-name').value.trim();
        const email = document.getElementById('contact-email').value.trim();
        const phone = document.getElementById('contact-phone').value.trim();
        const msg = document.getElementById('contact-message').value.trim();

        if (!name) { showError('name'); isValid = false; } else { hideError('name'); }
        if (!email || !email.includes('@')) { showError('email'); isValid = false; } else { hideError('email'); }
        if (!phone || phone.length < 8) { showError('phone'); isValid = false; } else { hideError('phone'); }
        if (!msg || msg.length < 10) { showError('message'); isValid = false; } else { hideError('message'); }

        if (isValid) {
            form.reset();
            openConciergeConfirmationModal(name);
        }
    });
}

function showError(field) {
    const err = document.getElementById('err-' + field);
    const input = document.getElementById('contact-' + field);
    if (err) err.classList.remove('hidden');
    if (input) input.classList.add('border-red-500');
}

function hideError(field) {
    const err = document.getElementById('err-' + field);
    const input = document.getElementById('contact-' + field);
    if (err) err.classList.add('hidden');
    if (input) input.classList.remove('border-red-500');
}

// -------------------------------------------------------------
// Global Floating Contact Us / Concierge Popup Component
// -------------------------------------------------------------
function mountGlobalContactPopup() {
    if (document.getElementById('global-concierge-modal')) return;

    // Insert Floating Trigger Button
    const btnContainer = document.createElement('div');
    btnContainer.className = 'fixed bottom-6 right-6 z-50';
    btnContainer.innerHTML = `
        <button onclick="openGlobalConciergeModal('General Inquiry')" class="bg-[#4a1c1d] hover:bg-[#b58b4c] text-white px-5 py-3.5 rounded-full shadow-2xl transition-all duration-300 flex items-center gap-2.5 group transform hover:scale-105 border border-amber-300/40">
            <span class="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></span>
            <svg class="w-5 h-5 text-[#b58b4c] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
            <span class="text-xs font-bold uppercase tracking-wider">Contact Concierge</span>
        </button>
    `;
    document.body.appendChild(btnContainer);

    // Insert Global Modal Dialog
    const modalContainer = document.createElement('div');
    modalContainer.id = 'global-concierge-modal';
    modalContainer.className = 'fixed inset-0 bg-black/60 backdrop-blur-md z-[110] hidden items-center justify-center p-4 transition-opacity duration-300 opacity-0';
    modalContainer.onclick = (e) => {
        if (e.target.id === 'global-concierge-modal') closeGlobalConciergeModal();
    };

    modalContainer.innerHTML = `
        <div class="bg-white max-w-lg w-full rounded-2xl shadow-2xl relative overflow-hidden transform scale-95 transition-all duration-300 border border-amber-100">
            <!-- Modal Header -->
            <div class="bg-[#4a1c1d] text-white p-6 relative">
                <button onclick="closeGlobalConciergeModal()" class="absolute top-4 right-4 text-white/80 hover:text-white p-1">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
                <div class="flex items-center gap-2 mb-1">
                    <span class="text-[#b58b4c] text-lg">👑</span>
                    <span class="text-[10px] text-[#b58b4c] font-bold uppercase tracking-widest">Rajwada Royal VIP Concierge</span>
                </div>
                <h3 id="concierge-modal-title" class="text-2xl font-serif font-bold text-white">Book Private Consultation</h3>
                <p class="text-xs text-amber-100/80 font-light mt-1">Connect with our jewellery master or schedule a showroom visit.</p>
            </div>

            <!-- Quick Communication Pills -->
            <div class="p-6 bg-gray-50 border-b border-gray-100 grid grid-cols-2 gap-3">
                <a href="https://wa.me/919876543210?text=Hello%20Rajwada,%20I%20want%20to%20book%20a%20consultation." target="_blank" class="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shadow-sm">
                    <span>💬 WhatsApp Us</span>
                </a>
                <a href="tel:+919876543210" class="flex items-center justify-center gap-2 bg-[#b58b4c] hover:bg-[#4a1c1d] text-white py-2.5 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shadow-sm">
                    <span>📞 Call Concierge</span>
                </a>
            </div>

            <!-- Inquiry Form -->
            <form id="global-concierge-form" onsubmit="handleGlobalConciergeSubmit(event)" class="p-6 space-y-4">
                <div>
                    <label class="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">Your Full Name *</label>
                    <input type="text" id="g-concierge-name" class="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-xs focus:border-[#4a1c1d] focus:ring-0 bg-gray-50 focus:bg-white" placeholder="e.g. Princess Aditi" required>
                </div>

                <div class="grid grid-cols-2 gap-3">
                    <div>
                        <label class="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">Phone Number *</label>
                        <input type="tel" id="g-concierge-phone" class="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-xs focus:border-[#4a1c1d] focus:ring-0 bg-gray-50 focus:bg-white" placeholder="+91 98765 43210" required>
                    </div>
                    <div>
                        <label class="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">Service Required</label>
                        <select id="g-concierge-service" class="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-xs focus:border-[#4a1c1d] focus:ring-0 bg-gray-50 focus:bg-white">
                            <option value="Bridal Consultation">Bridal Consultation</option>
                            <option value="Showroom Appointment">Showroom Visit</option>
                            <option value="Custom Bespoke Design">Custom Design</option>
                            <option value="Price & Diamond Inquiry">Diamond Inquiry</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label class="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">Inquiry / Note</label>
                    <textarea id="g-concierge-note" rows="2" class="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-xs focus:border-[#4a1c1d] focus:ring-0 bg-gray-50 focus:bg-white resize-none" placeholder="Preferred date, time, or jewellery details..."></textarea>
                </div>

                <button type="submit" class="w-full bg-[#4a1c1d] text-white py-3 rounded-lg font-bold uppercase tracking-wider text-xs hover:bg-[#b58b4c] transition-colors shadow-md">
                    Confirm Concierge Booking
                </button>
            </form>
        </div>
    `;

    document.body.appendChild(modalContainer);
}

function openGlobalConciergeModal(subject = 'General Inquiry') {
    mountGlobalContactPopup();
    const modal = document.getElementById('global-concierge-modal');
    const title = document.getElementById('concierge-modal-title');
    if (modal) {
        if (title) title.textContent = `Concierge: ${subject}`;
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            modal.querySelector('div').classList.remove('scale-95');
        }, 10);
        document.body.style.overflow = 'hidden';
    }
}

function closeGlobalConciergeModal() {
    const modal = document.getElementById('global-concierge-modal');
    if (modal) {
        modal.classList.add('opacity-0');
        modal.querySelector('div').classList.add('scale-95');
        document.body.style.overflow = '';
        setTimeout(() => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }, 300);
    }
}

function handleGlobalConciergeSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('g-concierge-name').value.trim();
    closeGlobalConciergeModal();
    openConciergeConfirmationModal(name);
}

function openConciergeConfirmationModal(name, detail = '') {
    const refNo = 'APT-2026-' + Math.floor(1000 + Math.random() * 9000);
    
    // Create temporary confirmation popup
    const popup = document.createElement('div');
    popup.className = 'fixed inset-0 bg-black/70 backdrop-blur-md z-[150] flex items-center justify-center p-4';
    popup.innerHTML = `
        <div class="bg-white max-w-md w-full rounded-2xl p-6 md:p-8 text-center shadow-2xl border border-amber-200">
            <div class="w-16 h-16 bg-amber-50 text-[#b58b4c] rounded-full flex items-center justify-center mx-auto mb-4 text-3xl shadow-sm">
                👑
            </div>
            <h3 class="font-serif font-bold text-2xl text-[#4a1c1d] mb-1">VIP Appointment Confirmed!</h3>
            <p class="text-xs text-gray-500 mb-4">Thank you, <strong class="text-gray-800">${name || 'Valued Guest'}</strong>. Your private consultation request has been registered in our concierge registry.</p>
            
            <div class="bg-amber-50/60 p-4 rounded-xl mb-6 border border-amber-200/70 text-xs text-left space-y-1.5">
                <div class="flex justify-between"><span class="text-gray-500">Booking Ref:</span> <span class="font-mono font-bold text-[#4a1c1d]">${refNo}</span></div>
                <div class="flex justify-between"><span class="text-gray-500">Concierge Status:</span> <span class="font-bold text-emerald-700">VIP Scheduled</span></div>
                ${detail ? `<div class="pt-2 border-t border-amber-200/60 text-gray-700 text-[11px]"><strong>Details:</strong> ${detail}</div>` : ''}
            </div>

            <button onclick="this.closest('.fixed').remove()" class="w-full bg-[#4a1c1d] text-white py-3 rounded-lg font-bold uppercase tracking-wider text-xs hover:bg-[#b58b4c] transition-colors shadow-md">
                Done
            </button>
        </div>
    `;
    document.body.appendChild(popup);
}

// -------------------------------------------------------------
// Split-Screen Appointment Modal (Image & Tagline Left | Form Right)
// -------------------------------------------------------------
function openAppointmentModal(service = 'Bespoke Bridal Consultation') {
    let modal = document.getElementById('appointment-booking-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'appointment-booking-modal';
        modal.className = 'fixed inset-0 bg-black/75 backdrop-blur-md z-[130] hidden items-center justify-center p-4 transition-opacity duration-300 opacity-0';
        modal.onclick = (e) => {
            if (e.target.id === 'appointment-booking-modal') closeAppointmentModal();
        };

        modal.innerHTML = `
            <div class="bg-white max-w-4xl w-full rounded-2xl shadow-2xl relative overflow-hidden transform scale-95 transition-all duration-300 grid grid-cols-1 md:grid-cols-12 border border-amber-200 max-h-[90vh] overflow-y-auto">
                <!-- Left 5 Cols: Luxury Image + Tagline & Highlights -->
                <div class="md:col-span-5 relative overflow-hidden bg-[#4a1c1d] min-h-[260px] md:min-h-[520px] flex flex-col justify-between p-6 md:p-8 text-white">
                    <img src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80" alt="Royal Lounge" class="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-35 transform hover:scale-105 transition-transform duration-700">
                    <div class="absolute inset-0 bg-gradient-to-t from-[#4a1c1d] via-[#4a1c1d]/85 to-transparent"></div>

                    <div class="relative z-10">
                        <div class="flex items-center gap-2 mb-2">
                            <span class="text-2xl">👑</span>
                            <span class="text-[10px] font-bold text-[#b58b4c] uppercase tracking-[0.25em]">Rajwada VIP Lounge</span>
                        </div>
                        <h3 class="font-serif font-bold text-2xl md:text-3xl text-white mb-2 leading-tight">Private Appointment</h3>
                        <p class="text-xs text-amber-100/90 font-light leading-relaxed">Step into an exclusive world of royal hospitality, bespoke craftsmanship, and private vault access.</p>
                    </div>

                    <div class="relative z-10 space-y-3.5 my-6 text-xs text-amber-50/90 border-t border-amber-500/20 pt-6">
                        <div class="flex items-start gap-2.5">
                            <span class="text-[#b58b4c] font-bold text-sm">✦</span>
                            <span><strong>1-on-1 Consultation</strong> with Master Jeweller</span>
                        </div>
                        <div class="flex items-start gap-2.5">
                            <span class="text-[#b58b4c] font-bold text-sm">✦</span>
                            <span><strong>Private Vault Preview</strong> of Rare Solitaires & Kundan</span>
                        </div>
                        <div class="flex items-start gap-2.5">
                            <span class="text-[#b58b4c] font-bold text-sm">✦</span>
                            <span><strong>Custom Piercing & Design</strong> Studio Access</span>
                        </div>
                        <div class="flex items-start gap-2.5">
                            <span class="text-[#b58b4c] font-bold text-sm">✦</span>
                            <span><strong>Complimentary Royal Hospitality</strong> & Valet</span>
                        </div>
                    </div>

                    <div class="relative z-10 pt-4 border-t border-amber-500/20 text-[10px] text-amber-200/80 font-mono">
                        Available across Jaipur, Mumbai, Delhi & Bengaluru Flagships
                    </div>
                </div>

                <!-- Right 7 Cols: Appointment Form -->
                <div class="md:col-span-7 p-6 md:p-8 flex flex-col justify-between bg-white relative">
                    <button onclick="closeAppointmentModal()" class="absolute top-4 right-4 text-gray-400 hover:text-[#4a1c1d] transition-colors p-2 bg-gray-50 rounded-full">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>

                    <div>
                        <span class="text-[10px] font-bold text-[#b58b4c] uppercase tracking-widest block mb-1">VIP Booking Form</span>
                        <h4 class="font-serif font-bold text-2xl text-[#4a1c1d] mb-4">Book An Appointment</h4>

                        <form id="appointment-form" onsubmit="handleAppointmentSubmit(event)" class="space-y-4">
                            <div>
                                <label class="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">Full Name *</label>
                                <input type="text" id="apt-name" class="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-xs focus:border-[#4a1c1d] focus:ring-0 bg-gray-50 focus:bg-white" placeholder="e.g. Princess Aditi Singh" required>
                            </div>

                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label class="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">Phone Number *</label>
                                    <input type="tel" id="apt-phone" class="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-xs focus:border-[#4a1c1d] focus:ring-0 bg-gray-50 focus:bg-white" placeholder="+91 98765 43210" required>
                                </div>
                                <div>
                                    <label class="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">Email Address *</label>
                                    <input type="email" id="apt-email" class="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-xs focus:border-[#4a1c1d] focus:ring-0 bg-gray-50 focus:bg-white" placeholder="aditi@example.com" required>
                                </div>
                            </div>

                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label class="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">Showroom Location</label>
                                    <select id="apt-showroom" class="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-xs focus:border-[#4a1c1d] focus:ring-0 bg-gray-50 focus:bg-white">
                                        <option value="Jaipur Flagship Palace">Jaipur Flagship Palace</option>
                                        <option value="Mumbai Bandra Studio">Mumbai Bandra Studio</option>
                                        <option value="Delhi South Ext. Store">Delhi South Ext. Store</option>
                                        <option value="Bengaluru Lavelle Galleria">Bengaluru Lavelle Galleria</option>
                                        <option value="Online Video Consultation">Online Video Consultation</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">Service Type</label>
                                    <select id="apt-service" class="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-xs focus:border-[#4a1c1d] focus:ring-0 bg-gray-50 focus:bg-white">
                                        <option value="Bespoke Bridal Consultation">Bespoke Bridal Consultation</option>
                                        <option value="Piercing & Customization">Piercing & Customization</option>
                                        <option value="Solitaire & Diamond Suite">Solitaire & Diamond Suite</option>
                                        <option value="Gold Exchange & Valuation">Gold Exchange & Valuation</option>
                                    </select>
                                </div>
                            </div>

                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label class="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">Preferred Date *</label>
                                    <input type="date" id="apt-date" class="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-xs focus:border-[#4a1c1d] focus:ring-0 bg-gray-50 focus:bg-white" required>
                                </div>
                                <div>
                                    <label class="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">Preferred Time Slot</label>
                                    <select id="apt-time" class="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-xs focus:border-[#4a1c1d] focus:ring-0 bg-gray-50 focus:bg-white">
                                        <option value="11:30 AM - 01:00 PM">Morning (11:30 AM - 01:00 PM)</option>
                                        <option value="02:30 PM - 04:00 PM">Afternoon (02:30 PM - 04:00 PM)</option>
                                        <option value="05:00 PM - 06:30 PM">Evening (05:00 PM - 06:30 PM)</option>
                                        <option value="07:00 PM - 08:30 PM">Night (07:00 PM - 08:30 PM)</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label class="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">Special Requirements / Notes</label>
                                <textarea id="apt-notes" rows="2" class="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-xs focus:border-[#4a1c1d] focus:ring-0 bg-gray-50 focus:bg-white resize-none" placeholder="Any specific jewellery design, ring size, or dietary preferences..."></textarea>
                            </div>

                            <button type="submit" class="w-full bg-[#4a1c1d] text-white py-3.5 rounded-lg font-bold uppercase tracking-wider text-xs hover:bg-[#b58b4c] transition-colors shadow-md">
                                Confirm VIP Appointment
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    // Set pre-selected service if provided
    const serviceSelect = document.getElementById('apt-service');
    if (serviceSelect && service) {
        for (let opt of serviceSelect.options) {
            if (opt.value.toLowerCase().includes(service.toLowerCase())) {
                opt.selected = true;
                break;
            }
        }
    }

    // Set default date to tomorrow
    const dateInput = document.getElementById('apt-date');
    if (dateInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        dateInput.value = tomorrow.toISOString().split('T')[0];
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        modal.querySelector('div').classList.remove('scale-95');
    }, 10);
    document.body.style.overflow = 'hidden';
}

function closeAppointmentModal() {
    const modal = document.getElementById('appointment-booking-modal');
    if (modal) {
        modal.classList.add('opacity-0');
        modal.querySelector('div').classList.add('scale-95');
        document.body.style.overflow = '';
        setTimeout(() => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }, 300);
    }
}

function handleAppointmentSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('apt-name').value.trim();
    const showroom = document.getElementById('apt-showroom').value;
    const service = document.getElementById('apt-service').value;
    const date = document.getElementById('apt-date').value;
    const time = document.getElementById('apt-time').value;

    closeAppointmentModal();
    openConciergeConfirmationModal(name, `${service} at ${showroom} on ${date} (${time})`);
}
