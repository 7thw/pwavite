import React from 'react';
import { cn } from '@/lib/utils';
import { LogoRingsUnified } from '@/components/brand/Logo';
import { motion } from 'motion/react';

const bg = "light";

interface CardStaticProps {
  bg: string;
  title: string;
  subtitle: string;
  archangel: any;
  onClick?: () => void;
}

export function CardStatic({ bg, title, subtitle, archangel, onClick }: CardStaticProps) {
  return (
    <button 
      onClick={onClick}
      className="block w-full outline-none group active:scale-95 transition-transform text-left"
    >
      <div className={cn("relative py-4 px-5 w-full aspect-4/3 rounded-xl overflow-visible border-none shadow-xl", bg)}>
        <div className="flex flex-col h-full relative z-10 text-white">
          <h3 className="text-white text-xl md:text-2xl font-bold leading-tight">{title}</h3>
          <p className="text-sm md:text-base font-normal opacity-80 leading-tight">{subtitle}</p>

          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-white shadow-2xl flex items-center justify-center pointer-events-none group-hover:scale-110 transition-transform duration-500">
            <div className="translate-x-[1px] -translate-y-[4px] w-full h-full p-2">
              <LogoRingsUnified 
                variation="archangels" 
                archangel={archangel} 
                strokeWidth={2.5}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}

interface PlaylistsPageProps {
  onOpenPlayer: () => void;
  onOpenMeditations: () => void;
  onOpenNightly: () => void;
  onOpenMaster: () => void;
}

export function PlaylistsPage({ onOpenPlayer, onOpenMeditations, onOpenNightly, onOpenMaster }: PlaylistsPageProps) {
  const cards = [
    {
      title: "Nightly",
      subtitle: "Realignment",
      bg: "bg-nightly",
      archangel: "azrael",
      onClick: onOpenNightly
    },
    {
      title: "Daily",
      subtitle: "Meditations",
      bg: "bg-daily",
      archangel: "gabriel",
      onClick: onOpenMeditations
    },
    {
      title: "Master",
      subtitle: "your Energy",
      bg: "bg-master",
      archangel: "michael",
      onClick: onOpenMaster
    },
    {
      title: "Insights",
      subtitle: "from Daleen",
      bg: "bg-insight",
      archangel: "jophiel"
    }
  ];

  return (
    <div id="playlists-page" className="light relative w-full max-w-md mx-auto px-6 pt-12 pb-64 min-h-screen flex flex-col bg-background">
      {/* Header Typography */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full mb-6 shrink-0"
      >
        <h1 className="text-3xl font-bold leading-tight text-white tracking-tight">Discover your</h1>
        <h2 className="text-xl text-white/40 leading-tight tracking-tight">Unique Energetic Fingerprint</h2>
      </motion.div>

      {/* Hero Banner Image */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="w-full aspect-[16/9] relative rounded-xl overflow-hidden shadow-2xl mb-10 shrink-0 border border-white/5"
      >
        <img 
          src="https://picsum.photos/seed/realigna-hero/800/450" 
          alt="Hero" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </motion.div>

      {/* Categories Section */}
      <div className="w-full flex-1">
        <div className="grid grid-cols-2 gap-x-4 gap-y-12">
          {cards.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <CardStatic 
                {...c} 
                onClick={c.onClick || onOpenPlayer}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
