import { Product, Clothing, Appliance } from "../../data/products.js";


describe('test suite: testing if each class works correctly', () => {
  it('Checks if the product is built', () => {
    const plate = new Product({
      id: "3ebe75dc-64d2-4137-8860-1f5a963e534b",
      image: "images/products/6-piece-white-dinner-plate-set.jpg",
      name: "6 Piece White Dinner Plate Set",
      rating: {
        stars: 4,
        count: 37
      },
      priceCents: 2067,
      keywords: [
        "plates",
        "kitchen",
        "dining"
      ]
    });

    expect(plate.extraInfoHTML()).toEqual('');
  });

  it('Checks if the clothing is built', () => {
    const tshirt = new Clothing({
      id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
      image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
      name: "Adults Plain Cotton T-Shirt - 2 Pack",
      rating: {
        stars: 4.5,
        count: 56
      },
      priceCents: 799,
      keywords: [
        "tshirts",
        "apparel",
        "mens"
      ],
      type: "clothing",
      sizeChartLink: "images/clothing-size-chart.png"
    });

    expect(tshirt.extraInfoHTML()).toContain('Size chart');
  });

  it('Checks if the appliance is built', () => {
    const toaster = new Appliance({
      id: "54e0eccd-8f36-462b-b68a-8182611d9add",
      image: "images/products/black-2-slot-toaster.jpg",
      name: "2 Slot Toaster - Black",
      rating: {
        stars: 5,
        count: 2197
      },
      priceCents: 1899,
      keywords: [
        "toaster",
        "kitchen",
        "appliances"
      ],
      type: "appliance",
      sizeChartLink: "images/clothing-size-chart.png",
      instructionsLink: "images/appliance-instructions.png",
      warrantyLink: "images/appliance-warranty.png"
    });
    expect(toaster.extraInfoHTML()).toContain('Size chart');
    expect(toaster.extraInfoHTML()).toContain('Instructions link');
    expect(toaster.extraInfoHTML()).toContain('Warranty link');
  });
});