// import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router";
import { signIn } from "~/utils/auth-client";

const LoginCard: React.FC = () => {
  const [email, setEmail] = useState("");
  // const [loading, setLoading] = useState(false);

  // TODO mostrar errores por pantalla y que se mande el correo
  // TODO Hacer que los botones tengan un loader hasta que la petición se complete

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen px-6 pt-6 md:pt-2">
      <h2 className="bg-emerald-400 rounded-lg text-xl font-semibold my-10 md:my-6 p-3">
        Iniciar Sesión
      </h2>
      <div className="bg-emerald-400 text-black p-8 rounded-lg w-full max-w-sm shadow-lg">
        <p className="text-sm mb-6">
          Ingresa tu correo electrónico a continuación para iniciar sesión en tu
          cuenta
        </p>
        <label className="block text-s font-medium mb-3" htmlFor="email">
          Email
        </label>
        <input
          className="w-full px-3 py-2 mb-4 text-black rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="correo@example.com"
          required
          type="email"
          value={email}
        />
        <button
          className="w-full mb-4 py-2 bg-gray-100 text-black font-medium rounded-md hover:bg-gray-200 transition"
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
        </button>
        <button
          className="w-full py-2 bg-gray-100 text-black font-medium rounded-md hover:bg-gray-200 transition"
          // disabled={loading}
          onClick={async () => {
            await signIn.social(
              {
                provider: "google",
                callbackURL: "http://localhost:5173/user/profile",
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
          Sign in with Google
        </button>
      </div>
      <div className="flex justify-center text-gray-600 mt-5">
        <p>
          ¿No tienes una cuenta?{" "}
          <Link className="text-amber-500 underline" to="/user/register">
            Regístrate aquí.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginCard;
