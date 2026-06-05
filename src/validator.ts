import {validate as validateOpenapi30} from "@hyperjump/json-schema/openapi-3-0";
import {validate as validateOpenapi31} from "@hyperjump/json-schema/openapi-3-1";
import {validate as validateOpenapi32} from "@hyperjump/json-schema/openapi-3-2";
import {BASIC} from "@hyperjump/json-schema/experimental";
import type {Json} from "@hyperjump/json-pointer";

export type Validate = {
  keyword: string;
  rule: string;
  location: string;
};

type OutputUnit = {
  valid: boolean;
  keyword?: string;
  absoluteKeywordLocation?: string;
  instanceLocation?: string;
  errors?: OutputUnit[];
};

const dialects = {
  "3_0": {uri: "https://spec.openapis.org/oas/3.0/schema", validate: validateOpenapi30},
  "3_1": {uri: "https://spec.openapis.org/oas/3.1/schema-base", validate: validateOpenapi31},
  "3_2": {uri: "https://spec.openapis.org/oas/3.2/schema-base", validate: validateOpenapi32},
} as const;

export const validator = async (openapi: {openapi: string; [key: string]: unknown}) => {
  const version = openapi.openapi.split(".").slice(0, 2).join("_");
  const dialect = dialects[version as keyof typeof dialects];
  if (!dialect) {
    throw new Error("Not supported version.\nopenapi version 3.0.0 >= version < 3.3.0");
  }
  const output = (await dialect.validate(dialect.uri, openapi as unknown as Json, BASIC)) as OutputUnit;
  return {valid: output.valid, errors: errorExtractor(output)};
};

const errorExtractor = (output: OutputUnit): Validate[] =>
  (output.errors ?? []).map((error) => ({
    keyword: error.keyword?.split("/").pop() ?? "",
    rule: error.absoluteKeywordLocation?.split("#")[1] ?? "",
    location: error.instanceLocation ?? "",
  }));
