import { redirect } from "react-router";
import TravelForm from "~/components/forms/TravelForm";
import { isUserAuthenticated } from "~/services/getUser";
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


export async function clientLoader() {

  if (!(await isUserAuthenticated())) {
    return redirect("/user/login");
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
