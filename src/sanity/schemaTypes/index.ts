import { type SchemaTypeDefinition } from "sanity";

import tourPackage from "./tourPackage";

import { continentType } from "./documents/continent";
import { countryType } from "./documents/country";
import { visaCountryContentType } from "./documents/visaCountryContent";

export const schemaTypes: SchemaTypeDefinition[] = [
  tourPackage,

  continentType,
  countryType,

  visaCountryContentType,
];

export const schema = {
  types: schemaTypes,
};