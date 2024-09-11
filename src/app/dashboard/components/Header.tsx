"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { SatelliteIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useAuth } from "../../../../hooks/useAuth";
import useLogout from "../../../../hooks/use-logout";

export default function Header() {
  const user = useAuth();
  const { logout } = useLogout();

  return (
    <header className="py-6">
      <div className="container flex max-w-3xl items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2">
            <SatelliteIcon className="h-8 w-8" />
            <span className="text-xl font-bold">Dev Setup</span>
          </div>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="overflow-hidden rounded-full"
            >
              <Image
                src={
                  user.user?.user_metadata.avatar_url ||
                  "https://github.com/shadcn.png"
                }
                width={36}
                height={36}
                alt="Avatar"
                className="overflow-hidden rounded-full"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="cursor-pointer">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Support
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="cursor-pointer">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* <SignedOut>
          <SignInButton mode='modal'>
            <Button size='sm' variant='ghost'>
              Sign in
            </Button>
          </SignInButton>
        </SignedOut> */}
        {/* No user Cotent below */}
      </div>
    </header>
  );
}
