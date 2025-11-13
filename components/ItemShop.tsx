import React, { useState, useEffect } from 'react';
import type { FortniteItem } from '../types';
import { getDailyItemShop } from '../services/fortniteApiService';

const rarityColors: { [key: string]: string } = {
  common: 'border-gray-500 bg-gray-700',
  uncommon: 'border-green-500 bg-green-700',
  rare: 'border-blue-500 bg-blue-700',
  epic: 'border-purple-600 bg-purple-800',
  legendary: 'border-yellow-500 bg-yellow-700',
  mythic: 'border-yellow-300 bg-yellow-500',
  icon: 'border-cyan-400 bg-cyan-600',
  slurp: 'border-teal-400 bg-teal-600',
  dark: 'border-indigo-500 bg-indigo-700',
  lava: 'border-orange-500 bg-orange-700',
  frozen: 'border-sky-400 bg-sky-600',
  shadow: 'border-zinc-500 bg-zinc-700',
};

const ItemCard: React.FC<{ item: FortniteItem }> = ({ item }) => {
    const rarityClass = rarityColors[item.rarity.toLowerCase()] || rarityColors['common'];

    return (
        <div className={`rounded-lg overflow-hidden border-4 border-black ${rarityClass} bg-opacity-60 flex flex-col transform hover:scale-105 transition-transform duration-300`}>
            <img src={item.imageUrl} alt={item.name} className="w-full h-48 object-cover bg-slate-900" />
            <div className="p-3 flex-grow flex flex-col bg-slate-800">
                <h3 className="text-white font-bold text-lg flex-grow">{item.name}</h3>
                <div className="flex items-center justify-between mt-2">
                    <span className="text-yellow-300 font-bold">{item.vbucks.toLocaleString('de-DE')} V-Bucks</span>
                     <span className={`capitalize text-xs font-semibold px-2 py-1 rounded-full text-white ${rarityClass}`}>
                        {item.rarity}
                    </span>
                </div>
            </div>
        </div>
    );
};


export const ItemShop: React.FC = () => {
  const [items, setItems] = useState<FortniteItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getDailyItemShop()
      .then(setItems)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-4 md:p-8">
      <h1 className="font-bangers text-6xl text-yellow-300 tracking-wider mb-8 text-center title-shadow">Tagesaktueller Item Shop</h1>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {items.map(item => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};