import axios from 'axios';
import { createContext, useContext, useEffect, useState } from "react";

// type User = { id: string; telegram_id: number; } | null;

const AuthCtx = createContext<{
  isAuthorized: boolean;
  loading: boolean;
  authorize: (initData: string) => Promise<void>;
}>({isAuthorized:false,loading:true,authorize:async()=>{}});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  // попытка тихой авторизации по cookie/refresh
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get<boolean>(`http://localhost:3000/auth/protected`, { withCredentials: true });

        setIsAuthorized(data);
      } finally { setLoading(false); }
    })();
  }, []);

  const authorize = async (initData: string) => {
    const { data } = await axios.post<boolean>(
      `http://localhost:3000/auth/sign-in`,
      { initData },
      { withCredentials: true }
    );

    setIsAuthorized(data);
  };

  return (
    <AuthCtx.Provider value={{ isAuthorized, loading, authorize }}>
      {children}
    </AuthCtx.Provider>
  );
}

export const useAuth = () => useContext(AuthCtx);
