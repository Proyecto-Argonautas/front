// import TravelPage from "~/pages/travel";
import NewArticleButton from "~/components/buttons/NewArticleButton";

// {}: Route.MetaArgs
export function meta() {
  return [
    { title: "Travels - nombre viaje" },
    { name: "description", content: "Nombre viaje" },
  ];
}

export default function TravelPageRoutes() {
  return (
    <div>
      
      <NewArticleButton />
    </div>
  );
}
