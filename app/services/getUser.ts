import type { User } from "~/types/user";
import { authClient } from "~/utils/auth-client";

export function getUser(): User | null {
  const session = authClient.useSession();

  const BACK_BASE_URL =
    (import.meta.env.VITE_BACK_BASE_URL as string) || "http://localhost:3000";

  if (!session?.error) {
    console.log(session);
    const user = session?.data?.user;
    if (user?.image)
      user.image = `${BACK_BASE_URL}/user/proxy-image?url=${encodeURIComponent(user?.image)}`;
    return user as User;
  }
  return null;
}

export async function isUserAuthenticated() {
  const { data: session } = await authClient.getSession();
  return session !== null;
}
