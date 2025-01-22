export interface IAddressInformation {
  streetAddress: string[];
  city: string;
  provinceState: string;
  postalZipCode: string;
  country: string;
  latitude?: number;
  longitude?: number;
}
