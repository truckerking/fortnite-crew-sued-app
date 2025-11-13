import React, { useState } from 'react';
import { ADMIN_TEMPLATE } from '../constants';
import type { User } from '../types';
import { Shield, UserPlus } from 'lucide-react';

interface LoginProps {
  onLogin: (user: User) => void;
  onRegisterAdmin: (adminData: Omit<User, 'id'>) => User;
  onRegisterMember: (memberData: Partial<User>) => User;
  users: User[];
}

export const Login: React.FC<LoginProps> = ({ onLogin, onRegisterAdmin, onRegisterMember, users }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleMemberAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLoginView) {
      const user = users.find(u => u.username.toLowerCase() === username.toLowerCase() && u.role === 'member');
      if (user) {
        if (user.isApproved) {
            onLogin(user);
        } else {
            setError('Dein Account wurde noch nicht von einem Admin freigeschaltet.');
        }
      } else {
        setError('Benutzer nicht gefunden oder falsches Passwort.');
      }
    } else {
      // Registrierung
      if (!username || !password) {
        setError("Benutzername und Passwort sind erforderlich.");
        return;
      }
      const existingUser = users.find(u => u.username.toLowerCase() === username.toLowerCase());
      if (existingUser) {
          setError('Benutzername bereits vergeben.');
          return;
      }
      
      onRegisterMember({
          username: username,
          email: `${username.toLowerCase()}@fcs.de`,
          gamertag: username,
          epicId: 'nicht_gesetzt',
          status: 'Online',
          firstName: 'Neues',
          lastName: 'Mitglied',
          whatsAppName: username,
          mobileNumber: 'nicht_gesetzt',
          avatarUrl: `https://i.pravatar.cc/150?u=${username}`
      });
      setError('Registrierung erfolgreich! Ein Admin wird deinen Account bald freischalten.');
      setIsLoginView(true);
      setUsername('');
      setPassword('');
    }
  };

  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password === 'FCS2025') {
        let adminUser = users.find(u => u.role === 'admin');
        if (!adminUser) {
            // Erster Admin-Login, erstelle den Admin-Account
            adminUser = onRegisterAdmin(ADMIN_TEMPLATE);
        }
        onLogin(adminUser);
    } else {
        setError('Falsches Admin-Passwort.');
    }
  };
  
  const handleSwitchToAdmin = () => {
    setIsAdminLogin(true);
    setError('');
    setUsername('');
    setPassword('');
  };
  
  const handleSwitchToMember = () => {
    setIsAdminLogin(false);
    setError('');
    setUsername('');
    setPassword('');
    setIsLoginView(true);
  };

  const renderAdminLogin = () => (
     <div className="w-full max-w-md p-8 space-y-6 bg-slate-900 bg-opacity-80 backdrop-blur-md rounded-2xl shadow-2xl border-4 border-black">
        <div className="text-center">
            <h1 className="font-fortnite text-5xl text-white tracking-wider title-shadow">Fortnite</h1>
            <h2 className="font-bangers text-6xl text-white tracking-wider flex items-center justify-center title-shadow -mt-2">
                <Shield className="w-12 h-12 mr-4 text-red-500" />
                <span className="text-red-400">Admin</span> Zone
            </h2>
        </div>
        
        <form className="space-y-6" onSubmit={handleAdminAuth}>
          <div>
            <input
              type="password"
              placeholder="Admin-Passwort"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800 text-white border-2 border-black rounded-lg focus:outline-none focus:border-yellow-400 transition-colors"
              required
              autoFocus
            />
          </div>
          
          {error && <p className="text-center text-red-400">{error}</p>}
          
          <button
            type="submit"
            className="w-full py-3 font-bangers text-2xl tracking-wider text-white bg-red-600 rounded-lg comic-button"
          >
            Anmelden
          </button>
        </form>
        
        <div className="text-center">
          <button onClick={handleSwitchToMember} className="text-sm text-gray-400 hover:text-yellow-300">
            Zurück zum Mitglieder-Login
          </button>
        </div>
      </div>
  );

  const renderMemberLogin = () => (
      <div className="w-full max-w-md p-8 space-y-6 bg-slate-900 bg-opacity-80 backdrop-blur-md rounded-2xl shadow-2xl border-4 border-black">
        <div className="text-center mb-6">
            <h1 className="font-fortnite text-6xl text-white tracking-wider title-shadow">Fortnite</h1>
            <p className="font-fortnite text-3xl text-gray-300 tracking-wider title-shadow -mt-2">Crew Süd</p>
            <p className="text-gray-300 mt-2">{isLoginView ? 'Melde dich an, um fortzufahren' : 'Erstelle einen neuen Account'}</p>
        </div>
        
        <form className="space-y-6" onSubmit={handleMemberAuth}>
          <div>
            <input
              type="text"
              placeholder="Benutzername"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800 text-white border-2 border-black rounded-lg focus:outline-none focus:border-yellow-400 transition-colors"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Passwort"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800 text-white border-2 border-black rounded-lg focus:outline-none focus:border-yellow-400 transition-colors"
              required
            />
          </div>
          
          {error && <p className="text-center text-red-400">{error}</p>}
          
          <button
            type="submit"
            className="w-full py-3 font-bangers text-2xl tracking-wider text-white bg-blue-600 rounded-lg comic-button"
          >
            {isLoginView ? 'Login' : 'Registrieren'}
          </button>
        </form>
        
        <div className="text-center">
          <button onClick={() => setIsLoginView(!isLoginView)} className="text-sm text-gray-400 hover:text-yellow-300">
            {isLoginView ? 'Noch keinen Account? Registrieren' : 'Bereits Mitglied? Anmelden'}
          </button>
        </div>
        
        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-gray-600"></div>
          <span className="flex-shrink mx-4 text-gray-400 text-xs">ODER</span>
          <div className="flex-grow border-t border-gray-600"></div>
        </div>

        <button
          onClick={handleSwitchToAdmin}
          className="w-full py-2 font-bangers text-xl tracking-wider text-white bg-slate-700 rounded-lg hover:bg-red-700 transition-colors duration-300 flex items-center justify-center space-x-2 comic-button"
        >
          <Shield className="w-5 h-5" />
          <span>Admin-Login</span>
        </button>

      </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat p-4" style={{ backgroundImage: "url('https://images.alphacoders.com/132/1323329.jpeg')" }}>
      {isAdminLogin ? renderAdminLogin() : renderMemberLogin()}
    </div>
  );
};