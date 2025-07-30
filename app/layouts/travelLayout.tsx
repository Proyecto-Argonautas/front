import { Outlet } from "react-router";
import YourTravelNavBar from "~/components/bars/YourTravelNavBar";


export default function TravelLayout() {
 

 

  return (
    <div className="flex flex-col bg-light-secondary-100 min-h-screen gap-3 p-4 pb-20">
      <div className="bg-light-secondary-100 min-h-screen">
        

        

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
