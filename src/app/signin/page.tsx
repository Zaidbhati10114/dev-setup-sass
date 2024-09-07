import { LoginForm } from "@/components/SignIn";
import React from "react";

const page = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <LoginForm />
    </div>
  );
};

export default page;
