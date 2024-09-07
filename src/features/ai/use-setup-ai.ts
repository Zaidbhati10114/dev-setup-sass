import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<
  (typeof client.api.setupai)["get-setup"]["$post"]
>;

type RequestType = InferRequestType<
  (typeof client.api.setupai)["get-setup"]["$post"]
>["json"] & { accessToken: string };

type SuccessResponse = {
  title: string;
  description: string;
  steps: Array<{
    stepNumber: number;
    title: string;
    explanation: string;
    codeSnippet: string | string[];
  }>;
};

type Guide = SuccessResponse & { id: string };

// Define the context type
type ContextType = {
  previousGuides?: Guide[];
};

export const useSetUpAi = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    SuccessResponse,
    Error,
    RequestType,
    ContextType
  >({
    mutationFn: async ({ prompt, accessToken }) => {
      const response = await fetch("/api/setupai/get-setup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "An error occurred");
      }

      const result = await response.json();
      return result.data as SuccessResponse;
    },
    onMutate: async (newGuide) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["get-guides"] });

      // Snapshot the previous value
      const previousGuides = queryClient.getQueryData<Guide[]>(["get-guides"]);

      // Optimistically update to the new value
      const optimisticGuide: Guide = {
        id: "temp-id-" + Date.now(),
        title: newGuide.prompt,
        description: "Generated guide",
        steps: [],
      };

      queryClient.setQueryData<Guide[]>(["get-guides"], (old = []) => [
        ...old,
        optimisticGuide,
      ]);

      // Return a context object with the snapshotted value
      return { previousGuides };
    },
    onError: (err, newGuide, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousGuides) {
        queryClient.setQueryData(["get-guides"], context.previousGuides);
      }
    },
    onSuccess: (data, variables, context) => {
      queryClient.setQueryData<Guide[]>(["get-guides"], (old = []) =>
        old.map((guide) =>
          guide.id === "temp-id-" + Date.now()
            ? { ...data, id: guide.id }
            : guide
        )
      );
    },
    onSettled: () => {
      // Always refetch after error or success to ensure we're up to date
      queryClient.invalidateQueries({ queryKey: ["get-guides"] });
    },
  });

  return mutation;
};
