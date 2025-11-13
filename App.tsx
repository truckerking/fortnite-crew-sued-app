import React, { useState } from 'react';
import type { User } from './types';
import { Page, MemberTier } from './types';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { Members } from './components/Members';
import { Stats } from './components/Stats';
import { ItemShop } from './components/ItemShop';
import { AvatarCreator } from './components/AvatarCreator';
import { AdminDashboard } from './components/AdminDashboard';
import { Profile } from './components/Profile';
import { Manual } from './components/Manual';
import { Help } from './components/Help';
import ComingSoon from './components/ComingSoon';
import { INITIAL_USERS } from './constants';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>(Page.Login);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setCurrentPage(Page.Dashboard);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage(Page.Login);
  };

  const handleRegisterAdmin = (adminData: Omit<User, 'id'>): User => {
    const newAdmin: User = { ...adminData, id: `user-${Date.now()}`};
    setUsers([newAdmin]);
    return newAdmin;
  };

  const handleRegisterMember = (memberData: Partial<User>): User => {
      const newMember: User = {
          ...memberData,
          id: `user-${Date.now()}`,
          role: 'member',
          isApproved: false, // Benötigt Admin-Freigabe
          tier: MemberTier.Bronze,
          memberId: `FCS${Date.now()}`.slice(0, 14),
          memberSince: new Date().toISOString().split('T')[0],
      } as User;
      setUsers(prevUsers => [...prevUsers, newMember]);
      return newMember;
  };

  const handleUpdateUser = (updatedUser: User) => {
      setUsers(prevUsers => prevUsers.map(u => u.id === updatedUser.id ? updatedUser : u));
      if (currentUser && currentUser.id === updatedUser.id) {
          setCurrentUser(updatedUser);
      }
  };

  const renderPage = () => {
    if (!currentUser) {
        return <Login onLogin={handleLogin} onRegisterAdmin={handleRegisterAdmin} onRegisterMember={handleRegisterMember} users={users} />;
    }

    switch (currentPage) {
      case Page.Dashboard:
        return <Dashboard user={currentUser} setPage={setCurrentPage} />;
      case Page.Members:
        return <Members users={users} />;
      case Page.Stats:
        return <Stats />;
      case Page.ItemShop:
        return <ItemShop />;
      case Page.AvatarCreator:
        return <AvatarCreator user={currentUser} onUpdateUser={handleUpdateUser} />;
      case Page.Profile:
        return <Profile user={currentUser} onUpdateUser={handleUpdateUser} />;
       case Page.Manual:
        return <Manual />;
       case Page.Help:
        return <Help />;
      case Page.Admin:
         return currentUser.role === 'admin' ? <AdminDashboard user={currentUser} users={users} /> : <ComingSoon pageTitle="Zugriff verweigert" />;
      case Page.Community:
        return <ComingSoon pageTitle="Community" />;
      case Page.Competitions:
        return <ComingSoon pageTitle="Wettbewerbe" />;
      default:
        return <Dashboard user={currentUser} setPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('https://images.alphacoders.com/132/1323329.jpeg')" }}>
        <div className="min-h-screen bg-slate-900 bg-opacity-70 text-white backdrop-blur-sm">
          {currentUser ? (
             <Header user={currentUser} setPage={setCurrentPage} onLogout={handleLogout} />
          ) : (
            // Kein Header auf der Login-Seite
            null
          )}
          <main className="container mx-auto px-4 py-8">
            {renderPage()}
          </main>
        </div>
    </div>
  );
};

export default App;