import * as all from '../index';

test('All functions should be exported', () => {
  expect(Object.keys(all))
    .toEqual([
      'validator',
    ]);
});
