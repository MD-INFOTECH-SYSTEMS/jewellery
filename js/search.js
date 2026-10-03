const search = {
    placeholderTerms: [
        'engagement rings',
        'wedding jewellery',
        'diamond jewellery',
        'gold necklaces',
        'bridal sets',
        'pearl earrings',
        'platinum rings',
    ],

    init() {
        this.bindEvents();
        this.animatePlaceholder();
    },

    animatePlaceholder() {
        const input   = document.getElementById('header-search-input');
        const overlay = document.getElementById('search-anim-placeholder');
        const wordA   = document.getElementById('search-word-a');
        const wordB   = document.getElementById('search-word-b');
        if (!input || !overlay || !wordA || !wordB) return;

        const terms = this.placeholderTerms;
        let termIndex = 0;
        let active   = wordA;
        let inactive = wordB;

        wordA.textContent = terms[0];

        input.addEventListener('focus', () => { overlay.style.opacity = '0'; });
        input.addEventListener('blur',  () => { if (!input.value) overlay.style.opacity = '1'; });
        input.addEventListener('input', () => { overlay.style.opacity = input.value ? '0' : '1'; });

        setInterval(() => {
            if (input === document.activeElement || input.value.length > 0) return;

            const nextIndex = (termIndex + 1) % terms.length;

            inactive.textContent = terms[nextIndex];
            inactive.style.transition = 'none';
            inactive.style.transform  = 'translateY(110%)';
            inactive.style.opacity    = '0';

            void inactive.offsetHeight;

            inactive.style.transition = 'transform 0.42s cubic-bezier(.4,0,.2,1), opacity 0.42s ease';
            active.style.transition   = 'transform 0.42s cubic-bezier(.4,0,.2,1), opacity 0.42s ease';

            active.style.transform  = 'translateY(-110%)';
            active.style.opacity    = '0';
            inactive.style.transform = 'translateY(0)';
            inactive.style.opacity   = '1';

            [active, inactive] = [inactive, active];
            termIndex = nextIndex;
        }, 2500);
    },

    bindEvents() {
        const searchInput = document.getElementById('header-search-input');
        const clearBtn = document.getElementById('search-clear-btn');
        const searchResults = document.getElementById('header-search-results');

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value;
                if (query.trim()) {
                    if (clearBtn) clearBtn.classList.remove('hidden');
                    if (searchResults) {
                        searchResults.classList.remove('hidden');
                        this.showSuggestions(query, searchResults);
                    }
                } else {
                    if (clearBtn) clearBtn.classList.add('hidden');
                    if (searchResults) searchResults.classList.add('hidden');
                }
            });

            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.executeSearch(searchInput.value.trim());
                    if (searchResults) searchResults.classList.add('hidden');
                    searchInput.blur();
                } else if (e.key === 'Escape') {
                    if (searchResults) searchResults.classList.add('hidden');
                    searchInput.blur();
                }
            });

            if (clearBtn) {
                clearBtn.addEventListener('click', () => {
                    searchInput.value = '';
                    clearBtn.classList.add('hidden');
                    if (searchResults) searchResults.classList.add('hidden');
                    searchInput.focus();
                    this.executeSearch('');
                });
            }

            document.addEventListener('click', (e) => {
                if (searchResults && !searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                    searchResults.classList.add('hidden');
                }
            });
        }

        // Camera / Image Search Handler (Frontend Mock)
        const cameraBtn = document.getElementById('search-camera-btn');
        const imageInput = document.getElementById('search-image-input');
        if (cameraBtn && imageInput) {
            cameraBtn.addEventListener('click', () => imageInput.click());
            imageInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    if (window.toast) window.toast.show(`📷 Visual Search: Analyzing "${file.name}"... (Frontend Demo)`);
                    setTimeout(() => {
                        this.executeSearch('Diamond');
                    }, 1000);
                    imageInput.value = '';
                }
            });
        }

        // Microphone / Voice Search
        const micBtn = document.getElementById('search-mic-btn');
        if (micBtn) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (SpeechRecognition) {
                const recognition = new SpeechRecognition();
                recognition.lang = 'en-IN';
                recognition.interimResults = false;
                recognition.maxAlternatives = 1;

                let listening = false;
                micBtn.addEventListener('click', () => {
                    if (listening) return;
                    listening = true;
                    micBtn.classList.add('text-[#4a1c1d]', 'animate-pulse');
                    micBtn.classList.remove('text-gray-400');
                    if (window.toast) window.toast.show('🎤 Listening for jewellery query...');
                    try {
                        recognition.start();
                    } catch (e) {
                        listening = false;
                    }
                });

                recognition.addEventListener('result', (e) => {
                    const transcript = e.results[0][0].transcript;
                    const searchInput = document.getElementById('header-search-input');
                    if (searchInput) {
                        searchInput.value = transcript;
                        searchInput.dispatchEvent(new Event('input'));
                        this.executeSearch(transcript);
                    }
                });

                recognition.addEventListener('end', () => {
                    listening = false;
                    micBtn.classList.remove('text-[#4a1c1d]', 'animate-pulse');
                    micBtn.classList.add('text-gray-400');
                });

                recognition.addEventListener('error', () => {
                    listening = false;
                    micBtn.classList.remove('text-[#4a1c1d]', 'animate-pulse');
                    micBtn.classList.add('text-gray-400');
                    if (window.toast) window.toast.show('⚠️ Voice search unavailable. Please type your query.');
                });
            } else {
                micBtn.addEventListener('click', () => {
                    if (window.toast) window.toast.show('🎤 Voice search not supported in this browser.');
                });
            }
        }
    },

    showSuggestions(query, container) {
        const term = query.toLowerCase().trim();
        if (!window.products) return;

        const matches = window.products.filter(p => 
            p.name.toLowerCase().includes(term) || 
            p.category.toLowerCase().includes(term) ||
            (p.collection && p.collection.toLowerCase().includes(term)) ||
            (p.sku && p.sku.toLowerCase().includes(term)) ||
            (p.tag && p.tag.toLowerCase().includes(term))
        ).slice(0, 5);

        if (matches.length === 0) {
            container.innerHTML = '<div class="p-4 text-center text-gray-500 text-xs">No matching jewellery items found</div>';
            return;
        }

        container.innerHTML = `
            <div class="p-2">
                <div class="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 px-2">Suggestions</div>
                ${matches.map(p => `
                    <div class="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 cursor-pointer rounded transition-colors" onclick="window.location.href='product.html?id=${p.id}'">
                        <img src="${p.image}" class="w-10 h-10 object-cover rounded shadow-sm">
                        <div class="flex-1 min-w-0">
                            <div class="text-xs font-bold text-[#4a1c1d] truncate">${p.name}</div>
                            <div class="text-[10px] text-gray-400 truncate">${p.category} ${p.sku ? `• ${p.sku}` : ''}</div>
                        </div>
                        <div class="text-xs font-bold text-[#b58b4c]">₹${p.price.toLocaleString()}</div>
                    </div>
                `).join('')}
            </div>
        `;
    },

    executeSearch(query) {
        const productsSection = document.getElementById('products-section');
        const productsHeading = document.getElementById('products-heading');
        
        if (!productsSection || !productsHeading) {
            window.location.href = `index.html?search=${encodeURIComponent(query)}`;
            return;
        }

        if (window.toast && query) window.toast.show(`✓ Results updated for "${query}"`);

        if (window.app && typeof window.app.renderProducts === 'function') {
            window.app.renderProducts(query);
        }

        if (query) {
            productsHeading.textContent = `Search Results for "${query}"`;
        } else {
            productsHeading.textContent = `Discover Our Collection`;
        }

        productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        const searchResults = document.getElementById('header-search-results');
        if (searchResults) searchResults.classList.add('hidden');
    }
};

window.search = search;
