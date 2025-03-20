import { PropsWithChildren } from "react";
import { ColorThemeContextProvider } from "#frontend/providers/color-theme";

export function Context({ children }: PropsWithChildren) {
  return <ColorThemeContextProvider>{children}</ColorThemeContextProvider>;
}
