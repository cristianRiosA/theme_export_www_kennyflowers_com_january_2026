/**
 *  @class
 *  @function RemoveAll
 */
if (!customElements.get('remove-all')) {
  class RemoveAll extends HTMLElement {
    constructor() {
      super();

    }
    connectedCallback() {
      this.drawer = this.closest('cart-drawer');
      this.debouncedOnSubmit = debounce(() => {
        this.onSubmitHandler();
      }, 200);
      this.addEventListener('click', this.debouncedOnSubmit.bind(this));
    }
    onSubmitHandler() {
      this.classList.add('loading');
      fetch(`${theme.routes.cart_clear_url}.js`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': `application/json`
        },
        body: JSON.stringify({
          'note': document.getElementById('mini-cart__notes').value
        })
      }).then(() => {
        this.classList.remove('loading');
        this.drawer.refresh();
      });
    }
  }
  customElements.define('remove-all', RemoveAll);
}