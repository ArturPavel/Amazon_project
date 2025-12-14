import {cart, emptyCart} from '../../data/cart.js'
import { products, findProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import { deliveryOptions } from '../../data/deliveryOptions.js';
import { addOrder } from '../../data/orders.js';

export function renderPayment() {
  let totalProducts = 0;
  let totalShipping = 0;
  let quantity = 0;
  cart.forEach((element) => {
    let foundItem = findProduct(element.productId);
    
    totalProducts += foundItem.priceCents * element.quantity;
    quantity += element.quantity;

    deliveryOptions.forEach((option) => {
      if(element.deliveryId === option.specialId)
      {
        totalShipping += option.priceCents;
      }
    });
  });

  const totalBeforeTax = totalProducts + totalShipping;
  const tax = totalBeforeTax * 0.1;
  const totalMax = totalProducts + totalShipping;

  const paymentHTML = `
  <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${quantity}):</div>
            <div class="payment-summary-money">$${formatCurrency(totalProducts)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money js-all-money">$${formatCurrency(totalShipping)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(tax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money js-total-money">$${formatCurrency(totalMax)}</div>
          </div>

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>
  `;
  document.querySelector('.js-payment-summary')
    .innerHTML = paymentHTML;

    if (cart.length !== 0) {
      document.querySelector('.js-place-order').addEventListener('click', async () => {
        try {
          const response = await fetch('https://supersimplebackend.dev/orders', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              cart: cart,
            })
          })
          
        const order = await response.json();
        addOrder(order);
        emptyCart();
        } catch(error) {
          console.log('The POST was unsucsesful');
        }
  
        window.location.href = 'orders.html';
      })
    } else {
      document.querySelector('.js-place-order').style = "opacity: 0.5;";

      document.querySelector('.js-placibo').style.display = "inline-block";
    }
}