import { addToCart, cart, loadFromStorage, updateCartCount, removeFromCart, updateDeliveryOption } from '../../data/cart.js';

describe('test suite: addToCart', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '83d4ca15-0f35-48f5-b7a3-1ea210004f2e';
    beforeEach(() => {
      spyOn(localStorage, 'setItem');
      document.querySelector('.js-test-summary').innerHTML = 
      `
      <div class="js-added-to-cart-${productId1}"></div>
      <div class="js-added-to-cart-${productId2}"></div>
      <div class="product-quantity-container">
            <select class="js-product-quantity-container-${productId1}">
              <option selected value="1">1</option>
            </select>
          </div>
      `
    })

    it('adds an existing product to the cart', () => {
      spyOn(localStorage, 'getItem').and.callFake(() => {
        return JSON.stringify(
          [{
            productId: productId1,
            quantity: 2,
            deliveryId: '1'
          }]
        );
      });

      loadFromStorage();
      

      addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
      expect(cart.length).toEqual(1); 
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
      expect(cart[0].quantity).toEqual(3);
      expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
    });

    it('adds a new product to the cart', () => {
      spyOn(localStorage, 'getItem').and.callFake(() => {
        return JSON.stringify([]);
      });

      loadFromStorage();
      addToCart("83d4ca15-0f35-48f5-b7a3-1ea210004f2e");
      expect(cart.length).toEqual(1);
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(cart[0].productId).toEqual('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
      expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
    });

    afterEach(() => {
      document.querySelector('.js-test-summary').innerHTML = '';
    })
});

describe('test suite: can a group get the same hook', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '83d4ca15-0f35-48f5-b7a3-1ea210004f2e';

  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    document.querySelector('.js-test-summary').innerHTML = 
    `
    <div class="js-added-to-cart-${productId1}"></div>
    <div class="js-added-to-cart-${productId2}"></div>
    <div class="product-quantity-container">
          <select class="js-product-quantity-container-${productId1}">
            <option selected value="1">1</option>
          </select>
        </div>
    `
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify(
        [{
          productId: productId1,
          quantity: 2,
          deliveryId: '1'
        }]
      );
    });
    loadFromStorage();
  })

  describe('test suite: Remove from cart function', () => {
    it('Removes the product from the cart', () => {
      const cartLenght = cart.length;
      removeFromCart(productId1);
  
      expect(cart.length).not.toContain(cartLenght - 1);
      expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
    });
  
    it('Removes a not existing product from the cart', () => {
      const temp = cart.slice();
      removeFromCart('54e0eccd-8f36-462b-b68a-8182611d9add');
      expect(cart).toEqual(temp);
      expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
    }) 

  });
  
  describe('Test suite: deliveryOptions', () => {
    
    it('checks the delivery option', () => {
      const temp = cart.slice();
      updateDeliveryOption(productId1, '2');
      expect(cart[0].deliveryId).toContain('2');
      expect(cart.length).toEqual(temp.length);
      expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
    })
  
    it('checks if the delivery option is', () => {
      const temp = cart.slice();
      updateDeliveryOption(productId1, '26');
      expect(cart).toEqual(temp);
      expect(localStorage.setItem).not.toHaveBeenCalledWith('cart', JSON.stringify(cart));
    })
  
  })
  afterEach(() => {
    document.querySelector('.js-test-summary').innerHTML = '';
  })
})