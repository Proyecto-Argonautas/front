import { type LoaderFunctionArgs, redirect } from "react-router";
import TravelForm from "~/components/forms/TravelForm";
import { getTravels } from "~/services/getTravel";
import { getUserAsync, isUserAuthenticated } from "~/services/getUser";
import type { handlePages } from "~/types/navigationButtons";

export function meta() {
  return [
    { title: "Travels - Main Form" },
    { name: "resume", content: "Form create travels" },
  ];
}

export const handle: handlePages = {
  hideHeader: true,
  buttons: ["home", "profile"],
};


export async function clientLoader({ params }: LoaderFunctionArgs) {
  const travelId = params.travelId;

  if (!(await isUserAuthenticated())) {
    return redirect("/user/login");
  }

  const user = await getUserAsync(); // Fetch the user
  const userId = user?.id; // Get the user ID
  const travels = await getTravels(userId); // Fetch travels using the user ID\

  const travelExists = travels?.some((travel) => travel.id === travelId);

  if (!travelExists) {
    return redirect("/"); // Redirect to root if no travels exist
  }
}

export default function CreateTravelPage() {
  return (
    <div className="flex flex-col items-center h-full gap-2 p-3 sm:p-4 pb-16">
      <div className="max-w-3xl mx-auto bg-light-primary shadow-md rounded-lg p-3 sm:p-4 w-full">
        <TravelForm />
      </div>
    </div>
  );
}
