/**
 * Toast Notification System - Rajwada Royal Jewellery
 * Positioned cleanly above floating elements (z-index 200, bottom-24 right-6)
 * so messages are never hidden behind Contact Concierge or modals.
 */

const toast = {
    init() {
        if (this.container) return;
        this.container = document.createElement('div');
        this.container.className = 'fixed bottom-24 right-6 z-[200] flex flex-col gap-2.5 pointer-events-none max-w-sm w-auto';
        document.body.appendChild(this.container);
    },

    show(message, type = 'success') {
        if (!this.container) this.init();

        const el = document.createElement('div');
        el.className = `px-5 py-3.5 rounded-xl shadow-2xl transform transition-all duration-300 translate-y-6 opacity-0 bg-[#4a1c1d] text-white font-sans text-xs md:text-sm flex items-center gap-3 pointer-events-auto border border-[#b58b4c]/60 backdrop-blur-md`;
        
        let icon = '<svg class="w-5 h-5 text-[#b58b4c] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>';
        if (type === 'error') {
            icon = '<svg class="w-5 h-5 text-rose-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>';
        } else if (type === 'info') {
            icon = '<svg class="w-5 h-5 text-amber-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
        }

        el.innerHTML = `${icon} <span class="font-medium leading-snug">${message}</span>`;
        this.container.appendChild(el);

        // Animate in
        requestAnimationFrame(() => {
            el.classList.remove('translate-y-6', 'opacity-0');
        });

        // Auto remove after 3.5s
        setTimeout(() => {
            el.classList.add('translate-y-6', 'opacity-0');
            setTimeout(() => {
                if (el.parentNode) el.parentNode.removeChild(el);
            }, 300);
        }, 3500);
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => toast.init());
} else {
    toast.init();
}

window.toast = toast;
