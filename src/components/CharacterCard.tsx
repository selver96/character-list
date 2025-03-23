import React from 'react';
import Image from 'next/image';

import { Result as Character } from '@/types/character';


interface CharacterCardProps {
    character: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
    return (
        <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden p-4 flex flex-col items-center text-center">
            <Image
                id={character.id.toString()}
                src={character.image}
                alt={character.name}
                width={64}
                height={64}
                className="w-16 h-16 rounded-full mr-4 flex-shrink-0"
            />
            <h2 className="mt-2 text-lg font-bold">{character.name}</h2>
            <p className="text-sm">
                {character.status} - {character.species}
            </p>
        </div>
    );
};

export default CharacterCard;