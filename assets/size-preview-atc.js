/**
 * Size Preview Add to Cart
 * Makes the size availability preview buttons add items directly to cart
 */
(function () {
  'use strict';

  function initSizePreviewATC() {
    // Listen for clicks on available size buttons
    document.addEventListener('click', function (e) {
      const sizeButton = e.target.closest('.size-preview-button.available');

      if (!sizeButton) return;

      e.preventDefault();
      e.stopPropagation();

      const variantId = sizeButton.getAttribute('data-toggle');

      if (!variantId) return;

      // Show loading state
      const loadingDiv = sizeButton.querySelector('.size-loading');
      if (loadingDiv) {
        loadingDiv.classList.add('show');
      }
      sizeButton.style.pointerEvents = 'none';

      // Add to cart
      addToCart(variantId, sizeButton, loadingDiv);
    });
  }

  function getSweepsPropertiesFromSizePreview(button) {
    if (!button) return null;

    const scope = button.closest('.overlay-size-preview');
    if (!scope) return null;

    const config = scope.querySelector('.shared-sweeps-size-preview-config[data-ss-eligible="true"]');
    if (!config) return null;

    return {
      _ss_mult: config.dataset.ssMult || '1',
      _ss_bonus: config.dataset.ssBonus || '0',
      _ss_entry_divisor: config.dataset.ssEntryDivisor || '1',
      _ss_override_unit_price: config.dataset.ssOverrideUnitPrice || '',
      _ss_eligible: 'true'
    };
  }

  function addToCart(variantId, button, loadingDiv) {
    const formData = new FormData();
    formData.append('id', variantId);
    formData.append('quantity', 1);

    const sweepsProperties = getSweepsPropertiesFromSizePreview(button);
    if (sweepsProperties) {
      formData.append('properties[_ss_mult]', sweepsProperties._ss_mult);
      formData.append('properties[_ss_bonus]', sweepsProperties._ss_bonus);
      formData.append('properties[_ss_entry_divisor]', sweepsProperties._ss_entry_divisor);
      formData.append('properties[_ss_override_unit_price]', sweepsProperties._ss_override_unit_price);
      formData.append('properties[_ss_eligible]', sweepsProperties._ss_eligible);
    }

    // Get sections to render for cart drawer update
    const sectionsToRender = ['cart-drawer', 'cart-icon-bubble'];
    formData.append('sections', sectionsToRender.join(','));
    formData.append('sections_url', window.location.pathname);

    fetch(window.theme?.routes?.cart_add_url || '/cart/add.js', {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json'
      },
      body: formData
    })
      .then(response => response.json())
      .then(response => {
        if (response.status) {
          console.error('Add to cart error:', response.description);
          return;
        }

        dispatchCustomEvent('cart:item-added', {
          product: response.hasOwnProperty('items') ? response.items[0] : response
        });

        if (response.sections) {
          updateCartSections(response.sections);
        }

        openCartDrawer();
      })
      .catch(error => {
        console.error('Add to cart error:', error);
      })
      .finally(() => {
        if (loadingDiv) {
          loadingDiv.classList.remove('show');
        }
        button.style.pointerEvents = '';
      });
  }

  function updateCartSections(sections) {
    Object.keys(sections).forEach(sectionId => {
      const sectionElement = document.getElementById(sectionId);
      if (sectionElement) {
        sectionElement.innerHTML = getSectionInnerHTML(sections[sectionId], sectionId);
      }
    });

    dispatchCustomEvent('cart:refresh', {
      sections: sections
    });
  }

  function getSectionInnerHTML(html, selector) {
    return new DOMParser()
      .parseFromString(html, 'text/html')
      .querySelector(selector)?.innerHTML || html;
  }

  function openCartDrawer() {
    const cartDrawer = document.querySelector('.cart-drawer');

    if (cartDrawer) {
      document.body.classList.add('open-cc');
      document.body.classList.add('open-cart');
      cartDrawer.classList.add('active');
    }

    dispatchCustomEvent('cart:open');
  }

  function dispatchCustomEvent(eventName, data = {}) {
    const event = new CustomEvent(eventName, {
      bubbles: true,
      detail: data
    });
    document.dispatchEvent(event);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSizePreviewATC);
  } else {
    initSizePreviewATC();
  }
})();