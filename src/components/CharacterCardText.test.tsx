import { render, screen } from "@testing-library/react";
import CharacterCard from "../components/CharacterCard";
import { Result as Character } from "../types/character";

jest.mock("next/image", () => ({
    __esModule: true,
    default: (props: { src: string; alt: string; width: number; height: number; className?: string }) => (
        <img {...props} />
    ),
}));

const mockCharacter: Character = {
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
};

describe("CharacterCard Component", () => {
    test("renders character's image with correct alt text and src", () => {
        render(<CharacterCard character={mockCharacter} />);

        const image = screen.getByAltText(mockCharacter.name);
        expect(image.getAttribute("src")).toBe(mockCharacter.image);
        expect(image.getAttribute("alt")).toBe(mockCharacter.name);
        expect(image.getAttribute("width")).toBe("64");
        expect(image.getAttribute("height")).toBe("64");
    });
});
