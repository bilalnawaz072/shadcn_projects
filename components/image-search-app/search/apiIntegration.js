"use client";

import { useState } from 'react';

const PEXELS_API_KEY = '93Svi0hmP7nbxSC8afQ1ugwhhTD9nqzisA9d4wzR7a3KpafZrsLwdGFA';
export const apiIntegrationImages = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!query) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=9`, {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
      setImages(data.photos);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { query, setQuery, images, handleSearch, loading, error };
};