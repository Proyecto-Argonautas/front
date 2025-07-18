import { useState } from "react";
import { Link } from "react-router";

const LoginCard: React.FC = () => {
	const [email, setEmail] = useState("");

	const handleMagicLinkSignIn = () => {
		// ureña pon aqui lógica para enviar magic link!!!!
		console.log("Enviando magic link a:", email);
	};

	return (
		<div className="flex flex-col items-center bg-grey-100 px-6 pt-6">
			<h2 className="bg-emerald-400 rounded-lg text-xl font-semibold my-10 p-3">
				Iniciar Sesión
			</h2>
			<div className="bg-emerald-400 text-black p-8 rounded-lg w-full max-w-sm shadow-lg">
				<p className="text-sm text-grey-100 mb-6">
					Ingresa tu correo electrónico a continuación para iniciar sesión en tu
					cuenta
				</p>
				<label htmlFor="email" className="block text-s font-medium mb-3">
					Email
				</label>
				<input
					id="email"
					type="email"
					placeholder="albert@example.com"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="w-full px-3 py-2 mb-4 text-black rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
				/>
				<button
					type="button"
					onClick={handleMagicLinkSignIn}
					className="w-full py-2 bg-gray-100 text-black font-medium rounded-md hover:bg-gray-200 transition"
				>
					Sign-in with Magic Link
				</button>
			</div>
			<div className="flex justify-center text-gray-600 mt-5">
				<p>¿No tienes una cuenta? <Link className="text-amber-500 underline" to="/user/register">Regístrate aquí.</Link></p>
			</div>
				

		</div>
	);
};

export default LoginCard;
