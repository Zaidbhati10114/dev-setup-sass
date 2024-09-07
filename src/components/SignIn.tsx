"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "../../hooks/useAuth";

export function LoginForm() {
  const { signInWithGithub, signInWithGoogle } = useAuth();

  const handleSignInWithGithub = async () => {
    const { error } = await signInWithGithub();
    if (error) console.error("Error signing in with GitHub:", error.message);
  };

  const handleSignInWithGoogle = async () => {
    const { error } = await signInWithGoogle();
    if (error) console.error("Error signing in with GitHub:", error.message);
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Button
            onClick={handleSignInWithGoogle}
            variant="outline"
            className="w-full"
          >
            Login with Google
          </Button>
          <Button
            onClick={handleSignInWithGithub}
            variant="outline"
            className="w-full"
          >
            Login with Github
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="#" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
