import { Root as ExchangeData } from '../Models/ExchangeData';
import { Game } from '../Models/Game';
import { Root } from '../Models/GameData2';  // RAWG API Root type with results array inside
import { useEffect, useState } from 'react';

type MainSectionProps = {
  results: {
    cheapShark: Game[];
    rawg: Root;  // RAWG API Root object, not array
  };
  selectedCurrency: string;
  exchangeRates: ExchangeData | null;
};

function getExchangeRate(exchangeRates: ExchangeData | null, selectedCurrency: string): number | null {
  if (!exchangeRates || !selectedCurrency) return null;
  const rate = exchangeRates.data[selectedCurrency];
  return rate ?? null;
}

export default function MainSection({ results, selectedCurrency, exchangeRates }: MainSectionProps) {
  const [visibleCount, setVisibleCount] = useState(20);
  const loadMoreCount = 20;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + loadMoreCount);
  };

  // Reset visibleCount when cheapShark results change
  useEffect(() => {
    setVisibleCount(20);
  }, [results.cheapShark]);

  const rate = getExchangeRate(exchangeRates, selectedCurrency);

  const visibleGames = results.cheapShark.slice(0, visibleCount);

  if (visibleGames.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center text-gray-400">
        <p className="text-lg font-semibold">No games found.</p>
        <p className="mt-2">Try searching for something else or check back later.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-400">Game Deals</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {visibleGames.map((game) => {
          // Access the RAWG games array inside the root object
          const rawgGame = results.rawg.results.find(
            (rawgItem) => rawgItem.name.toLowerCase() === game.external.toLowerCase()
          );

          const backgroundImage = rawgGame?.background_image || game.thumb;
          const convertedPrice = rate
            ? (parseFloat(game.cheapest) * rate).toFixed(2)
            : game.cheapest;

          return (
            <div key={game.gameID} className="w-72 bg-gray-900 rounded-lg shadow-lg overflow-hidden flex flex-col">
              <img src={backgroundImage} alt={game.external} className="w-full h-44 object-cover" />
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-3 text-white truncate">{game.external}</h3>
                <p className="text-blue-300 mb-5">
                  Price ({selectedCurrency}):{' '}
                  <span className="font-bold text-white">${convertedPrice}</span>
                </p>
                <a
                  href={`https://www.cheapshark.com/redirect?dealID=${game.cheapestDealID}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-block text-center px-5 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-colors font-semibold"
                >
                  View Deal
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {visibleCount < results.cheapShark.length && (
        <div className="mt-8 text-center">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
