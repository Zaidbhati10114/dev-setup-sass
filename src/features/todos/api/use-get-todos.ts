import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetTodos = () => {
  const query = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await client.api.test.$get();
      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }
      const { data } = await response.json();
      return data;
    },
  });
  return query;
};
