import { type SchemaTypeDefinition } from "sanity";

import tourPackage from "./tourPackage";

import { continentType } from "./documents/continent";
import { countryType } from "./documents/country";

export const schemaTypes: SchemaTypeDefinition[] = [
  tourPackage,
  continentType,
  countryType,
];

export const schema = {
  types: schemaTypes,
};