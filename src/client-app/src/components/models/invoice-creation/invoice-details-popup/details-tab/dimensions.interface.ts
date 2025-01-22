export interface IDimensions {
  type: Shape;
  length: IUnit | null;
  width: IUnit | null;
  height: IUnit | null;
  diameter: IUnit | null;
}

export interface IUnit {
  Unit: string;
  Value: number;
}

export enum Shape {
  None = 0,
  Cubic = 1,
  Cylindrical = 2,
  Other = 3
}
