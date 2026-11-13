"use client"

import Link from "next/link"

import { AuthCard } from "@/components/auth-card"
import { SignUpForm, type SignUpData } from "@/components/auth-forms"
import { authClient } from "@/lib/auth-client"

export function SignUpAuth() {
  async function handleSignUp(data: SignUpData) {
    const { data: signUpResponse, error } = await authClient.signUp.email({
      name: data.name, // required, The name of the user.
      email: data.email, // required, The email address of the user.
      password: data.password, // required, at least 8 characters, max 128 by default.
      callbackURL: "/", // An optional URL to redirect to after the user signs up.
    })

    console.log("Sign Up Response:", signUpResponse, error)

    if (error) {
      // Throwing shows the message inside the form (FormError).
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
