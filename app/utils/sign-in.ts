import { authClient } from "./auth-client"; //import the auth client

const FRONT_BASE_URL =
  import.meta.env.VITE_FRONT_BASE_URL || "http://localhost:5173";
// const BACK_BASE_URL =
//   (import.meta.env.VITE_BACK_BASE_URL as string) || "http://localhost:3000";

await authClient.signIn.social({
  /**
   * The social provider ID
   * @example "github", "google", "apple"
   */
  provider: "google",
  /**
   * A URL to redirect after the user authenticates with the provider
   * @default "/user/profile"
   */
  callbackURL: `${FRONT_BASE_URL}/user/profile`,
  /**
   * A URL to redirect if the user is newly registered
   */
  newUserCallbackURL: `${FRONT_BASE_URL}/user/profile`,
  /**
   * disable the automatic redirect to the provider.
   * @default false
   */
  disableRedirect: true,
});
