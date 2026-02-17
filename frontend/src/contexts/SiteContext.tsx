import { createContext, useEffect, useState } from "react";
import api from "@/lib/axios";

export const SiteContext = createContext(null);

export const SiteWrapper = ({ children }) => {
  const [site, setSite] = useState(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <SiteContext.Provider value={{ site, loading }}>
      {children}
    </SiteContext.Provider>
  );
};