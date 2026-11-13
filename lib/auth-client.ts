import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields } from "better-auth/client/plugins"
import type { auth } from "@/lib/auth" // type-only import — erased at build time

export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: process.env.BETTER_AUTH_URL,
    plugins: [
        // Teaches the client about server `additionalFields` (e.g. user.role),
        // so signUp.email({ role: ... }) typechecks and validates.
        inferAdditionalFields<typeof auth>(),
    ],
})

export const { signIn, signUp, useSession } = authClient
