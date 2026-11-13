"use client"

import Link from "next/link"

import { AuthCard } from "@/components/auth-card"
import { SignInForm, type SignInData } from "@/components/auth-forms"
import { authClient } from "@/lib/auth-client"


export function SignInAuth() {
  async function handleSignIn(data: SignInData) {
    const { error } = await authClient.signIn.email({
      email: data.email, 
      password: data.password, 
      rememberMe: data.remember === "on",
      callbackURL: "/",
    })

    if (error) {
     
      throw new Error(
        error.message ?? "Could not sign you in. Please check your credentials."
      )
    }
  
  }

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
      <SignInForm onSubmit={handleSignIn} />
    </AuthCard>
  )
}
