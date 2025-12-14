import { calculateDeliveryDate, deliveryOptions } from "./deliveryOptions.js";

export const orders = JSON.parse(localStorage.getItem('orders')) || [
  {
    id: "0cbef9ed-820a-4747-a29e-26563d70a61b",
    orderTime: "2025-04-30T19:24:12.659Z",
    totalCostCents: 4703,
products: [
  {productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', quantity: 2, estimatedDeliveryTime: calculateDeliveryDate(deliveryOptions[1]), variation: null},
  {productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d', quantity: 1, estimatedDeliveryTime: calculateDeliveryDate(deliveryOptions[1]), variation: null}
]
  }
];

export function addOrder(order) {
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}

export function findOrder(orderId) {
  let wantedOrder;
  orders.forEach((order) => {
    if (order.id === orderId) {
      wantedOrder = order;
    }
  });

  return wantedOrder;
}

export function findProductInOrder(neededId, order) {
  let wantedOrder;
  order.products.forEach((product) => {
    if (product.productId === neededId) {
      wantedOrder = product;
    }
  });

  return wantedOrder;
}