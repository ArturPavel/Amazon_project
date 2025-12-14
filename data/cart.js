export let cart;

loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart'));

  if(!cart) {
    cart =
    [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryId: '1'
    }, {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryId: '2'
    }];
  }
}

export function emptyCart() {
  cart = [];

  saveToLocalStorage();
  
  return cart;
}

let timeOutId;
export function addToCart(productId) {
  // Makes the sign appear
  
  const signOfAdd = document.querySelector(`.js-added-to-cart-${productId}`);
  signOfAdd.classList.add('added-to-cart-active');
  
  clearTimeout(timeOutId);
  timeOutId = setTimeout(() => {
    signOfAdd.classList.remove('added-to-cart-active');
  }, 2000);
  
  // Adds the product to the cart
  let existingItem;

  cart.forEach((item) => {
    if (item.productId === productId) {
      existingItem = item;
    }
  })

  const addition = document.querySelector(`.js-product-quantity-container-${productId}`);
  if(existingItem) {
    existingItem.quantity += Number(addition.value);
  } else {
    cart.push({
      productId,
      quantity: Number(addition.value),
      deliveryId: '1'
    })
  }

  saveToLocalStorage();
}

export function minimalAdd(productId) {

   // Adds the product to the cart
   let existingItem;

   cart.forEach((item) => {
     if (item.productId === productId) {
       existingItem = item;
     }
   })
 
   if(existingItem) {
     existingItem.quantity++;
   } else {
     cart.push({
       productId,
       quantity: 1,
       deliveryId: '1'
     })
   }

  saveToLocalStorage();
}

export function removeFromCart(productId) {
  let match = [];
  match = cart.filter((other) => {
    if (other.productId === productId) {
      return false;
    }
    return true;
  });
  cart = match;
  
  saveToLocalStorage();
}

export function saveToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function updateCartCount(className) {
  
  let cartCount = 0;
    
  cart.forEach((item) => {
    cartCount += item.quantity;
  })
  
  document.querySelector(`.${className}`)
    .innerHTML = cartCount;
}

//
export function updateQuantity(productId, newQuantity) {
  if (newQuantity < 0) {
    alert('Not a valid number');
    return;
  }

  let wantedObject;

  cart.forEach(item => {
    if (productId === item.productId) {
      wantedObject = item; 
    }
  });
  wantedObject.quantity = newQuantity;
  updateCartCount('js-cart-quantity');
  
  if(newQuantity === 0) {
    removeFromCart(productId);
    saveToLocalStorage();
    return;
  }

  saveToLocalStorage();
};
//

export function updateDeliveryOption(productId, newId) {
  if (!(newId === '1' || newId === '2' || newId === '3')) {return;} 

  let wanted;
  cart.forEach((item) => {
    if (item.productId === productId) {
      wanted = item;
    }
  })  

  if (wanted === undefined) { return; }

  wanted.deliveryId = newId;

  saveToLocalStorage();
}

export async function loadCart() {
  const data = await fetch('https://supersimplebackend.dev/cart');

  const translatedData = await data.text();
}