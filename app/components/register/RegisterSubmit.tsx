import { useState } from "react";

interface RegisterSubmitProps {
	email: string;
	name: string;
	lastName: string;
	onSubmit?: (data: { email: string; name: string; lastName: string }) => void;
}

const RegisterSubmit: React.FC<RegisterSubmitProps> = ({
	email,
	name,
	lastName,
	onSubmit,
}) => {
	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState<string[]>([]);

	const validateForm = (): boolean => {
		const newErrors: string[] = [];

		// Validar email
		if (!email.trim()) {
			newErrors.push("El email es requerido");
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			newErrors.push("El email no tiene un formato válido");
		}

		// Validar nombre
		if (!name.trim()) {
			newErrors.push("El nombre es requerido");
		} else if (name.trim().length < 2) {
			newErrors.push("El nombre debe tener al menos 2 caracteres");
		}

		// Validar apellido
		if (!lastName.trim()) {
			newErrors.push("El apellido es requerido");
		} else if (lastName.trim().length < 2) {
			newErrors.push("El apellido debe tener al menos 2 caracteres");
		}

		setErrors(newErrors);
		return newErrors.length === 0;
	};

	const handleSubmit = async () => {
		if (!validateForm()) {
			return;
		}

		setIsLoading(true);
		setErrors([]);

		try {
			// Aquí puedes agregar la lógica para enviar los datos al servidor
			const userData = {
				email: email.trim(),
				name: name.trim(),
				lastName: lastName.trim(),
			};

			// Simular llamada API
			await new Promise((resolve) => setTimeout(resolve, 1000));

			// Llamar a la función onSubmit si se proporciona
			if (onSubmit) {
				onSubmit(userData);
			} else {
				// Lógica por defecto (por ejemplo, redireccionar)
				console.log("Usuario registrado:", userData);
				// Aquí podrías usar navigate para redireccionar
			}
		} catch (error) {
			setErrors(["Error al registrar el usuario. Inténtalo de nuevo."]);
			console.error("Error en el registro:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const isFormValid = email.trim() && name.trim() && lastName.trim();

	return (
		<div className="w-full">
			{/* Mostrar errores si los hay */}
			{errors.length > 0 && (
				<div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
					<ul className="list-disc list-inside text-sm">
						{errors.map((error, index) => (
							<li key={index}>{error}</li>
						))}
					</ul>
				</div>
			)}

			{/* Botón de submit */}
			<button
				type="button"
				onClick={handleSubmit}
				disabled={!isFormValid || isLoading}
				className={`w-full py-3 px-4 rounded-md font-semibold text-white transition-colors duration-200 ${
					!isFormValid || isLoading
						? "bg-gray-400 cursor-not-allowed"
						: "bg-emerald-500 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
				}`}
			>
				{isLoading ? (
					<div className="flex items-center justify-center">
						<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
						Registrando...
					</div>
				) : (
					"Crear cuenta"
				)}
			</button>
		</div>
	);
};

export default RegisterSubmit;
