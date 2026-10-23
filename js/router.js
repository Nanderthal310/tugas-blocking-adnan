/**
 * JapaLink - Client-side Hash Router & View Controller
 */

const Router = {
  currentRoute: 'home',
  currentParams: {},

  init() {
    window.addEventListener('hashchange', () => this.handleRoute());
    this.handleRoute();
  },

  navigate(hash) {
    window.location.hash = hash;
  },

  handleRoute() {
    const rawHash = window.location.hash.slice(1) || 'home';
    const [pathWithQuery, ...extra] = rawHash.split('?');
    const [route, param] = pathWithQuery.split('/');

    this.currentRoute = route || 'home';
    this.currentParam = param || null;

    // Scroll to top on navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Hide all view containers
    const allViews = document.querySelectorAll('.app-view');
    allViews.forEach(view => view.classList.add('d-none'));

    // Highlight active nav links
    this.updateNavHighlight(this.currentRoute);

    // Route Dispatcher
    switch (this.currentRoute) {
      case 'home':
        this.renderHome();
        break;

      case 'store-mercari':
      case 'store-amazon':
      case 'store-surugaya':
      case 'store-zenplus':
      case 'store-minne':
      case 'store-jdirect':
        const storeId = this.currentRoute.replace('store-', '');
        this.renderStoreView(storeId);
        break;

      case 'store-other':
        this.renderOtherStoreView();
        break;

      case 'category-figures':
      case 'category-plush':
      case 'category-manga':
      case 'category-cards':
      case 'category-models':
      case 'category-stationery':
      case 'category-snacks':
      case 'category-retrogames':
        const catId = this.currentRoute.replace('category-', '');
        this.renderCategoryView(catId);
        break;

      case 'products':
        this.renderProductsCatalogView();
        break;

      case 'product':
        this.renderProductDetailView(this.currentParam);
        break;

      case 'cart':
        this.renderCart();
        break;

      case 'checkout':
        this.renderCheckout();
        break;

      case 'calculator':
        this.renderCalculator();
        break;

      case 'how-to-buy':
        this.renderHowToBuy();
        break;

      case 'fees':
        this.renderFees();
        break;

      case 'shipping':
        this.renderShippingInfo();
        break;

      case 'credits-mall':
        this.renderCreditsMall();
        break;

      case 'discounts':
        this.renderDiscounts();
        break;

      case 'faq':
        this.renderFAQ();
        break;

      case 'profile':
        this.renderProfile();
        break;

      default:
        this.renderHome();
        break;
    }
  },

  updateNavHighlight(route) {
    const navLinks = document.querySelectorAll('.nav-store-link, .nav-cat-pill');
    navLinks.forEach(link => {
      const href = link.getAttribute('href') || '';
      if (href.replace('#', '') === route) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  },

  renderHome() {
    const homeView = document.getElementById('view-home');
    if (homeView) homeView.classList.remove('d-none');
    // Ensure featured scrollbar is initialized
    if (window.App && window.App.initFeaturedScrollbar) {
      setTimeout(() => window.App.initFeaturedScrollbar(), 50);
    }
  },

  renderStoreView(storeId) {
    const view = document.getElementById('view-generic-catalog');
    if (!view) return;
    view.classList.remove('d-none');

    const store = JAPALINK_DATA.stores.find(s => s.id === storeId) || JAPALINK_DATA.stores[1];
    const products = JAPALINK_DATA.products.filter(p => p.store === storeId);

    const titleEl = document.getElementById('catalog-title');
    const badgeEl = document.getElementById('catalog-badge');
    const descEl = document.getElementById('catalog-desc');
    const itemsContainer = document.getElementById('catalog-items-grid');

    if (titleEl) titleEl.textContent = store.name;
    if (badgeEl) {
      badgeEl.textContent = store.tag;
      badgeEl.className = 'badge badge-warning text-white font-weight-bold px-3 py-1';
    }
    if (descEl) descEl.textContent = store.desc;

    this.renderProductCards(itemsContainer, products);
  },

  renderOtherStoreView() {
    const view = document.getElementById('view-other-store');
    if (view) view.classList.remove('d-none');
  },

  renderCategoryView(catId) {
    const view = document.getElementById('view-generic-catalog');
    if (!view) return;
    view.classList.remove('d-none');

    const cat = JAPALINK_DATA.categories.find(c => c.id === catId) || JAPALINK_DATA.categories[0];
    const products = JAPALINK_DATA.products.filter(p => p.category === catId);

    const titleEl = document.getElementById('catalog-title');
    const badgeEl = document.getElementById('catalog-badge');
    const descEl = document.getElementById('catalog-desc');
    const itemsContainer = document.getElementById('catalog-items-grid');

    if (titleEl) titleEl.textContent = cat.name;
    if (badgeEl) {
      badgeEl.textContent = cat.count;
      badgeEl.className = 'badge badge-primary px-3 py-1 font-weight-bold';
    }
    if (descEl) descEl.textContent = cat.desc;

    this.renderProductCards(itemsContainer, products);
  },

  renderProductsCatalogView() {
    const view = document.getElementById('view-all-products');
    if (!view) return;
    view.classList.remove('d-none');

    const itemsContainer = document.getElementById('all-products-grid');
    this.renderProductCards(itemsContainer, JAPALINK_DATA.products);
  },

  renderProductCards(container, products) {
    if (!container) return;

    if (!products || products.length === 0) {
      container.innerHTML = `
        <div class="col-12 text-center py-5">
          <i class="fas fa-box-open fa-3x text-muted mb-3 opacity-50"></i>
          <h5>No items match this selection</h5>
          <p class="text-muted">Try choosing another store, category, or submit a custom URL.</p>
        </div>
      `;
      return;
    }

    let html = '';
    products.forEach(p => {
      html += `
        <div class="col-6 col-md-4 col-lg-3 mb-4">
          <div class="card h-100 product-card border-0 shadow-sm rounded-xl overflow-hidden transition-all">
            <div class="product-card-img-wrap position-relative">
              <img src="${p.image}" class="card-img-top product-card-img" alt="${p.title}" loading="lazy">
              <span class="badge badge-light border position-absolute store-pill-badge" style="top: 10px; left: 10px;">
                <i class="fas fa-store text-warning mr-1"></i> ${p.storeName}
              </span>
              ${p.proxyFee === 0 ? `
                <span class="badge badge-success position-absolute" style="top: 10px; right: 10px;">0% Proxy Fee</span>
              ` : ''}
            </div>
            <div class="card-body p-3 d-flex flex-column">
              <div class="text-muted x-small mb-1 font-weight-bold text-uppercase">${p.categoryName}</div>
              <h6 class="font-weight-bold product-card-title mb-1 line-clamp-2" title="${p.title}">
                <a href="#product/${p.id}" class="text-dark text-decoration-none">${p.title}</a>
              </h6>
              <div class="text-muted small mb-2 line-clamp-1">${p.condition}</div>
              
              <div class="mt-auto pt-2 border-top">
                <div class="d-flex justify-content-between align-items-baseline mb-2">
                  <div>
                    <span class="h5 font-weight-bold text-dark mb-0">¥${p.priceJpy.toLocaleString()}</span>
                  </div>
                  <small class="text-muted font-weight-bold">~$${p.priceUsd.toFixed(2)}</small>
                </div>
                <div class="d-flex gap-2">
                  <a href="#product/${p.id}" class="btn btn-sm btn-outline-warning text-dark flex-grow-1 font-weight-bold rounded-pill mr-1">
                    Details
                  </a>
                  <button class="btn btn-sm btn-warning text-white rounded-pill px-3" onclick="Cart.addItem(JAPALINK_DATA.products.find(x => x.id === '${p.id}'))" title="Add to Cart">
                    <i class="fas fa-cart-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  },

  renderProductDetailView(productId) {
    const view = document.getElementById('view-product-detail');
    if (!view) return;
    view.classList.remove('d-none');

    const product = JAPALINK_DATA.products.find(p => p.id === productId) || JAPALINK_DATA.products[0];

    const container = document.getElementById('product-detail-container');
    if (!container) return;

    container.innerHTML = `
      <div class="row">
        <!-- Gallery -->
        <div class="col-lg-6 mb-4">
          <div class="card border-0 shadow-sm rounded-xl overflow-hidden p-3 bg-white sticky-top" style="top: 90px;">
            <div class="main-detail-img-wrap text-center mb-3">
              <img id="main-detail-img" src="${product.image}" class="img-fluid rounded-lg" style="max-height: 480px; object-fit: contain;" alt="${product.title}">
            </div>
            ${product.images && product.images.length > 1 ? `
              <div class="d-flex gap-2 justify-content-center overflow-auto py-2">
                ${product.images.map(img => `
                  <img src="${img}" class="img-thumbnail detail-thumb-img rounded cursor-pointer mr-2" style="width: 70px; height: 70px; object-fit: cover;" onclick="document.getElementById('main-detail-img').src='${img}'" alt="thumb">
                `).join('')}
              </div>
            ` : ''}
          </div>
        </div>

        <!-- Info & Buy Panel -->
        <div class="col-lg-6">
          <div class="card border-0 shadow-sm rounded-xl p-4 bg-white mb-4">
            <div class="d-flex align-items-center mb-2">
              <span class="badge badge-warning text-white mr-2 px-3 py-1 font-weight-bold">
                <i class="fas fa-store mr-1"></i> ${product.storeName}
              </span>
              <span class="badge badge-light border text-muted">${product.categoryName}</span>
              <span class="badge badge-success ml-auto"><i class="fas fa-check-circle mr-1"></i> In Stock</span>
            </div>

            <h3 class="font-weight-bold text-dark mb-1">${product.title}</h3>
            ${product.jpTitle ? `<p class="text-muted font-italic mb-3">${product.jpTitle}</p>` : ''}

            <!-- Price Box -->
            <div class="price-box p-3 rounded-xl mb-4" style="background: #fff8e8; border: 1px solid #ffe1a6;">
              <div class="d-flex justify-content-between align-items-baseline mb-1">
                <div>
                  <span class="text-muted small d-block font-weight-bold">ITEM PRICE (1st PAYMENT)</span>
                  <span class="h2 font-weight-bold text-dark mb-0">¥${product.priceJpy.toLocaleString()}</span>
                  <span class="text-muted ml-2">JPY</span>
                </div>
                <div class="text-right">
                  <span class="h4 font-weight-bold text-primary mb-0">~$${product.priceUsd.toFixed(2)}</span>
                  <span class="text-muted small d-block">USD (Approx)</span>
                </div>
              </div>
              <div class="d-flex align-items-center justify-content-between pt-2 border-top mt-2 small text-muted">
                <span><i class="fas fa-receipt text-warning mr-1"></i> JapaLink Proxy Fee: <strong>¥${product.proxyFee}</strong></span>
                <span><i class="fas fa-warehouse text-info mr-1"></i> Free Tokyo Storage: <strong>30 Days</strong></span>
              </div>
            </div>

            <!-- Seller & Item Condition Info -->
            <div class="card bg-light border-0 rounded-lg p-3 mb-4">
              <div class="row">
                <div class="col-6 mb-2">
                  <small class="text-muted d-block">ITEM CONDITION</small>
                  <strong class="text-dark">${product.condition}</strong>
                </div>
                <div class="col-6 mb-2">
                  <small class="text-muted d-block">ITEM WEIGHT</small>
                  <strong class="text-dark">Approx. ${product.weightGrams}g</strong>
                </div>
                <div class="col-6">
                  <small class="text-muted d-block">JAPANESE SELLER</small>
                  <strong class="text-dark">${product.seller}</strong>
                </div>
                <div class="col-6">
                  <small class="text-muted d-block">DOMESTIC DISPATCH</small>
                  <strong class="text-dark">${product.location}</strong>
                </div>
              </div>
            </div>

            <!-- 2-Step Payment Explainer Badge -->
            <div class="alert alert-light border rounded-lg p-3 mb-4 small">
              <div class="font-weight-bold text-dark mb-1 d-flex align-items-center">
                <i class="fas fa-info-circle text-primary mr-2 fa-lg"></i>
                How JapaLink 2-Step Payment Works:
              </div>
              <ul class="mb-0 pl-3 text-muted">
                <li><strong>1st Payment:</strong> Pay item price (¥${product.priceJpy.toLocaleString()}) + proxy fee (¥${product.proxyFee}) now. We buy the item for you.</li>
                <li><strong>2nd Payment:</strong> Once it reaches Tokyo warehouse, we weigh it and you pay international shipping (DHL/FedEx/EMS).</li>
              </ul>
            </div>

            <!-- Actions -->
            <div class="d-flex align-items-center mb-4">
              <div class="mr-3">
                <label class="small text-muted font-weight-bold mb-1 d-block">QUANTITY</label>
                <div class="input-group quantity-stepper border rounded-pill p-1" style="width: 120px;">
                  <button class="btn btn-sm btn-link text-dark p-0 px-2" type="button" onclick="const q = document.getElementById('detail-qty'); if(q.value > 1) q.value--;">-</button>
                  <input type="number" id="detail-qty" class="form-control text-center border-0 p-0 font-weight-bold" value="1" min="1" max="10" readonly>
                  <button class="btn btn-sm btn-link text-dark p-0 px-2" type="button" onclick="const q = document.getElementById('detail-qty'); q.value++;">+</button>
                </div>
              </div>
              <div class="flex-grow-1">
                <label class="small text-muted font-weight-bold mb-1 d-block">&nbsp;</label>
                <div class="d-flex gap-2">
                  <button class="btn btn-warning text-white font-weight-bold py-2 px-4 rounded-pill flex-grow-1 shadow-sm mr-2" onclick="
                    const qty = parseInt(document.getElementById('detail-qty').value, 10) || 1;
                    Cart.addItem(JAPALINK_DATA.products.find(p => p.id === '${product.id}'), qty);
                  ">
                    <i class="fas fa-cart-plus mr-1"></i> Add to Cart
                  </button>
                  <button class="btn btn-dark font-weight-bold py-2 px-4 rounded-pill shadow-sm" onclick="
                    const qty = parseInt(document.getElementById('detail-qty').value, 10) || 1;
                    Cart.addItem(JAPALINK_DATA.products.find(p => p.id === '${product.id}'), qty);
                    window.location.hash = '#checkout';
                  ">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>

            <!-- Guarantee Tags -->
            <div class="row text-center border-top pt-3 text-muted small">
              <div class="col-4">
                <i class="fas fa-shield-alt text-success d-block fa-lg mb-1"></i>
                Authenticity Guaranteed
              </div>
              <div class="col-4">
                <i class="fas fa-camera text-primary d-block fa-lg mb-1"></i>
                HD Inspection Photos
              </div>
              <div class="col-4">
                <i class="fas fa-boxes text-warning d-block fa-lg mb-1"></i>
                30-Day Free Storage
              </div>
            </div>
          </div>

          <!-- Tabs for Specs, Rules, Shipping -->
          <div class="card border-0 shadow-sm rounded-xl p-4 bg-white mb-4">
            <ul class="nav nav-pills mb-3 border-bottom pb-2" id="detail-tabs">
              <li class="nav-item">
                <a class="nav-link active rounded-pill font-weight-bold" data-toggle="pill" href="#tab-desc">Description</a>
              </li>
              <li class="nav-item">
                <a class="nav-link rounded-pill font-weight-bold" data-toggle="pill" href="#tab-rules">Proxy Rules</a>
              </li>
              <li class="nav-item">
                <a class="nav-link rounded-pill font-weight-bold" data-toggle="pill" href="#tab-shipping-est">Shipping Est.</a>
              </li>
            </ul>
            <div class="tab-content">
              <div class="tab-pane fade show active" id="tab-desc">
                <p class="text-muted">${product.description}</p>
                <h6 class="font-weight-bold mt-3 mb-2">Specifications:</h6>
                <table class="table table-sm table-bordered small">
                  <tbody>
                    ${product.specifications ? Object.entries(product.specifications).map(([k, v]) => `
                      <tr>
                        <th class="bg-light w-25">${k}</th>
                        <td>${v}</td>
                      </tr>
                    `).join('') : ''}
                  </tbody>
                </table>
              </div>
              <div class="tab-pane fade" id="tab-rules">
                <h6 class="font-weight-bold mb-2">JapaLink Proxy Buying Terms</h6>
                <ul class="text-muted small pl-3">
                  <li><strong>Prompt Purchase:</strong> Once your 1st Payment is received, our Tokyo purchasing team secures the listing on ${product.storeName} immediately.</li>
                  <li><strong>Optional HD Photo Inspection:</strong> For ¥300, our warehouse team takes 5 high-resolution photos of the product and packaging upon Tokyo arrival.</li>
                  <li><strong>Free Storage:</strong> Enjoy 30 consecutive calendar days of zero-cost warehouse storage in Tokyo to combine with your other orders.</li>
                  <li><strong>No Returns on Flea Market Items:</strong> In accordance with Mercari Japan standard policies, used peer-to-peer listings cannot be returned unless counterfeit.</li>
                </ul>
              </div>
              <div class="tab-pane fade" id="tab-shipping-est">
                <h6 class="font-weight-bold mb-2">Estimated International Shipping for ~${product.weightGrams}g</h6>
                <p class="small text-muted mb-2">Typical carrier rates to US / Europe / Asia for this item:</p>
                <div class="list-group list-group-flush small">
                  <div class="list-group-item d-flex justify-content-between px-0">
                    <span><i class="fas fa-plane text-warning mr-1"></i> DHL Express (2-4 days)</span>
                    <strong>¥3,450 (~$22.80)</strong>
                  </div>
                  <div class="list-group-item d-flex justify-content-between px-0">
                    <span><i class="fas fa-shipping-fast text-primary mr-1"></i> FedEx Priority (3-5 days)</span>
                    <strong>¥3,320 (~$21.90)</strong>
                  </div>
                  <div class="list-group-item d-flex justify-content-between px-0">
                    <span><i class="fas fa-mail-bulk text-info mr-1"></i> Japan Post EMS (4-7 days)</span>
                    <strong>¥2,950 (~$19.50)</strong>
                  </div>
                </div>
                <div class="mt-3">
                  <a href="#calculator" class="btn btn-sm btn-outline-warning text-dark font-weight-bold rounded-pill">
                    <i class="fas fa-calculator mr-1"></i> Use Full Shipping Calculator
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  renderCart() {
    const view = document.getElementById('view-cart');
    if (!view) return;
    view.classList.remove('d-none');
    Cart.renderCartView();
  },

  renderCheckout() {
    const view = document.getElementById('view-checkout');
    if (!view) return;
    view.classList.remove('d-none');

    const calc = Cart.getCalculations();
    const user = Auth.getCurrentUser();

    const container = document.getElementById('checkout-container');
    if (!container) return;

    if (calc.totalItems === 0) {
      container.innerHTML = `
        <div class="text-center py-5">
          <i class="fas fa-shopping-cart fa-3x text-muted mb-3 opacity-50"></i>
          <h4>No items selected for checkout</h4>
          <p class="text-muted">Please select items in your shopping cart before proceeding to 1st Payment.</p>
          <a href="#cart" class="btn btn-warning text-white rounded-pill font-weight-bold px-4 py-2">
            Return to Cart
          </a>
        </div>
      `;
      return;
    }

    if (!user || !user.isLoggedIn) {
      container.innerHTML = `
        <div class="card border-0 shadow-sm rounded-xl p-5 text-center bg-white my-4">
          <div class="mb-3">
            <i class="fas fa-user-lock fa-3x text-warning"></i>
          </div>
          <h4 class="font-weight-bold text-dark mb-2">Please Sign In or Register to Proceed to Checkout</h4>
          <p class="text-muted small max-w-500 mx-auto mb-4">
            A JapaLink account is required to link your proxy purchases, assign your package to our Tokyo warehouse, and manage 2nd payment delivery.
          </p>
          <div>
            <button class="btn btn-warning text-white font-weight-bold px-4 py-2 rounded-pill shadow-sm mr-2" data-toggle="modal" data-target="#auth-modal">
              <i class="fas fa-sign-in-alt mr-2"></i> Sign In / Register
            </button>
            <a href="#cart" class="btn btn-outline-dark rounded-pill px-4 py-2">
              Back to Cart
            </a>
          </div>
        </div>
      `;
      return;
    }

    const defaultAddr = (user.addresses && user.addresses.length > 0) ? (user.addresses.find(a => a.isDefault) || user.addresses[0]) : null;

    container.innerHTML = `
      <div class="row">
        <!-- Left: Address & Payment Method -->
        <div class="col-lg-7 mb-4">
          <!-- Step 1: Shipping Address -->
          <div class="card border-0 shadow-sm rounded-xl p-4 bg-white mb-4">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h5 class="font-weight-bold mb-0">
                <span class="badge badge-warning text-white mr-2">Step 1</span> Shipping Address
              </h5>
              ${defaultAddr ? `<span class="badge badge-success"><i class="fas fa-check"></i> Verified</span>` : ''}
            </div>
            
            ${defaultAddr ? `
              <div class="border rounded-lg p-3 mb-3 bg-light">
                <div class="d-flex justify-content-between">
                  <strong class="text-dark">${defaultAddr.name}</strong>
                  <span class="badge badge-secondary">Default Address</span>
                </div>
                <p class="small text-muted mb-1 mt-1">
                  ${defaultAddr.street}, ${defaultAddr.city}, ${defaultAddr.state} ${defaultAddr.zip}, ${defaultAddr.country}<br>
                  <i class="fas fa-phone mr-1"></i> ${defaultAddr.phone}
                </p>
              </div>
              <button class="btn btn-sm btn-outline-dark rounded-pill" onclick="Auth.promptAddAddress(); Router.renderCheckout();">
                <i class="fas fa-edit mr-1"></i> Change / Add Address
              </button>
            ` : `
              <div class="border rounded-lg p-3 mb-3 bg-light text-center py-4">
                <p class="text-muted small mb-2">No shipping address found on your account.</p>
                <button class="btn btn-sm btn-warning text-white rounded-pill font-weight-bold px-3 py-1" onclick="Auth.promptAddAddress(); Router.renderCheckout();">
                  <i class="fas fa-plus mr-1"></i> Add Shipping Address
                </button>
              </div>
            `}
          </div>


          <!-- Step 2: 1st Payment Method -->
          <div class="card border-0 shadow-sm rounded-xl p-4 bg-white">
            <h5 class="font-weight-bold mb-3">
              <span class="badge badge-warning text-white mr-2">Step 2</span> Select 1st Payment Method
            </h5>
            <p class="text-muted small mb-3">Pay for product cost + ¥300 proxy service fee. Secure encrypted payment.</p>

            <div class="payment-methods-list mb-4">
              <div class="custom-control custom-radio mb-3 p-3 border rounded-lg bg-light">
                <input type="radio" id="pay-card" name="payment_method" class="custom-control-input" checked>
                <label class="custom-control-label font-weight-bold d-flex justify-content-between align-items-center w-100" for="pay-card">
                  <span><i class="fas fa-credit-card text-primary mr-2"></i> Credit / Debit Card (Visa, Mastercard, JCB, Amex)</span>
                  <span class="text-muted small">0% Surcharge</span>
                </label>
                <div class="row mt-3">
                  <div class="col-12 mb-2">
                    <input type="text" class="form-control form-control-sm" placeholder="Card Number" value="4532 •••• •••• 8821">
                  </div>
                  <div class="col-6">
                    <input type="text" class="form-control form-control-sm" placeholder="MM/YY" value="08/28">
                  </div>
                  <div class="col-6">
                    <input type="text" class="form-control form-control-sm" placeholder="CVV" value="•••">
                  </div>
                </div>
              </div>

              <div class="custom-control custom-radio mb-3 p-3 border rounded-lg">
                <input type="radio" id="pay-paypal" name="payment_method" class="custom-control-input">
                <label class="custom-control-label font-weight-bold d-flex justify-content-between align-items-center w-100" for="pay-paypal">
                  <span><i class="fab fa-paypal text-primary mr-2"></i> PayPal Express</span>
                  <span class="text-muted small">Instant Confirmation</span>
                </label>
              </div>

              <div class="custom-control custom-radio mb-3 p-3 border rounded-lg">
                <input type="radio" id="pay-wise" name="payment_method" class="custom-control-input">
                <label class="custom-control-label font-weight-bold d-flex justify-content-between align-items-center w-100" for="pay-wise">
                  <span><i class="fas fa-exchange-alt text-success mr-2"></i> Wise / Multi-Currency Transfer</span>
                  <span class="text-muted small">Best Exchange Rate</span>
                </label>
              </div>

              <div class="custom-control custom-radio p-3 border rounded-lg">
                <input type="radio" id="pay-va" name="payment_method" class="custom-control-input">
                <label class="custom-control-label font-weight-bold d-flex justify-content-between align-items-center w-100" for="pay-va">
                  <span><i class="fas fa-university text-dark mr-2"></i> Virtual Account / Bank Transfer</span>
                  <span class="text-muted small">Automatic Matching</span>
                </label>
              </div>
            </div>

            <button type="button" class="btn btn-warning btn-block font-weight-bold py-3 text-white rounded-pill shadow-sm" onclick="Router.processOrderCheckout()">
              <i class="fas fa-lock mr-2"></i> Pay 1st Payment (¥${calc.total1stPaymentJpy.toLocaleString()})
            </button>
          </div>
        </div>

        <!-- Right: Order Summary -->
        <div class="col-lg-5">
          <div class="card border-0 shadow-sm rounded-xl p-4 bg-white sticky-top" style="top: 90px;">
            <h5 class="font-weight-bold mb-3 border-bottom pb-2">Order Items (${calc.totalItems})</h5>
            
            <div class="checkout-items-list mb-3" style="max-height: 280px; overflow-y: auto;">
              ${calc.selectedItems.map(item => `
                <div class="d-flex align-items-center py-2 border-bottom">
                  <img src="${item.image}" class="rounded border mr-3" style="width: 50px; height: 50px; object-fit: cover;" alt="${item.title}">
                  <div class="flex-grow-1 pr-2">
                    <h6 class="small font-weight-bold mb-0 line-clamp-1">${item.title}</h6>
                    <small class="text-muted">${item.storeName} | Qty: ${item.quantity}</small>
                  </div>
                  <div class="text-right">
                    <span class="font-weight-bold small">¥${(item.priceJpy * item.quantity).toLocaleString()}</span>
                  </div>
                </div>
              `).join('')}
            </div>

            <div class="d-flex justify-content-between mb-2 small">
              <span class="text-muted">Items Subtotal</span>
              <span class="font-weight-bold">¥${calc.itemsSubtotalJpy.toLocaleString()}</span>
            </div>
            <div class="d-flex justify-content-between mb-2 small">
              <span class="text-muted">Proxy Service Fees</span>
              <span class="font-weight-bold">¥${calc.proxyFeesJpy.toLocaleString()}</span>
            </div>
            ${calc.photoInspectionFeesJpy > 0 ? `
              <div class="d-flex justify-content-between mb-2 small text-primary">
                <span>HD Photo Inspection</span>
                <span class="font-weight-bold">+¥${calc.photoInspectionFeesJpy.toLocaleString()}</span>
              </div>
            ` : ''}
            <div class="d-flex justify-content-between mb-2 small text-success">
              <span>Free 30-Day Storage</span>
              <span class="font-weight-bold">Included</span>
            </div>

            <hr class="my-3">

            <div class="d-flex justify-content-between align-items-baseline mb-3">
              <div>
                <strong class="h5 font-weight-bold text-dark">Due Now (1st Payment)</strong>
              </div>
              <div class="text-right">
                <span class="h4 font-weight-bold text-primary">¥${calc.total1stPaymentJpy.toLocaleString()}</span>
                <div class="text-muted small">~$${calc.total1stPaymentUsd} USD</div>
              </div>
            </div>

            <div class="alert alert-warning small border-0 rounded-lg p-2 mb-0" style="background: #fff8e6;">
              <i class="fas fa-info-circle mr-1"></i>
              <strong>Reminder:</strong> 2nd Payment (international postage) will be calculated and billed once all goods arrive at Tokyo warehouse.
            </div>
          </div>
        </div>
      </div>
    `;
  },

  processOrderCheckout() {
    const calc = Cart.getCalculations();
    const orderId = 'JL-' + Math.floor(10000 + Math.random() * 90000);

    const newOrder = {
      orderId: orderId,
      date: 'October 23, 2024',
      store: calc.selectedItems.map(i => i.storeName).filter((v, i, a) => a.indexOf(v) === i).join(', '),
      status: 'purchased',
      statusLabel: 'Purchased by Tokyo Agent (Domestic Transit)',
      statusBadge: 'badge-info',
      items: calc.selectedItems.map(i => ({
        title: i.title,
        priceJpy: i.priceJpy,
        quantity: i.quantity,
        image: i.image
      })),
      firstPaymentPaid: calc.total1stPaymentJpy,
      freeStorageDaysLeft: 30
    };

    Auth.addOrder(newOrder);
    Cart.clearCart();

    // Show Success Modal
    $('#order-success-modal').modal('show');
    const orderIdEl = document.getElementById('success-order-id');
    const orderTotalEl = document.getElementById('success-order-total');
    if (orderIdEl) orderIdEl.textContent = orderId;
    if (orderTotalEl) orderTotalEl.textContent = `¥${calc.total1stPaymentJpy.toLocaleString()} (~$${calc.total1stPaymentUsd} USD)`;
  },

  renderCalculator() {
    const view = document.getElementById('view-calculator');
    if (!view) return;
    view.classList.remove('d-none');
    ShippingCalculator.renderCalculator();
  },

  renderHowToBuy() {
    const view = document.getElementById('view-how-to-buy');
    if (view) view.classList.remove('d-none');
  },

  renderFees() {
    const view = document.getElementById('view-fees');
    if (view) view.classList.remove('d-none');
  },

  renderShippingInfo() {
    const view = document.getElementById('view-shipping');
    if (view) view.classList.remove('d-none');
  },

  renderCreditsMall() {
    const view = document.getElementById('view-credits-mall');
    if (view) view.classList.remove('d-none');
  },

  renderDiscounts() {
    const view = document.getElementById('view-discounts');
    if (view) view.classList.remove('d-none');
  },

  renderFAQ() {
    const view = document.getElementById('view-faq');
    if (view) view.classList.remove('d-none');
  },

  renderProfile() {
    const view = document.getElementById('view-profile');
    if (!view) return;
    view.classList.remove('d-none');
    Auth.renderProfileView();
  }
};

window.Router = Router;
