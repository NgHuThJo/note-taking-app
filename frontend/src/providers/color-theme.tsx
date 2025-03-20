import { createContext, PropsWithChildren, use, useState } from "react";
import { create, StoreApi, useStore } from "zustand";
import { persist } from "zustand/middleware";

type ColorThemeStore = {
  theme: string;
  setTheme: (newTheme: string) => void;
};

const ColorThemeContext = createContext<StoreApi<ColorThemeStore> | null>(null);

export const useColorThemeStore = <T,>(
  selector: (state: ColorThemeStore) => T,
) => {
  const store = use(ColorThemeContext);

  if (!store) {
    throw new Error("Missing ColorThemeProvider");
  }

  return useStore(store, selector);
};

export const useTheme = () => useColorThemeStore((state) => state.theme);

export function ColorThemeContextProvider({ children }: PropsWithChildren) {
  const [store] = useState(() =>
    create<ColorThemeStore>()(
      persist(
        (set) => ({
          theme: window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light",
          setTheme: (newTheme: string) => set(() => ({ theme: newTheme })),
        }),
        {
          name: "color-theme",
        },
      ),
    ),
  );

  return <ColorThemeContext value={store}>{children}</ColorThemeContext>;
}
