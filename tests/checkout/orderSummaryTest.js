import { renderOrderSummary } from '../../scripts/checkout/orderSummary.js';
import { loadFromStorage, cart } from '../../data/cart.js';
import { loadProductsFetch } from '../../data/products.js';


  describe('Test the entire files functionality', () => {
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

    beforeAll(async () => {
      await loadProductsFetch();
    })

    beforeEach(() => {
      document.querySelector('.js-test-summary').innerHTML = 
      `
      <div class = "js-order-summary"></div>
      <div class = "js-checkout-header-middle-section"></div>
      <div class = "js-payment-summary"></div>
      `;

      spyOn(localStorage, 'setItem');
      spyOn(localStorage, 'getItem').and.callFake(() => {
        return JSON.stringify(
          [{
            productId: productId1,
            quantity: 2,
            deliveryId: '1'
          }, {
            productId: productId2,
            quantity: 1,
            deliveryId: '2'
          }]
        );
      });

      loadFromStorage();

      renderOrderSummary();
    })

    it('displays the cart', () => {

      expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);
      expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText).toContain('2');
      expect(document.querySelector(`.js-product-quantity-${productId2}`).innerText).toContain('1');
      expect(document.querySelector(`.js-product-name-${productId1}`).innerText).toContain('Black and Gray Athletic Cotton Socks - 6 Pairs');
      expect(document.querySelector(`.js-product-price-${productId1}`).innerText).toContain('$10.90');
    })

    it('removes a product', () => {

      document.querySelector(`.js-delete-link-${productId1}`).click();
      expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);
      expect(document.querySelector(`.cart-item-container-${productId1}`)).toEqual(null);
      expect(document.querySelector(`.cart-item-container-${productId2}`)).not.toEqual(null);
      expect(cart.length).toEqual(1);
      expect(cart[0].productId).toEqual(productId2);
      expect(document.querySelector(`.js-product-name-${productId2}`).innerText).toContain('Intermediate Size Basketball');
      expect(document.querySelector(`.js-product-price-${productId2}`).innerText).toContain('$20.95');
    })

    it('checks the delivery option', () => {
      const third = document.querySelector(`.js-delivery-option-3-${[productId1]}`).querySelector('input');
      third.click();
      expect(third.checked).toEqual(true);
      expect(cart.length).toEqual(2);
      expect(cart[0].deliveryId).toEqual('3');
      expect(document.querySelector(`.js-all-money`).innerText).toContain('$14.98');
      expect(document.querySelector(`.js-total-money`).innerText).toContain('$57.73');
      //'js-delivery-option-${delivery.specialId} js-delivery-option-${cartItem.productId}'
    })

    afterEach(() => {
      document.querySelector('.js-test-summary').innerHTML = '';
    })
  });