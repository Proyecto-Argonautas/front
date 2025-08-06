// import { Loader2 } from "lucide-react";

import React from "react";
import { signIn } from "~/utils/auth-client";

const LoginCard: React.FC = () => {
  // const [email, setEmail] = useState("");
  // const [loading, setLoading] = useState(false);
  const FRONT_BASE_URL =
    import.meta.env.VITE_FRONT_BASE_URL || "http://localhost:5173";

  // TODO mostrar errores por pantalla y que se mande el correo
  // TODO Hacer que los botones tengan un loader hasta que la petición se complete

  return (
    <div className="flex flex-col h-full items-center bg-light-secondary-100 px-6 pt-6 md:pt-2">
      <div>
        <img
          alt="logo WonderPocket"
          className="w-40 h-40"
          src="/images/WonderPocket.svg"
        />
      </div>
      <h2 className="bg-cold-light-400 rounded-lg text-xl font-semibold my-10 md:my-6 p-3">
        Iniciar Sesión
      </h2>
      <div className="bg-cold-light-400 text-black p-8 rounded-lg w-full max-w-sm shadow-lg">
        {/*<p className="text-sm mb-6">
          Ingresa tu correo electrónico a continuación para iniciar sesión en tu
          cuenta
        </p>
        <label className="block text-s font-medium mb-3" htmlFor="email">
          Email
        </label>
        <input
          className="w-full px-3 py-2 mb-4 text-black rounded-md bg-light-secondary-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="correo@example.com"
          required
          type="email"
          value={email}
        />
        <button
          className="w-full mb-4 py-2 bg-light-secondary-100 text-black font-medium rounded-md hover:bg-light-secondary-200 transition"
          onClick={async () => {
            await signIn.magicLink(
              {
                email,
              },
              // {
              //   onRequest: (ctx) => {
              //     setLoading(true);
              //   },
              //   onResponse: (ctx) => {
              //     setLoading(false);
              //   },
              // },
            );
          }}
          type="button"
        >
          Sign-in with Magic Link
        </button> */}
        <button
          className="w-full py-2 bg-light-secondary-100 text-black font-medium rounded-md hover:bg-light-secondary-200 transition"
          // disabled={loading}
          onClick={async () => {
            await signIn.social({
              provider: "google",
              callbackURL: `${FRONT_BASE_URL}/user/profile`,
            });
          }}
          type="button"
        >
          Sign in with Google
        </button>
      </div>
      {/* <div className="flex justify-center text-gray-600 mt-5">
        <p>
          ¿No tienes una cuenta?{" "}
          <Link className="text-amber-500 underline" to="/user/register">
            Regístrate aquí.
          </Link>
        </p>
      </div>*/}
    </div>
  );
};

export default LoginCard;
