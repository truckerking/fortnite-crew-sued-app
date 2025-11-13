import React, { useState, useEffect } from 'react';
import type { User } from '../types';
import { Page } from '../types';
import { MemberCard } from './MemberCard';
import { getDailyFortniteQuote } from '../services/geminiService';
import { Home, Users, BarChart2, ShoppingCart, UserPlus, Shield, User as UserIcon, BookOpen, LifeBuoy } from 'lucide-react';

interface DashboardProps {
  user: User;
  setPage: (page: Page) => void;
}

const NavItem: React.FC<{ icon: React.ElementType, label: string, onClick: () => void }> = ({ icon: Icon, label, onClick }) => (
    <button onClick={onClick} className="flex flex-col items-center justify-center space-y-2 p-4 bg-blue-600 rounded-lg comic-button transition-all duration-300 group">
        <Icon className="w-12 h-12 text-yellow-300 transition-transform group-hover:scale-110"/>
        <span className="font-bangers text-white text-3xl tracking-wider">{label}</span>
    </button>
);


export const Dashboard: React.FC<DashboardProps> = ({ user, setPage }) => {
  const [quote, setQuote] = useState<string>('Lade tägliches Zitat...');

  useEffect(() => {
    getDailyFortniteQuote(user.firstName).then(setQuote);
  }, [user.firstName]);

  return (
    <div className="space-y-8 p-4 md:p-8">
      <div className="text-center p-6 bg-black bg-opacity-40 rounded-xl border-4 border-black">
        <h1 className="font-bangers text-5xl md:text-6xl text-white tracking-wider title-shadow">
          Willkommen zurück, <span className="text-yellow-300">{user.firstName}!</span>
        </h1>
        <p className="text-gray-200 mt-4 text-lg italic bg-slate-800 p-3 rounded-md border-2 border-slate-600">"{quote}"</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <MemberCard user={user} showStatus={true} />
        </div>
        <div className="lg:col-span-2 bg-slate-900 bg-opacity-60 rounded-lg p-6 border-4 border-black">
            <h2 className="font-bangers text-5xl text-yellow-300 mb-6 title-shadow">App Übersicht</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <NavItem icon={Users} label="Mitglieder" onClick={() => setPage(Page.Members)} />
                <NavItem icon={BarChart2} label="Stats" onClick={() => setPage(Page.Stats)} />
                <NavItem icon={ShoppingCart} label="Shop" onClick={() => setPage(Page.ItemShop)} />
                <NavItem icon={UserPlus} label="Avatar" onClick={() => setPage(Page.AvatarCreator)} />
                <NavItem icon={UserIcon} label="Profil" onClick={() => setPage(Page.Profile)} />
                <NavItem icon={BookOpen} label="Anleitung" onClick={() => setPage(Page.Manual)} />
                <NavItem icon={LifeBuoy} label="Hilfe" onClick={() => setPage(Page.Help)} />
            </div>
             {user.role === 'admin' && (
                <div className="mt-8">
                     <button onClick={() => setPage(Page.Admin)} className="w-full flex items-center justify-center space-x-3 p-4 bg-red-700 rounded-lg comic-button">
                        <Shield className="w-10 h-10 text-yellow-300"/>
                        <span className="font-bangers text-white text-4xl tracking-wide">Admin Zone</span>
                    </button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};
