import { cart, addToCart, updateCartCount } from '../data/cart.js';
import { products, limitProducts, loadProductsFetch } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

// Search
export function searchWait() {
  const checkSearch = document.querySelector('.search-button');
  const searchData = document.querySelector('.search-bar');

  function runOnSearch() {
      window.location.href = `http://127.0.0.1:5500/amazon.html?search=${searchData.value}`
  }
  searchData.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      runOnSearch();
    }
  })
  checkSearch.addEventListener('click', runOnSearch)
}

searchWait();

async function start() {
  try {
    await loadProductsFetch();
    const urlCurrent = new URL(window.location.href);
    const searchSpecial = urlCurrent.searchParams.get('search');

    if (searchSpecial) { 
      limitProducts(searchSpecial);
    }

    if (products.length === 0) {
      document.querySelector('.js-products-grid')
      .innerHTML = `<div style="margin: 10px; width: 500px;">No products matched your search.</div>`;
      updateCartCount('js-cart-quantity');
    } else {
      renderProductsGrid(); 
    }
  } catch (error) {
    console.log(error);
  }
}

start();
function renderProductsGrid() {

  updateCartCount('js-cart-quantity');

  let productsHTML = '';
  products.forEach(product => {
    productsHTML += `<div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src=${product.image}>
            </div>
  
            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>
  
            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="${product.getStarsUrl()}">
              <div class="product-rating-count link-primary">
                ${product.rating.count}
              </div>
            </div>
  
            <div class="product-price">
              ${product.getPrice()}
            </div>
  
            <div class="product-quantity-container">
              <select class="js-product-quantity-container-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
  
            ${product.extraInfoHTML()}
  
  
            <div class="product-spacer"></div>
  
            <div class="added-to-cart js-added-to-cart-${product.id}">
              <img src="images/icons/checkmark.png">
              Added
            </div>
  
            <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
              Add to Cart
            </button>
          </div>`;
  })
  
  const grid = document.querySelector('.js-products-grid');
  if (grid) {
    grid.innerHTML = productsHTML;
  }
  
  document.querySelectorAll('.js-add-to-cart').forEach(value => {
    value.addEventListener('click', () => {
      const { productId } = value.dataset;
  
      addToCart(productId);
      updateCartCount('js-cart-quantity');
    })
  });
}