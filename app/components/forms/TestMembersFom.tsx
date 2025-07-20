import React, { ChangeEvent, useState } from "react";

const TestMembersForm: React.FC = () => {
	const [members, setMembers] = useState<string[]>(["", ""]);

	// Actualiza el nombre del miembro
	const handleNameChange = (
		index: number,
		event: ChangeEvent<HTMLInputElement>,
	) => {
		const updatedMembers = [...members];
		updatedMembers[index] = event.target.value;
		setMembers(updatedMembers);
	};

	// Añade un nuevo miembro vacío
	const addMember = () => {
		setMembers([...members, ""]);
	};

	// Elimina el último miembro, mínimo 1
	const removeMember = () => {
		if (members.length > 1) {
			setMembers(members.slice(0, -1));
		}
	};

	return (
		<div className="space-y-4">
			<div className="flex items-center space-x-4">
				<span className="text-sm font-medium text-gray-700">MIEMBROS</span>
				<div className="flex items-center space-x-2">
					<button
						type="button"
						onClick={removeMember}
						className="w-8 h-8 flex items-center justify-center rounded-full border text-lg text-gray-600 hover:bg-gray-100"
					>
						−
					</button>
					<span className="w-6 text-center text-lg">{members.length}</span>
					<button
						type="button"
						onClick={addMember}
						className="w-8 h-8 flex items-center justify-center rounded-full border text-lg text-gray-600 hover:bg-gray-100"
					>
						+
					</button>
				</div>
			</div>

			<div className="space-y-2">
				{members.map((name, index) => (
					<div key={index} className="flex items-center space-x-2">
						<label className="text-sm text-gray-600">
							Miembro {index + 1}:
						</label>
						<input
							type="text"
							value={name}
							onChange={(e) => handleNameChange(index, e)}
							className="border px-2 py-1 rounded w-full max-w-sm text-sm"
							placeholder="Nombre del miembro"
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default TestMembersForm;
