export enum DbSystem {
  PostgreSQL = 1,
  MongoDb,
  MsSQL,
}
export const DbSystemOptions = [
  { label: "PostgreSQL", value: DbSystem.PostgreSQL },
];
export const CharTypeOptions = ["Line Chart", "Bar Chart"];
export const ViewSpOptions = ["View", "Sp"];
