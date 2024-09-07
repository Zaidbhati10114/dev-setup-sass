import {
  useQuery,
  UseQueryOptions,
  QueryKey,
  useQueryClient,
} from "@tanstack/react-query";
import { useAuth } from "../../../hooks/useAuth";

// Generic type for the query function
type QueryFn<T> = (accessToken: string) => Promise<T>;

// Guide type (adjust according to your actual Guide structure)
type Guide = {
  id: string;
  title: string;
  description: string;
  steps: any;
  user_id: string;
};

export function useAuthenticatedQuery<T>(
  queryKey: QueryKey,
  queryFn: QueryFn<T>,
  options?: Omit<UseQueryOptions<T, Error, T, QueryKey>, "queryKey" | "queryFn">
) {
  const { session, loading } = useAuth();
  const queryClient = useQueryClient();

  return useQuery({
    queryKey,
    queryFn: async () => {
      if (!session?.access_token) {
        throw new Error("Not authenticated");
      }
      return queryFn(session.access_token);
    },
    ...options,
    enabled: !!session?.access_token && !loading && (options?.enabled ?? true),
  });
}

// Example usage for getGuides
export function useGetGuides() {
  return useAuthenticatedQuery<Guide[]>(
    ["get-guides"],
    async (accessToken) => {
      const response = await fetch("/api/getguides/get-guides", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        let errorMessage = "An error occurred while fetching guides";
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch {
          // If response body is not JSON, fallback to default error message
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      return result.data;
    },
    {
      staleTime: 1000 * 60 * 5, // Cache the data for 5 minutes
    }
  );
}

// Helper function for optimistic updates
export function useOptimisticUpdate() {
  const queryClient = useQueryClient();

  return {
    removeGuide: (guideId: string) => {
      queryClient.setQueryData<Guide[]>(["get-guides"], (oldData) =>
        oldData ? oldData.filter((guide) => guide.id !== guideId) : []
      );
    },
    addGuide: (newGuide: Guide) => {
      queryClient.setQueryData<Guide[]>(["get-guides"], (oldData) =>
        oldData ? [...oldData, newGuide] : [newGuide]
      );
    },
    updateGuide: (updatedGuide: Guide) => {
      queryClient.setQueryData<Guide[]>(["get-guides"], (oldData) =>
        oldData
          ? oldData.map((guide) =>
              guide.id === updatedGuide.id ? updatedGuide : guide
            )
          : []
      );
    },
  };
}
