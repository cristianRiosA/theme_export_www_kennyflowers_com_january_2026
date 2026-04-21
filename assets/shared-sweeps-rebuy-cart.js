(function () {
    var SELECTORS = {
        itemsWrap: '[data-component-id="cart_items"], #cart_items, [data-smartcart-items]',
        item: 'li[aria-label="product"][role="listitem"], .rebuy-cart__flyout-item',
        info: '.rebuy-cart__flyout-item-info',
        productLink: 'a[href*="/products/"]',
        badge: '.shared-sweeps-rebuy-line-badge',
        infoWrap: '.shared-sweeps-rebuy-line-badge__info-wrap',
        tooltip: '.shared-sweeps-rebuy-line-badge__tooltip'
    };

    var HELPER_TEXT = 'Every $1 = 1 entry to the Dream Vacation Giveaway';
    var MOBILE_BREAKPOINT = 749;

    var observerPauseCount = 0;
    var tooltipEventsBound = false;

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

    function isMobileViewport() {
        return window.innerWidth <= MOBILE_BREAKPOINT;
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
        el.setAttribute('aria-label', formatNumber(data.entries) + ' ' + data.noun.toLowerCase());

        el.innerHTML =
            '<span class="shared-sweeps-rebuy-line-badge__copy">' +
            '<span class="shared-sweeps-rebuy-line-badge__count">' + formatNumber(data.entries) + '</span>' +
            '<span class="shared-sweeps-rebuy-line-badge__noun">' + data.noun + '</span>' +
            '<span class="shared-sweeps-rebuy-line-badge__info-wrap" aria-label="' + HELPER_TEXT.replace(/"/g, '&quot;') + '" aria-expanded="false" role="button" tabindex="0">' +
            '<span class="shared-sweeps-rebuy-line-badge__info-icon" aria-hidden="true">' +
            '<svg viewBox="0 0 16 16" focusable="false" aria-hidden="true">' +
            '<circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" stroke-width="1.25"></circle>' +
            '<circle cx="8" cy="4.7" r="1" fill="currentColor"></circle>' +
            '<path d="M8 7.2V11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>' +
            '</svg>' +
            '</span>' +
            '<span class="shared-sweeps-rebuy-line-badge__tooltip">' + HELPER_TEXT + '</span>' +
            '</span>' +
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
        --sweeps-accent:#88b5b0;
        --sweeps-accent-strong:#7ea59f;
        --sweeps-text:#66707a;
        position:relative;
        display:inline-grid;
        grid-template-columns:auto;
        align-items:stretch;
        min-height:32px;
        margin-top:8px;
        background:#ffffff;
        border:1px solid var(--sweeps-accent);
        box-shadow:0 2px 8px rgba(0,0,0,.05);
        overflow:visible;
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
        overflow:visible;
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

      .shared-sweeps-rebuy-line-badge__info-wrap{
        position:relative;
        display:inline-flex;
        align-items:center;
        justify-content:center;
        align-self:center;
        width:16px;
        min-width:16px;
        height:16px;
        margin-left:4px;
        pointer-events:auto;
        cursor:help;
        outline:none;
      }

      .shared-sweeps-rebuy-line-badge__info-icon{
        display:inline-flex;
        align-items:center;
        justify-content:center;
        width:16px;
        min-width:16px;
        height:16px;
        color:var(--sweeps-accent);
        line-height:0;
        box-sizing:border-box;
      }

      .shared-sweeps-rebuy-line-badge__info-icon svg{
        display:block;
        width:16px;
        height:16px;
      }

      .shared-sweeps-rebuy-line-badge__tooltip{
        position:absolute;
        left:50%;
        bottom:calc(100% + 10px);
        transform:translateX(-50%);
        z-index:1004;
        width:max-content;
        min-width:240px;
        max-width:260px;
        padding:10px 12px;
        background:rgba(255,255,255,.98);
        border:1px solid var(--sweeps-accent);
        box-shadow:0 6px 18px rgba(0,0,0,.10);
        color:var(--sweeps-text);
        font-size:13px;
        font-weight:700;
        line-height:1.35;
        letter-spacing:.01em;
        text-transform:none;
        white-space:normal;
        text-align:center;
        box-sizing:border-box;
        opacity:0;
        visibility:hidden;
        pointer-events:none;
        transition:opacity .18s ease, visibility .18s ease;
      }

      .shared-sweeps-rebuy-line-badge__info-wrap[data-open="true"] .shared-sweeps-rebuy-line-badge__tooltip{
        opacity:1;
        visibility:visible;
      }

      .shared-sweeps-rebuy-line-badge__mult{
        display:flex;
        align-items:center;
        justify-content:center;
        min-width:0;
        padding:0 12px 0 10px;
        background:#ffffff;
        color:var(--sweeps-accent-strong);
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

      @media (min-width: 750px){
        .shared-sweeps-rebuy-line-badge__info-wrap:hover .shared-sweeps-rebuy-line-badge__tooltip,
        .shared-sweeps-rebuy-line-badge__info-wrap:focus .shared-sweeps-rebuy-line-badge__tooltip,
        .shared-sweeps-rebuy-line-badge__info-wrap:focus-within .shared-sweeps-rebuy-line-badge__tooltip{
          opacity:1;
          visibility:visible;
        }
      }

      @media (max-width: 749px){
        .shared-sweeps-rebuy-line-badge{
          grid-template-columns:minmax(0,1fr);
          min-height:28px;
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

        .shared-sweeps-rebuy-line-badge__info-wrap{
          width:14px;
          min-width:14px;
          height:14px;
          margin-left:4px;
          cursor:pointer;
        }

        .shared-sweeps-rebuy-line-badge__info-icon{
          width:14px;
          min-width:14px;
          height:14px;
        }

        .shared-sweeps-rebuy-line-badge__info-icon svg{
          width:14px;
          height:14px;
        }

        .shared-sweeps-rebuy-line-badge__tooltip{
          left:50%;
          right:auto;
          bottom:calc(100% + 8px);
          top:auto;
          transform:translateX(-50%);
          width:max-content;
          min-width:180px;
          max-width:min(220px, calc(100vw - 24px));
          padding:10px 12px;
          font-size:12px;
          line-height:1.35;
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

    function closeAllTooltips(except) {
        var infoWraps = document.querySelectorAll(SELECTORS.infoWrap);
        infoWraps.forEach(function (node) {
            if (except && node === except) return;
            node.removeAttribute('data-open');
            node.setAttribute('aria-expanded', 'false');
        });
    }

    function openTooltip(infoWrap) {
        if (!infoWrap) return;
        closeAllTooltips(infoWrap);
        infoWrap.setAttribute('data-open', 'true');
        infoWrap.setAttribute('aria-expanded', 'true');
    }

    function closeTooltip(infoWrap) {
        if (!infoWrap) return;
        infoWrap.removeAttribute('data-open');
        infoWrap.setAttribute('aria-expanded', 'false');
    }

    function toggleTooltip(infoWrap) {
        if (!infoWrap) return;

        if (infoWrap.getAttribute('data-open') === 'true') {
            closeTooltip(infoWrap);
        } else {
            openTooltip(infoWrap);
        }
    }

    function bindTooltipEvents() {
        if (tooltipEventsBound) return;
        tooltipEventsBound = true;

        document.addEventListener('click', function (event) {
            var infoWrap = event.target.closest(SELECTORS.infoWrap);

            if (infoWrap) {
                if (isMobileViewport()) {
                    event.preventDefault();
                    event.stopPropagation();
                    toggleTooltip(infoWrap);
                }
                return;
            }

            closeAllTooltips();
        }, true);

        document.addEventListener('keydown', function (event) {
            var active = document.activeElement;
            var infoWrap = active && active.matches && active.matches(SELECTORS.infoWrap) ? active : null;

            if (event.key === 'Escape') {
                closeAllTooltips();
                return;
            }

            if (!infoWrap) return;

            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                toggleTooltip(infoWrap);
            }
        });

        window.addEventListener('resize', debounce(function () {
            closeAllTooltips();
        }, 40));

        window.addEventListener('scroll', debounce(function () {
            closeAllTooltips();
        }, 20), true);
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

            closeAllTooltips();

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
        bindTooltipEvents();
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