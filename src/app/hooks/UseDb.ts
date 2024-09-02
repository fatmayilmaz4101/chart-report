import { useQuery } from "@tanstack/react-query";
import { getViews, ViewType } from "../services/DbService";

export const UseDb = (connectionString: string) => {
    
  const dbQuery = useQuery<ViewType[]>({
    queryKey: ["view"],
    queryFn: () => getViews(connectionString),
    staleTime: 300000,
    refetchOnReconnect: true,
  });
  return {
    ...dbQuery,
  };
};
