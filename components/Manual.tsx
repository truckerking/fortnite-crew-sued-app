import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FileDown } from 'lucide-react';

export const Manual: React.FC = () => {

  const handleDownloadPdf = () => {
    const input = document.getElementById('manual-content');
    if (input) {
      html2canvas(input, { scale: 2, backgroundColor: '#0f172a' }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('Benutzerhandbuch_FCS.pdf');
      });
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="font-bangers text-6xl text-yellow-300 tracking-wider text-center md:text-left title-shadow">Benutzerhandbuch</h1>
        <button 
            onClick={handleDownloadPdf}
            className="mt-4 md:mt-0 bg-green-600 text-white font-bangers text-2xl tracking-wider py-3 px-6 rounded-lg flex items-center justify-center comic-button"
        >
            <FileDown className="w-6 h-6 mr-2" />
            Download PDF
        </button>
      </div>
      
      <div id="manual-content" className="bg-slate-900 bg-opacity-80 p-8 rounded-lg border-4 border-black text-gray-300 space-y-6">
        
        <div className="text-center mb-6">
            <h2 className="font-bangers text-4xl text-white">Fortnite Crew Süd – App</h2>
            <p>Version: November 2025</p>
            <p>Kontakt: Admin Andy</p>
        </div>

        <section>
            <h3 className="font-bangers text-3xl text-yellow-300 tracking-wide">1. Einführung</h3>
            <p>Die Fortnite Crew Süd App dient der digitalen Vernetzung unserer Vereinsmitglieder. Sie bietet Zugriff auf aktuelle Events, interne Kommunikation, Terminplanung und Informationen rund um die Crew. Mitglieder können sich registrieren, anmelden und aktiv an der Gemeinschaft teilnehmen.</p>
        </section>

        <section>
            <h4 className="font-bangers text-2xl text-white">1.1 Zielgruppe</h4>
            <p>Dieses Handbuch richtet sich an alle Mitglieder der Fortnite Crew Süd, die die App nutzen möchten, um über Aktivitäten, Turniere und interne Mitteilungen informiert zu bleiben.</p>
        </section>

        <section>
            <h3 className="font-bangers text-3xl text-yellow-300 tracking-wide">2. Registrierung und Login</h3>
            <p>Die Registrierung erfolgt über die App-Startseite. Mitglieder geben ihre E-Mail-Adresse, ein sicheres Passwort und einen Anzeigenamen ein. Nach der Anmeldung kann das Profil individuell angepasst werden.</p>
        </section>

        <section>
            <h4 className="font-bangers text-2xl text-white">2.1 Benutzerrollen</h4>
            <ul className="list-disc list-inside space-y-1 pl-4">
                <li><strong>Mitglieder:</strong> Standardzugriff auf App-Funktionen</li>
                <li><strong>Moderatoren:</strong> Verwaltung von Chats und Events</li>
                <li><strong>Admins:</strong> Benutzerverwaltung und App-Administration</li>
            </ul>
        </section>

        <section>
            <h3 className="font-bangers text-3xl text-yellow-300 tracking-wide">3. Hauptbereiche der App</h3>
            <ul className="list-disc list-inside space-y-1 pl-4">
                <li><strong>Startseite/Dashboard:</strong> Überblick über Neuigkeiten und Termine</li>
                <li><strong>Mitgliederbereich:</strong> Übersicht aller registrierten Mitglieder, Profilbearbeitung</li>
                <li><strong>Events & Termine:</strong> Ankündigungen, Turniere, Teilnahmefunktionen</li>
                <li><strong>Chat & Kommunikation:</strong> Direkter Austausch zwischen Mitgliedern</li>
                <li><strong>Einstellungen:</strong> Individuelle Anpassungen, Benachrichtigungen, Sprache</li>
            </ul>
        </section>

        <section>
            <h3 className="font-bangers text-3xl text-yellow-300 tracking-wide">4. Nutzungshinweise</h3>
            <p>Nach dem Login wird das Dashboard angezeigt. Dort finden sich aktuelle Nachrichten, Eventeinladungen und Benachrichtigungen. Mitglieder können über das Menü zwischen Bereichen wechseln, Nachrichten schreiben, Events beitreten und ihr Profil anpassen.</p>
        </section>

        <section>
            <h3 className="font-bangers text-3xl text-yellow-300 tracking-wide">5. Hinweise zu Berechtigungen und Freigaben</h3>
            <p>Die App benötigt bestimmte Freigaben, um korrekt zu funktionieren:</p>
            <ul className="list-disc list-inside space-y-1 pl-4">
                <li><strong>Push-Benachrichtigungen:</strong> Zur Information über neue Events und Nachrichten.</li>
                <li><strong>Zugriff auf Kamera/Galerie:</strong> Für das Hochladen eines Profilbilds.</li>
                <li><strong>Internetverbindung:</strong> Für alle Online-Funktionen der App.</li>
            </ul>
            <p className="mt-2">Diese Berechtigungen sind optional, können aber den Nutzungskomfort verbessern. Die App fragt immer aktiv nach Zustimmung, bevor eine Freigabe genutzt wird.</p>
        </section>

         <section>
            <h3 className="font-bangers text-3xl text-yellow-300 tracking-wide">6. Datenschutz & Sicherheit</h3>
            <p>Alle Datenübertragungen erfolgen verschlüsselt. Der Zugang zu personenbezogenen Daten ist nur autorisierten Personen erlaubt. Jeder Nutzer kann Auskunft über seine Daten verlangen, Berichtigung oder Löschung beantragen sowie der Verarbeitung widersprechen.</p>
        </section>

        <section>
            <h3 className="font-bangers text-3xl text-yellow-300 tracking-wide">7. Support & Hilfe</h3>
            <p>Bei technischen Problemen oder Fragen wenden Sie sich bitte an den App-Support der Fortnite Crew Süd. E-Mail: info@wiese66.de. FAQ und Anleitungen sind zusätzlich in der App im Bereich „Hilfe & Support" verfügbar (noch in Arbeit).</p>
        </section>

      </div>
    </div>
  );
};