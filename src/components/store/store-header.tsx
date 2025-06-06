"use client";
import { signOut, useSession,  } from "@/lib/auth-client";
import { LogOut, Menu, Settings, User, X } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useLayoutEffect } from "react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { CardButton } from "./store-cart-button";

export default function Header({ showAuth = true, products }: { showAuth?: boolean; products?: boolean }) {
  const [openMenu, setOpenMenu] = useState(false);
  const [mounted, setMounted] = useState(false);
  //@ts-expect-error
  const { data: session, status} = useSession();
  const isLoading = status === "loading";

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  // useEffect(() => {
  //   // Preload session data to improve performance
  //   preloadSession();
  // }, []);

  const handleSignOut = () => {                     
    void signOut();
  };

  return (
    <header className="pt-6 pb-12 sm:py-12 px-4 flex flex-col gap-6 sm:gap-10 max-w-screen-xl mx-auto">
      <div
        className={`flex justify-between w-full items-center mx-auto ${
          products && "max-w-screen-lg"
        }`}
      >
        <Link href="/">
          <img src="/cosecom_logo.png" alt="cosecom logo" className="h-20 w-180 mr-4" />
        </Link>
        {!products && (
          <nav>
            <ul className="hidden md:flex gap-10">
              <li className="hover:underline underline-offset-8 cursor-pointer">
                <a href="#our-collection">Our Collection</a>
              </li>
              <li className="hover:underline underline-offset-8 cursor-pointer">
                <a href="#client-favorites">Client Favorites</a>
              </li>
              <li className="hover:underline underline-offset-8 cursor-pointer">
                <a href="#why-cosecom">Why CoseCom</a>
              </li>
              <li className="hover:underline underline-offset-8 cursor-pointer">
                <a href="#about-the-brand">About The Brand</a>
              </li>
            </ul>
          </nav>
        )}

        <div className="flex gap-4 items-center">
          <CardButton />

          {showAuth && (
            <div className="flex items-center relative">
              {!mounted ? (
                <div className="w-10 h-10" /> // Placeholder with same dimensions to prevent layout shift
              ) : isLoading ? (
                <Button variant="ghost" size="icon" className="relative overflow-hidden rounded-full">
                  <span className="animate-pulse h-5 w-5 rounded-full bg-muted"></span>
                </Button>
              ) : session ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="relative overflow-hidden rounded-full"
                    >
                      {session.user?.image ? (
                        <img
                          src={session.user.image}
                          width={50}
                          height={50}
                          alt={session.user.name || "User"}
                          className="h-9 w-9 rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                          {session.user?.name && session.user.name[0].toUpperCase()}
                        </div>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" sideOffset={4} className="w-56">
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-0.5">
                        <p className="text-sm font-medium">
                          {session.user?.name || "User"}
                        </p>
                        <p className="text-xs text-muted-foreground truncate max-w-[160px]">
                          {session.user?.email}
                        </p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild disabled>
                      <Link
                        href="/profile/settings"
                        className="cursor-pointer"
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleSignOut}
                      className="cursor-pointer text-destructive focus:text-destructive"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center gap-2">
                  <Link href="/auth/sign-in">
                    <Button variant="ghost" size="sm" className="whitespace-nowrap">
                      Log in
                    </Button>
                  </Link>
                  <Link href="/auth/sign-up" className="hidden sm:block">
                    <Button size="sm">Sign up</Button>
                  </Link>
                </div>
              )}
            </div>
          )}

          {!products && (
            <button
              className="p-1 hover:bg-white/5 transition-colors rounded-lg md:hidden"
              onClick={() => setOpenMenu(!openMenu)}
            >
              <Menu strokeWidth={1} className="size-7" />
            </button>
          )}
        </div>

        <div
          className={`${
            !openMenu && "-translate-y-[100%]"
          } absolute md:hidden bg-background z-20 inset-0 border-b flex flex-col justify-center items-center w-full p-4 pt-8 h-min transition-transform duration-300`}
        >
          <h1 className="text-center text-2xl sm:text-3xl font-bold relative mr-16 mb-12">
            Dat Presents CoseCom
          </h1>
          <nav>
            <ul className="flex flex-col ml-20 justify-end items-end gap-4">
              <li className="hover:underline underline-offset-8 cursor-pointer">
                <a href="#our-collection" className="font-medium text-xl">Our Collection</a>
              </li>
              <li className="hover:underline underline-offset-8 cursor-pointer">
                <a href="#client-favorites" className="font-medium text-xl">Client Favorites</a>
              </li>
              <li className="hover:underline underline-offset-8 cursor-pointer">
                <a href="#why-cosecom" className="font-medium text-xl">Why CoseCom</a>
              </li>
              <li className="hover:underline underline-offset-8 cursor-pointer">
                <a href="#about-the-brand" className="font-medium text-xl">About The Brand</a>
              </li>
            </ul>
          </nav>
          <button
            className="mt-8 ml-auto p-1 hover:bg-white/5 transition-colors rounded-lg"
            onClick={() => setOpenMenu(!openMenu)}
          >
            <X strokeWidth={1} className="size-7" />
          </button>
        </div>

        <Link
          href={"/admin"}
          className="fixed bottom-0 right-0 m-4 z-0 bg-primary/20 hover:bg-primary transition-all duration-200 shadow-md text-black rounded-xl py-2 px-3"
        >
          Admin Dashboard
        </Link>
      </div>
    </header>
  );
}
