import { FuncType, ViewType } from "../types";
import ApiClient from "./ApiClient";
export const getViews = async (
  connectionString: string
): Promise<ViewType[]> => {
  try {
    const response = await ApiClient.get("/Db/views", {
      params: { connectionString: connectionString },
    });
    console.log("getViews: ", response.data);

    return response.data; // API'den gelen view'ları döndür
  } catch (error) {
    console.error("Error fetching database views:", error);
    throw error;
  }
};

export const getColumnsData = async (
  connectionString: string,
  viewName: string,
  xColumn: string,
  yColumns: string[]
) => {
  try {
    const response = await ApiClient.get("/Db/view-data", {
      params: {
        connectionString: connectionString,
        viewName: viewName,
        xColumn: xColumn,
        yColumns: yColumns,
      },
      paramsSerializer: (params) => {
        return new URLSearchParams(params).toString();
      },
    });
    console.log("getColumnsData: ", response.data);

    return response.data;
  } catch (error) {
    console.error("Error fetching view datas:", error);
    throw error;
  }
};
export const getFunctions = async (
  connectionString: string
): Promise<FuncType[]> => {
  try {
    const response = await ApiClient.get("/Db/functions", {
      params: { connectionString: connectionString },
    });
    console.log("getFunctions: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching database views:", error);
    throw error;
  }
};
export const getFuncColumnsData = async (
  connectionString: string,
  funcName: string,
  xColumn: string,
  yColumns: string[]
) => {
  try {
    const response = await ApiClient.get("/Db/func-data", {
      params: {
        connectionString: connectionString,
        funcName: funcName,
        xColumn: xColumn,
        yColumns: yColumns,
      },
      paramsSerializer: (params) => {
        return new URLSearchParams(params).toString();
      },
    });
    console.log("getFuncColumnsData: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching funct datas:", error);
    throw error;
  }
};
