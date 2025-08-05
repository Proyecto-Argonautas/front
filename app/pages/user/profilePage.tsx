import { useContext } from "react";
import { redirect } from "react-router";
import ProfileCard from "~/components/profile/ProfileCard";
import { UserContext } from "~/contexts/UserContext";
import { isUserAuthenticated } from "~/services/getUser";
import type { handlePages } from "~/types/navigationButtons";

export function meta() {
  return [
    { title: "User Profile" },
    { name: "resume", content: "User profile" },
  ];
}

export const handle: handlePages = {
  hideHeader: true,
  buttons: ["home","profile"],
};

export async function clientLoader() {
  // Comprueba si el usuario está autenticado
  if (!(await isUserAuthenticated())) {
    // Si no está autenticado, redirige a la página de inicio de sesión
    return redirect("/user/login");
  }
  // Si está autenticado, no hagas nada y permite que la ruta se cargue
  return null;
}

function ProfilePage() {
  const user = useContext(UserContext);
  const DEFAULT_IMG =
    "https://images.pexels.com/photos/3617500/pexels-photo-3617500.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
  const userImage = user?.name ? user?.image : DEFAULT_IMG;

  return (
    <>
      <ProfileCard
        email={user?.email || "example@example.com"}
        name={user?.name || "Default"}
        profileImageUrl={userImage}
        viajesCount={5}
      />
    </>
  );
}

export default ProfilePage;
