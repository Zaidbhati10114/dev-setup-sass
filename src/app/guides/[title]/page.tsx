"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

interface GuideData {
  title: string;
  description: string;
  steps: Array<{
    stepNumber: number;
    title: string;
    explanation: string;
    codeSnippet: string[];
  }>;
}

export default function GuideDetail({ params }: { params: { title: string } }) {
  const searchParams = useSearchParams();
  const [guide, setGuide] = useState<GuideData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = searchParams.get("data");
    if (data) {
      try {
        const parsedData = JSON.parse(decodeURIComponent(data));
        setGuide(parsedData);
      } catch (error) {
        console.error("Error parsing guide data:", error);
      }
    }
    setLoading(false);
  }, [searchParams]);

  if (loading) {
    return (
      <div className="p-4">
        <Skeleton className="h-12 w-3/4 mb-4" />
        <Skeleton className="h-6 w-full mb-6" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="mb-6">
            <Skeleton className="h-8 w-1/2 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-20 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (!guide) {
    return <p>Guide not found</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{guide.title}</h1>
      <p className="mt-2 text-lg">{guide.description}</p>
      <div className="mt-4">
        {guide.steps.map((step) => (
          <div key={step.stepNumber} className="mt-6">
            <h3 className="text-xl font-semibold">
              Step {step.stepNumber}: {step.title}
            </h3>
            <p className="mt-2">{step.explanation}</p>
            {step.codeSnippet &&
              step.codeSnippet.map((code, index) => (
                <pre key={index} className="mt-2 bg-gray-100 p-2 rounded">
                  <code>{code}</code>
                </pre>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
