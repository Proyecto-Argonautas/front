import { useState } from "react";
import { Link } from "react-router";
import RegisterSubmit from "./RegisterSubmit";

const RegisterCard: React.FC = () => {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [lastName, setLastName] = useState("");

	const handleRegistrationSubmit = (data: { email: string; name: string; lastName: string }) => {
		// Aquí puedes agregar la lógica específica después del registro exitoso
		console.log("Datos de registro:", data);
		// Por ejemplo, redireccionar a otra página o mostrar un mensaje de éxito
	};

	return (
		<div className="flex flex-col items-center bg-gray-100 min-h-screen px-6 pt-6 md:pt-2">
			<h2 className="bg-amber-200 rounded-lg text-xl font-semibold my-10 md:my-6 p-3">
				Registra tu cuenta
			</h2>
			<div className="bg-amber-200 text-black p-8 rounded-lg w-full max-w-sm shadow-lg">
				<p className="text-sm text-grey-100 mb-6">
					Rellena los siguientes campos para crear tu cuenta
				</p>
				

        {/* Email */}
        <input
					id="email"
					type="email"
					placeholder="tuemail@example.com"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="w-full px-3 py-2 mb-4 text-black rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
				/>

        {/* Nombre completo */}
        <input
         id="name"
         type="text"
         placeholder="Nombre"
         value={name}
         onChange={(e) => setName(e.target.value)}
         className="w-full px-3 py-2 mb-4 text-black rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500" />

         
         {/* Apellido */}
         <input
         id="last-name"
         type="text"
         placeholder="Apellido"
         value={lastName}
         onChange={(e) => setLastName(e.target.value)}
         className="w-full px-3 py-2 mb-4 text-black rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500" />

				{/* Botón de registro */}
				<RegisterSubmit
					email={email}
					name={name}
					lastName={lastName}
					onSubmit={handleRegistrationSubmit}
				/>

			</div>
			<div className="flex justify-center text-gray-600 mt-5">
				<p>¿Ya tienes una cuenta? <Link className="text-emerald-500 underline" to="/user/login">Inicia sesión aquí.</Link></p>
			</div>
				

		</div>
	);
};

export default RegisterCard;