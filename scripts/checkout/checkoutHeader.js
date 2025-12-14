import {cart} from '../../data/cart.js';

export function renderCheckoutHeader() {
  let quantity = 0;
  cart.forEach((cartItem) => {
    quantity += cartItem.quantity;
  })

  document.querySelector('.js-checkout-header-middle-section').innerHTML = `          Checkout (<a class="return-to-home-link js-cart-quantity"
            href="amazon.html">${quantity}</a>)`
            
}