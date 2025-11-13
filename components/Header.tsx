import React from 'react';
import type { User } from '../types';
import { Page } from '../types';
import { Home, Users, BarChart2, ShoppingCart, UserPlus, LogOut, BookOpen, LifeBuoy } from 'lucide-react';

interface HeaderProps {
  user: User | null;
  setPage: (page: Page) => void;
  onLogout: () => void;
}

const NavButton: React.FC<{ onClick: () => void, icon: React.ElementType, label: string }> = ({ onClick, icon: Icon, label }) => (
  <button onClick={onClick} className="flex items-center space-x-2 text-gray-300 hover:text-yellow-300 transition-colors duration-200 transform hover:scale-110">
    <Icon className="w-6 h-6" />
    <span className="hidden md:inline font-bold">{label}</span>
  </button>
);


export const Header: React.FC<HeaderProps> = ({ user, setPage, onLogout }) => {
  return (
    <header className="bg-slate-900 bg-opacity-80 backdrop-blur-sm p-4 shadow-lg sticky top-0 z-50 border-b-4 border-black">
      <div className="container mx-auto flex justify-between items-center">
        <div 
            className="flex items-baseline space-x-2 cursor-pointer"
            onClick={() => setPage(Page.Dashboard)}
        >
          <span className="font-fortnite text-4xl text-white tracking-wider title-shadow">Fortnite</span>
          <span className="font-fortnite text-2xl text-gray-300 tracking-wider title-shadow hidden md:block">Crew Süd</span>
        </div>
        
        {user && (
          <div className="flex items-center space-x-4 md:space-x-6">
            <NavButton onClick={() => setPage(Page.Dashboard)} icon={Home} label="Übersicht" />
            <NavButton onClick={() => setPage(Page.Members)} icon={Users} label="Mitglieder" />
            <NavButton onClick={() => setPage(Page.Stats)} icon={BarChart2} label="Stats" />
            <NavButton onClick={() => setPage(Page.ItemShop)} icon={ShoppingCart} label="Shop" />
            <NavButton onClick={() => setPage(Page.AvatarCreator)} icon={UserPlus} label="Avatar" />
            <NavButton onClick={() => setPage(Page.Manual)} icon={BookOpen} label="Anleitung" />
            <NavButton onClick={() => setPage(Page.Help)} icon={LifeBuoy} label="Hilfe" />
            
            <div className="w-px h-6 bg-gray-600"></div>

            <div className="flex items-center space-x-3">
              <button onClick={() => setPage(Page.Profile)} className="flex items-center space-x-3" title="Mein Profil">
                <img src={user.avatarUrl} alt="avatar" className="w-10 h-10 rounded-full border-2 border-blue-400" />
                <span className="text-white font-semibold hidden lg:inline">{user.username}</span>
              </button>
              <button onClick={onLogout} title="Logout" className="text-red-500 hover:text-red-400 transition-colors">
                <LogOut className="w-7 h-7" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};