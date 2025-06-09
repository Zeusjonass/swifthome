import { sum } from './sum';

it('sums numbers correctly', () => {
  expect(sum(1, 2)).toBe(3);
  expect(sum(5, 7)).toBe(12);
});
