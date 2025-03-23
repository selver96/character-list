"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import useDebounce from '../hooks/useDebounce';
import useCharacters from '../hooks/useCharacters';


const CharacterSearch: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearchTerm]);

    const { characters, totalPages, loading, error } = useCharacters(debouncedSearchTerm, currentPage);

    return (
        <div className="w-full min-h-screen bg-gray-900 text-white flex flex-col items-center p-4">
            <h1 className="text-3xl font-bold mb-6">Поиск персонажей Rick and Morty</h1>
            <input
                type="text"
                className="w-full max-w-md p-3 bg-gray-800 border border-gray-700 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Введите имя персонажа..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {loading && <p>Загрузка...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {characters.map((character) => (
                    <div key={character.id} className="bg-gray-800 rounded-xl shadow-lg p-4">
                        <Image
                            src={character.image}
                            alt={character.name}
                            width={64} // ✅ Set width explicitly
                            height={64} // ✅ Set height explicitly
                            className="w-16 h-16 rounded-full mr-4 flex-shrink-0"
                        />
                        <h2 className="text-xl font-semibold">{character.name}</h2>
                        <p>Статус: {character.status}</p>
                        <p>Вид: {character.species}</p>
                        <p>Локация: {character.location.name}</p>
                    </div>
                ))}
            </div>
            {totalPages > 1 && (
                <div className="flex justify-center mt-6 space-x-4">
                    <button
                        className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50"
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        Предыдущая
                    </button>
                    <span className="px-4 py-2">
                        {currentPage} / {totalPages}
                    </span>
                    <button
                        className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50"
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        Следующая
                    </button>
                </div>
            )}
        </div>
    );
};

export default CharacterSearch;