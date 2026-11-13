import Link from "next/link"

import { AuthCard } from "@/components/auth-card"
import { SignInForm } from "@/components/auth-forms"

export const metadata = {
  title: "Sign In — HireLoop",
}

export default function SignInPage() {
  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in to your HireLoop account to continue."
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="font-medium text-[#5c53fe] hover:text-[#645bff]"
          >
            Sign up
          </Link>
        </>
      }
    >
      <SignInForm />
    </AuthCard>
  )
}
