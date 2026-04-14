/**
 *  @class
 *  @function CartDiscounts
 */
if (!customElements.get('cart-discounts')) {
  class CartDiscounts extends HTMLElement {

    constructor() {
      super();
    }

    connectedCallback() {

      this.discounts();
    }

    getSectionsToRender() {
      return [{
        id: 'Cart',
        section: 'main-cart',
        selector: '.thb-cart-form'
      }, {
        id: 'Cart-Drawer',
        section: 'cart-drawer',
        selector: '.cart-drawer'
      },
      {
        id: 'cart-drawer-toggle',
        section: 'cart-bubble',
        selector: '.thb-item-count'
      }];
    }
    getSectionInnerHTML(html, selector) {
      return new DOMParser()
        .parseFromString(html, 'text/html')
        .querySelector(selector).innerHTML;
    }
    discounts() {
      const button = this.querySelector('.cart-discounts--button');
      const remove_discount_buttons = this.querySelectorAll('.cart-discounts--remove')

      if (!button) {
        return;
      }
      button.addEventListener('click', (event) => {
        this.updateDiscount();
        event.preventDefault();
        button.classList.add('loading');
      });
      remove_discount_buttons.forEach((remove_discount_button) => {
        remove_discount_button.addEventListener('click', this.removeDiscount.bind(this));
      });
    }
    updateDiscount() {
      const discountCode = this.querySelector('.cart-discounts--input');
      const discountCodeValue = discountCode.value;
      const existingDiscounts = this.existingDiscounts();

      if (existingDiscounts.includes(discountCodeValue)) return;
      existingDiscounts.push(discountCodeValue);

      this.renderDiscounts(existingDiscounts, discountCodeValue);
    }
    removeDiscount(event) {
      const pill = event.target.previousElementSibling;
      const discountCode = pill.innerHTML;
      const existingDiscounts = this.existingDiscounts();
      const index = existingDiscounts.indexOf(discountCode);
      if (index === -1) return;

      existingDiscounts.splice(index, 1);

      this.renderDiscounts(existingDiscounts);
    }
    existingDiscounts() {
      const discountCodes = [];
      const discountPills = this.querySelectorAll('.cart-discounts--name');
      for (const pill of discountPills) {
        discountCodes.push(pill.innerHTML);
      }

      return discountCodes;
    }
    renderDiscounts(existingDiscounts, discountCodeValue) {
      const body = JSON.stringify({
        discount: existingDiscounts.join(','),
        sections: this.getSectionsToRender().map((section) => section.section),
        sections_url: window.location.pathname
      });
      this.querySelector('.cart-discounts--error').setAttribute('hidden', '');
      fetch(`${theme.routes.cart_update_url}.js`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': `application/json`
        },
        ...{
          body
        }
      })
        .then((response) => {
          return response.text();
        })
        .then((state) => {
          const parsedState = JSON.parse(state);

          this.getSectionsToRender().forEach((section => {
            const elementToReplace = document.getElementById(section.id)?.querySelector(section.selector) || document.getElementById(section.id);

            if (parsedState.sections && elementToReplace) {
              elementToReplace.innerHTML = this.getSectionInnerHTML(parsedState.sections[section.section], section.selector);
            }
          }));
          this.querySelector('.cart-discounts--button').classList.remove('loading');
          if (parsedState.discount_codes.find((discount) => {
            return discount.code === discountCodeValue && discount.applicable === false;
          })) {
            setTimeout(() => {
              this.querySelector('.cart-discounts--error').removeAttribute('hidden');
            }, 300);
            return;
          }
        });
    }
  }
  customElements.define('cart-discounts', CartDiscounts);
}