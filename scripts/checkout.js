import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPayment } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from './checkout/checkoutHeader.js';
import { loadProductsFetch, products } from "../data/products.js";
import { loadCart } from "../data/cart.js";


  async function loadPage() {
    try {
      await Promise.all([
        loadProductsFetch(),
        loadCart()
      ])
    } catch (error) {
      console.log(error);
    }

    renderOrderSummary();
    renderPayment();
    renderCheckoutHeader();

  }

  loadPage();