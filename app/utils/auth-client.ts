import { magicLinkClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

const BACK_BASE_URL =
  (import.meta.env.VITE_BACK_BASE_URL as string) || "http://localhost:3000";

export const authClient = createAuthClient({
  baseURL: BACK_BASE_URL,
  plugins: [magicLinkClient()],
});

export const { signIn, signOut, signUp, useSession } = authClient;
