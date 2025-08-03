import { redirect } from "react-router";
import RegisterCard from "~/components/register/RegisterCard";
import { isUserAuthenticated } from "~/services/getUser";
import type { handlePages } from "~/types/navigationButtons";

export function meta() {
  return [{ title: "Register" }, { name: "resume", content: "Register" }];
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

function RegisterPage() {
  return (
    <>
      <RegisterCard />
    </>
  );
}

export default RegisterPage;
