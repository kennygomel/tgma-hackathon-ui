import { useEffect, useState } from "react";

export function useQuery<T>(fn: (() => Promise<T>) | null, deps: any[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    let cancelled = false;

    if (!fn) {
      setLoading(false);
      setError(null);

      return;
    }

    setLoading(true);
    setError(null);

    (fn() as Promise<T>)
      .then(res => { if (!cancelled) setData(res); })
      .catch(err => { if (!cancelled) setError(err); })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, deps);

  return { data, loading, error };
}
