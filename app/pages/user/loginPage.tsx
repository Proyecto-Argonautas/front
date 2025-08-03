import { redirect } from "react-router";
import LoginCard from "~/components/login/LoginCard";
import { isUserAuthenticated } from "~/services/getUser";
import type { handlePages } from "~/types/navigationButtons";

export function meta() {
  return [{ title: "Login" }, { name: "resume", content: "Login" }];
}

export const handle: handlePages = {
  hideHeader: true,
  buttons: ["home", "return", "profile"],
};

export async function clientLoader() {
  // Comprueba si el usuario está autenticado
  if (await isUserAuthenticated()) {
    // Si está autenticado, redirige a la página perfil
    return redirect("/user/profile");
  }
  // Si no está autenticado, no hagas nada y permite que la ruta se cargue
  return null;
}

function LoginPage() {
  return (
    <>
      <LoginCard />
    </>
  );
}

export default LoginPage;
