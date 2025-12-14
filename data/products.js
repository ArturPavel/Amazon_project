import { formatCurrency } from "../scripts/utils/money.js";

export function findProduct(neededId) {
  let neededProduct;
  products.forEach((wantedProduct) => {
    if (neededId === wantedProduct.id) 
    {
      neededProduct = wantedProduct;
    }
  });

  return neededProduct;
}

export function limitProducts(searchSpecial) {
  if (searchSpecial.toLowerCase()) {
    products = products.filter((product) => {
      if (product.name.toLowerCase().includes(searchSpecial)) {
        return product;
      }

      for(let i = 0; product.keywords.length > i; i++) {
        if(searchSpecial.includes(product.keywords[i])) {
          return product;
        }
      }
    });
  }
}

export class Product {
  id;
  image;
  name;
  rating;
  priceCents;
  keywords = [];

  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
    for (let i = 0; productDetails.keywords.length > i; i++) {
      this.keywords[i] = productDetails.keywords[i];
    }
  }

  getStarsUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }

  getPrice() {
    return `$${formatCurrency(this.priceCents)}`;
  }

  extraInfoHTML() {
    return '';
  }
}

export class Clothing extends Product {
  sizeChartLink;

  constructor(productDetails) {
    super(productDetails);
    
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  extraInfoHTML() {
    return `<a href="${this.sizeChartLink}" target="_blank">Size chart</a>`
  }
}

export class Appliance extends Product {
  instructionsLink;
  warrantyLink;
  sizeChartLink;
  
  constructor (productDetails) {
    super(productDetails);

    this.instructionsLink = productDetails.instructionsLink;
    this.warrantyLink = productDetails.warrantyLink;
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  extraInfoHTML() {
    return `
    <a href="${this.sizeChartLink}" target="_blank">Size chart</a>
    <a href="${this.instructionsLink}" target="_blank">Instructions link</a>
    <a href="${this.warrantyLink}" target="_blank">Warranty link</a>
    `
  }
}

export let products = [];


export async function loadProductsFetch() {
  try {
  const promise = await fetch( 'https://supersimplebackend.dev/products');
  
  const productsData = await promise.json(); 

  products = productsData.map((productDetails) => {
    if(productDetails.type === 'clothing') {
      return new Clothing(productDetails);
    } else if (productDetails.type === 'appliance') {
      return new Appliance(productDetails);
    }
      return new Product(productDetails);
  });

  return promise;
  } catch(error) {
    console.log(error);
    console.log('Error: You are too ugly for this website');
  }
}