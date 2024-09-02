import ApiClient from "./ApiClient";
export interface ViewType {
  view: string,
  columns: string[]
}
export const getViews = async (connectionString: string): Promise<ViewType[]>=> {
  try {
    const response = await ApiClient.get("/Db/views", {
      params: { connectionString: connectionString },
    });
    return response.data; // API'den gelen view'ları döndür
  } catch (error) {
    console.error("Error fetching database views:", error);
    throw error;
  }
};
