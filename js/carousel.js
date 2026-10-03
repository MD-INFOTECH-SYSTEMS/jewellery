const carousel = {
    init() {
        const track = document.getElementById('carousel-track');
        if (!track) return;

        this.track = track;
        this.slides = Array.from(track.querySelectorAll('.carousel-slide'));
        this.dotsNav = document.getElementById('carousel-dots');
        
        this.currentIndex = 0;
        this.slideCount = this.slides.length;
        
        if(this.dotsNav) {
            this.dotsNav.innerHTML = '';
            for(let i=0; i<this.slideCount; i++) {
                const dot = document.createElement('button');
                // Diamond shape dots
                dot.className = `w-2 h-2 transform rotate-45 transition-colors duration-300 ${i===0 ? 'bg-[#832729]' : 'bg-gray-300 hover:bg-gray-400'}`;
                dot.addEventListener('click', () => this.goToSlide(i));
                this.dotsNav.appendChild(dot);
            }
            this.dots = Array.from(this.dotsNav.children);
        }

        // Handle swipe for mobile (basic implementation)
        let touchStartX = 0;
        let touchEndX = 0;
        
        this.track.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        this.track.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchStartX - touchEndX > 50) this.next();
            if (touchEndX - touchStartX > 50) this.prev();
        });

        this.startAutoPlay();
        

        // Setup resize observer to update translation correctly
        window.addEventListener('resize', () => {
            this.updateSlidePosition();
        });
    },

    updateSlidePosition() {
        if (!this.slides.length) return;
        
        // Calculate the width of one slide + gap
        // In this setup, we translate by the width of the slide plus the gap to center the active slide
        // A simple way to center the active slide is to shift by - (index * 100%) of slide width
        // Because slides are not w-full, we need to calculate exact pixel offset or % of parent.
        
        const slide = this.slides[0];
        const gap = 16; // 1rem gap (gap-4)
        const slideWidth = slide.offsetWidth;
        
        // We want the current slide to be centered.
        // Container width:
        const containerWidth = this.track.parentElement.offsetWidth;
        
        // The translation should bring the left edge of the slide to the left edge of the container,
        // then offset it by half the remaining space to center it.
        const centerOffset = (containerWidth - slideWidth) / 2;
        
        // Start position is padded by px-4 or px-8, let's keep it simple.
        // If we just translate by (slideWidth + gap) * index, it works if they are left-aligned.
        // But we want it centered.
        const paddingOffset = window.innerWidth >= 640 ? 32 : 16; // px-8 vs px-4
        
        const moveAmount = (slideWidth + gap) * this.currentIndex;
        const finalTransform = -moveAmount + centerOffset - paddingOffset;
        
        this.track.style.transform = `translateX(${finalTransform}px)`;
        
        if (this.dots) {
            this.dots.forEach((dot, index) => {
                if (index === this.currentIndex) {
                    dot.classList.remove('bg-gray-300', 'hover:bg-gray-400');
                    dot.classList.add('bg-[#832729]');
                } else {
                    dot.classList.remove('bg-[#832729]');
                    dot.classList.add('bg-gray-300', 'hover:bg-gray-400');
                }
            });
        }
    },

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.slideCount;
        this.updateSlidePosition();
    },

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.slideCount) % this.slideCount;
        this.updateSlidePosition();
    },

    goToSlide(index) {
        this.currentIndex = index;
        this.updateSlidePosition();
    },

    startAutoPlay() {
        this.stopAutoPlay();
        this.autoPlayTimer = setInterval(() => this.next(), 4000);
    },

    stopAutoPlay() {
        if (this.autoPlayTimer) {
            clearInterval(this.autoPlayTimer);
        }
    }
};

window.carousel = carousel;
