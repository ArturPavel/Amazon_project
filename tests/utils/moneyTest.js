import { formatCurrency } from '../../scripts/utils/money.js';

describe('test suit: formatCurrency', () => {
  it('converts cents into dollers', () => {
    expect(formatCurrency(2095)).toEqual('20.95');
  }, 2000); 

  it('works with 0', () => {
    expect(formatCurrency(0)).toEqual('0.00');
  }, 2000)

  it('Round up to the nearest cent', () => {
    expect(formatCurrency(2000.5)).toEqual('20.01');
  }, 2000)

  it('Round down to the nearest cent', () => {
    expect(formatCurrency(2000.4)).toEqual('20.00');
  }, 2000)

  it('A negative case', () => {
    expect(formatCurrency(-125)).toEqual('-1.25');
  }, 2000)
});