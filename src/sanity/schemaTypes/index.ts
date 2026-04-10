import { type SchemaTypeDefinition } from "sanity";

import tourPackage from "./tourPackage";

import { continentType } from "./documents/continent";
import { countryType } from "./documents/country";
import { visaCountryContentType } from "./documents/visaCountryContent";
import { pilgrimagePackageType } from "./documents/pilgrimagePackage";
import { pilgrimageBulletSectionType } from "./objects/pilgrimageBulletSection";
import { pilgrimageKeyValueSectionType } from "./objects/pilgrimageKeyValueSection";

export const schemaTypes: SchemaTypeDefinition[] = [
  tourPackage,
  continentType,
  countryType,
  visaCountryContentType,
  pilgrimagePackageType,
  pilgrimageBulletSectionType,
  pilgrimageKeyValueSectionType,
];

export const schema = {
  types: schemaTypes,
};