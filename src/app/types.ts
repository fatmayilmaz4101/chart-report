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
