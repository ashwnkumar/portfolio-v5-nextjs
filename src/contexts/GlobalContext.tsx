"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type GlobalContextType = {
  loader: boolean;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  applyTheme: (newTheme: string) => void;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState("dark");
  const [loader, setLoader] = useState(true);

  const applyTheme = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.setAttribute("data-theme", newTheme);

    if (newTheme === "dark") {
      document.body.setAttribute("data-theme", "dark");
    } else {
      document.body.setAttribute("data-theme", newTheme);
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.body.setAttribute("data-theme", savedTheme);
      if (savedTheme === "dark") {
        document.body.setAttribute("data-theme", "dark");
      } else {
        document.body.setAttribute("data-theme", savedTheme);
      }
    }
  }, []);

  return (
    <GlobalContext.Provider
      value={{ theme, setTheme, applyTheme, loader, setLoader }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobal must be used inside GlobalProvider");
  }
  return context;
};
