"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../../utils/supabase-server";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN" && session) {
          router.push("/dashboard"); // Redirect to home page or dashboard
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
      {/* Text below the spinner */}
      <h1 className="mt-6 text-xl text-center font-semibold text-gray-700">
        Setting you up...
      </h1>
    </div>
  );
}
