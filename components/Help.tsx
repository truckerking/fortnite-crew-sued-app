
import React, { useState } from 'react';
import { ChevronDown, Mail } from 'lucide-react';

const FAQItem: React.FC<{ question: string; children: React.ReactNode }> = ({ question, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b-2 border-slate-700">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left py-4"
      >
        <h4 className="font-bangers text-2xl text-white">{question}</h4>
        <ChevronDown
          className={`w-6 h-6 text-yellow-300 transform transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="pb-4 pr-4 pl-2 text-gray-300 space-y-2 animate-fade-in-down">
          {children}
        </div>
      )}
    </div>
  );
};


export const Help: React.FC = () => {
    return (
        <div className="p-4 md:p-8 max-w-4xl mx-auto">
            <h1 className="font-bangers text-6xl text-yellow-300 tracking-wider mb-8 text-center title-shadow">Hilfe & Support</h1>

            <div className="bg-slate-900 bg-opacity-80 p-8 rounded-lg border-4 border-black space-y-8">
                {/* Contact Section */}
                <section>
                    <h3 className="font-bangers text-3xl text-white tracking-wide mb-4">Kontakt</h3>
                    <p className="text-gray-300 mb-2">
                        Hast du ein technisches Problem, einen Vorschlag für die App oder eine andere Frage, die hier nicht beantwortet wird? Zögere nicht, uns zu kontaktieren.
                    </p>
                    <div className="flex items-center space-x-3 bg-slate-800 p-3 rounded-md">
                        <Mail className="w-6 h-6 text-yellow-300" />
                        <a href="mailto:info@wiese66.de" className="text-blue-400 hover:underline">
                            info@wiese66.de
                        </a>
                    </div>
                </section>

                {/* FAQ Section */}
                <section>
                    <h3 className="font-bangers text-3xl text-white tracking-wide mb-4">Häufig gestellte Fragen (FAQ)</h3>
                    <div className="space-y-2">
                        <FAQItem question="Wie registriere ich mich?">
                            <p>Auf der Startseite kannst du zwischen "Login" und "Registrieren" wählen. Klicke auf "Noch keinen Account? Registrieren", gib deinen gewünschten Benutzernamen und ein Passwort ein und klicke auf "Registrieren".</p>
                        </FAQItem>
                        <FAQItem question="Warum kann ich mich nach der Registrierung nicht einloggen?">
                            <p>Jeder neue Account muss zuerst von einem Administrator freigeschaltet werden. Dies dient der Sicherheit unserer Community. Bitte habe etwas Geduld. Sobald dein Account freigegeben ist, kannst du dich normal einloggen.</p>
                        </FAQItem>
                         <FAQItem question="Wie funktioniert der AI Avatar Creator?">
                            <p>Im Bereich "Avatar" kannst du entweder ein Thema auswählen oder eine eigene Beschreibung deines Wunsch-Avatars eingeben. Unsere KI generiert dann ein einzigartiges Bild für dich. Du kannst auch ein eigenes Bild von deinem Gerät hochladen und als Avatar verwenden.</p>
                        </FAQItem>
                         <FAQItem question="Meine Statistiken werden nicht angezeigt. Was kann ich tun?">
                            <p>Die Statistik-Funktion ist eine Simulation und greift (noch) nicht auf Live-Daten von Epic Games zu. Gib einfach einen beliebigen Gamertag ein, um die Funktionsweise mit Beispieldaten zu sehen.</p>
                        </FAQItem>
                         <FAQItem question="Wie kann ich mein Profil bearbeiten?">
                            <p>Gehe zum Bereich "Profil". Dort siehst du deine Mitgliedskarte und deine Kontodetails. Klicke auf den Button "Profil Bearbeiten", um deine Daten wie Gamertag, Name oder E-Mail zu ändern. Vergiss nicht, am Ende auf "Speichern" zu klicken.</p>
                        </FAQItem>
                         <FAQItem question="An wen wende ich mich bei Problemen oder Vorschlägen?">
                            <p>Für alle Anliegen, die nicht durch die FAQ abgedeckt sind, schreibe bitte eine E-Mail an unser Admin-Team unter der oben genannten Kontaktadresse. Wir freuen uns über dein Feedback!</p>
                        </FAQItem>
                    </div>
                </section>
            </div>
        </div>
    );
};