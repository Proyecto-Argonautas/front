import { authClient } from "~/utils/auth-client";

export default async function getUser() {
  let user;
  // const { data: session } = await authClient.getSession();

  // // TODO hacer cosas

  // return session;

  authClient
    .getSession()
    .then(session => {
      console.log(session);
      // aquí podrías actualizar estado, llamar un callback, etc.
    })
    .catch(err => {
      console.error("Error al obtener sesión", err);
    });
  return user;
  // return true;
}
