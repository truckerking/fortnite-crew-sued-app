export enum MemberTier {
  Bronze = 'Bronze',
  Silver = 'Silber',
  Gold = 'Gold',
  Platin = 'Platin',
  Diamant = 'Diamant',
}

export interface User {
  id: string;
  username: string;
  email: string;
  gamertag: string;
  epicId: string;
  role: 'admin' | 'member';
  memberSince: string;
  memberId: string;
  tier: MemberTier;
  avatarUrl: string;
  status: 'Online' | 'Zocken' | 'Schlafen' | 'Verhindert';
  firstName: string;
  lastName: string;
  whatsAppName: string;
  mobileNumber: string;
  isApproved: boolean;
}

export interface FortniteItem {
  id: string;
  name: string;
  imageUrl: string;
  rarity: string; // API returns rarity as a string, e.g. 'legendary'
  vbucks: number;
}

export interface PlayerStats {
  wins: number;
  kills: number;
  matchesPlayed: number;
  killDeathRatio: number;
  winRate: number;
}

export enum Page {
  Login,
  Dashboard,
  Members,
  Stats,
  ItemShop,
  AvatarCreator,
  Admin,
  Chat,
  Videos,
  Events,
  Community,
  Competitions,
  Friends,
  Photos,
  WhatsApp,
  Profile,
  Manual,
  Help,
}