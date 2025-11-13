import React, { useState } from 'react';
import type { PlayerStats } from '../types';
import { getPlayerStats } from '../services/fortniteApiService';
import { BarChart, Trophy, Crosshair, Gamepad2, Percent, Ratio } from 'lucide-react';

const StatCard: React.FC<{ icon: React.ElementType, label: string, value: string | number, color: string }> = ({ icon: Icon, label, value, color }) => (
  <div className="bg-slate-800 bg-opacity-70 rounded-lg p-4 text-center transform hover:scale-105 transition-transform duration-300 border-4 border-black">
    <Icon className={`w-12 h-12 mx-auto ${color}`} />
    <p className="text-4xl font-bold text-white mt-2">{value}</p>
    <p className="text-gray-400">{label}</p>
  </div>
);

export const Stats: React.FC = () => {
  const [gamertag, setGamertag] = useState('');
  const [stats, setStats] = useState<PlayerStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFetchStats = async () => {
    if (!gamertag) {
      setError('Bitte gib einen Gamertag ein.');
      return;
    }
    setError('');
    setLoading(true);
    setStats(null);
    try {
      const fetchedStats = await getPlayerStats(gamertag);
      setStats(fetchedStats);
    } catch (err) {
      setError('Statistiken konnten nicht geladen werden.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <h1 className="font-bangers text-6xl text-yellow-300 tracking-wider mb-8 text-center title-shadow">Spieler Statistiken</h1>
      
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          value={gamertag}
          onChange={(e) => setGamertag(e.target.value)}
          placeholder="Deinen Epic Gamertag eingeben..."
          className="flex-grow bg-slate-900 text-white placeholder-gray-500 border-4 border-black rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <button
          onClick={handleFetchStats}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-500 text-white font-bangers text-2xl tracking-wider py-3 px-6 rounded-lg transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center justify-center comic-button"
        >
          {loading ? (
             <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
          ) : (
            <><BarChart className="w-6 h-6 mr-2" /> Abrufen</>
          )}
        </button>
      </div>

      {error && <p className="text-red-400 text-center mb-4">{error}</p>}
      
      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in-up">
          <StatCard icon={Trophy} label="Siege" value={stats.wins} color="text-yellow-400" />
          <StatCard icon={Crosshair} label="Kills" value={stats.kills} color="text-red-500" />
          <StatCard icon={Gamepad2} label="Spiele" value={stats.matchesPlayed} color="text-blue-400" />
          <StatCard icon={Ratio} label="K/D Rate" value={stats.killDeathRatio.toFixed(2)} color="text-purple-400" />
          <StatCard icon={Percent} label="Siegesrate" value={`${stats.winRate.toFixed(2)}%`} color="text-green-400" />
        </div>
      )}
    </div>
  );
};