import { findProduct, products, loadProductsFetch } from "../data/products.js";
import { orders, findOrder, findProductInOrder } from "../data/orders.js";
import { convertToDate } from "../data/deliveryOptions.js";
import { progressTracker } from "../data/deliveryOptions.js";
import { searchWait } from "./amazon.js";
import { updateCartCount } from "../data/cart.js";

  startTracking();

  async function startTracking() {
    try {
      await loadProductsFetch();
      updateCartCount("js-cart-quantity");
      generateHTML();
    } catch (error) {
      console.log(error);
    }
  }

function generateHTML() {
  const urlFull = new URL(window.location.href);

  const urlOrderId = urlFull.searchParams.get('orderId');
  const urlProductId = urlFull.searchParams.get('productId');
  
  const product = findProduct(urlProductId);
  const order = findOrder(urlOrderId);
  
  const detailedOrder = findProductInOrder(urlProductId, order);

  const mainPlace = document.querySelector('.js-main');

  // Counts the times for the progress formula
  const timeDifOne = progressTracker(order.orderTime);

  const timeDifTwo = progressTracker(order.orderTime, detailedOrder.estimatedDeliveryTime);

  const progressMade = (timeDifOne / timeDifTwo * 100).toFixed(1);

  // Evaluates which time we should use
  let setValueForProgress;
  if (progressMade < 50) {
    setValueForProgress = 5;
  } else if (progressMade < 100) {
    setValueForProgress = 50;
  } else {
    setValueForProgress = 100;
  }

  mainPlace.innerHTML = `
    <div class="order-tracking">
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${convertToDate(detailedOrder.estimatedDeliveryTime)}
        </div>

        <div class="product-info">
          ${product.name}
        </div>

        <div class="product-info">
          Quantity: ${detailedOrder.quantity}
        </div>

        <img class="product-image" src="${product.image}">

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered 
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar js-progress-bar" style="width: ${setValueForProgress}%"></div>
        </div>
      </div>
    `;

    searchWait();
}