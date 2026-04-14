/**
 * Size Preview Add to Cart
 * Makes the size availability preview buttons add items directly to cart
 */
(function() {
  'use strict';

  function initSizePreviewATC() {
    // Listen for clicks on available size buttons
    document.addEventListener('click', function(e) {
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

  function addToCart(variantId, button, loadingDiv) {
    const formData = new FormData();
    formData.append('id', variantId);
    formData.append('quantity', 1);
    
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
        // Error occurred
        console.error('Add to cart error:', response.description);
        return;
      }
      
      // Dispatch cart item added event
      dispatchCustomEvent('cart:item-added', {
        product: response.hasOwnProperty('items') ? response.items[0] : response
      });
      
      // Update cart drawer sections if available
      if (response.sections) {
        updateCartSections(response.sections);
      }
      
      // Open cart drawer
      openCartDrawer();
    })
    .catch(error => {
      console.error('Add to cart error:', error);
    })
    .finally(() => {
      // Remove loading state
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
    
    // Also dispatch cart refresh event for other components
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
    // Try multiple methods to open cart drawer
    const cartDrawer = document.querySelector('.cart-drawer');
    
    if (cartDrawer) {
      document.body.classList.add('open-cc');
      document.body.classList.add('open-cart');
      cartDrawer.classList.add('active');
    }
    
    // Also try dispatching event that theme might listen to
    dispatchCustomEvent('cart:open');
  }

  function dispatchCustomEvent(eventName, data = {}) {
    const event = new CustomEvent(eventName, {
      bubbles: true,
      detail: data
    });
    document.dispatchEvent(event);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSizePreviewATC);
  } else {
    initSizePreviewATC();
  }
})();
