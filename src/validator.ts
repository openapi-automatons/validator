import JsonSchema, {SchemaDocument} from '@hyperjump/json-schema';
import {Result} from '@hyperjump/json-schema-core/lib/core';
import v3_1 from './schemas/v3_1.json';
import v3_0 from './schemas/v3_0.json';

const schemas: {[key: string]: [any, string, string]} = {
  '3_1': [v3_1 as any, 'https://json-schema.hyperjump.io/schema', 'https://json-schema.org/draft/2020-12/schema'],
  '3_0': [v3_0 as any, 'https://json-schema.hyperjump.io/schema', 'http://json-schema.org/draft-04/schema#'],
};

export const validator = async (openapi: {openapi: string, [key: string]: any}) => {
  const params = schemas[openapi.openapi.split('.').slice(0, 2).join('_')];
  if (!params) {
    throw new Error('Not supported version.\nopenapi version 3.0.0 >= version < 3.2.0');
  }
  JsonSchema.add(...params);
  const schema: SchemaDocument = await JsonSchema.get('https://json-schema.hyperjump.io/schema');
  return JsonSchema.validate(schema, openapi, JsonSchema.DETAILED)
    .then((result) => ({
      valid: result.valid,
      errors: errorExtractor(result),
    }));
};

export type Validate = {
  keyword: string,
  rule: string,
  location: string
}

const errorExtractor = (result: Result): Validate[] => {
  if (!result.errors || result.errors?.length === 0) {
    return [{
      keyword: result.keyword.split('#').slice(-1, 2)?.[0],
      rule: result.absoluteKeywordLocation.split('#').slice(-1, 2)?.[0],
      location: result.instanceLocation,
    }];
  }
  return result.errors.map((res) => [...errorExtractor(res)]).flat();
};

