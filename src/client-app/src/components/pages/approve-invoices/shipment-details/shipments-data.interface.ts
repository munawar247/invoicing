export interface IShipmentsRowDataItem {
  id: string;
  shipmentId: string;
  shipmentDate: number | Date | string;
  origin: string;
  destination: string;
  charge: number;
  fuel: number;
  accessorial: number;
  total: number;
}
