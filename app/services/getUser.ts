import type { User } from "~/types/user";
import { authClient } from "~/utils/auth-client";

export function getUser(): User | null {
  // const session = authClient.useSession();

  // const BACK_BASE_URL =
  //   (import.meta.env.VITE_BACK_BASE_URL as string) || "http://localhost:3000";

  // if (!session?.error) {
  //   const user = session?.data?.user;
  //   if (user?.image)
  //     user.image = `${BACK_BASE_URL}/user/proxy-image?url=${encodeURIComponent(user?.image)}`;
  //   return user as User;
  // }
  // return null;

  return {
    name: "Adrián Ureña Vallés",
    email: "adrian.urena.20@gmail.com",
    emailVerified: true,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/48px-User_icon_2.svg.png",
    createdAt: "2025-08-04T08:00:57.172Z",
    updatedAt: "2025-08-04T08:00:57.172Z",
    id: "XZ1JOu0JIUgAUjsWZoWWcAQETFU9iRwR",
  };
}

export async function isUserAuthenticated() {
  // const { data: session } = await authClient.getSession();
  // return session !== null;
  return true
}
