import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../../hooks/useAuth";

// Define the types for the delete guide request and response
type RequestType = { id: string };
type ResponseType = { new_data: { id: string } };

// Assuming you have a type for your guide
type Guide = {
  id: string;
  // ... other properties
};

type DeleteGuideContext = {
  previousGuides: Guide[] | undefined;
};

export const useDeleteGuide = () => {
  const queryClient = useQueryClient();
  const { session, loading: authLoading } = useAuth();

  const mutation = useMutation<
    ResponseType,
    Error,
    RequestType,
    DeleteGuideContext
  >({
    mutationFn: async ({ id }) => {
      if (!session?.access_token) {
        throw new Error("Not authenticated");
      }

      const response = await fetch(`/api/getguides/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete guide");
      }

      return await response.json();
    },
    onMutate: async ({ id }) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["get-guides"] }); // Snapshot the previous value

      const previousGuides = queryClient.getQueryData<Guide[]>(["get-guides"]); // Optimistically update to the new value

      queryClient.setQueryData<Guide[]>(["get-guides"], (old) =>
        old ? old.filter((guide) => guide.id !== id) : []
      ); // Return a context object with the snapshotted value

      return { previousGuides };
    },
    onError: (err, variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousGuides) {
        queryClient.setQueryData<Guide[]>(
          ["get-guides"],
          context.previousGuides
        );
      }
      toast.error("Failed to delete guide");
    },
    onSuccess: ({ new_data }) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["get-guides"] });
      queryClient.invalidateQueries({ queryKey: ["get-guide", new_data.id] });
      toast.success("Guide deleted successfully");
    },
    onSettled: () => {
      // Always refetch after error or success to ensure we're up to date
      queryClient.invalidateQueries({ queryKey: ["get-guides"] });
    },
  });

  return {
    ...mutation,
    isLoading: mutation.isPending || authLoading,
  };
};
