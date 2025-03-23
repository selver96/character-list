"use client";

import axiosClient from "@/api/client";
import { Root as CharactersResponse } from "@/types/character";

export const getCharacters = async (name: string, page: number) => {
  return axiosClient.get<CharactersResponse>(
    `/character/?name=${name}&page=${page}`
  );
};
