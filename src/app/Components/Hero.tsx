'use client';

import React, { useState } from 'react';
import { Game } from '../Models/Game';
import { Root } from '../Models/GameData2';  // Assuming Root is the full RAWG response type

type HeroProps = {
  onSearchResults: (data: { cheapShark: Game[]; rawg: Root }) => void;
};

const Hero: React.FC<HeroProps> = ({ onSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    try {
      const encodedTerm = encodeURIComponent(searchTerm);

      // Fetch cheapShark games (array of Game)
      const res = await fetch(`https://cheapgamesbackend.onrender.com/api/games?title=${encodedTerm}`);
      const cheapSharkData: Game[] = await res.json();

      // Fetch RAWG full Root object (with results array inside)
      const res2 = await fetch(`https://cheapgamesbackend.onrender.com/api/Background_Image?title=${encodedTerm}`);
      const rawgData: Root = await res2.json();

      // Pass the full Root object, not just rawgData.results
      onSearchResults({ cheapShark: cheapSharkData, rawg: rawgData });

    } catch (error) {
      console.error('Error fetching game data:', error);
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-black to-blue-950 flex flex-col justify-center items-center px-4 text-white text-center">
      <div className="max-w-3xl mb-8 quicksand-normal">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Want to find a cheap game?
        </h1>
        <p className="text-lg sm:text-xl text-gray-300">
          This web app will search for the cheapest game price for you!
        </p>
      </div>

      <div className="relative w-full max-w-xs sm:max-w-sm">
        <input
          type="search"
          name="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="w-full py-3 pl-5 pr-12 rounded-xl bg-white text-black shadow-lg outline-none transition-all focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={handleSearch}
          className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer"
          aria-label="Search"
        >
          <svg
            className="w-6 h-6 text-black"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Hero;
