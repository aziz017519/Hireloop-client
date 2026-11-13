import Link from "next/link"
import Image from "next/image"

import { cn } from "@/lib/utils"

export function AuthCard({
  title,
  subtitle,
  footer,
  children,
  className,
}: {
  title: string
  subtitle: string
  footer: React.ReactNode
  children: React.ReactNode
  className?: string
}) {
  return (
    <main className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-4 py-12">
      {/* Ambient glows matching the hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-[#5c53fe]/20 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-48 left-1/4 h-[400px] w-[700px] rounded-full bg-[#dc02ce]/10 blur-[120px]"
      />

      <Link href="/" aria-label="HireLoop home" className="relative mb-8">
        <Image
          src="/logo.png"
          alt="HireLoop"
          width={777}
          height={215}
          priority
          className="h-11 w-auto"
        />
      </Link>

      <div
        className={cn(
          "relative w-full max-w-md rounded-2xl border border-white/[0.07] bg-[#1a1a1f] p-6 shadow-[0_2px_2px_rgba(0,0,0,0.28)] sm:p-8",
          className
        )}
      >
        <h1 className="text-2xl font-bold tracking-tight text-[#ededef]">
          {title}
        </h1>
        <p className="mt-2 text-sm text-white/60">{subtitle}</p>

        {children}

        <div className="mt-6 text-center text-sm text-white/60">{footer}</div>
      </div>
    </main>
  )
}
