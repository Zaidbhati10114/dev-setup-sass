"use client"; // This is necessary for client-side components in Next.js

import { useRouter } from "next/navigation";
import { supabase } from "../utils/supabase-server";

const useLogout = () => {
  const router = useRouter();

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      // Redirect to the login page or any other page
      router.push("/signin");
    } catch (error: any) {
      console.error("Error logging out:", error.message);
    }
  };

  return { logout };
};

export default useLogout;
