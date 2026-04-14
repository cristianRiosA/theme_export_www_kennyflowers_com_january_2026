/**
 * @class FloatingDiscountIcons
 * @description Easter egg feature - floating icons that reveal discount codes when clicked
 */
if (!customElements.get('floating-discount-icons')) {
  class FloatingDiscountIcons extends HTMLElement {
    constructor() {
      super();
      
      this.icons = Array.from(this.querySelectorAll('.floating-icon'));
      this.toast = this.querySelector('.floating-icon__toast');
      this.visibleIcons = [];
      this.revealedIcon = null;
      
      // Settings from data attributes
      this.discountCode = this.dataset.discountCode || '';
      this.successMessage = this.dataset.successMessage || 'You found a discount!';
      this.iconsVisible = parseInt(this.dataset.iconsVisible, 10) || 3;
      this.floatSpeed = this.dataset.floatSpeed || 'medium';
      this.iconSize = parseInt(this.dataset.iconSize, 10) || 50;
      
      // Viewport buffer to keep icons away from edges
      this.buffer = 60;
      
      // Track scroll position for repositioning
      this.lastScrollY = window.scrollY;
      this.scrollThreshold = 300;
      
      // Bind methods
      this.handleScroll = this.handleScroll.bind(this);
      this.handleResize = this.handleResize.bind(this);
      this.handleDocumentClick = this.handleDocumentClick.bind(this);
    }
    
    connectedCallback() {
      // Don't activate in theme editor
      if (Shopify && Shopify.designMode) {
        return;
      }
      
      // Initialize icons
      this.initializeIcons();
      
      // Add event listeners
      window.addEventListener('scroll', this.handleScroll, { passive: true });
      window.addEventListener('resize', this.handleResize);
      document.addEventListener('click', this.handleDocumentClick);
      
      // Show initial icons after a short delay
      setTimeout(() => {
        this.showRandomIcons();
      }, 1000);
    }
    
    disconnectedCallback() {
      window.removeEventListener('scroll', this.handleScroll);
      window.removeEventListener('resize', this.handleResize);
      document.removeEventListener('click', this.handleDocumentClick);
    }
    
    initializeIcons() {
      this.icons.forEach((icon, index) => {
        // Set animation speed
        icon.dataset.speed = this.floatSpeed;
        
        // Add random animation delay for varied movement
        const delay = Math.random() * 2;
        icon.querySelector('.floating-icon__image-wrapper').style.animationDelay = `${delay}s`;
        
        // Add click handler for icon image
        const imageWrapper = icon.querySelector('.floating-icon__image-wrapper');
        imageWrapper.addEventListener('click', (e) => {
          e.stopPropagation();
          this.revealDiscount(icon);
        });
        
        // Add click handler for close button
        const closeBtn = icon.querySelector('.floating-icon__close');
        if (closeBtn) {
          closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.hideReveal(icon);
          });
        }
        
        // Add click handler for copy button
        const copyBtn = icon.querySelector('.floating-icon__copy');
        if (copyBtn) {
          copyBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.copyToClipboard(copyBtn);
          });
        }
      });
    }
    
    showRandomIcons() {
      // Hide all icons first
      this.icons.forEach(icon => {
        icon.classList.remove('is-visible');
      });
      
      // Shuffle and pick icons to show
      const shuffled = [...this.icons].sort(() => Math.random() - 0.5);
      const toShow = shuffled.slice(0, Math.min(this.iconsVisible, this.icons.length));
      
      // Position and show selected icons
      toShow.forEach((icon, index) => {
        const position = this.getRandomPosition(index, toShow.length);
        icon.style.left = `${position.x}px`;
        icon.style.top = `${position.y}px`;
        
        // Stagger the appearance
        setTimeout(() => {
          icon.classList.add('is-visible');
        }, index * 200);
      });
      
      this.visibleIcons = toShow;
    }
    
    getRandomPosition(index, totalIcons) {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY;
      
      // Divide viewport into zones to spread icons out
      const zones = this.getZones(totalIcons);
      const zone = zones[index % zones.length];
      
      // Calculate random position within zone
      const x = zone.minX + Math.random() * (zone.maxX - zone.minX);
      const y = scrollY + zone.minY + Math.random() * (zone.maxY - zone.minY);
      
      return { x, y };
    }
    
    getZones(count) {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      const zones = [];
      const cols = Math.min(count, 3);
      const rows = Math.ceil(count / cols);
      
      const zoneWidth = (viewportWidth - this.buffer * 2) / cols;
      const zoneHeight = (viewportHeight - this.buffer * 2) / rows;
      
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          zones.push({
            minX: this.buffer + col * zoneWidth,
            maxX: this.buffer + (col + 1) * zoneWidth - this.iconSize,
            minY: this.buffer + row * zoneHeight,
            maxY: this.buffer + (row + 1) * zoneHeight - this.iconSize
          });
        }
      }
      
      return zones;
    }
    
    handleScroll() {
      const scrollDelta = Math.abs(window.scrollY - this.lastScrollY);
      
      // Reposition icons when user has scrolled enough
      if (scrollDelta > this.scrollThreshold) {
        this.lastScrollY = window.scrollY;
        this.repositionIcons();
      }
    }
    
    repositionIcons() {
      // Don't reposition if an icon is revealed
      if (this.revealedIcon) {
        return;
      }
      
      this.visibleIcons.forEach((icon, index) => {
        // Fade out
        icon.classList.remove('is-visible');
        
        // Reposition after fade out
        setTimeout(() => {
          const position = this.getRandomPosition(index, this.visibleIcons.length);
          icon.style.left = `${position.x}px`;
          icon.style.top = `${position.y}px`;
          
          // Fade back in
          setTimeout(() => {
            icon.classList.add('is-visible');
          }, 50);
        }, 400);
      });
    }
    
    handleResize() {
      // Debounce resize handling
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => {
        if (!this.revealedIcon) {
          this.showRandomIcons();
        }
      }, 250);
    }
    
    handleDocumentClick(e) {
      // Close revealed icon when clicking outside
      if (this.revealedIcon && !this.revealedIcon.contains(e.target)) {
        this.hideReveal(this.revealedIcon);
      }
    }
    
    revealDiscount(icon) {
      // Close any previously revealed icon
      if (this.revealedIcon && this.revealedIcon !== icon) {
        this.hideReveal(this.revealedIcon);
      }
      
      // Toggle reveal state
      if (icon.classList.contains('is-revealed')) {
        this.hideReveal(icon);
      } else {
        icon.classList.add('is-revealed');
        this.revealedIcon = icon;
        
        // Ensure icon is visible in viewport
        this.ensureInViewport(icon);
      }
    }
    
    hideReveal(icon) {
      icon.classList.remove('is-revealed');
      
      // Reset copy button state
      const copyBtn = icon.querySelector('.floating-icon__copy');
      if (copyBtn) {
        copyBtn.classList.remove('is-copied');
      }
      
      if (this.revealedIcon === icon) {
        this.revealedIcon = null;
      }
    }
    
    ensureInViewport(icon) {
      const rect = icon.getBoundingClientRect();
      const revealPanel = icon.querySelector('.floating-icon__reveal-content');
      
      if (!revealPanel) return;
      
      const panelRect = revealPanel.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      // Adjust horizontal position if panel goes off-screen
      if (panelRect.right > viewportWidth - 20) {
        const offset = panelRect.right - viewportWidth + 40;
        icon.style.left = `${parseInt(icon.style.left) - offset}px`;
      } else if (panelRect.left < 20) {
        const offset = 40 - panelRect.left;
        icon.style.left = `${parseInt(icon.style.left) + offset}px`;
      }
      
      // Adjust vertical position if panel goes off-screen
      if (panelRect.bottom > viewportHeight - 20) {
        const offset = panelRect.bottom - viewportHeight + 40;
        icon.style.top = `${parseInt(icon.style.top) - offset}px`;
      } else if (panelRect.top < 20) {
        const offset = 40 - panelRect.top;
        icon.style.top = `${parseInt(icon.style.top) + offset}px`;
      }
    }
    
    async copyToClipboard(button) {
      const code = button.dataset.code;
      
      try {
        await navigator.clipboard.writeText(code);
        
        // Update button state
        button.classList.add('is-copied');
        
        // Show toast
        this.showToast();
        
        // Reset button after delay
        setTimeout(() => {
          button.classList.remove('is-copied');
        }, 2000);
        
      } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = code;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.select();
        
        try {
          document.execCommand('copy');
          button.classList.add('is-copied');
          this.showToast();
          
          setTimeout(() => {
            button.classList.remove('is-copied');
          }, 2000);
        } catch (e) {
          console.error('Failed to copy discount code');
        }
        
        document.body.removeChild(textArea);
      }
    }
    
    showToast() {
      if (!this.toast) return;
      
      this.toast.classList.add('is-visible');
      
      // Hide toast after delay
      clearTimeout(this.toastTimeout);
      this.toastTimeout = setTimeout(() => {
        this.toast.classList.remove('is-visible');
      }, 2500);
    }
  }
  
  customElements.define('floating-discount-icons', FloatingDiscountIcons);
}

