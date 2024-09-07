"use client";
import React, { useState } from "react";
import Form from "./components/Form";
import GuidesList from "@/components/Guides";

const DashboardPage = () => {
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  return (
    <section className="py-28">
      <div className="container max-w-5xl px-4">
        <Form isGenerating={isGenerating} setIsGenerating={setIsGenerating} />
        <GuidesList isGenerating={isGenerating} />
      </div>
    </section>
  );
};

export default DashboardPage;
