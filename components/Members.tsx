import React from 'react';
import { User, MemberTier } from '../types';
import { Crown, User as UserIcon, Shield } from 'lucide-react';

const tierBorderColors: { [key in MemberTier]: string } = {
  [MemberTier.Bronze]: 'border-yellow-800',
  [MemberTier.Silver]: 'border-gray-400',
  [MemberTier.Gold]: 'border-yellow-500',
  [MemberTier.Platin]: 'border-teal-300',
  [MemberTier.Diamant]: 'border-blue-300',
};

const statusColors: { [key in User['status']]: string } = {
    Online: 'bg-green-500',
    Zocken: 'bg-blue-500',
    Schlafen: 'bg-purple-500',
    Verhindert: 'bg-red-500',
}

const MemberListCard: React.FC<{ user: User }> = ({ user }) => (
  <div className="bg-slate-800 bg-opacity-70 rounded-lg p-4 flex items-center space-x-4 transform hover:scale-105 transition-transform duration-300 ease-in-out border-4 border-black">
    <div className="relative">
      <img src={user.avatarUrl} alt={user.username} className={`w-16 h-16 rounded-full border-4 ${tierBorderColors[user.tier]}`} />
      <span className={`absolute bottom-0 right-0 block h-4 w-4 rounded-full ${statusColors[user.status]} border-2 border-slate-800`}></span>
    </div>
    <div className="flex-1">
      <div className="flex items-center space-x-2">
        {user.role === 'admin' ? <Crown className="w-5 h-5 text-yellow-400" /> : <UserIcon className="w-5 h-5 text-gray-400" />}
        <h3 className="text-xl font-bold text-white">{user.username}</h3>
      </div>
      <p className="text-blue-300">{user.gamertag}</p>
      <p className="text-xs text-gray-400">Status: {user.status}</p>
    </div>
    {!user.isApproved && (
        <div className="absolute -top-2 -right-2 bg-red-600 text-white font-bangers text-xs px-2 py-0.5 rounded-full transform rotate-12 shadow-lg border-2 border-black">
            Gesperrt
        </div>
    )}
  </div>
);

export const Members: React.FC<{ users: User[] }> = ({ users }) => {
  return (
    <div className="p-4 md:p-8">
      <h1 className="font-bangers text-6xl text-yellow-300 tracking-wider mb-8 text-center title-shadow">Crew Mitglieder</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.filter(u => u.isApproved).map(user => (
          <MemberListCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};
