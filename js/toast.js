const toast = {
    init() {
        this.container = document.createElement('div');
        this.container.className = 'fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none';
        document.body.appendChild(this.container);
    },

    show(message, type = 'success') {
        const el = document.createElement('div');
        el.className = `px-6 py-3 rounded shadow-lg transform transition-all duration-300 translate-y-10 opacity-0 bg-deep-maroon text-ivory font-sans text-sm flex items-center gap-2 pointer-events-auto border border-gold/30`;
        
        let icon = '';
        if (type === 'success') {
            icon = '<svg class="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>';
        }

        el.innerHTML = `${icon} <span>${message}</span>`;
        this.container.appendChild(el);

        // Animate in
        requestAnimationFrame(() => {
            el.classList.remove('translate-y-10', 'opacity-0');
        });

        // Remove after 3 seconds
        setTimeout(() => {
            el.classList.add('translate-y-10', 'opacity-0');
            setTimeout(() => {
                if(el.parentNode) el.parentNode.removeChild(el);
            }, 300);
        }, 3000);
    }
};

window.toast = toast;
