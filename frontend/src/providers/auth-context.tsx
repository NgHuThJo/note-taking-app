import { createContext, PropsWithChildren, use, useState } from "react";
import { create, StoreApi, useStore } from "zustand";

type AuthStore = {
  isLoggedIn: boolean;
  logIn: () => void;
  logOut: () => void;
};

const AuthContext = createContext<StoreApi<AuthStore> | null>(null);

export const useAuthStore = <T,>(selector: (state: AuthStore) => T) => {
  const store = use(AuthContext);

  if (!store) {
    throw new Error("Missing AuthContextProvider");
  }

  return useStore(store, selector);
};

export function AuthContextProvider({ children }: PropsWithChildren) {
  const [store] = useState(() =>
    create<AuthStore>()((set) => ({
      isLoggedIn: false,
      logIn: () => {
        set(() => ({ isLoggedIn: true }));
      },
      logOut: () => {
        set(() => ({ isLoggedIn: false }));
      },
    })),
  );

  return <AuthContext value={store}>{children}</AuthContext>;
}
