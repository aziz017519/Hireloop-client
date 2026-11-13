"use client"

import { useState } from "react"
import Link from "next/link"

import { EyeIcon, EyeOffIcon, Loader2Icon } from "lucide-react"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export type SignInData = {
  email: string
  password: string
  remember: string
}

export type SignUpData = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-4" {...props}>
      <path
        d="M22.56 12.23c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.16-3.16A11 11 0 0 0 2.18 7.06L5.84 9.9c.87-2.6 3.3-4.52 6.16-4.52Z"
        fill="#EA4335"
      />
    </svg>
  )
}

function SubmitButton({
  pending,
  children,
}: {
  pending?: boolean
  children: React.ReactNode
}) {
  return (
    <Button
      type="submit"
      disabled={pending}
      className="h-11 w-full rounded-lg bg-[#5c53fe] text-base font-medium text-white shadow-[inset_0_1px_10px_rgba(255,255,255,0.2)] hover:bg-[#5c53fe]/90"
    >
      {pending && <Loader2Icon className="size-4 animate-spin" aria-hidden />}
      {pending ? "Please wait…" : children}
    </Button>
  )
}

function Divider() {
  return (
    <div className="flex items-center gap-3" aria-hidden>
      <span className="h-px flex-1 bg-white/10" />
      <span className="text-xs text-white/40">or continue with</span>
      <span className="h-px flex-1 bg-white/10" />
    </div>
  )
}

function GoogleButton() {
  return (
    <Button
      type="button"
      variant="outline"
      className="h-11 w-full rounded-lg border-white/10 bg-transparent text-base text-[#ededef] hover:bg-white/5"
    >
      <GoogleIcon />
      Google
    </Button>
  )
}

function PasswordInput(props: React.ComponentProps<"input">) {
  const [visible, setVisible] = useState(false)
  return (
    <div className="relative">
      <Input
        {...props}
        type={visible ? "text" : "password"}
        className={cn("pr-10", props.className)}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Hide password" : "Show password"}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 transition-colors hover:text-white"
      >
        {visible ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
      </button>
    </div>
  )
}

function FormError({ message }: { message: string | null }) {
  if (!message) return null
  return (
    <p role="alert" className="text-sm text-red-400">
      {message}
    </p>
  )
}

export function SignInForm({
  onSubmit,
}: {
  /** Called with the collected form data. Throw to show an error message. */
  onSubmit?: (data: SignInData) => Promise<void> | void
}) {
  const [submitted, setSubmitted] = useState<Record<string, string> | null>(
    null
  )
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = Object.fromEntries(
      new FormData(event.currentTarget)
    ) as unknown as SignInData

    setError(null)

    if (!onSubmit) {
      // No handler wired up yet — log the collected data for now.
      console.log("sign-in submit:", data)
      setSubmitted(data)
      return
    }

    setPending(true)
    try {
      await onSubmit(data)
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Something went wrong. Please try again."
      )
    } finally {
      setPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="email" className="text-sm text-[#ededef]">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className="h-11 rounded-lg border-white/10 bg-[#101010] text-[#ededef] placeholder:text-white/40"
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className="text-sm text-[#ededef]">
            Password
          </Label>
          <Link
            href="/forgot-password"
            className="text-sm text-[#5c53fe] hover:text-[#645bff]"
          >
            Forgot password?
          </Link>
        </div>
        <PasswordInput
          id="password"
          name="password"
          required
          autoComplete="current-password"
          placeholder="••••••••"
          className="h-11 rounded-lg border-white/10 bg-[#101010] text-[#ededef] placeholder:text-white/40"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-white/60">
        <Checkbox name="remember" className="border-white/20 bg-transparent data-checked:border-[#5c53fe] data-checked:bg-[#5c53fe]" />
        Remember me for 30 days
      </label>

      <FormError message={error} />

      <SubmitButton pending={pending}>Sign In</SubmitButton>
      <Divider />
      <GoogleButton />

      {submitted && (
        <pre className="overflow-auto rounded-lg border border-white/10 bg-[#101010] p-3 text-xs text-white/60">
          {JSON.stringify(submitted, null, 2)}
        </pre>
      )}
    </form>
  )
}

export function SignUpForm({
  onSubmit,
}: {
  /** Called with the collected form data. Throw to show an error message. */
  onSubmit?: (data: SignUpData) => Promise<void> | void
}) {
  const [submitted, setSubmitted] = useState<Record<string, string> | null>(
    null
  )
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = Object.fromEntries(
      new FormData(event.currentTarget)
    ) as unknown as SignUpData

    setError(null)

    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    if (!onSubmit) {
      // No handler wired up yet — log the collected data for now.
      console.log("sign-up submit:", data)
      setSubmitted(data)
      return
    }

    setPending(true)
    try {
      await onSubmit(data)
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Something went wrong. Please try again."
      )
    } finally {
      setPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name" className="text-sm text-[#ededef]">
          Full name
        </Label>
        <Input
          id="name"
          name="name"
          required
          autoComplete="name"
          placeholder="Jane Doe"
          className="h-11 rounded-lg border-white/10 bg-[#101010] text-[#ededef] placeholder:text-white/40"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email" className="text-sm text-[#ededef]">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className="h-11 rounded-lg border-white/10 bg-[#101010] text-[#ededef] placeholder:text-white/40"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="password" className="text-sm text-[#ededef]">
          Password
        </Label>
        <PasswordInput
          id="password"
          name="password"
          required
          minLength={8}
          autoComplete="new-password"
          placeholder="At least 8 characters"
          className="h-11 rounded-lg border-white/10 bg-[#101010] text-[#ededef] placeholder:text-white/40"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="confirmPassword" className="text-sm text-[#ededef]">
          Confirm password
        </Label>
        <PasswordInput
          id="confirmPassword"
          name="confirmPassword"
          required
          autoComplete="new-password"
          placeholder="••••••••"
          className="h-11 rounded-lg border-white/10 bg-[#101010] text-[#ededef] placeholder:text-white/40"
        />
      </div>

      <FormError message={error} />

      <SubmitButton pending={pending}>Create Account</SubmitButton>
      <Divider />
      <GoogleButton />

      {submitted && (
        <pre className="overflow-auto rounded-lg border border-white/10 bg-[#101010] p-3 text-xs text-white/60">
          {JSON.stringify(submitted, null, 2)}
        </pre>
      )}
    </form>
  )
}
