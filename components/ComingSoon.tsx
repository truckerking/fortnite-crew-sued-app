
import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface ComingSoonProps {
    pageTitle: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({ pageTitle }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-slate-900 bg-opacity-50 rounded-lg h-full">
      <h1 className="font-fortnite text-5xl text-yellow-300 tracking-wider mb-4">{pageTitle}</h1>
      <ShieldCheck className="w-24 h-24 text-blue-400 animate-pulse my-8" />
      <p className="text-2xl text-white font-fortnite">Feature Coming Soon!</p>
      <p className="text-gray-300 mt-2 max-w-md">
        Our best builders are working on this area. Drop back in later to check out the new features!
      </p>
    </div>
  );
};

export default ComingSoon;
