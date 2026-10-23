/**
 * JapaLink - User Authentication, Profile, Address Book & Proxy Orders
 * Starts in a clean, empty state until the user logs in or registers.
 */

const Auth = {
  USER_KEY: 'japalink_user_profile',
  ORDERS_KEY: 'japalink_user_orders',

  getCurrentUser() {
    try {
      const stored = localStorage.getItem(this.USER_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Error reading user', e);
    }
    // Default initial user state: empty and not logged in
    const initialUser = {
      isLoggedIn: false,
      name: '',
      email: '',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      tier: 'Standard Member',
      tierDiscount: 'Member Benefits',
      japaPoints: 0,
      phone: '',
      addresses: []
    };
    return initialUser;
  },

  saveUser(user) {
    try {
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    } catch (e) {
      console.error('Error saving user', e);
    }
    this.updateUserUI();
  },

  getOrders() {
    try {
      const stored = localStorage.getItem(this.ORDERS_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Error reading orders', e);
    }
    // Initial state: empty orders for a new user
    return [];
  },

  saveOrders(orders) {
    try {
      localStorage.setItem(this.ORDERS_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error('Error saving orders', e);
    }
  },

  addOrder(newOrder) {
    const orders = this.getOrders();
    orders.unshift(newOrder);
    this.saveOrders(orders);
  },

  login(email, password) {
    if (!email || !password) {
      Cart.showToast('Please enter both email and password.');
      return { success: false, message: 'Please enter both email and password.' };
    }
    const user = this.getCurrentUser();
    user.isLoggedIn = true;
    user.email = email;
    user.name = user.name || email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    user.tier = 'Silver Member';
    user.tierDiscount = '5% Shipping Discount';
    user.japaPoints = 500;
    if (!user.addresses || user.addresses.length === 0) {
      user.addresses = [
        {
          id: 'addr-01',
          name: user.name,
          street: '742 Evergreen Terrace, Apt 4B',
          city: 'Springfield',
          state: 'OR',
          zip: '97477',
          country: 'United States',
          phone: '+1 (555) 234-5678',
          isDefault: true
        }
      ];
    }
    this.saveUser(user);
    Cart.showToast(`Welcome back, ${user.name}!`);
    this.updateUserUI();
    $('#auth-modal').modal('hide');

    if (window.location.hash === '#profile') {
      this.renderProfileView();
    } else if (window.location.hash === '#checkout') {
      Router.renderCheckout();
    }
    return { success: true, user };
  },

  register(name, email, password) {
    if (!name || !email || !password) {
      Cart.showToast('All fields are required.');
      return { success: false, message: 'All fields are required.' };
    }
    const user = this.getCurrentUser();
    user.isLoggedIn = true;
    user.name = name;
    user.email = email;
    user.tier = 'New Member';
    user.tierDiscount = '10% Welcome Shipping Coupon';
    user.japaPoints = 100; // Welcome signup bonus
    user.addresses = [
      {
        id: 'addr-' + Date.now(),
        name: name,
        street: '123 Global Shipping Lane',
        city: 'Tokyo Hub',
        state: 'Tokyo',
        zip: '100-0001',
        country: 'United States',
        phone: '+1 (555) 123-4567',
        isDefault: true
      }
    ];
    this.saveUser(user);
    Cart.showToast(`Account created! Welcome to JapaLink, ${name}.`);
    this.updateUserUI();
    $('#auth-modal').modal('hide');
    window.location.hash = '#profile';
    return { success: true, user };
  },

  logout() {
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem(this.ORDERS_KEY);
    Cart.showToast('You have signed out successfully.');
    this.updateUserUI();
    window.location.hash = '#home';
  },

  updateUserUI() {
    const user = this.getCurrentUser();
    const profileBtn = document.getElementById('header-profile-btn');
    
    if (profileBtn) {
      if (user && user.isLoggedIn && user.name) {
        profileBtn.removeAttribute('data-toggle');
        profileBtn.removeAttribute('data-target');
        profileBtn.setAttribute('href', '#profile');
        profileBtn.setAttribute('title', `Account: ${user.name}`);
        profileBtn.innerHTML = `
          <div class="user-avatar-pill d-flex align-items-center">
            <img src="${user.avatar}" class="rounded-circle mr-1 border border-white" style="width: 26px; height: 26px; object-fit: cover;" alt="${user.name}">
            <span class="d-none d-lg-inline text-white font-weight-bold small">${user.name.split(' ')[0]}</span>
          </div>
        `;
      } else {
        profileBtn.setAttribute('data-toggle', 'modal');
        profileBtn.setAttribute('data-target', '#auth-modal');
        profileBtn.setAttribute('href', '#auth-modal');
        profileBtn.setAttribute('title', 'Sign In / Register');
        profileBtn.innerHTML = `<i class="far fa-user text-white"></i>`;
      }
    }
  },

  renderProfileView() {
    const container = document.getElementById('profile-view-container');
    if (!container) return;

    const user = this.getCurrentUser();

    // If user is not logged in, prompt to sign in or register
    if (!user || !user.isLoggedIn) {
      container.innerHTML = `
        <div class="card border-0 shadow-sm rounded-xl p-5 text-center bg-white my-4">
          <div class="mb-3">
            <i class="far fa-user-circle fa-4x text-muted opacity-50"></i>
          </div>
          <h3 class="font-weight-bold text-dark mb-2">Sign In to Your JapaLink Account</h3>
          <p class="text-muted small max-w-500 mx-auto mb-4">
            You must sign in or register to create an account, manage saved shipping addresses, and track your Tokyo warehouse orders.
          </p>
          <div>
            <button class="btn btn-warning text-white font-weight-bold px-4 py-2 rounded-pill shadow-sm" data-toggle="modal" data-target="#auth-modal">
              <i class="fas fa-sign-in-alt mr-2"></i> Sign In / Register
            </button>
            <a href="#home" class="btn btn-outline-dark rounded-pill px-4 py-2 ml-2">
              Back to Home
            </a>
          </div>
        </div>
      `;
      return;
    }

    const orders = this.getOrders();

    container.innerHTML = `
      <div class="row">
        <!-- Sidebar Profile Card -->
        <div class="col-lg-4 mb-4">
          <div class="card border-0 shadow-sm rounded-xl overflow-hidden mb-4">
            <div class="card-header bg-gradient-orange p-4 text-white text-center" style="background: linear-gradient(135deg, #ff9a23 0%, #ff7300 100%);">
              <img src="${user.avatar}" class="rounded-circle border border-white shadow mb-3" style="width: 80px; height: 80px; object-fit: cover;" alt="${user.name}">
              <h5 class="font-weight-bold mb-1">${user.name}</h5>
              <p class="small mb-2 text-white-50">${user.email}</p>
              <span class="badge badge-light text-dark font-weight-bold px-3 py-1 rounded-pill">
                <i class="fas fa-crown text-warning mr-1"></i> ${user.tier} (${user.tierDiscount})
              </span>
            </div>
            <div class="card-body p-4">
              <div class="d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom">
                <span class="text-muted"><i class="fas fa-coins text-warning mr-2"></i> JapaPoints Balance</span>
                <span class="font-weight-bold h5 mb-0 text-dark">${user.japaPoints.toLocaleString()} pts</span>
              </div>
              <div class="d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom">
                <span class="text-muted"><i class="fas fa-warehouse text-info mr-2"></i> Tokyo Warehouse Items</span>
                <span class="font-weight-bold text-dark">${orders.filter(o => o.status === 'warehouse_arrived').length} Ready</span>
              </div>
              <div class="d-flex justify-content-between align-items-center mb-4">
                <span class="text-muted"><i class="fas fa-ticket-alt text-success mr-2"></i> Active Coupons</span>
                <span class="badge badge-success">2 Active</span>
              </div>

              <div class="list-group list-group-flush mb-3">
                <a href="#profile-orders" class="list-group-item list-group-item-action border-0 px-0 active font-weight-bold text-warning" onclick="Auth.switchProfileTab('orders')">
                  <i class="fas fa-box mr-2"></i> Proxy Orders & Storage
                </a>
                <a href="#profile-addresses" class="list-group-item list-group-item-action border-0 px-0" onclick="Auth.switchProfileTab('addresses')">
                  <i class="fas fa-map-marked-alt mr-2"></i> Saved Addresses
                </a>
                <a href="#calculator" class="list-group-item list-group-item-action border-0 px-0">
                  <i class="fas fa-calculator mr-2"></i> Shipping Estimator
                </a>
              </div>

              <button class="btn btn-outline-danger btn-block rounded-pill" onclick="Auth.logout()">
                <i class="fas fa-sign-out-alt mr-1"></i> Sign Out
              </button>
            </div>
          </div>
        </div>

        <!-- Main Content Area -->
        <div class="col-lg-8">
          <!-- Orders Tab -->
          <div id="tab-content-orders" class="profile-tab-pane">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h4 class="font-weight-bold mb-0">My Proxy Orders & Warehouse Hauls</h4>
              <span class="badge badge-light border text-muted">${orders.length} Total Orders</span>
            </div>
            <p class="text-muted small mb-4">Track orders through the 5-step JapaLink proxy flow: Purchasing, Tokyo Warehouse Storage, 2nd Payment, and International Delivery.</p>

            ${orders.length === 0 ? `
              <div class="text-center py-5 bg-white rounded-xl border p-4">
                <i class="fas fa-box-open fa-3x text-muted opacity-50 mb-3"></i>
                <h5 class="font-weight-bold">No active proxy orders yet</h5>
                <p class="text-muted small mb-3">Start exploring Mercari, Amazon Japan, Surugaya, or paste a custom Japanese URL to create your first order.</p>
                <a href="#products" class="btn btn-warning text-white font-weight-bold px-4 py-2 rounded-pill shadow-sm">
                  <i class="fas fa-search mr-1"></i> Browse Japanese Products
                </a>
              </div>
            ` : orders.map(order => `
              <div class="card border-0 shadow-sm rounded-xl mb-4 overflow-hidden">
                <div class="card-header bg-light d-flex flex-wrap justify-content-between align-items-center py-3">
                  <div>
                    <span class="font-weight-bold text-dark mr-2">Order #${order.orderId}</span>
                    <small class="text-muted"><i class="far fa-calendar-alt mr-1"></i> ${order.date}</small>
                  </div>
                  <div>
                    <span class="badge ${order.statusBadge} px-3 py-1 font-weight-normal">${order.statusLabel}</span>
                  </div>
                </div>
                <div class="card-body p-3">
                  ${order.items.map(item => `
                    <div class="d-flex align-items-center py-2 border-bottom-last-0">
                      <img src="${item.image}" class="rounded border mr-3" style="width: 60px; height: 60px; object-fit: cover;" alt="${item.title}">
                      <div class="flex-grow-1">
                        <h6 class="font-weight-bold mb-1">${item.title}</h6>
                        <small class="text-muted">Store: <strong>${order.store}</strong> | Qty: ${item.quantity}</small>
                      </div>
                      <div class="text-right">
                        <div class="font-weight-bold">¥${item.priceJpy.toLocaleString()}</div>
                        <small class="text-muted">1st Payment</small>
                      </div>
                    </div>
                  `).join('')}

                  ${order.status === 'warehouse_arrived' ? `
                    <div class="alert alert-warning border-0 rounded-lg p-3 mt-3 mb-0" style="background: #fff8e8;">
                      <div class="d-flex justify-content-between align-items-center mb-2">
                        <span class="font-weight-bold text-dark"><i class="fas fa-weight-hanging text-warning mr-1"></i> Measured Weight: ${order.weightGrams}g</span>
                        <span class="badge badge-success"><i class="fas fa-clock mr-1"></i> ${order.freeStorageDaysLeft} Days Free Storage Left</span>
                      </div>
                      <p class="small text-muted mb-2">Item is safely stored in Tokyo Warehouse. High-resolution inspection photos have been uploaded and verified.</p>
                      <div class="d-flex gap-2">
                        <button class="btn btn-sm btn-outline-dark rounded-pill mr-2" onclick="alert('Viewing 5 HD Inspection Photos: Figure box corners, factory seals, and serial barcode verified in pristine condition!')">
                          <i class="fas fa-camera mr-1"></i> View HD Photos (2)
                        </button>
                        <a href="#calculator" class="btn btn-sm btn-warning text-white rounded-pill font-weight-bold">
                          <i class="fas fa-plane-departure mr-1"></i> Pay 2nd Payment & Ship
                        </a>
                      </div>
                    </div>
                  ` : ''}

                  ${order.status === 'shipped' ? `
                    <div class="bg-light p-3 rounded-lg mt-3 d-flex justify-content-between align-items-center">
                      <div>
                        <small class="text-muted d-block">International Tracking Code</small>
                        <span class="font-weight-bold text-primary font-monospace">${order.trackingNumber}</span>
                      </div>
                      <a href="https://www.dhl.com" target="_blank" class="btn btn-sm btn-outline-primary rounded-pill">
                        Track on DHL <i class="fas fa-external-link-alt ml-1"></i>
                      </a>
                    </div>
                  ` : ''}
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Addresses Tab -->
          <div id="tab-content-addresses" class="profile-tab-pane d-none">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h4 class="font-weight-bold mb-0">Saved Shipping Addresses</h4>
              <button class="btn btn-warning btn-sm text-white rounded-pill font-weight-bold" onclick="Auth.promptAddAddress()">
                <i class="fas fa-plus mr-1"></i> Add New Address
              </button>
            </div>
            <p class="text-muted small mb-4">These addresses are used for international dispatch calculation and courier delivery.</p>

            ${(!user.addresses || user.addresses.length === 0) ? `
              <div class="text-center py-4 bg-white rounded-xl border p-4">
                <i class="fas fa-map-marker-alt fa-2x text-muted opacity-50 mb-2"></i>
                <p class="text-muted small mb-3">No shipping addresses saved yet.</p>
                <button class="btn btn-warning btn-sm text-white rounded-pill font-weight-bold" onclick="Auth.promptAddAddress()">
                  <i class="fas fa-plus mr-1"></i> Add Address
                </button>
              </div>
            ` : `
              <div class="row">
                ${user.addresses.map(addr => `
                  <div class="col-md-6 mb-3">
                    <div class="card border rounded-xl p-3 h-100 ${addr.isDefault ? 'border-warning shadow-sm' : ''}">
                      <div class="d-flex justify-content-between align-items-start mb-2">
                        <h6 class="font-weight-bold mb-0">${addr.name}</h6>
                        ${addr.isDefault ? `<span class="badge badge-warning text-white">Default Address</span>` : ''}
                      </div>
                      <p class="small text-muted mb-2">
                        ${addr.street}<br>
                        ${addr.city}, ${addr.state} ${addr.zip}<br>
                        <strong>${addr.country}</strong><br>
                        <i class="fas fa-phone mr-1 mt-1"></i> ${addr.phone}
                      </p>
                      <div class="mt-auto pt-2 border-top d-flex justify-content-between">
                        <button class="btn btn-sm btn-link text-muted p-0" onclick="alert('Edit address')">Edit</button>
                        ${!addr.isDefault ? `<button class="btn btn-sm btn-link text-primary p-0" onclick="alert('Set as default shipping address')">Set Default</button>` : ''}
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            `}
          </div>
        </div>
      </div>
    `;
  },

  promptAddAddress() {
    const name = prompt('Recipient Name:', this.getCurrentUser().name || 'Full Name');
    if (!name) return;
    const street = prompt('Street Address:', '123 Main Street, Apt 1');
    if (!street) return;
    const city = prompt('City:', 'New York');
    const country = prompt('Country:', 'United States');
    const phone = prompt('Phone Number:', '+1 555-123-4567');

    const user = this.getCurrentUser();
    if (!user.addresses) user.addresses = [];
    user.addresses.push({
      id: 'addr-' + Date.now(),
      name,
      street,
      city: city || 'City',
      state: 'State',
      zip: '10001',
      country: country || 'United States',
      phone: phone || '+1 555-000-0000',
      isDefault: user.addresses.length === 0
    });
    this.saveUser(user);
    this.renderProfileView();
    Cart.showToast('Shipping address added successfully!');
  },

  switchProfileTab(tabName) {
    const ordersTab = document.getElementById('tab-content-orders');
    const addressesTab = document.getElementById('tab-content-addresses');
    if (!ordersTab || !addressesTab) return;

    if (tabName === 'addresses') {
      ordersTab.classList.add('d-none');
      addressesTab.classList.remove('d-none');
    } else {
      addressesTab.classList.add('d-none');
      ordersTab.classList.remove('d-none');
    }
  }
};

window.Auth = Auth;
