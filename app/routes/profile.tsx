import ProfilePage from "~/pages/profilePage";

// {}: Route.MetaArgs
export function meta() {
  return [
    { title: "User Profile" },
    { name: "resume", content: "User profile" },
  ];
}

export default function ProfileRoute() {
  return <ProfilePage />;
}
