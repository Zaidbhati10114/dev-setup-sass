import GeneratedGuide from "@/components/GeneratedGuide";
import { useParams } from "next/navigation";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  const id = params.id;

  return <GeneratedGuide id={id} />;
};

export default page;
