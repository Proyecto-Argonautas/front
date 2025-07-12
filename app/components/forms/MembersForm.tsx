import { Minus, Plus } from "lucide-react";
import type React from "react";

type MembersFormProps = {
	numberOfMembers: number;
	onNumberChange: (value: number) => void;
	memberNames: string[];
	onMemberNameChange: (index: number, value: string) => void;
};

const MembersForm: React.FC<MembersFormProps> = ({
	numberOfMembers,
	onNumberChange,
	memberNames,
	onMemberNameChange,
}) => {
	return (
		<div className="    ">
			
	  <div className="flex items-center justify-between w-full max-w-xs mx-auto my-2">
		
		<span className="text-lg font-medium text-gray-800">Personas</span>
		
		<div className="flex items-center gap-5">
		  <button
			type="button"
			onClick={() => onNumberChange(Math.max(1, numberOfMembers - 1))}
			className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition disabled:opacity-50"
			disabled={numberOfMembers <= 1}
			aria-label="Disminuir miembros"
		  >
			<Minus className="w-4 h-4" />
		  </button>
		  
			<span className="text-l font-semibold w-2 text-center">{numberOfMembers}</span>
		  
			<button
			type="button"
			onClick={() => onNumberChange(Math.min(10, numberOfMembers + 1))}
			className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition disabled:opacity-50"
			disabled={numberOfMembers >= 10}
			aria-label="Aumentar miembros"
		  >
			<Plus className="w-4 h-4" />
		  </button>
		</div>
	  </div>

			
			<div className="space-y-5">
			{Array.from({ length: numberOfMembers }).map((_, index) => {
				return (
					<div key={index}>
							<label
								htmlFor={`member-${index}`}
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Nombre del miembro {index + 1}
							</label>
							<input
								id={`member-${index}`}
								type="text"
								value={memberNames[index] || ""}
								onChange={(e) => onMemberNameChange(index, e.target.value)}
								className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
								placeholder={`Miembro ${index + 1}`}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default MembersForm;
