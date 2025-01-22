export default interface IFilterDetails {
  accountFilter: IAccount | undefined;
  billToFilter: IBillToLocation | undefined;
  locationFilter: ILocationReference[] | undefined;
  fromDate: string;
  toDate: string;
  accounts: any | undefined;
  billTos: any | undefined;
  locations: any | undefined;
}

export interface IAccount {
  id: string | undefined;
  accountName: string | undefined;
}

export interface IBillToLocation {
  id: string | undefined;
  name: string | undefined;
}

export interface ILocationReference {
  id: string | undefined;
  name: string | undefined;
}
