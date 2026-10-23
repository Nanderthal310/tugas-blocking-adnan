/**
 * JapaLink - International Shipping Fee Calculator
 * Interactive calculation for DHL Express, FedEx, EMS, Airmail, and Surface Seamail
 */

const ShippingCalculator = {
  activeCoupon: null,

  calculate(weightGrams, countryCode, dimensions = { l: 25, w: 20, h: 15 }, couponCode = '') {
    const zones = JAPALINK_DATA.shippingRates.zones;
    const country = zones[countryCode] || zones['US'];

    // Volumetric weight (L x W x H cm / 5000) * 1000 to get grams
    const volumetricGrams = Math.round((dimensions.l * dimensions.w * dimensions.h / 5000) * 1000);
    // Express carriers use the greater of actual vs volumetric weight
    const billableWeightExpress = Math.max(weightGrams, volumetricGrams);

    // Progressive weight multiplier factor
    const weightFactor = billableWeightExpress / 1000;
    const actualFactor = weightGrams / 1000;

    // Base rates calculation
    let dhl = Math.round(country.dhlBase + (weightFactor * 1450));
    let fedex = Math.round(country.fedexBase + (weightFactor * 1380));
    let ems = Math.round(country.emsBase + (actualFactor * 1200)); // EMS relies primarily on actual weight up to max limit
    let airmail = Math.round(1800 + (actualFactor * 900));
    let surface = Math.round(country.surfaceBase + (actualFactor * 550));

    // Promo Coupon logic
    let discountPercent = 0;
    let couponMessage = '';
    const cleanCoupon = (couponCode || '').trim().toUpperCase();

    if (cleanCoupon === 'JAPALINK20' || cleanCoupon === '20OFF') {
      discountPercent = 20;
      couponMessage = '20% OFF Shipping Discount Applied! 🎉';
      this.activeCoupon = 'JAPALINK20';
    } else if (cleanCoupon === 'WELCOME500') {
      discountPercent = 10;
      couponMessage = '10% New Member Voucher Applied! 🎁';
      this.activeCoupon = 'WELCOME500';
    } else if (cleanCoupon) {
      couponMessage = 'Invalid coupon code';
    }

    const applyDiscount = (amount) => {
      const discount = Math.round(amount * (discountPercent / 100));
      return {
        original: amount,
        discount: discount,
        final: amount - discount,
        finalUsd: ((amount - discount) / 151).toFixed(2)
      };
    };

    return {
      country: country.name,
      countryCode: countryCode,
      actualWeight: weightGrams,
      volumetricWeight: volumetricGrams,
      billableWeightExpress: billableWeightExpress,
      discountPercent,
      couponMessage,
      couponCode: this.activeCoupon,
      carriers: [
        {
          id: 'dhl',
          name: 'DHL Express Worldwide',
          badge: 'Fastest & Recommended',
          badgeClass: 'badge-warning text-white',
          icon: 'fas fa-plane-departure text-warning',
          transitTime: '2 - 4 Business Days',
          pricing: applyDiscount(dhl),
          features: ['Door-to-door tracking', 'Signature required', 'Insurance included', 'Fast customs clearance']
        },
        {
          id: 'fedex',
          name: 'FedEx International Priority',
          badge: 'Reliable Express',
          badgeClass: 'badge-primary',
          icon: 'fas fa-shipping-fast text-primary',
          transitTime: '3 - 5 Business Days',
          pricing: applyDiscount(fedex),
          features: ['Full online tracking', 'Daily Tokyo airport departure', 'Careful fragile handling']
        },
        {
          id: 'ems',
          name: 'Japan Post EMS (Express Mail)',
          badge: 'Popular Choice',
          badgeClass: 'badge-info',
          icon: 'fas fa-mail-bulk text-info',
          transitTime: '4 - 7 Business Days',
          pricing: applyDiscount(ems),
          features: ['Official Japan Post partner', 'National postal network', 'No remote area surcharges']
        },
        {
          id: 'airmail',
          name: 'Japan Post Airmail Small Packet',
          badge: 'Economical Air',
          badgeClass: 'badge-secondary',
          icon: 'fas fa-paper-plane text-secondary',
          transitTime: '7 - 14 Business Days',
          pricing: applyDiscount(airmail),
          features: ['Cost-effective for small goods (< 2kg)', 'Basic tracking available']
        },
        {
          id: 'surface',
          name: 'Japan Post Surface Seamail',
          badge: 'Cheapest for Heavy Parcels',
          badgeClass: 'badge-success',
          icon: 'fas fa-ship text-success',
          transitTime: '30 - 60 Days',
          pricing: applyDiscount(surface),
          features: ['Maximum savings on bulky figure collections', 'Economical sea freight', 'Inspected packaging']
        }
      ]
    };
  },

  renderCalculator() {
    const container = document.getElementById('shipping-calc-container');
    if (!container) return;

    const countries = JAPALINK_DATA.shippingRates.zones;

    let countryOptions = '';
    for (const [code, c] of Object.entries(countries)) {
      countryOptions += `<option value="${code}" ${code === 'US' ? 'selected' : ''}>${c.name}</option>`;
    }

    container.innerHTML = `
      <div class="row">
        <!-- Input Form -->
        <div class="col-lg-5 mb-4">
          <div class="card border-0 shadow-sm rounded-xl p-4 bg-white">
            <h4 class="font-weight-bold mb-3 d-flex align-items-center">
              <span class="calc-icon-badge mr-2"><i class="fas fa-calculator text-danger"></i></span>
              Shipping Fee Estimator
            </h4>
            <p class="text-muted small mb-4">
              Get an accurate estimate for international delivery from our Tokyo warehouse to your doorstep across all top carriers.
            </p>

            <form id="calc-form" onsubmit="event.preventDefault(); ShippingCalculator.runCalculation();">
              <div class="form-group">
                <label class="font-weight-bold small text-muted">DESTINATION COUNTRY</label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text bg-light border-right-0"><i class="fas fa-globe text-primary"></i></span>
                  </div>
                  <select class="form-control border-left-0" id="calc-country" onchange="ShippingCalculator.runCalculation()">
                    ${countryOptions}
                  </select>
                </div>
              </div>

              <div class="form-group">
                <label class="font-weight-bold small text-muted">PARCEL WEIGHT</label>
                <div class="input-group">
                  <input type="number" class="form-control" id="calc-weight" value="1200" min="100" max="30000" step="50" oninput="ShippingCalculator.runCalculation()">
                  <div class="input-group-append">
                    <span class="input-group-text bg-light font-weight-bold">Grams (g)</span>
                  </div>
                </div>
                <div class="d-flex justify-content-between mt-1">
                  <small class="text-muted">Common: Figure ~800g | Gunpla ~900g | Manga Vol ~200g</small>
                  <small class="text-primary font-weight-bold" id="weight-kg-label">1.20 kg</small>
                </div>
              </div>

              <div class="form-group mb-4">
                <label class="font-weight-bold small text-muted">PARCEL DIMENSIONS (L × W × H cm)</label>
                <div class="row">
                  <div class="col-4">
                    <input type="number" class="form-control text-center" id="calc-len" value="28" min="5" max="150" placeholder="L (cm)" oninput="ShippingCalculator.runCalculation()">
                  </div>
                  <div class="col-4">
                    <input type="number" class="form-control text-center" id="calc-wid" value="20" min="5" max="150" placeholder="W (cm)" oninput="ShippingCalculator.runCalculation()">
                  </div>
                  <div class="col-4">
                    <input type="number" class="form-control text-center" id="calc-hei" value="16" min="5" max="150" placeholder="H (cm)" oninput="ShippingCalculator.runCalculation()">
                  </div>
                </div>
                <small class="text-muted mt-1 d-block">Used to calculate volumetric weight for express air freight.</small>
              </div>

              <div class="form-group mb-4">
                <label class="font-weight-bold small text-muted">PROMO / VOUCHER CODE</label>
                <div class="input-group">
                  <input type="text" class="form-control text-uppercase" id="calc-coupon" placeholder="e.g. JAPALINK20" value="JAPALINK20">
                  <div class="input-group-append">
                    <button class="btn btn-warning text-white font-weight-bold px-3" type="button" onclick="ShippingCalculator.runCalculation()">
                      Apply
                    </button>
                  </div>
                </div>
                <div id="coupon-alert-msg" class="mt-2 small text-success font-weight-bold"></div>
              </div>

              <button type="submit" class="btn btn-warning btn-block py-3 text-white font-weight-bold rounded-pill shadow-sm">
                <i class="fas fa-sync-alt mr-2"></i> Recalculate Shipping Rates
              </button>
            </form>
          </div>
        </div>

        <!-- Results Display -->
        <div class="col-lg-7">
          <div class="card border-0 shadow-sm rounded-xl p-4 bg-white mb-4">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h5 class="font-weight-bold mb-0">Carrier Comparison</h5>
              <span class="badge badge-success px-3 py-2 rounded-pill font-weight-bold" id="calc-destination-badge">
                <i class="fas fa-map-marker-alt mr-1"></i> Shipping to United States
              </span>
            </div>
            <p class="text-muted small mb-3">Rates are estimated in real-time from Tokyo Warehouse. Choose your preferred speed and budget.</p>

            <div id="calc-results-list" class="carrier-results-container">
              <!-- Dynamically populated -->
            </div>
          </div>

          <!-- Free Storage Benefit Notice -->
          <div class="alert alert-info border-0 rounded-xl p-4 d-flex align-items-center shadow-sm" style="background: #eef7fc;">
            <div class="mr-3 text-info">
              <i class="fas fa-boxes fa-3x"></i>
            </div>
            <div>
              <h6 class="font-weight-bold text-dark mb-1">Consolidate Multiple Orders & Save Up to 70%</h6>
              <p class="small text-muted mb-0">
                You get <strong>30 days of free storage</strong> at our Tokyo warehouse. Collect items from Mercari, Amazon, and Surugaya, then combine them into one parcel before international dispatch!
              </p>
            </div>
          </div>
        </div>
      </div>
    `;

    this.runCalculation();
  },

  runCalculation() {
    const weightInput = document.getElementById('calc-weight');
    const countryInput = document.getElementById('calc-country');
    const lenInput = document.getElementById('calc-len');
    const widInput = document.getElementById('calc-wid');
    const heiInput = document.getElementById('calc-hei');
    const couponInput = document.getElementById('calc-coupon');
    const resultsContainer = document.getElementById('calc-results-list');
    const couponAlert = document.getElementById('coupon-alert-msg');
    const kgLabel = document.getElementById('weight-kg-label');
    const destBadge = document.getElementById('calc-destination-badge');

    if (!weightInput || !countryInput || !resultsContainer) return;

    const weight = parseInt(weightInput.value, 10) || 1000;
    const country = countryInput.value || 'US';
    const l = parseFloat(lenInput.value) || 25;
    const w = parseFloat(widInput.value) || 20;
    const h = parseFloat(heiInput.value) || 15;
    const coupon = couponInput ? couponInput.value : '';

    if (kgLabel) {
      kgLabel.textContent = `${(weight / 1000).toFixed(2)} kg`;
    }

    const calcResult = this.calculate(weight, country, { l, w, h }, coupon);

    if (destBadge) {
      destBadge.innerHTML = `<i class="fas fa-map-marker-alt mr-1"></i> Shipping to ${calcResult.country}`;
    }

    if (couponAlert) {
      if (calcResult.discountPercent > 0) {
        couponAlert.innerHTML = `<i class="fas fa-tag mr-1"></i> ${calcResult.couponMessage}`;
        couponAlert.className = 'mt-2 small text-success font-weight-bold';
      } else if (coupon.trim()) {
        couponAlert.innerHTML = `<i class="fas fa-exclamation-circle mr-1"></i> Invalid promo code. Try <code>JAPALINK20</code>`;
        couponAlert.className = 'mt-2 small text-danger font-weight-bold';
      } else {
        couponAlert.innerHTML = '';
      }
    }

    let html = '';
    calcResult.carriers.forEach(carrier => {
      const p = carrier.pricing;
      html += `
        <div class="card mb-3 border carrier-card transition-all rounded-lg overflow-hidden ${carrier.id === 'dhl' ? 'border-warning shadow-sm' : ''}">
          <div class="card-body p-3">
            <div class="row align-items-center">
              <div class="col-md-7">
                <div class="d-flex align-items-center mb-1">
                  <i class="${carrier.icon} fa-lg mr-2"></i>
                  <h6 class="font-weight-bold mb-0">${carrier.name}</h6>
                  <span class="badge ${carrier.badgeClass} ml-2 font-weight-normal">${carrier.badge}</span>
                </div>
                <div class="text-muted small mb-2">
                  <i class="far fa-clock mr-1"></i> Estimated Delivery: <strong>${carrier.transitTime}</strong>
                </div>
                <ul class="list-inline mb-0 small text-muted">
                  ${carrier.features.map(f => `<li class="list-inline-item mr-3"><i class="fas fa-check text-success mr-1"></i>${f}</li>`).join('')}
                </ul>
              </div>
              <div class="col-md-5 text-md-right mt-3 mt-md-0 border-left-md pl-md-4">
                ${p.discount > 0 ? `
                  <div class="text-muted text-decoration-line-through small">¥${p.original.toLocaleString()}</div>
                ` : ''}
                <div class="h4 font-weight-bold text-dark mb-0">
                  ¥${p.final.toLocaleString()}
                  <span class="text-muted font-weight-normal small">JPY</span>
                </div>
                <div class="text-muted small">≈ $${p.finalUsd} USD</div>
                ${p.discount > 0 ? `
                  <span class="badge badge-success-light text-success font-weight-bold mt-1">Saved ¥${p.discount.toLocaleString()} (${calcResult.discountPercent}% OFF)</span>
                ` : ''}
              </div>
            </div>
          </div>
        </div>
      `;
    });

    resultsContainer.innerHTML = html;
  }
};

window.ShippingCalculator = ShippingCalculator;
