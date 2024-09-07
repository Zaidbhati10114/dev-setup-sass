"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";
import SetupReel from "@/components/SetupListing";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Brain,
  ClipboardCopy,
  GitBranch,
  Languages,
  RefreshCcw,
} from "lucide-react";
import Link from "next/link";
import { RefObject, useRef } from "react";
import { useAuth } from "../../hooks/useAuth";
import Footer from "@/components/Footer";

const perks = [
  {
    name: "AI-Powered Guides",
    Icon: Brain,
    description:
      "Our AI generates personalized setup guides tailored to your specific needs and tech stack.",
  },
  {
    name: "Copy-Ready Code",
    Icon: ClipboardCopy,
    description:
      "All code snippets are formatted and ready to copy, saving you time and reducing errors.",
  },
  {
    name: "Version Control",
    Icon: GitBranch,
    description:
      "Save and version your guides for easy access and sharing with your team.",
  },
  {
    name: "Multi-Language Support",
    Icon: Languages,
    description:
      "Generate guides and code snippets for a wide range of programming languages and frameworks.",
  },
  {
    name: "Continuous Updates",
    Icon: RefreshCcw,
    description:
      "Our AI stays up-to-date with the latest tech trends, ensuring your guides are always current.",
  },
];

export default function Home() {
  const featuresRef: RefObject<HTMLElement> = useRef(null);
  const { user } = useAuth();

  const scrollToFeatures = () => {
    if (featuresRef.current) {
      featuresRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      <MaxWidthWrapper>
        <Navbar />
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Generate custom setup guides with <br />
            <span className="text-blue-600">AI-powered code</span>.
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            Welcome to SetupGenius. Our AI creates personalized setup guides
            tailored to your tech stack, with copy-ready code snippets to get
            you up and running quickly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link
              href={user ? "/dashboard" : "/signin"}
              className={buttonVariants()}
            >
              Create Guide
            </Link>
            <Button variant="ghost" onClick={scrollToFeatures}>
              Explore Features &rarr;
            </Button>
          </div>
        </div>

        <SetupReel
          title="Setup Guides"
          subtitle="Step-by-step instructions for various tech setups"
        />
      </MaxWidthWrapper>

      <section
        ref={featuresRef}
        className="border-t border-gray-200 bg-gray-50"
      >
        <MaxWidthWrapper className="py-20">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 md:gap-x-8 lg:gap-x-8 lg:gap-y-0">
            {perks.map((perk) => (
              <div
                key={perk.name}
                className="text-center p-4 md:flex md:items-start md:text-left md:gap-x-8 lg:block lg:text-center"
              >
                <div className="md:flex-shrink-0 flex justify-center">
                  <div className="h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-900">
                    {<perk.Icon className="w-1/3 h-1/3" />}
                  </div>
                </div>

                <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                  <h3 className="text-base font-medium text-gray-900">
                    {perk.name}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
        <Footer />
      </section>
    </>
  );
}
