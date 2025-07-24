import RegisterPage from "~/pages/registerPage";

// {}: Route.MetaArgs
export function meta() {
  return [{ title: "Register" }, { name: "resume", content: "Register" }];
}

export default function ProfileRoute() {
  return <RegisterPage />;
}
