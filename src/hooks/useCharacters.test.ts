import { renderHook, waitFor } from "@testing-library/react";
import useCharacters from "../hooks/useCharacters";
import { Result as Character } from "../types/character";
import { getCharacters } from "../services/character.service";

jest.mock("../services/character.service", () => ({
  getCharacters: jest.fn(),
}));

describe("useCharacters Hook", () => {
  const mockCharacters: Character[] = [
    {
      id: 1,
      name: "Rick Sanchez",
      status: "Alive",
      species: "Human",
      type: "",
      gender: "Male",
      origin: { name: "Earth", url: "" },
      location: { name: "Earth", url: "" },
      image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
      episode: [],
      url: "https://rickandmortyapi.com/api/character/1",
      created: "2017-11-04T18:50:21.651Z",
    },
  ];

  const mockResponse = {
    data: {
      results: mockCharacters,
      info: { pages: 3 },
    },
  };

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test("should initialize with default values", () => {
    const { result } = renderHook(() => useCharacters("", 1));

    expect(result.current.characters).toEqual([]);
    expect(result.current.totalPages).toBe(0);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  test("should fetch characters and update state", async () => {
    (getCharacters as jest.Mock).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useCharacters("Rick", 1));

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.characters).toEqual(mockCharacters);
    expect(result.current.totalPages).toBe(3);
    expect(result.current.error).toBeNull();
  });

  test("should handle API error (404)", async () => {
    (getCharacters as jest.Mock).mockRejectedValue({
      response: { status: 404 },
    });

    const { result } = renderHook(() => useCharacters("Unknown", 1));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.characters).toEqual([]);
    expect(result.current.totalPages).toBe(0);
    expect(result.current.error).toBe("Ничего не найдено.");
  });

  test("should handle general API errors", async () => {
    (getCharacters as jest.Mock).mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useCharacters("Morty", 1));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.characters).toEqual([]);
    expect(result.current.totalPages).toBe(0);
    expect(result.current.error).toBe("Произошла ошибка при получении данных.");
  });

  test("should use cached data if available", async () => {
    localStorage.setItem(
      "search-Rick-1",
      JSON.stringify({ results: mockCharacters, info: { pages: 3 } })
    );

    const { result } = renderHook(() => useCharacters("Rick", 1));

    expect(result.current.characters).toEqual(mockCharacters);
    expect(result.current.totalPages).toBe(3);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();

    expect(getCharacters).not.toHaveBeenCalled();
  });
});
