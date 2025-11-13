import React, { useState, useEffect } from 'react';
import type { User } from '../types';
import { MemberCard } from './MemberCard';
import { Edit, Shield, Lock, Save, X } from 'lucide-react';

interface ProfileProps {
  user: User;
  onUpdateUser: (user: User) => void;
}

const InfoRow: React.FC<{ label: string, value: string, isPrivate?: boolean }> = ({ label, value, isPrivate = false }) => (
    <div className="flex justify-between items-center py-3 border-b border-slate-700">
        <span className="font-bold text-gray-300 flex items-center">
            {label}
            {/* FIX: The `title` prop is not supported by lucide-react icons. Wrap the icon in a span with the title attribute for tooltips. */}
            {isPrivate && <span title="Nur für dich und Admins sichtbar"><Lock className="w-4 h-4 ml-2 text-red-400" /></span>}
        </span>
        <span className="text-white bg-black bg-opacity-20 px-3 py-1 rounded-md">{value}</span>
    </div>
);

const EditRow: React.FC<{ label: string, value: string, name: keyof User, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ label, value, name, onChange }) => (
    <div className="flex flex-col md:flex-row justify-between md:items-center py-2">
        <label htmlFor={name} className="font-bold text-gray-300 mb-1 md:mb-0">{label}</label>
        <input 
            type="text"
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            className="text-white bg-slate-700 px-3 py-1 rounded-md w-full md:w-2/3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
    </div>
);


export const Profile: React.FC<ProfileProps> = ({ user, onUpdateUser }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState<User>(user);

    useEffect(() => {
        setEditedUser(user);
    }, [user]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedUser(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onUpdateUser(editedUser);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedUser(user);
        setIsEditing(false);
    };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <h1 className="font-bangers text-6xl text-yellow-300 tracking-wider mb-8 text-center title-shadow">Dein Profil</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Member Card */}
        <div className="lg:col-span-1">
            <MemberCard user={user} />
             {!isEditing && (
                <button onClick={() => setIsEditing(true)} className="mt-6 w-full flex items-center justify-center space-x-3 p-3 bg-blue-600 rounded-lg comic-button">
                    <Edit className="w-6 h-6 text-yellow-300"/>
                    <span className="font-bangers text-white text-2xl tracking-wide">Profil Bearbeiten</span>
                </button>
            )}
            {isEditing && (
                <div className="mt-6 flex space-x-4">
                    <button onClick={handleSave} className="flex-1 flex items-center justify-center space-x-2 p-3 bg-green-600 rounded-lg comic-button">
                        <Save className="w-5 h-5"/>
                        <span className="font-bangers text-white text-xl tracking-wide">Speichern</span>
                    </button>
                    <button onClick={handleCancel} className="flex-1 flex items-center justify-center space-x-2 p-3 bg-red-600 rounded-lg comic-button">
                        <X className="w-5 h-5"/>
                        <span className="font-bangers text-white text-xl tracking-wide">Abbrechen</span>
                    </button>
                </div>
            )}
        </div>

        {/* Right Column: User Details */}
        <div className="lg:col-span-2 bg-slate-900 bg-opacity-60 rounded-lg p-6 border-4 border-black">
            <h2 className="font-bangers text-4xl text-white mb-4 title-shadow">Kontodetails</h2>
            {isEditing ? (
                 <div className="space-y-3">
                    <EditRow label="Gamertag" name="gamertag" value={editedUser.gamertag} onChange={handleInputChange} />
                    <hr className="border-slate-600 my-3" />
                    <h3 className="font-bangers text-2xl text-yellow-300 pt-2">Persönliche Daten</h3>
                    <p className="text-xs text-gray-400 pb-2 flex items-center"><Lock className="w-3 h-3 mr-1"/> Diese Daten sind privat.</p>
                    <EditRow label="Vorname" name="firstName" value={editedUser.firstName} onChange={handleInputChange} />
                    <EditRow label="Nachname" name="lastName" value={editedUser.lastName} onChange={handleInputChange} />
                    <EditRow label="E-Mail" name="email" value={editedUser.email} onChange={handleInputChange} />
                    <EditRow label="Epic ID" name="epicId" value={editedUser.epicId} onChange={handleInputChange} />
                    <EditRow label="WhatsApp Name" name="whatsAppName" value={editedUser.whatsAppName} onChange={handleInputChange} />
                    <EditRow label="Mobilfunknummer" name="mobileNumber" value={editedUser.mobileNumber} onChange={handleInputChange} />
                    <hr className="border-slate-600 my-3" />
                    <h3 className="font-bangers text-2xl text-yellow-300 pt-2">Login-Daten</h3>
                    <EditRow label="Benutzername" name="username" value={editedUser.username} onChange={handleInputChange} />
                    <div className="py-3 text-gray-400 text-sm">Passwort kann aus Sicherheitsgründen hier nicht geändert werden.</div>
                 </div>
            ) : (
                <div className="space-y-2">
                    <InfoRow label="Rolle" value={user.role === 'admin' ? 'Administrator' : 'Mitglied'} />
                    <InfoRow label="Fortnite Gamertag" value={user.gamertag} />
                    <hr className="border-slate-600 my-4" />
                    <h3 className="font-bangers text-2xl text-yellow-300 pt-2">Persönliche Daten</h3>
                    <p className="text-xs text-gray-400 pb-2 flex items-center"><Lock className="w-3 h-3 mr-1"/> Diese Daten sind privat.</p>
                    <InfoRow label="Vorname" value={user.firstName} isPrivate />
                    <InfoRow label="Nachname" value={user.lastName} isPrivate />
                    <InfoRow label="E-Mail" value={user.email} isPrivate />
                    <InfoRow label="Epic ID" value={user.epicId} isPrivate />
                    <InfoRow label="WhatsApp Name" value={user.whatsAppName} isPrivate />
                    <InfoRow label="Mobilfunknummer" value={user.mobileNumber} isPrivate />
                     <hr className="border-slate-600 my-4" />
                     <h3 className="font-bangers text-2xl text-yellow-300 pt-2">Login-Daten</h3>
                    <InfoRow label="Benutzername" value={user.username} isPrivate />
                    <InfoRow label="Passwort" value="********" isPrivate />
                </div>
            )}
        </div>

      </div>
    </div>
  );
};