import { cart, removeFromCart, updateQuantity, updateDeliveryOption } from '../../data/cart.js';
import { products, findProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import { deliveryOptions, calculateDeliveryDate } from '../../data/deliveryOptions.js'
import { renderPayment } from './paymentSummary.js';
import { renderCheckoutHeader } from './checkoutHeader.js';

export function renderOrderSummary() {

  let text = '';
  cart.forEach((cartItem, place) => {
    const productId = cartItem.productId;

    const matchingProduct = findProduct(productId);

    const deliveryOptionId = cartItem.deliveryId;
    let optionChoice;

    deliveryOptions.forEach((option) => {
      if (option.specialId === deliveryOptionId)
      {
        optionChoice = option;
      }
    });

    const deliveryTime = `
        <div class="delivery-option-date">
          ${calculateDeliveryDate(optionChoice)}
        </div>
        `;

    text += 
    `
    <div class="cart-item-container-${matchingProduct.id} js-cart-item-container">
      <div class="delivery-date">
        Delivery date: ${deliveryTime}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name js-product-name-${matchingProduct.id}">
            ${matchingProduct.name}
          </div>
          <div class="product-price js-product-price-${matchingProduct.id}">
            ${matchingProduct.getPrice()}
          </div>
          <div class="product-quantity js-product-quantity js-product-quantity-${matchingProduct.id}">
            <span>
              Quantity: <span class="quantity-label js-quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-link" data-update-id=${matchingProduct.id}>
              Update
            </span>
            <input class="quantity-input js-quantity-input" type="number"></input>
            <span class="save-quantity-link js-save-quantity-link link-primary quantity-input" data-save-id=${matchingProduct.id}>
              Save
            </span>
            <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}" data-delete-id=${matchingProduct.id}>
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:

          </div>
          ${reformatSalesHTML(matchingProduct, cartItem)}
        </div>
      </div>
    </div>
    `;
  });

  function reformatSalesHTML(matchingProduct, cartItem) {
    let deliveryHTML = '';

    deliveryOptions.forEach((delivery) => {
      const price = delivery.priceCents === 0 ? 'FREE' : formatCurrency(delivery.priceCents);

      const isChecked = (delivery.specialId === cartItem.deliveryId) ? true : false;
      deliveryHTML += `
            <div class="delivery-option js-delivery-option js-delivery-option-${delivery.specialId}-${cartItem.productId}" 
            data-unique-id=${cartItem.productId}
            data-delivery-id=${delivery.specialId}>
            <input type="radio"
            ${isChecked ? 'checked' : ''}
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                ${calculateDeliveryDate(delivery)}
              </div>
              <div class="delivery-option-price">
                $${price} - Shipping
              </div>
            </div>
          </div>
      `
    });

    return deliveryHTML;
  };

  document.querySelector('.js-order-summary')
    .innerHTML = text;
    

  document.querySelectorAll('.js-delete-link').forEach(value => {
      value.addEventListener('click', () => {
        const productId = value.dataset.deleteId;
        removeFromCart(productId);
        renderOrderSummary();
        renderCheckoutHeader();
        renderPayment();
      });
  });

  document.querySelectorAll('.js-update-link').forEach(link => {
    link.addEventListener('click', () => {
      const productId = link.dataset.updateId;
      const container = document.querySelector(`.cart-item-container-${productId}`);
      container.classList.add('is-editing-quantity');
      container.querySelector('.js-quantity-input').value = container.querySelector('.js-quantity-label').innerText;
    })
  })

  document.querySelectorAll('.js-save-quantity-link').forEach(save => {
    const productId = save.dataset.saveId;
    const cartContainer = document.querySelector(`.cart-item-container-${productId}`);

    const change = () => {
      const input = Number(document.querySelector(`.cart-item-container-${productId}`).querySelector('.js-quantity-input').value);
      cartContainer.classList.remove('is-editing-quantity');
      updateQuantity(productId, input);
      renderOrderSummary();
      renderPayment();
    };

    save.addEventListener('click', change);
    cartContainer.addEventListener('keydown', (event) => {
      if(event.key === 'Enter') {
        change();
      }
  });
  });

  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const {uniqueId}  = element.dataset;
      const {deliveryId} = element.dataset;
      updateDeliveryOption(uniqueId, deliveryId);
      renderOrderSummary();
      renderPayment();
    })
  });
}