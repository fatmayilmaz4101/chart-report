import { MultiSelectChangeEvent } from "primereact/multiselect";
import { SelectItemOptionsType } from "primereact/selectitem";

export interface RedirectToChartFormType {
  selectedView: string;
  selectedFunction: string;
  chart: string;
  columns: string[];
  x: string;
  y: string[];
}
export interface ViewType {
  view: string;
  columns: string[];
}
export interface FuncType {
  func: string;
  columns: string[];
}
export interface YColumn {
  column: {
    name: string;
    values: string[];
  }[];
}
export interface ResponseData {
  xColumn: XColumn;
  yColumn: YColumn[];
}
export interface XColumn {
  name: string;
  values: string[];
}
export type FormFieldType = {
  control: any;
  name: string;
  label: string;
  required?: string;
  type: "dropdown" | "text" | "number" | "multiselect"; 
  options?: SelectItemOptionsType | undefined;
  disabled?: boolean;
  onchange?: MultiSelectChangeEvent;
};

export interface DbType {
  system: string;
  server: string;
  username: string;
  password: string;
  database: string;
}
