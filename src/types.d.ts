declare module 'country-telephone-data' {
  export interface CountryData {
    name: string;
    iso2: string;
    dialCode: string;
    priority: number;
    format?: string;
  }

  export const allCountries: CountryData[];
  export const iso2Lookup: Record<string, number>;
  export const allCountryCodes: Record<string, string[]>;
}
