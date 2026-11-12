import { SiteNavbar } from "@/components/site-navbar"

export default function Page() {
  return (
    <div className="min-h-svh bg-[#1e1e1e]">
      <SiteNavbar />
      <main className="mx-auto max-w-7xl px-4 pt-16 sm:px-6">
        <h1 className="text-4xl font-bold text-[#ededef]">Browse Jobs</h1>
        <p className="mt-4 max-w-xl text-lg text-white/60">
          Page content goes here. The navbar is responsive: the full pill menu
          shows on desktop, and a slide-over menu on smaller screens.
        </p>
      </main>
    </div>
  )
}
