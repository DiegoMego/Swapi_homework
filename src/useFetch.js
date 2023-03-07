import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";

function useFetch(url, search, page, firstLoad) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  const sendQuery = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await axios.get(url, {
        params: {
          search,
          page,
        },
      });
      setItems((state) => [...state, ...res.data.results]);
      setHasMore(!!res.data.next);
      setLoading(false);
    } catch (err) {
      setError(true);
    }
  }, [url, search, page]);

  useEffect(() => {
    if (firstLoad) return;
    if (page === 1) setItems([]);
    sendQuery();
  }, [url, sendQuery, search, page, firstLoad]);

  return { loading, error, items, hasMore };
}

export default useFetch;
