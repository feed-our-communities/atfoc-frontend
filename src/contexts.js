import { createContext } from "react";

export const ContextGlobal = createContext({
    token: '',
    setToken: () => {}
  });