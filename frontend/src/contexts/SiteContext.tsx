import { createContext, useEffect, useState } from "react";
import api from "@/lib/axios";

export const SiteContext = createContext(null);

export const SiteWrapper = ({ children }) => {
  const [site, setSite] = useState(null);
  const [loading, setLoading] = useState(true);

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });


  useEffect(() => {
    const fetchSite = async () => {
      try {
        const res = await api.get(
          `/api/v1/users/${import.meta.env.VITE_USER_ID}`
        );
        setSite(res.data);
      } catch (err) {
        console.error("Fetch site info failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSite();
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  return (
    <SiteContext.Provider value={{ site, loading, theme, toggleTheme }}>
      {children}
    </SiteContext.Provider>
  );
};