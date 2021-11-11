import {validator} from '../validator';
import v3_1_webhooks from './examples/v3_1/webhooks.json';
import v3_0_api_with_examples from './examples/v3_0/api-with-examples.json';
import v3_0_callback_example from './examples/v3_0/callback-example.json';
import v3_0_link_example from './examples/v3_0/link-example.json';
import v3_0_petstore from './examples/v3_0/petstore.json';
import v3_0_petstore_expanded from './examples/v3_0/petstore-expanded.json';
import v3_0_uspto from './examples/v3_0/uspto.json';
import invalid_schema from './examples/invalid_schema.json';

test('v3.1', async () => {
  const result = await validator(v3_1_webhooks);
  expect(result.valid).toBeTruthy();
});
test('v3.0 api-with-examples', async () => {
  const result = await validator(v3_0_api_with_examples);
  expect(result.valid).toBeTruthy();
});
test('v3.0 callback-example', async () => {
  const result = await validator(v3_0_callback_example);
  expect(result.valid).toBeTruthy();
});
test('v3.0 link-example', async () => {
  const result = await validator(v3_0_link_example);
  expect(result.valid).toBeTruthy();
});
test('v3.0 petstore', async () => {
  const result = await validator(v3_0_petstore);
  expect(result.valid).toBeTruthy();
});
test('v3.0 petstore-expanded', async () => {
  const result = await validator(v3_0_petstore_expanded);
  expect(result.valid).toBeTruthy();
});
test('v3.0 uspto', async () => {
  const result = await validator(v3_0_uspto);
  expect(result.valid).toBeTruthy();
});
test('invalid version', () => {
  expect(validator({openapi: '2.0.0'})).rejects
    .toThrow('Not supported version.\nopenapi version 3.0.0 >= version < 3.2.0');
});
test('invalid schema', async () => {
  const result = await validator(invalid_schema);
  expect(result.valid).toBeFalsy();
  expect(result.errors).toEqual([{
    keyword: 'validate',
    rule: '/$defs/components/unevaluatedProperties',
    location: '#/components/type',
  }]);
});

