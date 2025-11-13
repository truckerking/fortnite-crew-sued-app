import React from 'react';
import type { User } from '../types';
import { Users, ShieldCheck, Trash2, Mail, Calendar, BarChartHorizontal, FileDown } from 'lucide-react';
import jsPDF from 'jspdf';

const AdminCard: React.FC<{ icon: React.ElementType, title: string, description: string, actionText: string, onClick?: () => void }> = ({ icon: Icon, title, description, actionText, onClick }) => (
    <div className="bg-slate-800 bg-opacity-70 rounded-lg p-6 flex flex-col border-4 border-black">
        <div className="flex items-center mb-4">
            <Icon className="w-8 h-8 text-yellow-300 mr-4" />
            <h3 className="font-bangers text-3xl text-white tracking-wide title-shadow">{title}</h3>
        </div>
        <p className="text-gray-300 flex-grow">{description}</p>
        <button onClick={onClick} className="mt-4 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg self-start comic-button">
            {actionText}
        </button>
    </div>
);

export const AdminDashboard: React.FC<{ user: User, users: User[] }> = ({ user, users }) => {

  const handleDownloadAdminManual = () => {
    const doc = new jsPDF();
    let y = 20; // vertical position

    const addTitle = (text: string) => {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(22);
        doc.text(text, 105, y, { align: 'center' });
        y += 15;
    };

    const addHeading = (text: string) => {
        if (y > 260) { doc.addPage(); y = 20; }
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text(text, 14, y);
        y += 8;
    };

    const addText = (text: string) => {
        if (y > 270) { doc.addPage(); y = 20; }
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        const splitText = doc.splitTextToSize(text, 180);
        doc.text(splitText, 14, y);
        y += (splitText.length * 5) + 5;
    };
    
    // Page 1: Title & Intro
    addTitle("Admin Handbuch - Fortnite Crew Süd");
    addHeading("Einführung");
    addText("Willkommen im Admin-Dashboard! Dieses Handbuch erklärt deine Rechte und die Funktionen, die dir zur Verfügung stehen. Als Admin bist du für die Verwaltung der Community, die Sicherheit der Mitglieder und die Organisation von Events verantwortlich. Gehe mit diesen Rechten verantwortungsvoll um.");

    // Section: Mitglieder Verwalten
    addHeading("1. Mitglieder Verwalten & Freigaben");
    addText("Dies ist eine deiner wichtigsten Aufgaben. Die Sicherheit und der Zusammenhalt der Crew hängen von einer sorgfältigen Mitgliederverwaltung ab.");
    addText("Deine Rechte:\n" +
            "- Neue Mitglieder freischalten: Registrierte Benutzer erscheinen im Admin-Dashboard unter 'Offene Freigaben'. Du musst sie manuell überprüfen und freischalten, damit sie sich einloggen und teilnehmen können.\n" +
            "- Mitgliederinformationen einsehen: Du hast Zugriff auf alle Profildaten der Mitglieder, einschließlich privater Informationen, um bei Problemen helfen zu können.\n" +
            "- Rollen ändern: Du kannst andere Mitglieder zu Moderatoren oder Admins ernennen (zukünftiges Feature).\n" +
            "- Mitglieder sperren/entfernen: Bei Regelverstößen kannst du den Zugang für Mitglieder sperren.");
    
    // Section: Content Freigabe
    addHeading("2. Content Freigabe");
    addText("Die App wird in Zukunft Funktionen für von Mitgliedern erstellte Inhalte wie Fotos, Videos oder Event-Vorschläge enthalten.");
    addText("Deine Rechte:\n" +
            "- Inhalte prüfen: Du siehst alle eingereichten Inhalte, bevor sie für die Community sichtbar werden.\n" +
            "- Inhalte freigeben oder ablehnen: Du entscheidest, ob der Inhalt den Community-Richtlinien entspricht. Achte auf angemessene Sprache, respektvollen Umgang und Relevanz für die Crew.\n" +
            "- Feedback geben: Du kannst dem Ersteller mitteilen, warum sein Inhalt abgelehnt wurde.");

    // Section: Inhalte Löschen
    if (y > 180) { doc.addPage(); y = 20; }
    addHeading("3. Inhalte Löschen");
    addText("Um eine positive und sichere Umgebung zu gewährleisten, musst du unangemessene Inhalte entfernen können.");
     addText("Deine Rechte:\n" +
            "- Nachrichten/Posts entfernen: Du kannst einzelne Nachrichten in Chats oder Posts löschen, die gegen die Regeln verstoßen (z.B. Beleidigungen, Spam).\n" +
            "- Komplette Inhalte entfernen: Du kannst ganze Fotogalerien oder Videobeiträge löschen, wenn sie unangemessen sind.\n" +
            "- Konsequenzen durchsetzen: Das Löschen von Inhalten ist oft der erste Schritt. Bei wiederholten Verstößen solltest du das Mitglied verwarnen oder sperren.");
    
    // Section: Newsletter
    addHeading("4. Newsletter");
    addText("Halte die Crew mit regelmäßigen Updates auf dem Laufenden.");
     addText("Deine Funktionen:\n" +
            "- Newsletter erstellen: Schreibe Zusammenfassungen über vergangene Events, kündige kommende Turniere an oder teile wichtige Neuigkeiten mit der gesamten Crew.\n" +
            "- Newsletter versenden: Sende den fertigen Newsletter per E-Mail an alle registrierten Mitglieder.");
    
    // Section: Events Planen
    addHeading("5. Events Planen");
    addText("Events sind das Herzstück der Community. Deine Rolle ist es, für regelmäßige und spannende Aktivitäten zu sorgen.");
     addText("Deine Funktionen:\n" +
            "- Events erstellen: Lege neue Events an, z.B. wöchentliche Squad-Abende, Custom-Turniere oder kreative Wettbewerbe.\n" +
            "- Event-Details festlegen: Definiere Datum, Uhrzeit, Regeln, Preise und Teilnahmebedingungen.\n" +
            "- Anmeldungen verwalten: Behalte den Überblick darüber, wer an welchen Events teilnimmt.");

    doc.save("Admin_Handbuch_FCS.pdf");
  };

  const pendingApprovals = users.filter(u => !u.isApproved).length;

  return (
    <div className="p-4 md:p-8">
      <h1 className="font-bangers text-6xl text-red-500 tracking-wider mb-2 text-center title-shadow">Admin Dashboard</h1>
      <p className="text-center text-gray-300 mb-8">Angemeldet als: {user.username}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="md:col-span-2 lg:col-span-3 bg-slate-900 bg-opacity-60 p-6 rounded-lg border-4 border-black">
              <h2 className="font-bangers text-4xl text-yellow-300 mb-4 title-shadow">Schnellübersicht</h2>
              <div className="flex space-x-8 text-white">
                  <div className="text-center">
                      <p className="text-4xl font-bold">{users.length}</p>
                      <p className="text-gray-400">Mitglieder Gesamt</p>
                  </div>
                   <div className="text-center">
                      <p className="text-4xl font-bold text-yellow-400">{pendingApprovals}</p>
                      <p className="text-gray-400">Offene Freigaben</p>
                  </div>
                   <div className="text-center">
                      <p className="text-4xl font-bold">0</p>
                      <p className="text-gray-400">Neue Events</p>
                  </div>
              </div>
          </div>

          <AdminCard 
            icon={Users} 
            title="Mitglieder Verwalten" 
            description="Mitgliederrollen ändern, Karten sperren oder neue Mitglieder freigeben."
            actionText="Mitglieder Anzeigen"
          />
           <AdminCard 
            icon={ShieldCheck} 
            title="Content Freigabe" 
            description="Neue Videos, Fotos und Event-Vorschläge von Mitgliedern prüfen und freigeben."
            actionText="Zu den Freigaben"
          />
           <AdminCard 
            icon={Trash2} 
            title="Inhalte Löschen" 
            description="Chats, Videos oder andere Inhalte löschen, die gegen die Regeln verstoßen."
            actionText="Inhalte Durchsuchen"
          />
            <AdminCard 
            icon={Mail} 
            title="Newsletter" 
            description="Den nächsten Community-Newsletter erstellen und versenden."
            actionText="Newsletter Erstellen"
          />
             <AdminCard 
            icon={Calendar} 
            title="Events Planen" 
            description="Neue Community-Events, Turniere oder Treffen erstellen und ankündigen."
            actionText="Neues Event"
          />
            <AdminCard 
            icon={FileDown}
            title="Admin Handbuch"
            description="Lade das Handbuch für Administratoren mit spezifischen Anleitungen herunter."
            actionText="Download PDF"
            onClick={handleDownloadAdminManual}
            />

      </div>
    </div>
  );
};