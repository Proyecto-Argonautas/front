import MenuBar from "~/components/bars/MenuBar";

import HomeButton from "~/components/buttonsComponents/HomeButton";
import ReturnButton from "~/components/buttonsComponents/ReturnButton";
import RegisterCard from "~/components/register/RegisterCard";

function RegisterPage() {
  return (
    <>
      <RegisterCard />
      <MenuBar>
        <HomeButton />
        <ReturnButton />
      </MenuBar>
    </>
  );
}

export default RegisterPage;
