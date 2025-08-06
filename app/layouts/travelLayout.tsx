import { type LoaderFunctionArgs, Outlet, redirect } from "react-router";
import { getTravels } from "~/services/getTravel";
import { getUserAsync, isUserAuthenticated } from "~/services/getUser";

export async function clientLoader({ params }: LoaderFunctionArgs) {
  const travelId = params.travelId;

  if (!(await isUserAuthenticated())) {
    return redirect("/user/login");
  }

  const user = await getUserAsync(); // Fetch the user
  const userId = user?.id; // Get the user ID
  const travels = await getTravels(userId); // Fetch travels using the user ID\

  const travelExists = travels?.some(
    (travel) => travel.id === travelId,
  );

  if (!travelExists) {
    return redirect("/"); // Redirect to root if no travels exist
  }
}

export default function TravelLayout() {
  return (
    <div className="flex flex-col bg-light-secondary-100 gap-3 p-4 pb-20">
      <div className="bg-light-secondary-100">
        <Outlet />

        {/* <MenuBar>
          <HomeButton />

          {isResumePage && <AddArticleButton />}

          <ProfileButton />
        </MenuBar> */}
      </div>
    </div>
  );
}
