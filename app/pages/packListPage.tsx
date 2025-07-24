import MenuBar from "~/components/bars/MenuBar";
import HomeButton from "~/components/buttonsComponents/HomeButton";
import ReturnButton from "~/components/buttonsComponents/ReturnButton";
import PackList from "~/components/packingCRUD/PackList";

function PackListPage() {
  return (
    <>
      <PackList />

      <MenuBar>
        <HomeButton />
        <ReturnButton />
      </MenuBar>
    </>
  );
}

export default PackListPage;
