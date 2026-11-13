"use client"

import Link from "next/link"

import { AuthCard } from "@/components/auth-card"
import { SignUpForm, type SignUpData } from "@/components/auth-forms"
import { authClient } from "@/lib/auth-client"

export function SignUpAuth() {
  async function handleSignUp(data: SignUpData) {
    const { data: signUpResponse, error } = await authClient.signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role, // "seeker" | "recruiter" | "admin" (user.additionalFields in lib/auth.ts)
      callbackURL: "/",
    })

    console.log("Sign Up Response:", signUpResponse, error)

    if (error) {
      
      throw new Error(
        error.message ?? "Could not create your account. Please try again."
      )
    }
  }

  return (
    <AuthCard
      title="Create your account"
      subtitle="Start browsing thousands of curated opportunities."
      footer={
        <>
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-medium text-[#5c53fe] hover:text-[#645bff]"
          >
            Sign in
          </Link>
        </>
      }
    >
      <SignUpForm onSubmit={handleSignUp} />
    </AuthCard>
  )
}
