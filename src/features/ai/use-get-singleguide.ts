import { useQuery, UseQueryOptions, QueryKey } from "@tanstack/react-query";
import { useAuth } from "../../../hooks/useAuth";

// Guide type (adjust according to your actual Guide structure)
type Guide = {
  id: string;
  title: string;
  description: string;
  steps: any;
  user_id: string;
};

function useAuthenticatedQuery<T>(
  queryKey: QueryKey,
  queryFn: (accessToken: string) => Promise<T>,
  options?: Omit<UseQueryOptions<T, Error, T, QueryKey>, "queryKey" | "queryFn">
) {
  const { session, loading } = useAuth();

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

// Hook to get a single guide by ID
export function useGetGuide(guideId: string) {
  return useAuthenticatedQuery<Guide>(
    ["guide", guideId],
    async (accessToken) => {
      const response = await fetch(`/api/getguides/guide/${guideId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        let errorMessage = "An error occurred while fetching the guide";
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
