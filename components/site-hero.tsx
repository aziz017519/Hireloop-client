import { SearchIcon, MapPinIcon, SparklesIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

const TRENDING_POSITIONS = ["Product Designer", "Dev-ops Engineer", "AI Engineering"]

export function SiteHero() {
  return (
    <section className="relative overflow-hidden">
      {/* Ambient glows approximating the Figma gradient ellipses */}
      <ImageDecor />
      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center gap-12 px-4 pb-20 pt-16 sm:px-6 lg:pb-28 lg:pt-24">
        {/* Badge */}
        <div className="flex items-center gap-4">
          <span className="h-px w-16 bg-white/20 max-sm:hidden" aria-hidden />
          <span className="flex items-center gap-4 rounded-3xl px-6 py-3 shadow-[inset_0_1px_6px_rgba(0,0,0,0.1)] max-sm:px-3">
            <SparklesIcon className="size-6 shrink-0 text-white" aria-hidden />
            <span className="whitespace-nowrap font-space-mono text-lg text-white max-sm:hidden sm:text-xl">
              50,000+ new jobs this month
            </span>
            <span className="font-space-mono text-sm text-white sm:hidden">
              50,000+ new jobs
            </span>
          </span>
          <span className="h-px w-16 bg-white/20 max-sm:hidden" aria-hidden />
        </div>

        {/* Title + subtitle */}
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="max-w-3xl font-manrope text-[40px] font-bold leading-[1.15] tracking-[-0.02em] text-white sm:text-[48px] lg:text-[56px]">
            Find Your Dream Job Today
          </h1>
          <p className="max-w-[784px] font-manrope text-base leading-[1.6] text-white/70 sm:text-lg lg:text-xl">
            HireLoop connects top talent with world-class companies. Browse
            thousands of curated opportunities and land your next role —
            faster.
          </p>
        </div>

        {/* Search bar */}
        <form
          action="/jobs"
          className="flex w-full max-w-[784px] flex-col gap-2 rounded-2xl border border-white/20 bg-[#101010] p-2 shadow-[0_2px_2px_rgba(0,0,0,0.28)] sm:gap-0 lg:h-16 lg:flex-row lg:items-center lg:gap-6 lg:rounded-2xl lg:px-6"
        >
          <div className="flex flex-1 items-center gap-2 rounded-xl px-3 py-2.5 lg:px-0 lg:py-0">
            <SearchIcon className="size-5 shrink-0 text-white" aria-hidden />
            <input
              type="search"
              name="q"
              placeholder="Job title, skill or company"
              aria-label="Job title, skill or company"
              className="w-full bg-transparent font-sans text-base text-white outline-none placeholder:text-white/80"
            />
          </div>
          <span
            className="hidden h-6 w-px bg-white/20 lg:block"
            aria-hidden
          />
          <div className="flex flex-1 items-center gap-2 rounded-xl px-3 py-2.5 lg:px-0 lg:py-0">
            <MapPinIcon className="size-5 shrink-0 text-white" aria-hidden />
            <input
              type="search"
              name="location"
              placeholder="Location or Remote"
              aria-label="Location or Remote"
              className="w-full bg-transparent font-sans text-base text-white outline-none placeholder:text-white/80"
            />
          </div>
          <Button
            type="submit"
            className="h-12 shrink-0 rounded-xl bg-[#5c53fe] px-3.5 text-base font-medium text-white shadow-[inset_0_1px_10px_rgba(255,255,255,0.2)] hover:bg-[#5c53fe]/90 lg:h-12"
          >
            <SearchIcon className="size-5" aria-hidden />
            Search
          </Button>
        </form>

        {/* Trending positions */}
        <div className="flex flex-wrap items-center justify-center gap-2 lg:gap-4">
          <span className="font-manrope text-base text-white/70">
            Trending Position
          </span>
          {TRENDING_POSITIONS.map((position) => (
            <a
              key={position}
              href="/jobs"
              className="rounded-full border border-white/10 bg-[#1a1a1b] px-3 py-1.5 font-manrope text-sm text-white transition-colors hover:border-white/25 hover:bg-[#232324]"
            >
              {position}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function ImageDecor() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[1100px] -translate-x-1/2 rounded-full bg-[#dc02ce]/20 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-[#5c53fe]/25 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mx-auto aspect-[16/9] w-full max-w-[1440px] bg-cover bg-center opacity-40 [mask-image:radial-gradient(ellipse_70%_80%_at_50%_20%,black,transparent)]"
        style={{ backgroundImage: "url('/images/hero-glow.jpg')" }}
      />
    </>
  )
}
