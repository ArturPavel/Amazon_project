import { orders } from "../data/orders.js";
import { products, findProduct, loadProductsFetch } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import { convertToDate } from "../data/deliveryOptions.js";
import { updateCartCount, emptyCart, minimalAdd } from "../data/cart.js";
import { searchWait } from "./amazon.js";


// Get the products
  async function loadAllRenderPage() {
    await loadProductsFetch();
    searchWait();
    updateCartCount('cart-quantity');
    loadOrders();
  }

  loadAllRenderPage();

  // Generate the HTML for the entire order
  function loadOrders() {
    let orderGridHTML = ``;
    let orderHTML = ``;
    orders.forEach((order) => {
    //  console.log(order);

    // Generate the HTML for each product
      order.products.forEach((product) => {
        const id = product.productId;
        const productsInfo = findProduct(id);


        orderHTML += 
        `
          <div class="product-image-container">
            <img src="${productsInfo.image}">
          </div>
    
          <div class="product-details">
            <div class="product-name">
              ${productsInfo.name}
            </div>
            <div class="product-delivery-date">
              Arriving on: ${convertToDate(product.estimatedDeliveryTime)}
            </div>
            <div class="product-quantity">
              Quantity: ${product.quantity}
            </div>
            <button class="buy-again-button button-primary js-buy-again-button-${productsInfo.id}" data-button-id="${productsInfo.id}">
              <img class="buy-again-icon" src="images/icons/buy-again.png">
              <span class="buy-again-message js-buy-again-message">Buy it again</span>
              <span class="buy-again-message buy-again-message-alternative">Bought</span>
            </button>
          </div>
    
          <div class="product-actions">
            <a href="tracking.html?orderId=${order.id}&productId=${productsInfo.id}">
              <button class="track-package-button button-secondary">
                Track package
              </button>
            </a>
          </div>
        `;
      })

      // Input the product HTML into the main HTML bit
      orderGridHTML +=
      `
      <div class="order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${convertToDate(order.orderTime)}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(order.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>

          <div class="order-details-grid">
            ${orderHTML}
          </div>

        </div>
      `;
    })
    
      document.querySelector('.orders-grid').innerHTML = orderGridHTML;

      document.querySelectorAll('.button-primary').forEach(buttonMain => {
        let timeOutId;
        buttonMain.addEventListener('click', () => {
          const butId = buttonMain.dataset.buttonId;
          minimalAdd(butId);
          updateCartCount('cart-quantity');

          document.querySelector(`.js-buy-again-button-${butId}`).classList.add('temp');
          clearTimeout(timeOutId);

          timeOutId = 
          setTimeout(() => {
            document.querySelector(`.js-buy-again-button-${butId}`).classList.remove('temp');
          }, 2000);
        })
      })
  }