/**
 * JapaLink - Shopping Cart & Order State Management
 */

const Cart = {
  STORAGE_KEY: 'japalink_cart_items',

  getItems() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Error loading cart', e);
    }
    // Default initial cart items for immediate rich demonstration
    const initialItems = [
      {
        id: 'prod-01',
        title: 'Fate/Grand Order - Saber Alter 1/7 Scale Figure (Deluxe Edition)',
        jpTitle: 'Fate/Grand Order セイバー/アルトリア・ペンドラゴン[オルタ] 1/7スケール',
        store: 'mercari',
        storeName: 'Mercari Japan',
        priceJpy: 18500,
        priceUsd: 122.50,
        image: 'assets/images/products/figure-1.jpg',
        condition: 'Like New (With Box)',
        quantity: 1,
        proxyFee: 300,
        photoInspection: true,
        selected: true
      },
      {
        id: 'prod-08',
        title: 'Pokemon TCG 151 Japanese Booster Box (SV2a) - Factory Sealed',
        jpTitle: 'ポケモンカードゲーム 強化拡張パック「ポケモンカード151」BOX',
        store: 'mercari',
        storeName: 'Mercari Japan',
        priceJpy: 11800,
        priceUsd: 78.15,
        image: 'assets/images/collection-cards.jpg',
        condition: 'Brand New Factory Sealed',
        quantity: 1,
        proxyFee: 300,
        photoInspection: false,
        selected: true
      },
      {
        id: 'prod-10',
        title: 'Bandai MG 1/100 RX-78-2 Gundam Ver. 3.0 Gunpla Model Kit',
        jpTitle: 'MG 1/100 RX-78-2 ガンダム Ver.3.0 バンダイスピリッツ プラモデル',
        store: 'amazon',
        storeName: 'Amazon Japan',
        priceJpy: 4950,
        priceUsd: 32.75,
        image: 'assets/images/collection-models.jpg',
        condition: 'Brand New (Sealed)',
        quantity: 1,
        proxyFee: 300,
        photoInspection: false,
        selected: true
      }
    ];
    this.saveItems(initialItems);
    return initialItems;
  },

  saveItems(items) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Error saving cart', e);
    }
    this.updateCartBadge();
  },

  addItem(product, quantity = 1, options = {}) {
    const items = this.getItems();
    const existingIndex = items.findIndex(item => item.id === product.id);

    if (existingIndex > -1) {
      items[existingIndex].quantity += quantity;
    } else {
      items.push({
        id: product.id,
        title: product.title,
        jpTitle: product.jpTitle || '',
        store: product.store || 'other',
        storeName: product.storeName || 'Custom Store',
        priceJpy: product.priceJpy || 0,
        priceUsd: product.priceUsd || (product.priceJpy / 151),
        image: product.image || 'assets/images/products/figure-1.jpg',
        condition: product.condition || 'Brand New',
        quantity: quantity,
        proxyFee: product.proxyFee !== undefined ? product.proxyFee : 300,
        photoInspection: options.photoInspection || false,
        customUrl: options.customUrl || '',
        customNote: options.customNote || '',
        selected: true
      });
    }

    this.saveItems(items);
    this.showToast(`Added to Cart: "${product.title.substring(0, 32)}..."`);
  },

  updateQuantity(id, delta) {
    const items = this.getItems();
    const item = items.find(i => i.id === id);
    if (item) {
      item.quantity += delta;
      if (item.quantity <= 0) {
        return this.removeItem(id);
      }
      this.saveItems(items);
      this.renderCartView();
    }
  },

  removeItem(id) {
    let items = this.getItems();
    items = items.filter(i => i.id !== id);
    this.saveItems(items);
    this.renderCartView();
    this.showToast('Item removed from cart.');
  },

  toggleItemSelection(id) {
    const items = this.getItems();
    const item = items.find(i => i.id === id);
    if (item) {
      item.selected = !item.selected;
      this.saveItems(items);
      this.renderCartView();
    }
  },

  toggleSelectAll(selectAll) {
    const items = this.getItems();
    items.forEach(i => i.selected = selectAll);
    this.saveItems(items);
    this.renderCartView();
  },

  togglePhotoInspection(id) {
    const items = this.getItems();
    const item = items.find(i => i.id === id);
    if (item) {
      item.photoInspection = !item.photoInspection;
      this.saveItems(items);
      this.renderCartView();
    }
  },

  clearCart() {
    this.saveItems([]);
    this.renderCartView();
  },

  getCount() {
    const items = this.getItems();
    return items.reduce((sum, item) => sum + item.quantity, 0);
  },

  getCalculations() {
    const items = this.getItems();
    const selected = items.filter(i => i.selected);

    const itemsSubtotalJpy = selected.reduce((sum, item) => sum + (item.priceJpy * item.quantity), 0);
    const proxyFeesJpy = selected.reduce((sum, item) => sum + (item.proxyFee * item.quantity), 0);
    const photoInspectionFeesJpy = selected.reduce((sum, item) => sum + (item.photoInspection ? 300 * item.quantity : 0), 0);

    const total1stPaymentJpy = itemsSubtotalJpy + proxyFeesJpy + photoInspectionFeesJpy;
    const total1stPaymentUsd = (total1stPaymentJpy / 151).toFixed(2);
    const itemsSubtotalUsd = (itemsSubtotalJpy / 151).toFixed(2);

    return {
      totalItems: selected.length,
      itemsSubtotalJpy,
      itemsSubtotalUsd,
      proxyFeesJpy,
      photoInspectionFeesJpy,
      total1stPaymentJpy,
      total1stPaymentUsd,
      selectedItems: selected
    };
  },

  updateCartBadge() {
    const count = this.getCount();
    const badges = document.querySelectorAll('.cart-badge');
    badges.forEach(badge => {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'inline-flex' : 'none';
      badge.classList.remove('badge-pop');
      void badge.offsetWidth; // trigger reflow
      badge.classList.add('badge-pop');
    });
  },

  renderCartView() {
    const cartContainer = document.getElementById('cart-items-container');
    const cartSummaryContainer = document.getElementById('cart-summary-container');
    if (!cartContainer || !cartSummaryContainer) return;

    const items = this.getItems();
    if (items.length === 0) {
      cartContainer.innerHTML = `
        <div class="text-center py-5 bg-white rounded-xl shadow-sm border p-4">
          <div class="empty-cart-icon mb-3">
            <i class="fas fa-shopping-basket fa-4x text-muted opacity-50"></i>
          </div>
          <h4 class="font-weight-bold">Your JapaLink cart is empty</h4>
          <p class="text-muted mb-4">Start exploring Mercari, Amazon Japan, Surugaya, or paste a custom Japanese URL.</p>
          <a href="#products" class="btn btn-warning px-4 py-2 font-weight-bold text-white rounded-pill">
            <i class="fas fa-search mr-2"></i> Browse Trending Items
          </a>
        </div>
      `;
      cartSummaryContainer.innerHTML = '';
      return;
    }

    // Group items by store
    const grouped = {};
    items.forEach(item => {
      const storeKey = item.storeName || 'Other Store';
      if (!grouped[storeKey]) grouped[storeKey] = [];
      grouped[storeKey].push(item);
    });

    let html = `
      <div class="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
        <div class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" id="cart-select-all" 
            ${items.every(i => i.selected) ? 'checked' : ''} onchange="Cart.toggleSelectAll(this.checked)">
          <label class="custom-control-label font-weight-bold" for="cart-select-all">Select All Items (${items.length})</label>
        </div>
        <button class="btn btn-sm btn-outline-danger rounded-pill" onclick="if(confirm('Clear all items from your cart?')) Cart.clearCart()">
          <i class="fas fa-trash-alt mr-1"></i> Clear Cart
        </button>
      </div>
    `;

    for (const [storeName, storeItems] of Object.entries(grouped)) {
      html += `
        <div class="card mb-4 border-0 shadow-sm rounded-xl overflow-hidden">
          <div class="card-header bg-light d-flex align-items-center py-2 px-3 border-bottom-0">
            <span class="badge badge-warning text-white mr-2"><i class="fas fa-store mr-1"></i> ${storeName}</span>
            <small class="text-muted ml-auto font-weight-bold">Free 30-Day Tokyo Storage Eligible</small>
          </div>
          <div class="list-group list-group-flush">
      `;

      storeItems.forEach(item => {
        html += `
          <div class="list-group-item p-3">
            <div class="row align-items-center">
              <div class="col-auto">
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input" id="select-${item.id}" 
                    ${item.selected ? 'checked' : ''} onchange="Cart.toggleItemSelection('${item.id}')">
                  <label class="custom-control-label" for="select-${item.id}"></label>
                </div>
              </div>
              <div class="col-3 col-md-2">
                <img src="${item.image}" alt="${item.title}" class="img-fluid rounded border cart-item-thumb">
              </div>
              <div class="col-7 col-md-5">
                <h6 class="font-weight-bold mb-1 line-clamp-2">${item.title}</h6>
                ${item.jpTitle ? `<p class="text-muted small mb-1 line-clamp-1">${item.jpTitle}</p>` : ''}
                <div class="d-flex align-items-center flex-wrap">
                  <span class="badge badge-light border text-secondary mr-2 mb-1">${item.condition}</span>
                  <span class="badge badge-success-light text-success mr-2 mb-1"><i class="fas fa-check-circle mr-1"></i> Proxy Fee: ¥${item.proxyFee}</span>
                </div>
                <div class="custom-control custom-switch mt-2">
                  <input type="checkbox" class="custom-control-input" id="photo-${item.id}" 
                    ${item.photoInspection ? 'checked' : ''} onchange="Cart.togglePhotoInspection('${item.id}')">
                  <label class="custom-control-label small text-muted" for="photo-${item.id}">
                    <i class="fas fa-camera text-primary mr-1"></i> HD Photo Inspection (+¥300)
                  </label>
                </div>
              </div>
              <div class="col-6 col-md-2 mt-3 mt-md-0 text-md-center">
                <div class="font-weight-bold text-dark h5 mb-0">¥${(item.priceJpy * item.quantity).toLocaleString()}</div>
                <small class="text-muted">~$${(item.priceUsd * item.quantity).toFixed(2)} USD</small>
                <div class="text-muted x-small">¥${item.priceJpy.toLocaleString()} each</div>
              </div>
              <div class="col-6 col-md-2 mt-3 mt-md-0 text-right">
                <div class="input-group input-group-sm quantity-stepper d-inline-flex align-items-center border rounded-pill p-1">
                  <button class="btn btn-sm btn-link text-dark p-0 px-2" onclick="Cart.updateQuantity('${item.id}', -1)">-</button>
                  <span class="px-2 font-weight-bold">${item.quantity}</span>
                  <button class="btn btn-sm btn-link text-dark p-0 px-2" onclick="Cart.updateQuantity('${item.id}', 1)">+</button>
                </div>
                <button class="btn btn-sm btn-link text-danger p-0 ml-2" title="Remove" onclick="Cart.removeItem('${item.id}')">
                  <i class="fas fa-times-circle"></i>
                </button>
              </div>
            </div>
          </div>
        `;
      });

      html += `
          </div>
        </div>
      `;
    }

    cartContainer.innerHTML = html;

    // Render Order Summary
    const calc = this.getCalculations();
    cartSummaryContainer.innerHTML = `
      <div class="card border-0 shadow-sm rounded-xl p-4 sticky-top" style="top: 100px;">
        <h5 class="font-weight-bold mb-3 border-bottom pb-2">1st Payment Summary</h5>
        
        <div class="d-flex justify-content-between mb-2">
          <span class="text-muted">Items Subtotal (${calc.totalItems} items)</span>
          <span class="font-weight-bold">¥${calc.itemsSubtotalJpy.toLocaleString()}</span>
        </div>
        
        <div class="d-flex justify-content-between mb-2">
          <span class="text-muted">JapaLink Proxy Service Fee</span>
          <span class="font-weight-bold">¥${calc.proxyFeesJpy.toLocaleString()}</span>
        </div>

        ${calc.photoInspectionFeesJpy > 0 ? `
          <div class="d-flex justify-content-between mb-2 text-primary">
            <span>HD Photo Inspection Fee</span>
            <span class="font-weight-bold">+¥${calc.photoInspectionFeesJpy.toLocaleString()}</span>
          </div>
        ` : ''}

        <div class="d-flex justify-content-between mb-2 text-success">
          <span>Tokyo Warehouse Storage (30 Days)</span>
          <span class="font-weight-bold">FREE (¥0)</span>
        </div>

        <hr class="my-3">

        <div class="d-flex justify-content-between align-items-baseline mb-3">
          <div>
            <div class="h5 font-weight-bold mb-0 text-dark">1st Payment Total</div>
            <small class="text-muted">(Item Cost + Proxy Service)</small>
          </div>
          <div class="text-right">
            <div class="h4 font-weight-bold text-primary mb-0">¥${calc.total1stPaymentJpy.toLocaleString()}</div>
            <div class="text-muted small">≈ $${calc.total1stPaymentUsd} USD</div>
          </div>
        </div>

        <div class="alert alert-warning py-2 px-3 small rounded-lg border-0 mb-3" style="background: #fff8e6; color: #8c5a00;">
          <i class="fas fa-info-circle mr-1"></i>
          <strong>About 2nd Payment:</strong> International shipping is paid once your items reach our Tokyo warehouse and are weighed.
        </div>

        <a href="#checkout" class="btn btn-warning btn-block font-weight-bold py-3 text-white rounded-pill shadow-sm ${calc.totalItems === 0 ? 'disabled' : ''}">
          Proceed to 1st Payment <i class="fas fa-arrow-right ml-1"></i>
        </a>

        <div class="text-center mt-3">
          <small class="text-muted"><i class="fas fa-shield-alt text-success mr-1"></i> Buyer Protection & Authenticity Guarantee</small>
        </div>
      </div>
    `;
  },

  showToast(message) {
    let container = document.getElementById('toast-notification-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-notification-container';
      container.style.cssText = 'position: fixed; bottom: 24px; right: 24px; z-index: 9999; display: flex; flex-direction: column; gap: 10px;';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'custom-toast shadow-lg rounded-pill px-4 py-2 text-white bg-dark d-flex align-items-center animate__animated animate__fadeInUp';
    toast.style.cssText = 'background: rgba(20, 24, 30, 0.95); backdrop-filter: blur(8px); border-left: 4px solid #ff7b00; font-size: 14px;';
    toast.innerHTML = `
      <i class="fas fa-check-circle text-warning mr-2"></i>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.remove('animate__fadeInUp');
      toast.classList.add('animate__fadeOutDown');
      setTimeout(() => toast.remove(), 400);
    }, 3000);
  }
};

window.Cart = Cart;
