import { type SchemaTypeDefinition } from "sanity";

import tourPackage from "./tourPackage";

import { continentType } from "./documents/continent";
import { countryType } from "./documents/country";
import { visaCountryContentType } from "./documents/visaCountryContent";
import { visaSectionType } from "./objects/visaSection";
import { visaParagraphBlockType } from "./objects/visaParagraphBlock";
import { visaBulletListBlockType } from "./objects/visaBulletListBlock";
import { visaKeyValueRowType } from "./objects/visaKeyValueRow";
import { visaKeyValueGridBlockType } from "./objects/visaKeyValueGridBlock";
import { visaDualChecklistBlockType } from "./objects/visaDualChecklistBlock";
import { visaCalloutBlockType } from "./objects/visaCalloutBlock";

export const schemaTypes: SchemaTypeDefinition[] = [
  tourPackage,

  continentType,
  countryType,

  visaCountryContentType,

  visaSectionType,
  visaParagraphBlockType,
  visaBulletListBlockType,
  visaKeyValueRowType,
  visaKeyValueGridBlockType,
  visaDualChecklistBlockType,
  visaCalloutBlockType,
];

export const schema = {
  types: schemaTypes,
};