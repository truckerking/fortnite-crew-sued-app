import { MOCK_ITEM_SHOP } from '../constants';
// FIX: Import the 'PlayerStats' type.
import type { FortniteItem, PlayerStats } from '../types';

const API_URL = 'https://fortnite-api.com/v2/shop/br?language=de';

export const getDailyItemShop = async (): Promise<FortniteItem[]> => {
  console.log("Rufe tagesaktuellen Item-Shop ab...");
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`API-Fehler: ${response.statusText}`);
    }
    const json = await response.json();
    
    // Kombiniere tägliche und vorgestellte Items
    const dailyEntries = json.data?.daily?.entries ?? [];
    const featuredEntries = json.data?.featured?.entries ?? [];
    const allEntries = [...featuredEntries, ...dailyEntries];

    const items: FortniteItem[] = allEntries.map((entry: any) => {
      // API hat oft mehrere Items pro Eintrag, wir nehmen das erste als Repräsentant
      const mainItem = entry.items[0];
      const displayAsset = entry.newDisplayAsset?.materialInstances?.[0]?.images?.Background 
                           ?? entry.displayAssets?.[0]?.full_background 
                           ?? 'https://via.placeholder.com/200';

      return {
        id: entry.offerId,
        name: mainItem.name,
        imageUrl: displayAsset,
        rarity: mainItem.rarity?.value || 'common',
        vbucks: entry.finalPrice,
      };
    });

    console.log("Item-Shop-Daten erfolgreich erhalten.");
    return items.filter(item => item.name); // Filtere Einträge ohne Namen
  } catch (error) {
    console.error("Fehler beim Abrufen des Item-Shops, verwende Mock-Daten:", error);
    return MOCK_ITEM_SHOP;
  }
};


export const getPlayerStats = async (gamertag: string): Promise<PlayerStats> => {
  console.log(`Rufe Statistiken für ${gamertag} ab... (simuliert)`);
  await new Promise(res => setTimeout(res, 1200));
  console.log(`Statistiken für ${gamertag} erhalten.`);
  const { MOCK_STATS } = await import('../constants');
  return MOCK_STATS;
};