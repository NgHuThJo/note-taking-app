import { useEffect } from "react";
import { PropsWithChildren } from "react";
import { useTheme } from "#frontend/providers/color-theme";

export function SubContext({ children }: PropsWithChildren) {
  const currentTheme = useTheme();

  useEffect(() => {
    document.body.setAttribute("data-theme", currentTheme);
  }, [currentTheme]);

  return <>{children}</>;
}
