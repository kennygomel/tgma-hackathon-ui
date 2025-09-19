import { useEffect, useState } from "react";

export function useQuery<T>(fn: () => Promise<T>, deps: any[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    fn().then(
      d => { if (alive) { setData(d); setError(null); } },
      e => { if (alive) setError(e); }
    ).finally(() => alive && setLoading(false));

    return () => { alive = false; };
  }, deps);

  return { data, loading, error };
}
