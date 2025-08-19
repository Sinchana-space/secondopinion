"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, HeartPulse, LayoutGrid } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import React from "react";

const navLinks = [
  { href: "/prescription-upload", label: "AI Second Opinion" },
  { href: "/doctors", label: "Find a Doctor" },
];

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  
  // A simple way to check if we are in a dashboard route
  const isDashboard = pathname.startsWith('/dashboard');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <HeartPulse className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">SECOP</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition-colors hover:text-primary",
                pathname.startsWith(link.href) ? "text-primary" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
           {isDashboard && (
             <Link href="/dashboard" className={cn(
                "transition-colors hover:text-primary",
                pathname.startsWith("/dashboard") ? "text-primary" : "text-muted-foreground"
              )}>Dashboard</Link>
          )}
        </nav>
        <div className="hidden md:flex items-center gap-2">
          {!isDashboard && (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">Log In</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col gap-6 p-6 h-full">
              <Link href="/" className="flex items-center gap-2 mb-4" onClick={() => setIsOpen(false)}>
                <HeartPulse className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">SECOP</span>
              </Link>
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                 {isDashboard && (
                    <Link href="/dashboard" className="text-lg font-medium" onClick={() => setIsOpen(false)}>Dashboard</Link>
                )}
              </nav>
              <div className="flex flex-col gap-2 mt-auto">
                 {!isDashboard && (
                    <>
                    <Button variant="outline" asChild>
                      <Link href="/login" onClick={() => setIsOpen(false)}>Log In</Link>
                    </Button>
                    <Button asChild>
                      <Link href="/signup" onClick={() => setIsOpen(false)}>Sign Up</Link>
                    </Button>
                    </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
