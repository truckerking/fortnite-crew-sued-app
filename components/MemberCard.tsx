import React from 'react';
import type { User } from '../types';
import { MemberTier } from '../types';

interface MemberCardProps {
  user: User;
  showStatus?: boolean;
}

const tierColors: { [key in MemberTier]: { bg: string; text: string; border: string } } = {
  [MemberTier.Bronze]: { bg: 'bg-yellow-800', text: 'text-yellow-200', border: 'border-yellow-600' },
  [MemberTier.Silver]: { bg: 'bg-gray-500', text: 'text-gray-100', border: 'border-gray-400' },
  [MemberTier.Gold]: { bg: 'bg-yellow-500', text: 'text-yellow-900', border: 'border-yellow-400' },
  [MemberTier.Platin]: { bg: 'bg-teal-500', text: 'text-teal-100', border: 'border-teal-300' },
  [MemberTier.Diamant]: { bg: 'bg-blue-400', text: 'text-white', border: 'border-blue-200' },
};

export const MemberCard: React.FC<MemberCardProps> = ({ user, showStatus = false }) => {
  const colors = tierColors[user.tier];

  return (
    <div className={`w-full max-w-sm mx-auto ${colors.bg} bg-opacity-80 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border-4 ${colors.border} transform hover:scale-105 transition-transform duration-300 ease-in-out`}>
      <div className="flex flex-col items-center text-center relative">
        {!user.isApproved && (
            <div className="absolute -top-4 -right-4 bg-red-600 text-white font-bangers text-sm px-3 py-1 rounded-full transform rotate-12 shadow-lg border-2 border-black">Admin-Freigabe fehlt</div>
        )}
        <img src={user.avatarUrl} alt="Avatar" className="w-28 h-28 rounded-full border-4 border-white mb-4 shadow-lg" />
        <h2 className="font-fortnite text-3xl text-white tracking-wider text-shadow-lg">{user.gamertag}</h2>
        <p className="text-gray-200 -mt-1">{user.username}</p>
        
        <div className={`mt-4 px-4 py-1 rounded-full ${colors.text} ${colors.bg} border-2 ${colors.border} shadow-inner`}>
          <p className="font-bold text-lg">{user.tier} Mitglied</p>
        </div>

        <div className="mt-6 w-full text-left text-gray-200 space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-bold">Mitglieds-ID:</span>
            <span className="font-mono bg-black bg-opacity-20 px-2 py-1 rounded">{user.memberId}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-bold">Dabei seit:</span>
            <span className="bg-black bg-opacity-20 px-2 py-1 rounded">{user.memberSince}</span>
          </div>
           {showStatus && (
             <div className="flex justify-between items-center">
                <span className="font-bold">Status:</span>
                <span className="bg-black bg-opacity-20 px-2 py-1 rounded">{user.status}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};