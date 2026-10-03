/**
 * Categories Page JS - Delegates to the Centralized Products Store Renderer
 */

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('categories-container');
    if (!container) return;

    if (typeof renderCentralizedStore === 'function') {
        window.currentStoreState = {
            category: 'All',
            collection: 'All',
            metal: 'All',
            gemstone: 'All',
            priceRange: 'All',
            minPrice: '',
            maxPrice: '',
            inStockOnly: false,
            onSaleOnly: false,
            searchQuery: '',
            sortBy: 'featured',
            viewMode: 'grid'
        };

        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('category')) window.currentStoreState.category = urlParams.get('category');
        if (urlParams.has('collection')) window.currentStoreState.collection = urlParams.get('collection');
        if (urlParams.has('search')) window.currentStoreState.searchQuery = urlParams.get('search');
        if (urlParams.has('metal')) window.currentStoreState.metal = urlParams.get('metal');

        renderCentralizedStore(window.currentStoreState);
    }
});
