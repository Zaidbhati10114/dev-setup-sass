"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "../../../hooks/useAuth";
import Link from "next/link";
import Header from "./components/Header";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, loading } = useAuth(); // Destructure loading from useAuth

  // While loading, show a loading indicator
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  // If user is null (not logged in), show the login prompt
  if (user === null) {
    return (
      <div className="h-screen flex flex-col space-y-4 items-center justify-center">
        <h1 className="text-2xl">Please log in to Dev Setup</h1>
        <Link href={"/signin"}>
          <Button>Log in</Button>
        </Link>
      </div>
    );
  }

  // If user exists, show the dashboard with the header
  return (
    <>
      <Header />
      {children}
    </>
  );
}
