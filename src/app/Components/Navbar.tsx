import React from 'react'
import { Root as ExchangeData } from '../Models/ExchangeData';


type NavbarProps = {
  exchangeRates: ExchangeData | null;
  selectedCurrency: string;
  onCurrencyChange: (currency: string) => void;
};

const Navbar = ({ exchangeRates, selectedCurrency, onCurrencyChange }: NavbarProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onCurrencyChange(e.target.value);
  };

  return (
  <nav className="sticky top-0 bg-black px-6 py-4 flex justify-between items-center shadow-md z-50">
    <h1 className="text-2xl font-bold"><a href="#hero">CheapGames</a></h1>
    <div className="flex items-center space-x-4">
      <select value={selectedCurrency} onChange={handleChange} className="bg-gray-800 text-white px-3 py-1 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
        {exchangeRates && (() => {
        const entries = Object.entries(exchangeRates.data);
        const cadEntry = entries.find(([currencyCode]) => currencyCode === 'CAD');
        const otherEntries = entries.filter(([currencyCode]) => currencyCode !== 'CAD');
        const orderedEntries = cadEntry ? [cadEntry, ...otherEntries] : otherEntries;

        return orderedEntries.map(([currencyCode]) => (
            <option key={currencyCode} value={currencyCode}>
            {currencyCode}
            </option>
        ));
        })()}
      </select>
    </div>
  </nav>

  )
}

export default Navbar