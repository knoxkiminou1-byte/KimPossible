import { useState, useEffect } from "react";

export type Theme = "maison" | "noir" | "editorial" | "street";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("maison");

  useEffect(() => {
    const savedTheme = localStorage.getItem("kiminou-theme") as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    }
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    if (newTheme === "maison") {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", newTheme);
    }
  };

  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem("kiminou-theme", newTheme);
  };

  return { theme, changeTheme };
}
