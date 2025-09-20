import { AuthService, AuthUser } from '@/services/auth.service.ts';
import {
  initDataRaw as _initDataRaw,
  useSignal,
} from '@telegram-apps/sdk-react';
import { createContext, useContext, useEffect, useState } from "react";


const AuthCtx = createContext<{
  user: AuthUser | null;
  loading: boolean;
}>({user:null,loading:true});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // const initDataRaw = useSignal(_initDataRaw);
  const initDataRaw = 'user=%7B%22id%22%3A323173181%2C%22first_name%22%3A%22Ignat%22%2C%22last_name%22%3A%22Rychkov%22%2C%22username%22%3A%22ignatrychkov%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2Ff6LJeyec9XyXOSr_OXRWo3HKqbKFlfCYYkM01fOQalI.svg%22%7D&chat_instance=1432267138820610369&chat_type=private&auth_date=1758352592&signature=9f856japE7hv3giyhket5o7NvX1nKzfcZrjd5IU2rHRcrfFAJdu9RElUPQc479MpA513LZSb1qyoE7mGccyTAA&hash=b35b51403ee6e8c02f33d744d345c1cb5aa90cb0fe38fb31a6bbe0b10d27347b';
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      try {
        const user = await AuthService.signIn(initDataRaw as string);

        setUser(user ?? null);
      } finally { setLoading(false); }
    })();
  }, [initDataRaw]);

  return (
    <AuthCtx.Provider value={{ user, loading }}>
      {children}
    </AuthCtx.Provider>
  );
}

export const useAuth = () => useContext(AuthCtx);
