import { useState } from "react";
import MenuBar from "~/components/bars/MenuBar";
import FormButtons from "~/components/buttons/FormButtons";
import StartPlanning from "~/components/buttons/StartPlanningButton";
import HomeButton from "~/components/buttonsComponents/HomeButton";
import ProfileButton from "~/components/buttonsComponents/ProfileButton";
import { DestinationForm } from "~/components/forms/DestinationForm";
import MembersForm from "~/components/forms/MembersForm";
import { DateForm } from "../components/forms/DateForm";

export default function MainFormPage() {
	const [numberOfMembers, setNumberOfMembers] = useState(1);
	const [memberNames, setMemberNames] = useState<string[]>([""]);

	const handleNumberChange = (num: number) => {
		setNumberOfMembers(num);
		if (num > memberNames.length) {
			setMemberNames([
				...memberNames,
				...Array(num - memberNames.length).fill(""),
			]);
		} else {
			setMemberNames(memberNames.slice(0, num));
		}
	};

	const handleMemberNameChange = (index: number, name: string) => {
		const updatedNames = [...memberNames];
		updatedNames[index] = name;
		setMemberNames(updatedNames);
	};

	return (
		<div className="flex flex-col gap-3 min-h-screen bg-gray-100 p-6 pb-18">
			<div className="text-center">
				<h1 className="text-xl font-bold text-gray-800">ELIGE TU DESTINO</h1>
			</div>

			<div className="flex  gap-5 max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
				<div className="border border-gray-400 rounded ">
					<DestinationForm />
					<DateForm />
				</div>
			</div>

			<div className="flex gap-5 flex-col  max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
				<div className="border border-gray-400 rounded p-4">
					<MembersForm
						numberOfMembers={numberOfMembers}
						onNumberChange={handleNumberChange}
						memberNames={memberNames}
						onMemberNameChange={handleMemberNameChange}
					/>
				</div>
			</div>

			<div className="">
				<StartPlanning />
			</div>

			<MenuBar>
				<HomeButton />
				<ProfileButton />
			</MenuBar>
		</div>
	);
}
