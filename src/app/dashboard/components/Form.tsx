"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSetUpAi } from "@/features/ai/use-setup-ai";
import { useAuth } from "../../../../hooks/useAuth";
import { supabase } from "../../../../utils/supabase-server";
import { useGetGuides } from "@/features/ai/use-get-guides";
import { toast } from "sonner";

interface FormProps {
  isGenerating: boolean; // isGenerating is a boolean
  setIsGenerating: Dispatch<SetStateAction<boolean>>; // setIsGenerating is a setter function from useState
}

export default function Form({ isGenerating, setIsGenerating }: FormProps) {
  const [value, setValue] = useState("");
  const { user, session } = useAuth();
  const router = useRouter();
  const { refetch, isFetching } = useGetGuides(); // Get isFetching state from useGetGuides

  const mutation = useSetUpAi();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value) {
      toast.error("Please enter a prompt");
      return;
    }

    if (!session) {
      router.push("/login");
      return;
    }

    setIsGenerating(true);

    // Start mutation
    mutation.mutate(
      { prompt: value, accessToken: session.access_token },
      {
        onSuccess: () => {
          // Once the mutation is successful, trigger refetch of the guides
          refetch();
        },
        onSettled: () => {
          setIsGenerating(false);
        },
      }
    );
  };

  return (
    <section className="mx-auto max-w-lg">
      <Card className="border-0 shadow-none">
        <CardHeader className="text-center">
          <CardTitle>Setup Guide Generator</CardTitle>
          <CardDescription>
            Generate a setup guide about anything
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="mt-3">
            <Input
              name="prompt"
              placeholder="What should I write about?"
              className="rounded-lg"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <Button
              size="sm"
              type="submit"
              className={cn(
                "mt-3 w-full rounded-lg",
                mutation.isPending && "animate-pulse" // Control loading state of the button
              )}
              disabled={mutation.isPending} // Disable button while loading
            >
              {mutation.isPending ? "Working on it..." : "Generate"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
