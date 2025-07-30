import RegisterCard from "~/components/register/RegisterCard";

export function meta() {
  return [{ title: "Register" }, { name: "resume", content: "Register" }];
}

function RegisterPage() {
  return (
    <>
      <RegisterCard />
      
    </>
  );
}

export default RegisterPage;
