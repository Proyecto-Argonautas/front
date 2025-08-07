import { Outlet } from "react-router";


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
