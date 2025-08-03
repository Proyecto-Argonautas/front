import { type ReactNode } from "react";

import { UserContext } from "~/contexts/UserContext";
import { getUser } from "~/services/getUser";

interface Props {
  children: ReactNode;
}

export default function UserProvider(props: Props) {
  const { children } = props;
  const user = getUser();

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
