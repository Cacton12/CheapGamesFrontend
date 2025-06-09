'use client';

import { useEffect, useState } from 'react';
import Hero from './Components/Hero';
import MainSection from './Components/MainSection';
import { Game } from './Models/Game';
import { Root as ExchangeData } from './Models/ExchangeData';
import Navbar from './Components/Navbar';
import { Root } from './Models/GameData2';

export default function Home() {
  const [results, setResults] = useState<{
  cheapShark: Game[];
  rawg: Root;
}>({
  cheapShark: [],
  rawg: {
    count: 0,
    next: null,
    previous: null,
    results: [],
    user_platforms: false,
  },
});

  const [exchangeRates, setExchangeRates] = useState<ExchangeData | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState('CAD');


  useEffect(() => {
  const fetchExchangeRates = async () => {
    const res = await fetch('http://localhost:8080/api/Currency');
    const data: ExchangeData = await res.json();
    setExchangeRates(data);
  };

  fetchExchangeRates();
  }, []);


  return (
    <div>
      <Navbar  
        exchangeRates={exchangeRates}
        selectedCurrency={selectedCurrency}
        onCurrencyChange={setSelectedCurrency}
        />
      <Hero onSearchResults={setResults} />
      <MainSection results={results} selectedCurrency={selectedCurrency} exchangeRates={exchangeRates}/>
    </div>
  );
}
