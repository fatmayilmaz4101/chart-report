export enum DbSystem {
  PostgreSQL = 1,
  MongoDb,
  MsSQL,
}
export const DbSystemOptions = [
  { label: "PostgreSQL", value: DbSystem.PostgreSQL },
  { label: "MongoDb", value: DbSystem.MongoDb },
  { label: "MsSQL", value: DbSystem.MsSQL },
];
export const CharTypeOptions = [ "Line Chart" ,  "Bar Chart" ];
export const ViewSpOptions = [{ label: "View" }, { label: "Sp" }];
