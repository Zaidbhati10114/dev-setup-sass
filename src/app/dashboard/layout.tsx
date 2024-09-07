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
  const user = useAuth();
  return (
    <>
      {user !== null && (
        <>
          <Header />
          {children}
        </>
      )}
      {user === null && (
        <>
          <div className="h-screen flex flex-col space-y-4 items-center justify-center">
            <h1 className="text-2xl">Please log in to Dev Setup</h1>
            <Link href={"/signin"}>
              <Button>Log in</Button>
            </Link>
          </div>
        </>
      )}
    </>
  );
}
