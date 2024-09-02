import { useMutation, useQueryClient } from "@tanstack/react-query";
import { connectToDatabase } from "../services/DbConnectionService";

export const UseDbConnection = () => {
  const queryClient = useQueryClient();
  const connectMutation = useMutation({
    mutationFn: connectToDatabase,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["connect"] });
    },
  });
  return {
    connectDb: connectMutation.mutate,
  };
};
