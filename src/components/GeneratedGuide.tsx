"use client";
import { useGetGuide } from "@/features/ai/use-get-singleguide";
import React, { useEffect, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Button } from "./ui/button";
import { Toaster as Sonner, toast } from "sonner";
import { ArrowBigLeft, Copy } from "lucide-react";

interface Step {
  stepNumber: number;
  title: string;
  explanation: string;
  codeSnippet: string[];
}

interface GuideData {
  id: string;
  title: string;
  description: string;
  steps: Step[];
  user_id: string;
}

interface GeneratedGuideProps {
  id: string;
}

const GeneratedGuide = ({ id }: GeneratedGuideProps) => {
  const { data, isLoading, error } = useGetGuide(id);
  const [guideData, setGuideData] = useState<GuideData | null>(null);
  const [activeStep, setActiveStep] = useState(1);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isScrolling, setIsScrolling] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast.success("Code copied to clipboard!");
      },
      (err) => {
        console.error("Could not copy text: ", err);
        toast.error("Failed to copy code");
      }
    );
  };

  useEffect(() => {
    if (data) {
      setGuideData(data);
    }
  }, [data]);

  const handleScroll = () => {
    if (isScrolling) return;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    let activeStepIndex = 0;
    stepRefs.current.forEach((ref, index) => {
      if (ref && ref.getBoundingClientRect().top <= windowHeight / 2) {
        activeStepIndex = index;
      }
    });

    // Check if we're at the bottom of the page
    if (scrollTop + windowHeight >= documentHeight - 20) {
      activeStepIndex = stepRefs.current.length - 1;
    }

    setActiveStep(activeStepIndex + 1);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolling]);

  if (error) return <div>Error: {error.message}</div>;

  const scrollToStep = (stepNumber: number) => {
    setIsScrolling(true);
    setActiveStep(stepNumber);
    const stepElement = stepRefs.current[stepNumber - 1];
    if (stepElement) {
      stepElement.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        setIsScrolling(false);
      }, 1000); // Adjust this delay if needed
    }
  };

  const renderSkeletonSteps = () => {
    return Array(5)
      .fill(null)
      .map((_, index) => (
        <div key={index} className="mb-16">
          <Skeleton className="w-[200px] h-[28px] mb-2" />
          <Skeleton className="w-full h-[60px] mb-4" />
          <Skeleton className="w-full h-[100px] mb-4" />
        </div>
      ));
  };

  return (
    <div className="flex">
      <aside className="w-1/5 h-screen sticky top-0 bg-gray-100 p-4">
        <ul>
          {isLoading
            ? Array(5)
                .fill(null)
                .map((_, index) => (
                  <li key={index} className="mb-2">
                    <Skeleton className="w-full h-[30px]" />
                  </li>
                ))
            : guideData?.steps.map((step) => (
                <li
                  key={step.stepNumber}
                  className={`cursor-pointer p-2 ${
                    activeStep === step.stepNumber
                      ? "bg-blue-500 text-white"
                      : ""
                  }`}
                  onClick={() => scrollToStep(step.stepNumber)}
                >
                  Step {step.stepNumber}: {step.title}
                </li>
              ))}
          {!isLoading && (
            <div className="mt-4">
              <Link href="/dashboard">
                <Button>
                  <ArrowBigLeft className="w-6 h-6 mr-1" />
                  Back To Dashboard
                </Button>
              </Link>
            </div>
          )}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="w-3/4 p-8">
        {isLoading ? (
          <>
            <Skeleton className="w-[300px] h-[36px] mb-4" />
            <Skeleton className="w-full h-[60px] mb-8" />
            {renderSkeletonSteps()}
          </>
        ) : guideData ? (
          <>
            <h1 className="text-3xl font-bold mb-4">{guideData.title}</h1>
            <p className="mb-8">{guideData.description}</p>
            {guideData.steps.map((step, index) => (
              <div
                key={step.stepNumber}
                ref={(el: HTMLDivElement | null) => {
                  stepRefs.current[index] = el;
                }}
                className="mb-16"
              >
                <h2 className="text-2xl font-semibold mb-2">
                  {step.stepNumber}. {step.title}
                </h2>
                <p className="mb-4">{step.explanation}</p>
                {step.codeSnippet.map((snippet, idx) => (
                  <div key={idx} className="relative">
                    <pre className="bg-gray-900 text-white p-4 rounded mb-4">
                      <code>{snippet}</code>
                    </pre>
                    <button
                      className="absolute top-3 right-2 p-1.5 bg-gray-700 rounded hover:bg-gray-600 transition-colors"
                      onClick={() => copyToClipboard(snippet)}
                    >
                      <Copy className="w-4 h-4 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            ))}
          </>
        ) : (
          <div>No guide data available</div>
        )}
      </main>
    </div>
  );
};

export default GeneratedGuide;
