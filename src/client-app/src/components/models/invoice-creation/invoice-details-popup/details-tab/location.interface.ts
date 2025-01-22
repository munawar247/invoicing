import { IAccount } from './account.interface';
import { IAddressInformation } from './address.interface';
import { ILocationLevel } from './location-level.interface';
import { IParentLocation } from './parent-location.interface';
import { ITelephoneInfo } from './telephone-info.interface';

export interface ILocationDetails {
  id: string;
  tenantId: string;
  locationTypeId: string;
  locationType: string;
  account: IAccount;
  parentLocation: IParentLocation;
  locationLevel: ILocationLevel;
  name: string;
  alias: string;
  email: string;
  communicationDetails: ITelephoneInfo[];
  displayId: number;
  address: IAddressInformation;
  status: number;
}
