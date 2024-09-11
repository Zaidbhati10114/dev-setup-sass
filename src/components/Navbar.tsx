"use client";

import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button, buttonVariants } from "./ui/button";
import { GithubIcon, LogOut, SatelliteIcon } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import useLogout from "../../hooks/use-logout";

const Navbar = () => {
  const { user } = useAuth();
  const { logout } = useLogout();

  return (
    <div className="bg-white sticky z-50 top-0 inset-x-0 h-16">
      <header className="relative bg-white">
        <MaxWidthWrapper>
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <div className="ml-4 flex flex-col lg:ml-0">
                <Link href="/" className="flex items-center space-x-2">
                  <SatelliteIcon className="fill-current text-blue-600" />
                  <span className="font-bold text-blue-600">DEVSETUP</span>
                </Link>
              </div>

              <div className="ml-auto flex items-center">
                <div className="flex items-center lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {user ? null : (
                    <Link
                      href="/signin"
                      className={buttonVariants({
                        variant: "ghost",
                      })}
                    >
                      Sign in
                    </Link>
                  )}

                  {!user && (
                    <span
                      className="h-6 w-px bg-gray-200 mx-2"
                      aria-hidden="true"
                    />
                  )}

                  <Link
                    target="_blank"
                    href={"https://github.com/Zaidbhati10114"}
                  >
                    <Button className="lg:hidden p-2" variant={"ghost"}>
                      <GithubIcon className="w-5 h-5" />
                    </Button>
                  </Link>

                  <Link
                    target="_blank"
                    href={"https://github.com/Zaidbhati10114"}
                  >
                    <Button className="hidden lg:flex" variant={"ghost"}>
                      <GithubIcon className="w-5 h-5 mr-1" />
                      Github
                    </Button>
                  </Link>

                  {user && (
                    <div className="ml-4 flow-root lg:ml-6">
                      <Button onClick={logout} variant={"ghost"}>
                        <LogOut className="w-5 h-5 mr-1" />
                        Logout
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default Navbar;
