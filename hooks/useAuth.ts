"use client";

import { useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "../utils/supabase-server";
import { useQuery, UseQueryOptions, QueryKey } from "@tanstack/react-query";

interface Profile {
  id: string;
  email: string;
  setup_count: number;
  is_pro: boolean;
}

// Generic type for the query function
type QueryFn<T> = (accessToken: string) => Promise<T>;

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      setSession(session);
      setLoading(false);
    });

    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInWithGoogle = () =>
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    });

  const signInWithGithub = () =>
    supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    });

  const signOut = () => supabase.auth.signOut();

  function useAuthenticatedQuery<T>(
    queryKey: QueryKey,
    queryFn: QueryFn<T>,
    options?: Omit<
      UseQueryOptions<T, Error, T, QueryKey>,
      "queryKey" | "queryFn"
    >
  ) {
    const { session, loading } = useAuth();

    return useQuery({
      queryKey,
      queryFn: async () => {
        if (!session?.access_token) {
          throw new Error("Not authenticated");
        }
        return queryFn(session.access_token);
      },
      ...options,
      enabled:
        !!session?.access_token && !loading && (options?.enabled ?? true),
    });
  }

  return {
    user,
    session,
    loading,
    signInWithGoogle,
    signInWithGithub,
    signOut,
    profile,
    useAuthenticatedQuery,
  };
}
