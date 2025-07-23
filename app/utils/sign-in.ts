import { authClient } from "./auth-client"; //import the auth client

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
  callbackURL: "/user/profile",
  /**
   * A URL to redirect if an error occurs during the sign-in process
   */
  errorCallbackURL: "/error",
  /**
   * A URL to redirect if the user is newly registered
   */
  newUserCallbackURL: "/user/profile",
  /**
   * disable the automatic redirect to the provider.
   * @default false
   */
  disableRedirect: true,
});
