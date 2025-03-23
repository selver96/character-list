import { getCharacters } from "@/services/character.service";
import axiosClient from "@/api/client";
import { Root as CharactersResponse } from "@/types/character";

jest.mock("@/api/client");

describe("getCharacters Service", () => {
  const mockData: CharactersResponse = {
    info: {
      count: 1,
      pages: 1,
      next: "",
      prev: null,
    },
    results: [
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
    ],
  };

  test("fetches characters successfully", async () => {
    (axiosClient.get as jest.Mock).mockResolvedValue({ data: mockData });

    const response = await getCharacters("Rick", 1);

    expect(axiosClient.get).toHaveBeenCalledWith(
      "/character/?name=Rick&page=1"
    );
    expect(response.data).toEqual(mockData);
  });

  test("handles API errors", async () => {
    (axiosClient.get as jest.Mock).mockRejectedValue(
      new Error("Network Error")
    );

    await expect(getCharacters("Rick", 1)).rejects.toThrow("Network Error");

    expect(axiosClient.get).toHaveBeenCalledWith(
      "/character/?name=Rick&page=1"
    );
  });
});
