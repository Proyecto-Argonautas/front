import React from "react";
import AddArticleButton from "~/components/buttonsComponents/AddArticleButton";
import CreateButton from "~/components/buttonsComponents/CreateButton";
import HomeButton from "~/components/buttonsComponents/HomeButton";
import ProfileButton from "~/components/buttonsComponents/ProfileButton";
import ReturnButton from "~/components/buttonsComponents/ReturnButton";
import SearchButton from "~/components/buttonsComponents/SearchButton";

export interface handlePages {
  hideHeader?: boolean;
  buttons: ButtonKey[];
}

export type ButtonKey =
  | "home"
  | "search"
  | "create"
  | "profile"
  | "return"
  | "addArticle";

export const NAVIGATION_BUTTONS_COMPONENTS: Record<
  ButtonKey,
  React.ReactElement
> = {
  home: <HomeButton />,
  search: <SearchButton />,
  create: <CreateButton />,
  profile: <ProfileButton />,
  return: <ReturnButton />,
  addArticle: <AddArticleButton />,
};
