import { useState } from "react";
import MenuBar from "~/components/bars/MenuBar";

import HomeButton from "~/components/buttonsComponents/HomeButton";
import ProfileButton from "~/components/buttonsComponents/ProfileButton";
import StartPlanning from "~/components/buttonsComponents/StartPlanningButton";
import { DestinationForm } from "~/components/forms/DestinationForm";
import MembersForm from "~/components/forms/MembersForm";
import { DateForm } from "../components/forms/DateForm";

export default function MainFormPage() {
	const [numberOfMembers, setNumberOfMembers] = useState(0);
	const [memberNames, setMemberNames] = useState<string[]>([]);

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
		<div className="flex flex-col gap-2 min-h-screen bg-gray-100 p-3 sm:p-4 pb-16">
			

			<div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-3 sm:p-4 w-full">
				<div className="border border-gray-300 rounded-lg p-3 mb-4">
					<DestinationForm />
					<DateForm />
				</div>
				
				<div className="border border-gray-300 rounded-lg p-3">
					<MembersForm
						numberOfMembers={numberOfMembers}
						onNumberChange={handleNumberChange}
						memberNames={memberNames}
						onMemberNameChange={handleMemberNameChange}
					/>
				</div>
			</div>

			<div className="max-w-3xl mx-auto w-full mb-16 mt-3 sm:mt-0">
				<StartPlanning />
			</div>

			<MenuBar>
				<HomeButton />
				<ProfileButton />
			</MenuBar>
		</div>
	);
}
