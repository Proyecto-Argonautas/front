import { Outlet, redirect } from "react-router";
import { isUserAuthenticated } from "~/services/getUser";

export async function clientLoader() {
  // Comprueba si el usuario está autenticado
  if (!(await isUserAuthenticated())) {
    // Si no está autenticado, redirige a la página de inicio de sesión
    return redirect("/user/login");
  }
  // Si está autenticado, no hagas nada y permite que la ruta se cargue
  return null;
}

export default function TravelLayout() {
  return (
    <div className="flex flex-col bg-light-secondary-100 gap-3 p-4 pb-20">
      <div className="bg-light-secondary-100">
        <Outlet />

        {/* <MenuBar>
          <HomeButton />

          {isResumePage && <AddArticleButton />}

          <ProfileButton />
        </MenuBar> */}
      </div>
    </div>
  );
}
