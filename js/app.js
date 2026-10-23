/**
 * JapaLink - Main Application Controller
 * Handles Featured Collections interactive scrollbar sync, review carousel, search, and interactions
 */

const App = {
  activeReviewIndex: 0,
  reviewInterval: null,

  init() {
    this.initFeaturedScrollbar();
    this.initReviewCarousel();
    this.initSearch();
    this.initCustomOrderForm();
    Cart.updateCartBadge();
    Auth.updateUserUI();
    Router.init();
  },

  /**
   * Featured Collections: Horizontal Dragging and Interactive Scrollbar Progress Bar Sync
   */
  initFeaturedScrollbar() {
    const container = document.getElementById('featured-collections-scroll-container');
    const track = document.getElementById('featured-scrollbar-track');
    const thumb = document.getElementById('featured-scrollbar-thumb');

    if (!container || !track || !thumb) return;

    // Update thumb position based on scroll
    const updateThumb = () => {
      const maxScroll = container.scrollWidth - container.clientWidth;
      if (maxScroll <= 0) {
        thumb.style.width = '100%';
        thumb.style.left = '0%';
        return;
      }
      const scrollRatio = container.scrollLeft / maxScroll;
      const visibleRatio = container.clientWidth / container.scrollWidth;
      const thumbWidthPercent = Math.max(25, Math.min(45, visibleRatio * 100));
      
      const maxLeftPercent = 100 - thumbWidthPercent;
      const leftPercent = scrollRatio * maxLeftPercent;

      thumb.style.width = `${thumbWidthPercent}%`;
      thumb.style.left = `${leftPercent}%`;
    };

    container.addEventListener('scroll', updateThumb, { passive: true });
    window.addEventListener('resize', updateThumb);
    updateThumb();

    // Mouse drag scrolling on container
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    container.addEventListener('mousedown', (e) => {
      isDown = true;
      container.classList.add('grabbing');
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    });

    window.addEventListener('mouseup', () => {
      isDown = false;
      container.classList.remove('grabbing');
    });

    container.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.6; // Scroll speed multiplier
      container.scrollLeft = scrollLeft - walk;
    });

    // Clicking or dragging on the track itself
    let isThumbDragging = false;

    track.addEventListener('click', (e) => {
      if (e.target === thumb) return;
      const rect = track.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickRatio = clickX / rect.width;
      const maxScroll = container.scrollWidth - container.clientWidth;
      container.scrollTo({
        left: clickRatio * maxScroll,
        behavior: 'smooth'
      });
    });

    thumb.addEventListener('mousedown', (e) => {
      isThumbDragging = true;
      e.stopPropagation();
      document.body.style.userSelect = 'none';
    });

    window.addEventListener('mouseup', () => {
      if (isThumbDragging) {
        isThumbDragging = false;
        document.body.style.userSelect = '';
      }
    });

    window.addEventListener('mousemove', (e) => {
      if (!isThumbDragging) return;
      const rect = track.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const ratio = x / rect.width;
      const maxScroll = container.scrollWidth - container.clientWidth;
      container.scrollLeft = ratio * maxScroll;
    });
  },

  /**
   * Store Reviews Testimonials Carousel
   */
  initReviewCarousel() {
    this.renderReviewSlide(0);

    // Auto-advance every 6 seconds
    if (this.reviewInterval) clearInterval(this.reviewInterval);
    this.reviewInterval = setInterval(() => {
      const nextIndex = (this.activeReviewIndex + 1) % JAPALINK_DATA.reviews.length;
      this.renderReviewSlide(nextIndex);
    }, 6000);
  },

  renderReviewSlide(index) {
    this.activeReviewIndex = index;
    const review = JAPALINK_DATA.reviews[index];
    const textEl = document.getElementById('review-quote-text');
    const authorEl = document.getElementById('review-author-name');
    const dateEl = document.getElementById('review-date-info');
    const dotsContainer = document.getElementById('review-dots-container');

    if (!textEl || !authorEl || !dateEl) return;

    // Smooth transition
    textEl.style.opacity = 0;
    setTimeout(() => {
      textEl.textContent = review.text;
      authorEl.textContent = `${review.author} (${review.country})`;
      dateEl.textContent = review.date;
      textEl.style.opacity = 1;
    }, 200);

    // Render interactive dot dashes
    if (dotsContainer) {
      dotsContainer.innerHTML = JAPALINK_DATA.reviews.map((r, i) => `
        <button class="review-dot-dash ${i === index ? 'active' : ''}" onclick="App.renderReviewSlide(${i})" title="Slide ${i+1}">
        </button>
      `).join('');
    }
  },

  /**
   * Search Bar & Store Dropdown Selection
   */
  initSearch() {
    const storeSelector = document.getElementById('search-store-btn');
    const storeDropdown = document.getElementById('search-store-dropdown');
    const searchInput = document.getElementById('header-search-input');
    const searchForm = document.getElementById('header-search-form');

    if (storeDropdown && storeSelector) {
      storeDropdown.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', (e) => {
          e.preventDefault();
          const selectedStore = item.getAttribute('data-store');
          const storeName = item.textContent.trim();
          document.getElementById('search-store-label').textContent = storeName;
          if (searchInput) {
            searchInput.placeholder = selectedStore === 'all' 
              ? 'Search across Japanese stores...' 
              : `Search in ${storeName}...`;
          }
        });
      });
    }

    if (searchForm && searchInput) {
      searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchInput.value.trim().toLowerCase();
        if (!query) return;

        window.location.hash = '#products';
        setTimeout(() => {
          const container = document.getElementById('all-products-grid');
          const filtered = JAPALINK_DATA.products.filter(p => 
            p.title.toLowerCase().includes(query) || 
            (p.jpTitle && p.jpTitle.toLowerCase().includes(query)) ||
            p.categoryName.toLowerCase().includes(query) ||
            p.storeName.toLowerCase().includes(query)
          );
          Router.renderProductCards(container, filtered);
          const title = document.getElementById('all-products-title');
          if (title) title.innerHTML = `Search Results for: <span class="text-warning">"${query}"</span> (${filtered.length} items)`;
        }, 100);
      });
    }
  },

  /**
   * Custom Proxy Order Form for "Other Store"
   */
  initCustomOrderForm() {
    const form = document.getElementById('custom-proxy-order-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const url = document.getElementById('custom-url').value;
      const title = document.getElementById('custom-title').value;
      const price = parseInt(document.getElementById('custom-price').value, 10) || 1000;
      const qty = parseInt(document.getElementById('custom-qty').value, 10) || 1;
      const storeName = document.getElementById('custom-store-name').value || 'Japanese Merchant';
      const notes = document.getElementById('custom-notes').value || '';

      const customProduct = {
        id: 'custom-' + Date.now(),
        title: title,
        jpTitle: `Custom Order: ${url.substring(0, 45)}...`,
        store: 'other',
        storeName: storeName,
        category: 'custom',
        categoryName: 'Custom Order',
        priceJpy: price,
        priceUsd: price / 151,
        image: 'assets/images/collection-figures.jpg',
        condition: 'Direct from Merchant',
        proxyFee: 300
      };

      Cart.addItem(customProduct, qty, { customUrl: url, customNote: notes });
      form.reset();
      window.location.hash = '#cart';
    });
  }
};

window.App = App;

// Bootstrap on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
