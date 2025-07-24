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
        <span className="text-base font-semibold text-gray-800">
          Acompañantes
        </span>

        <div className="flex items-center gap-2">
          <button
            aria-label="Disminuir miembros"
            className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition disabled:opacity-50"
            disabled={numberOfMembers <= 0}
            onClick={() => onNumberChange(Math.max(0, numberOfMembers - 1))}
            type="button"
          >
            <Minus className="w-3 h-3" />
          </button>

          <span className="text-base font-semibold w-6 text-center">
            {numberOfMembers}
          </span>

          <button
            aria-label="Aumentar miembros"
            className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition disabled:opacity-50"
            disabled={numberOfMembers >= 20}
            onClick={() => onNumberChange(Math.min(20, numberOfMembers + 1))}
            type="button"
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
            <div className="mb-2" key={key}>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor={`member-${index}`}
              >
                Nombre del miembro {index + 1}
              </label>
              <input
                className="block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                id={`member-${index}`}
                onChange={(e) => onMemberNameChange(index, e.target.value)}
                placeholder={`Miembro ${index + 1}`}
                type="text"
                value={memberNames[index] || ""}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MembersForm;
