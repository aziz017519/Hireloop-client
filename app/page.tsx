import { SiteNavbar } from "@/components/site-navbar"
import { SiteHero } from "@/components/site-hero"

export default function Page() {
  return (
    <div className="min-h-svh bg-[#1e1e1e]">
      <SiteNavbar />
      <main>
        <SiteHero />
      </main>
    </div>
  )
}
