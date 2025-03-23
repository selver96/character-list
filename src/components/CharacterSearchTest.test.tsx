import { render, screen, fireEvent } from "@testing-library/react";
import CharacterSearch from "../components/CharacterSearch";
import useCharacters from "../hooks/useCharacters";

jest.mock("../hooks/useCharacters", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("../hooks/useDebounce", () => jest.fn((val) => val));

const mockUseCharacters = useCharacters as jest.MockedFunction<typeof useCharacters>;

describe("CharacterSearch Component", () => {
    test("renders correctly", () => {
        mockUseCharacters.mockReturnValue({
            characters: [],
            totalPages: 1,
            loading: false,
            error: null,
        });

        render(<CharacterSearch />);

        expect(screen.getByPlaceholderText("Введите имя персонажа..."));
        expect(screen.getByText("Поиск персонажей Rick and Morty"));
    });

    test("handles input change and calls debounce", () => {
        mockUseCharacters.mockReturnValue({
            characters: [],
            totalPages: 1,
            loading: false,
            error: null,
        });

        render(<CharacterSearch />);

        const input = screen.getByPlaceholderText("Введите имя персонажа...") as HTMLInputElement;
        fireEvent.change(input, { target: { value: "Rick" } });

        expect(input.value).toBe("Rick");
    });

    test("displays loading state", () => {
        mockUseCharacters.mockReturnValue({
            characters: [],
            totalPages: 0,
            loading: true,
            error: null,
        });

        render(<CharacterSearch />);
        expect(screen.findByText("Загрузка..."));
    });

    test("displays characters correctly", () => {
        mockUseCharacters.mockReturnValue({
            characters: [
                {
                    id: 2,
                    name: "Morty Smith",
                    status: "Alive",
                    species: "Human",
                    type: "",
                    gender: "Male",
                    origin: {
                        name: "unknown",
                        url: ""
                    },
                    location: {
                        name: "Citadel of Ricks",
                        url: "https://rickandmortyapi.com/api/location/3"
                    },
                    image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
                    episode: [],
                    url: "https://rickandmortyapi.com/api/character/2",
                    created: "2017-11-04T18:50:21.651Z"
                },
            ],
            totalPages: 1,
            loading: false,
            error: null,
        });

        render(<CharacterSearch />);

        expect(screen.findByText("Morty Smith"));
    });

    test("handles pagination buttons", () => {
        mockUseCharacters.mockReturnValue({
            characters: [],
            totalPages: 3,
            loading: false,
            error: null,
        });

        render(<CharacterSearch />);

        const nextButton = screen.getByText("Следующая");
        fireEvent.click(nextButton);
        expect(screen.getByText("2 / 3"));
    });
});
