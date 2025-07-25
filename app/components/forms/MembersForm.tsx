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
		<div className="w-full">
			<div className="flex items-center justify-between w-full mb-3">
				<span className="text-base font-semibold text-gray-800">Acompañantes <span className="text-gray-500">(opcional)</span></span>

				<div className="flex items-center gap-2">
					<button
						type="button"
						onClick={() => onNumberChange(Math.max(0, numberOfMembers - 1))}
						className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition disabled:opacity-50"
						disabled={numberOfMembers <= 0}
						aria-label="Disminuir miembros"
					>
						<Minus className="w-3 h-3" />
					</button>

					<span className="text-base font-semibold w-6 text-center">
						{numberOfMembers}
					</span>

					<button
						type="button"
						onClick={() => onNumberChange(Math.min(20, numberOfMembers + 1))}
						className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition disabled:opacity-50"
						disabled={numberOfMembers >= 20}
						aria-label="Aumentar miembros"
					>
						<Plus className="w-3 h-3" />
					</button>
				</div>
			</div>

			<div className="grid gap-2">
				{Array.from({ length: numberOfMembers }).map((_, index) => {
					const key = memberNames[index]
						? `${memberNames[index]}-${index}`
						: `member-${index}`;
					return (
						<div key={key} className="mb-2">
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
								className="block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
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
