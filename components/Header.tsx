"use client";

import {
  ClerkLoaded,
  SignedIn,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import Form from "next/form";
import { PackageIcon, TrolleyIcon, SearchIcon } from "@sanity/icons";
import { useState, useEffect } from "react";

function Header() {
  const { user } = useUser();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const createClerkPasskey = async () => {
    try {
      const response = await user?.createPasskey();
      console.log(response);
    } catch (error) {
      console.error("Error", JSON.stringify(error, null, 2));
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-sm transition-all duration-300 ${
        scrolled ? "shadow-md bg-white/90" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-between py-4">
          <Link
            href="/"
            className="text-3xl font-extrabold text-blue-600 hover:text-blue-700 transition-colors duration-200"
          >
            <span className="flex items-center">
              <TrolleyIcon className="w-8 h-8 mr-2" />
              Shopr
            </span>
          </Link>

          <Form action="/search" className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <input
                type="text"
                name="query"
                placeholder="Search for products"
                className="w-full bg-gray-50 border border-gray-200 rounded-full pl-5 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-700"
              >
                <SearchIcon className="w-5 h-5" />
              </button>
            </div>
          </Form>

          <div className="flex items-center space-x-4">
            <Link
              href="/basket"
              className="relative flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-200 group"
            >
              <TrolleyIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>My Basket</span>
              {/* Example basket count badge */}
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </Link>

            <ClerkLoaded>
              <SignedIn>
                <Link
                  href="/orders"
                  className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-full transition-all duration-200"
                >
                  <PackageIcon className="w-5 h-5" />
                  <span>Orders</span>
                </Link>
              </SignedIn>

              {user ? (
                <div className="flex items-center space-x-3 ml-2">
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Welcome back</p>
                    <p className="font-bold text-sm">{user.fullName}</p>
                  </div>
                  <UserButton
                    appearance={{
                      elements: {
                        userButtonAvatarBox: "w-10 h-10",
                      },
                    }}
                  />

                  {user.passkeys.length === 0 && (
                    <button
                      onClick={createClerkPasskey}
                      className="bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium py-2 px-4 rounded-full border border-blue-200 transition-all duration-200 animate-pulse"
                    >
                      Create passkey
                    </button>
                  )}
                </div>
              ) : (
                <SignInButton mode="modal">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full transition-all duration-200">
                    Sign In
                  </button>
                </SignInButton>
              )}
            </ClerkLoaded>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden">
          <div className="flex items-center justify-between py-3">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              <span className="flex items-center">
                <TrolleyIcon className="w-6 h-6 mr-1" />
                Shopr
              </span>
            </Link>

            <div className="flex items-center space-x-3">
              <Link href="/basket" className="relative text-blue-500">
                <TrolleyIcon className="w-6 h-6" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </Link>

              <ClerkLoaded>
                {user ? (
                  <UserButton />
                ) : (
                  <SignInButton mode="modal">
                    <button className="text-blue-500">Sign In</button>
                  </SignInButton>
                )}
              </ClerkLoaded>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-500 p-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {mobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <Form action="/search" className="pb-3">
            <div className="relative">
              <input
                type="text"
                name="query"
                placeholder="Search for products"
                className="w-full bg-gray-50 border border-gray-200 rounded-full pl-4 pr-10 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500"
              >
                <SearchIcon className="w-5 h-5" />
              </button>
            </div>
          </Form>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="py-2 space-y-2 border-t border-gray-100">
              <ClerkLoaded>
                <SignedIn>
                  <Link
                    href="/orders"
                    className="flex items-center space-x-2 px-2 py-2 hover:bg-gray-50 rounded"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <PackageIcon className="w-5 h-5" />
                    <span>My Orders</span>
                  </Link>

                  {user?.passkeys.length === 0 && (
                    <button
                      onClick={createClerkPasskey}
                      className="w-full flex items-center space-x-2 px-2 py-2 hover:bg-gray-50 rounded text-blue-600"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                      <span>Create passkey</span>
                    </button>
                  )}
                </SignedIn>
              </ClerkLoaded>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
