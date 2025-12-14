import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export function calculateDeliveryDate(delivery) {
  let date = dayjs();
  let dayName, dayCount = delivery.deliveryDays;

  for (let i = 0; i < dayCount; i++) {
    dayName = date.format('dddd');

    if (dayName === 'Friday' || dayName === 'Saturday') {
      date = date.add(1, 'day');
      dayCount++;
    } else {
      date = date.add(1, 'day');
    }
  }

  return date.format('dddd, MMMM D');
}

export function progressTracker(orderDate, deliveryTime) {
  deliveryTime = dayjs(deliveryTime) || dayjs();

  return deliveryTime.diff(orderDate, 'minute');
}


export function convertToDate(date) {
  return dayjs(date).format('MMMM D');
}

export const deliveryOptions = [{
  specialId: '1',
  deliveryDays: 7,
  priceCents: 0
}, {
  specialId: '2',
  deliveryDays: 3,
  priceCents: 499
}, {
  specialId: '3',
  deliveryDays: 1,
  priceCents: 999
}];