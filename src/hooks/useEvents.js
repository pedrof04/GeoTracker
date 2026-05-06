import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchEvents, fetchCategories } from '../lib/eonet.js';

export function useEvents(filters) {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const abortRef = useRef(null);

  const load = useCallback(async () => {
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();

    setLoading(true);
    setError(null);
    try {
      const data = await fetchEvents(filters);
      setEvents(data.features || []);
      setLastUpdated(new Date());
    } catch (e) {
      if (e.name !== 'AbortError') setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [filters.category, filters.status, filters.days]);

  useEffect(() => {
    fetchCategories()
      .then(d => setCategories(d.categories || []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { events, categories, loading, error, refetch: load, lastUpdated };
}
