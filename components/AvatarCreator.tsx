import React, { useState, useCallback } from 'react';
import { generateAvatarImage } from '../services/geminiService';
import { Sparkles, Upload, Wand2, Bot, Ghost, ShieldHalf, User as UserIcon, Palette, Cog, Swords, Skull } from 'lucide-react';
import type { User } from '../types';

const themes = [
    { name: "Peely Agent", icon: Bot, prompt: "Ein Bananen-Agent im Anzug, geheimnisvoll und mit Sonnenbrille" },
    { name: "Mecha Brawler", icon: ShieldHalf, prompt: "Ein riesiger Mecha-Roboter, kampfbereit mit leuchtenden Energiekernen" },
    { name: "Galaxy Scout", icon: Wand2, prompt: "Ein kosmischer Entdecker, dessen Haut wie eine Galaxie aussieht, mit Sternen und Nebeln" },
    { name: "Drift Style", icon: Ghost, prompt: "Ein Kämpfer mit einer japanischen Kitsune-Maske und einem stylischen urbanen Mantel" },
    { name: "Cyberpunk", icon: Bot, prompt: "Ein kybernetischer Avatar im Cyberpunk-Stil mit Neon-Akzenten" },
    { name: "Fantasy", icon: Wand2, prompt: "Ein mystischer Fantasy-Held mit leuchtender Rüstung und magischen Symbolen" },
    { name: "Anime", icon: Palette, prompt: "Ein heldenhafter Charakter im japanischen Anime-Stil, mit großen Augen und dynamischen Haaren" },
    { name: "Steampunk", icon: Cog, prompt: "Ein Steampunk-Abenteurer mit Zylinder, Schutzbrille und mechanischen Apparaturen" },
    { name: "Shadow Ninja", icon: Swords, prompt: "Ein dunkler Ninja, der aus den Schatten tritt, mit einer Maske und leuchtenden Katanas" },
    { name: "Zombie Jäger", icon: Skull, prompt: "Ein postapokalyptischer Überlebender, der gegen Zombies kämpft, mit robuster Ausrüstung" },
];

interface AvatarCreatorProps {
  user: User;
  onUpdateUser: (user: User) => void;
}


export const AvatarCreator: React.FC<AvatarCreatorProps> = ({ user, onUpdateUser }) => {
  const [prompt, setPrompt] = useState('');
  const [avatarImage, setAvatarImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    setAvatarImage(null);
    setError('');
    setUpdateSuccess(false);
    try {
      const base64Image = await generateAvatarImage(prompt);
      setAvatarImage(base64Image);
    } catch (err) {
      setError("Fehler bei der Generierung des Bildes. Bitte versuche es erneut.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        setAvatarImage(base64String);
        setError('');
        setUpdateSuccess(false);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const onUploadClick = useCallback(() => {
    document.getElementById('avatar-upload')?.click();
  },[]);

  const selectTheme = (themePrompt: string) => {
    setPrompt(themePrompt);
  }

  const handleSetAsProfilePicture = () => {
    if (!avatarImage) return;

    const updatedUser: User = {
        ...user,
        avatarUrl: `data:image/png;base64,${avatarImage}`
    };

    onUpdateUser(updatedUser);
    setUpdateSuccess(true);
    setTimeout(() => setUpdateSuccess(false), 3000); // Hide message after 3 seconds
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <h1 className="font-bangers text-6xl text-yellow-300 tracking-wider mb-8 text-center title-shadow">AI Avatar Creator</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="bg-slate-900 bg-opacity-60 p-6 rounded-lg border-4 border-black">
          <h2 className="font-bangers text-4xl text-white mb-4 title-shadow">1. Wähle ein Thema</h2>
          <div className="grid grid-cols-2 gap-3 mb-4">
              {themes.map(theme => (
                  <button key={theme.name} onClick={() => selectTheme(theme.prompt)} className="flex items-center justify-center space-x-2 p-3 bg-slate-800 rounded-lg comic-button border-2 border-slate-700">
                      <theme.icon className="w-5 h-5 text-yellow-300" />
                      <span className="text-white font-semibold text-sm">{theme.name}</span>
                  </button>
              ))}
          </div>

          <h2 className="font-bangers text-4xl text-white mb-4 title-shadow mt-6">2. Avatar Beschreiben</h2>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="z.B. 'Ein kybernetischer Fuchs-Ninja mit leuchtenden lila Augen' oder wähle ein Thema..."
            rows={4}
            className="w-full bg-slate-800 text-white placeholder-gray-500 border-2 border-black rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <button
            onClick={handleGenerate}
            disabled={loading || !prompt}
            className="mt-4 w-full bg-purple-600 text-white font-bangers text-2xl tracking-wider py-3 px-6 rounded-lg disabled:bg-gray-500 disabled:opacity-50 flex items-center justify-center comic-button"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
            ) : (
              <><Sparkles className="w-6 h-6 mr-2" /> Generieren</>
            )}
          </button>
          
          <div className="my-4 text-center text-gray-400 font-bold">ODER</div>

          <input type="file" id="avatar-upload" className="hidden" accept="image/*" onChange={handleImageUpload} />
          <button onClick={onUploadClick} className="w-full bg-green-600 text-white font-bangers text-2xl tracking-wider py-3 px-6 rounded-lg flex items-center justify-center comic-button">
            <Upload className="w-6 h-6 mr-2" /> Eigenes Bild Hochladen
          </button>
        </div>

        {/* Output Section */}
        <div className="bg-slate-900 bg-opacity-60 p-6 rounded-lg flex flex-col items-center justify-center min-h-[300px] border-4 border-black">
          <h2 className="font-bangers text-4xl text-white mb-4 title-shadow">3. Dein Avatar</h2>
          {loading && (
             <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500 mb-4"></div>
                <p className="text-gray-300">Avatar wird generiert...</p>
             </div>
          )}
          {error && <p className="text-red-400 text-center">{error}</p>}

          {!loading && avatarImage && (
             <div className="text-center">
                <img src={`data:image/png;base64,${avatarImage}`} alt="Generierter oder hochgeladener Avatar" className="w-48 h-48 rounded-full border-4 border-purple-500 mb-4 object-cover" />
                <p className="text-gray-300">Dein einzigartiger Avatar!</p>
                <button 
                  onClick={handleSetAsProfilePicture}
                  className="mt-4 bg-teal-600 text-white font-bangers text-xl tracking-wider py-2 px-5 rounded-lg flex items-center justify-center comic-button"
                >
                  <UserIcon className="w-5 h-5 mr-2" />
                  Als Profilbild verwenden
                </button>
                {updateSuccess && (
                  <p className="text-green-400 mt-2 font-bold animate-pulse">Profilbild aktualisiert!</p>
                )}
             </div>
          )}
          
          {!loading && !avatarImage && !error && (
            <div className="text-gray-500 text-center">
                <p>Dein generierter oder hochgeladener Avatar wird hier angezeigt.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};