import { User, MemberTier, PlayerStats, FortniteItem } from './types';

// Die App startet ohne vordefinierte Benutzer.
export const INITIAL_USERS: User[] = [];

// Vorlage für die Erstellung des ersten Admin-Benutzers beim ersten Login.
export const ADMIN_TEMPLATE: Omit<User, 'id'> = {
    username: 'Admin',
    email: 'admin@fcs.de',
    gamertag: 'FCS_Admin',
    epicId: 'admin_epic_id',
    role: 'admin',
    memberSince: new Date().toISOString().split('T')[0], // Setzt das aktuelle Datum
    memberId: 'FCS0000000001AA',
    tier: MemberTier.Diamant,
    avatarUrl: `https://i.pravatar.cc/150?u=1`,
    status: 'Online',
    firstName: 'Admin',
    lastName: 'FCS',
    whatsAppName: 'FCS Admin',
    mobileNumber: '0123-456789',
    isApproved: true,
};


export const MOCK_STATS: PlayerStats = {
  wins: 152,
  kills: 4321,
  matchesPlayed: 2100,
  killDeathRatio: 2.06,
  winRate: 7.24,
};

// Fallback data in case the API fails
export const MOCK_ITEM_SHOP: FortniteItem[] = [
  { id: '1', name: 'Rabe', imageUrl: 'https://picsum.photos/seed/raven/200', rarity: 'legendary', vbucks: 2000 },
  { id: '2', name: 'Abtrünniger Räuber', imageUrl: 'https://picsum.photos/seed/renegade/200', rarity: 'rare', vbucks: 1200 },
  { id: '3', name: 'Sternenstab', imageUrl: 'https://picsum.photos/seed/starwand/200', rarity: 'rare', vbucks: 800 },
  { id: '4', name: 'Bananen-Agent', imageUrl: 'https://picsum.photos/seed/peely/200', rarity: 'epic', vbucks: 1500 },
];