"use client";
import { useState, useEffect } from "react";

import { getCharacters } from "@/services/character.service";
import { UseCharactersReturn, Result as Character } from "@/types/character";

const useCharacters = (query: string, page: number): UseCharactersReturn => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) {
      setCharacters([]);
      setTotalPages(0);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    const cacheKey = `search-${query}-${page}`;
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
      const data = JSON.parse(cachedData);
      setCharacters(data.results);
      setTotalPages(data.info.pages);
      setLoading(false);
      return;
    }

    getCharacters(query, page)
      .then((response) => {
        const data = response.data;
        setCharacters(data.results);
        setTotalPages(data.info.pages);
        localStorage.setItem(cacheKey, JSON.stringify(data));
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          setError("Ничего не найдено.");
        } else {
          setError("Произошла ошибка при получении данных.");
        }
        setCharacters([]);
        setTotalPages(0);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [query, page]);

  return { characters, totalPages, loading, error };
};

export default useCharacters;
