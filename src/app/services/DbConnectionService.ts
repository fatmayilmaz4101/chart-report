import ApiClient from "./ApiClient";

export interface DbType {
  system: string;
  server: string;
  username: string;
  password: string;
  database: string;
}
export const connectToDatabase = async (db: DbType) => {
  try {
    const response = await ApiClient.post("DbConnection/connect", db);
    return response.data;
  } catch (error: any) {
    throw new Error("Hata:", error);
  }
};
