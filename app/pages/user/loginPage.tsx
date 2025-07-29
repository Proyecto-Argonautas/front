import MenuBar from "~/components/bars/MenuBar";
import HomeButton from "~/components/buttonsComponents/HomeButton";
import ReturnButton from "~/components/buttonsComponents/ReturnButton";
import LoginCard from "~/components/login/LoginCard";

export function meta() {
  return [{ title: "Login" }, { name: "resume", content: "Login" }];
}


function LoginPage() {
  return (
    <>
      <LoginCard />

      <MenuBar>
        <HomeButton />
        <ReturnButton />
      </MenuBar>
    </>
  );
}

export default LoginPage;
