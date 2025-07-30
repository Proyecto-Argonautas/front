// import { useOutletContext } from "react-router";

import ProfileCard from "~/components/profile/ProfileCard";
import getUser from "~/utils/local/user";

export function meta() {
  return [
    { title: "User Profile" },
    { name: "resume", content: "User profile" },
  ];
}

function ProfilePage() {
  // const [count, setCount] = useOutletContext<[number, React.Dispatch<React.SetStateAction<number>>]>();
  // const increment = () => setCount((c) => c + 1);

  console.log(getUser());
  
  
  return (
    <>
      <ProfileCard
        name="Albert Gonzalez"
        profileImageUrl="https://images.pexels.com/photos/3617500/pexels-photo-3617500.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        username="albertg"
        viajesCount={5}
      />
     
    </>
  );
}

export default ProfilePage;
