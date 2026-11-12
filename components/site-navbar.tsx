"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

import { MenuIcon } from "lucide-react"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const NAV_LINKS = [
  { href: "/jobs", label: "Browse Jobs" },
  { href: "/company", label: "Company" },
  { href: "/pricing", label: "Pricing" },
] as const

function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="HireLoop home"
      className={cn("flex shrink-0 items-center", className)}
    >
      <Image
        src="/logo.png"
        alt="HireLoop"
        width={777}
        height={215}
        priority
        className="h-11 w-auto"
      />
    </Link>
  )
}

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname()
  const active = pathname === href || pathname.startsWith(`${href}/`)

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "text-base transition-colors hover:text-white/70",
        active
          ? "font-bold text-[#ededef] underline decoration-[1.5px] underline-offset-4"
          : "text-[#ededef]"
      )}
    >
      {label}
    </Link>
  )
}

function NavbarActions({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <Button
        render={<Link href="/sign-in" />}
        nativeButton={false}
        className="h-10 rounded-lg bg-[#1a1a1f] px-4 font-inter text-lg font-semibold text-[#645bff] shadow-[inset_0_1px_10px_rgba(255,255,255,0.2)] hover:bg-white/5"
      >
        Sign In
      </Button>
      <Button
        render={<Link href="/get-started" />}
        nativeButton={false}
        className="h-10 rounded-lg border border-[#090a15] bg-[#5c53fe] px-4 font-instrument-sans text-lg font-medium text-[#ededef] shadow-[inset_0_1px_10px_rgba(255,255,255,0.2)] hover:bg-[#5c53fe]/90"
      >
        Get Started
      </Button>
    </div>
  )
}

function MobileMenu({ className }: { className?: string }) {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="text-[#ededef] hover:bg-white/10 hover:text-white"
            aria-label="Open menu"
          />
        }
        className={className}
      >
        <MenuIcon className="size-6" />
      </SheetTrigger>
      <SheetContent className="w-full border-white/10 bg-[#1a1a1f] text-[#ededef] sm:max-w-xs">
        <SheetHeader>
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <Logo />
        </SheetHeader>
        <nav className="flex flex-col gap-1 px-4" aria-label="Mobile">
          {NAV_LINKS.map(({ href, label }) => (
            <SheetClose
              key={href}
              render={<Link href={href} />}
              nativeButton={false}
              className="rounded-lg px-3 py-2.5 text-lg text-[#ededef] transition-colors hover:bg-white/10"
            >
              {label}
            </SheetClose>
          ))}
          <span className="my-3 h-px w-6 bg-[#a8a8a8]/60" aria-hidden />
          <SheetClose
            render={
              <Button
                variant="ghost"
                className="h-11 w-full justify-start rounded-lg px-3 font-inter text-lg font-semibold text-[#645bff] hover:bg-white/5"
              />
            }
          >
            Sign In
          </SheetClose>
          <SheetClose
            render={
              <Button className="mt-1 h-11 w-full rounded-lg border border-[#090a15] bg-[#5c53fe] px-3 font-instrument-sans text-lg font-medium text-[#ededef] hover:bg-[#5c53fe]/90" />
            }
          >
            Get Started
          </SheetClose>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

export function SiteNavbar() {
  return (
    <header className="sticky top-0 z-40 w-full px-4 pt-4 sm:px-6">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 rounded-2xl shadow-[0_2px_2px_rgba(0,0,0,0.28)]">
        <Logo />
        <nav
          className="hidden h-[68px] items-center gap-6 rounded-xl border border-white/[0.07] bg-[#1a1a1f] px-6 py-2 lg:flex"
          aria-label="Main"
        >
          <ul className="flex items-center gap-5">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <NavLink href={href} label={label} />
              </li>
            ))}
          </ul>
          <span className="h-6 w-px bg-[#a8a8a8]/60" aria-hidden />
          <NavbarActions />
        </nav>
        <div className="flex h-[68px] items-center rounded-xl border border-white/[0.07] bg-[#1a1a1f] px-4 lg:hidden">
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}
