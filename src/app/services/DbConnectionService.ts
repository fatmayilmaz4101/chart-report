import { DbType } from "../types";
import ApiClient from "./ApiClient";

export const connectToDatabase = async (db: DbType) => {
  try {
    const response = await ApiClient.post("DbConnection/connect", db);
    return response.data;
  } catch (error: any) {
    throw new Error("Hata:", error);
  }
};
