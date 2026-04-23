(function () {
    var SELECTORS = {
        itemsWrap: '[data-component-id="cart_items"], #cart_items, [data-smartcart-items]',
        item: 'li[aria-label="product"][role="listitem"], .rebuy-cart__flyout-item',
        info: '.rebuy-cart__flyout-item-info',
        productLink: 'a[href*="/products/"]',
        badge: '.shared-sweeps-rebuy-line-badge'
    };

    var observerPauseCount = 0;

    function pauseObserver() {
        observerPauseCount += 1;
    }

    function resumeObserver() {
        setTimeout(function () {
            observerPauseCount = Math.max(0, observerPauseCount - 1);
        }, 0);
    }

    function debounce(fn, wait) {
        var t;
        return function () {
            clearTimeout(t);
            t = setTimeout(fn, wait);
        };
    }

    function formatNumber(value) {
        try {
            return new Intl.NumberFormat().format(value);
        } catch (e) {
            return String(value);
        }
    }

    function formatMultiplier(value) {
        var num = parseFloat(value);
        if (isNaN(num)) return '1';
        if (Math.abs(num - Math.round(num)) < 0.000001) return String(Math.round(num));
        return num.toFixed(2).replace(/\.?0+$/, '');
    }

    function normalizeText(value) {
        return String(value || '')
            .replace(/\s+/g, ' ')
            .trim()
            .toLowerCase();
    }

    function parseProductLink(node) {
        var link = node.querySelector(SELECTORS.productLink);
        if (!link) return { handle: '', variantId: '' };

        try {
            var url = new URL(link.getAttribute('href'), window.location.origin);
            var match = url.pathname.match(/\/products\/([^\/?#]+)/i);

            return {
                handle: match ? match[1] : '',
                variantId: url.searchParams.get('variant') || ''
            };
        } catch (e) {
            return { handle: '', variantId: '' };
        }
    }

    function shouldShowBadge(cartItem) {
        var props = cartItem && cartItem.properties ? cartItem.properties : {};
        return String(props._ss_eligible || '').toLowerCase() === 'true';
    }

    function getEntries(cartItem) {
        var props = cartItem.properties || {};
        var multValue = parseFloat(props._ss_mult || '1') || 1;
        var bonus = parseFloat(props._ss_bonus || '0') || 0;
        var divisor = parseFloat(props._ss_entry_divisor || '1') || 1;
        var overrideUnitPrice =
            props._ss_override_unit_price !== '' && props._ss_override_unit_price != null
                ? parseFloat(props._ss_override_unit_price || '0')
                : null;

        var qty = parseInt(cartItem.quantity || 1, 10) || 1;

        var basePrice = 0;
        if (overrideUnitPrice !== null && !isNaN(overrideUnitPrice) && overrideUnitPrice > 0) {
            basePrice = overrideUnitPrice * qty;
        } else {
            basePrice = ((cartItem.original_price || cartItem.price || 0) / 100) * qty;
        }

        var rawBaseEntries = basePrice / divisor;
        var flooredBaseEntries = Math.floor(rawBaseEntries);
        var hasDecimalRemainder = Math.abs(rawBaseEntries - flooredBaseEntries) > 0.000001;
        var baseEntries = hasDecimalRemainder ? flooredBaseEntries + 1 : flooredBaseEntries;

        var entries = Math.floor(baseEntries * multValue);

        if (entries < 1 && basePrice > 0) entries = 1;
        if (bonus > 0) entries += bonus;

        return {
            entries: entries,
            noun: entries === 1 ? 'ENTRY' : 'ENTRIES',
            mult: formatMultiplier(multValue) + '×',
            showMultiplier: multValue > 1
        };
    }

    function buildBadge(data) {
        var el = document.createElement('div');
        el.className =
            'shared-sweeps-rebuy-line-badge' +
            (data.showMultiplier ? ' shared-sweeps-rebuy-line-badge--has-mult' : '');

        el.setAttribute(
            'aria-label',
            (data.showMultiplier ? data.mult + ', ' : '') + formatNumber(data.entries) + ' ' + data.noun.toLowerCase()
        );

        el.innerHTML =
            '<span class="shared-sweeps-rebuy-line-badge__copy">' +
            '<span class="shared-sweeps-rebuy-line-badge__count">' + formatNumber(data.entries) + '</span>' +
            '<span class="shared-sweeps-rebuy-line-badge__noun">' + data.noun + '</span>' +
            '</span>' +
            (data.showMultiplier
                ? '<span class="shared-sweeps-rebuy-line-badge__mult">' + data.mult + '</span>'
                : '');

        return el;
    }

    function injectStyles() {
        if (document.getElementById('shared-sweeps-rebuy-line-badge-styles')) return;

        var style = document.createElement('style');
        style.id = 'shared-sweeps-rebuy-line-badge-styles';
        style.textContent = `
      .shared-sweeps-rebuy-line-badge{
        --sweeps-accent:#d8c4aa;
        --sweeps-accent-strong:#b59672;
        --sweeps-text:#b59672;
        --sweeps-mult:#111111;
        position:relative;
        display:inline-grid;
        grid-template-columns:auto;
        align-items:stretch;
        min-height:32px;
        margin:8px 0 10px;
        background:#ffffff;
        border:1px solid var(--sweeps-accent);
        box-shadow:0 2px 8px rgba(0,0,0,.05);
        overflow:hidden;
        max-width:100%;
        box-sizing:border-box;
      }

      .shared-sweeps-rebuy-line-badge--has-mult{
        grid-template-columns:auto auto;
      }

      .shared-sweeps-rebuy-line-badge__copy{
        display:grid;
        grid-auto-flow:column;
        grid-auto-columns:max-content;
        align-items:center;
        justify-content:center;
        column-gap:5px;
        padding:0 12px;
        white-space:nowrap;
        text-transform:uppercase;
        color:var(--sweeps-text);
        font-weight:700;
        line-height:1;
        box-sizing:border-box;
      }

      .shared-sweeps-rebuy-line-badge__noun,
      .shared-sweeps-rebuy-line-badge__count{
        display:inline-flex;
        align-items:center;
        justify-content:center;
        font-size:13px;
        line-height:1;
        letter-spacing:.04em;
        text-transform:uppercase;
        font-weight:700;
      }

      .shared-sweeps-rebuy-line-badge__noun{
        color:var(--sweeps-text);
      }

      .shared-sweeps-rebuy-line-badge__count{
        min-width:auto;
        text-align:center;
        color:var(--sweeps-accent-strong);
        letter-spacing:.01em;
        font-variant-numeric:lining-nums tabular-nums;
        font-feature-settings:"lnum" 1, "tnum" 1;
      }

      .shared-sweeps-rebuy-line-badge__mult{
        display:flex;
        align-items:center;
        justify-content:center;
        min-width:0;
        padding:0 12px 0 10px;
        background:#ffffff;
        color:var(--sweeps-mult);
        border-left:1px solid var(--sweeps-accent);
        font-family:"Helvetica Neue", Helvetica, Arial, sans-serif;
        font-size:15px;
        font-weight:600;
        line-height:1;
        letter-spacing:0;
        text-align:center;
        text-transform:none;
        font-variant-numeric:lining-nums tabular-nums;
        font-feature-settings:"lnum" 1, "tnum" 1;
        box-sizing:border-box;
      }

      @media (max-width: 749px){
        .shared-sweeps-rebuy-line-badge{
          grid-template-columns:minmax(0,1fr);
          min-height:28px;
          margin:8px 0 8px;
        }

        .shared-sweeps-rebuy-line-badge--has-mult{
          grid-template-columns:minmax(0,1fr) auto;
        }

        .shared-sweeps-rebuy-line-badge__copy{
          column-gap:4px;
          padding:0 8px;
        }

        .shared-sweeps-rebuy-line-badge__noun,
        .shared-sweeps-rebuy-line-badge__count{
          font-size:11px;
          letter-spacing:.03em;
        }

        .shared-sweeps-rebuy-line-badge__mult{
          min-width:0;
          padding:0 8px 0 6px;
          font-size:12px;
          font-weight:600;
        }
      }
    `;
        document.head.appendChild(style);
    }

    function findMatchingCartItem(node, cartItems, usedIndexes) {
        var productRef = parseProductLink(node);
        var nodeText = normalizeText(node.textContent);

        for (var i = 0; i < cartItems.length; i++) {
            if (usedIndexes[i]) continue;

            var item = cartItems[i];
            if (!shouldShowBadge(item)) continue;

            if (productRef.variantId && String(item.variant_id) === String(productRef.variantId)) {
                usedIndexes[i] = true;
                return item;
            }
        }

        for (var j = 0; j < cartItems.length; j++) {
            if (usedIndexes[j]) continue;

            var itemByHandle = cartItems[j];
            if (!shouldShowBadge(itemByHandle)) continue;

            if (productRef.handle && String(itemByHandle.handle) === String(productRef.handle)) {
                usedIndexes[j] = true;
                return itemByHandle;
            }
        }

        for (var k = 0; k < cartItems.length; k++) {
            if (usedIndexes[k]) continue;

            var fallbackItem = cartItems[k];
            if (!shouldShowBadge(fallbackItem)) continue;

            var title = normalizeText(fallbackItem.product_title || fallbackItem.title || '');
            if (title && nodeText.indexOf(title.slice(0, 16)) !== -1) {
                usedIndexes[k] = true;
                return fallbackItem;
            }
        }

        return null;
    }

    function renderBadges(cart) {
        injectStyles();

        var itemsWrap = document.querySelector(SELECTORS.itemsWrap);
        if (!itemsWrap || !cart || !cart.items || !cart.items.length) return;

        var itemNodes = itemsWrap.querySelectorAll(SELECTORS.item);
        if (!itemNodes.length) return;

        pauseObserver();

        try {
            itemNodes.forEach(function (node) {
                var existing = node.querySelector(SELECTORS.badge);
                if (existing) existing.remove();
            });

            var usedIndexes = {};

            itemNodes.forEach(function (node) {
                var cartItem = findMatchingCartItem(node, cart.items, usedIndexes);
                if (!cartItem) return;

                var data = getEntries(cartItem);
                if (!data.entries || data.entries < 1) return;

                var mount = node.querySelector(SELECTORS.info) || node;
                mount.appendChild(buildBadge(data));
            });
        } finally {
            resumeObserver();
        }
    }

    function loadCartAndRender() {
        fetch('/cart.js', { credentials: 'same-origin' })
            .then(function (res) { return res.json(); })
            .then(function (cart) { renderBadges(cart); })
            .catch(function (err) {
                console.warn('Shared sweeps cart badge error:', err);
            });
    }

    var debouncedRender = debounce(loadCartAndRender, 120);

    function initObserver() {
        if (document.body.__sharedSweepsRebuyObserver) return;
        document.body.__sharedSweepsRebuyObserver = true;

        var observer = new MutationObserver(function (mutations) {
            if (observerPauseCount > 0) return;

            var shouldRerender = mutations.some(function (mutation) {
                var added = Array.prototype.slice.call(mutation.addedNodes || []);
                var removed = Array.prototype.slice.call(mutation.removedNodes || []);
                var changedNodes = added.concat(removed);

                return changedNodes.some(function (node) {
                    if (!node || node.nodeType !== 1) return false;

                    if (
                        node.id === 'shared-sweeps-rebuy-line-badge-styles' ||
                        (node.classList && node.classList.contains('shared-sweeps-rebuy-line-badge')) ||
                        (node.querySelector && node.querySelector(SELECTORS.badge))
                    ) {
                        return false;
                    }

                    return true;
                });
            });

            if (shouldRerender) {
                debouncedRender();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    function init() {
        injectStyles();
        loadCartAndRender();
        initObserver();

        document.addEventListener('rebuy:smartcart.show', loadCartAndRender, true);
        document.addEventListener('rebuy:cart.change', loadCartAndRender, true);
        document.addEventListener('cart:refresh', loadCartAndRender, true);
        document.addEventListener('cart:item-added', loadCartAndRender, true);
        document.addEventListener('cart:open', loadCartAndRender, true);

        setTimeout(loadCartAndRender, 600);
        setTimeout(loadCartAndRender, 1200);
        setTimeout(loadCartAndRender, 2000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();