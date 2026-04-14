import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, X, Play, Pause, RotateCcw, RotateCw, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LogoRingsUnified } from '@/components/brand/Logo';
import { useAudio } from '../AudioContext';

interface MasterTrack {
  id: string;
  title: string;
  duration: string;
  url: string;
}

const MASTER_TRACKS: MasterTrack[] = [
  {
    id: 'health',
    title: 'Master your Health Energy',
    duration: '00:39',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3'
  },
  {
    id: 'sports',
    title: 'Master & Grow your Sports Ability',
    duration: '00:39',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3'
  }
];

export function MasterYourEnergy({ onBack }: { onBack: () => void }) {
  const [view, setView] = React.useState<'paywall' | 'selection' | 'player'>('paywall');
  const [activeTrack, setActiveTrack] = React.useState<MasterTrack | null>(null);
  const { state, toggle, seek, setPlaylist, setTrackIndex } = useAudio();

  const handlePlayTrack = (track: MasterTrack) => {
    setPlaylist([{
      id: track.id,
      title: track.title,
      artist: 'Daleen',
      album: 'Master Your Energy',
      artwork: 'https://picsum.photos/seed/sunset/800/450',
      url: track.url
    }]);
    setTrackIndex(0);
    setActiveTrack(track);
    setView('player');
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      <AnimatePresence mode="wait">
        {view === 'paywall' ? (
          <motion.div 
            key="paywall"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 flex flex-col items-center px-8 pt-20 pb-12 h-screen"
          >
            <div className="mb-8">
              <LogoRingsUnified variation="default" size={120} />
            </div>
            
            <div className="text-center mb-12">
              <h1 className="text-4xl font-light text-[#1a3a5a] tracking-widest mb-2">
                re<span className="font-bold">ΛLIGNA</span>
              </h1>
              <p className="text-lg text-[#1a3a5a]/60 mb-1">A healing meditation app by</p>
              <h2 className="text-2xl font-bold text-[#1a3a5a] italic mb-1">Energy Master Daleen</h2>
              <p className="text-base text-[#1a3a5a]/60">Inspired by Archangels</p>
            </div>

            <div className="mb-12">
              <img 
                src="https://picsum.photos/seed/daleen3/300/300" 
                alt="Daleen" 
                className="size-32 rounded-full object-cover shadow-xl border-4 border-white"
              />
            </div>

            <div className="w-full space-y-4 max-w-sm">
              <button 
                onClick={() => setView('selection')}
                className="w-full bg-[#0f2a3d] text-white py-5 px-6 rounded-[24px] font-bold text-sm leading-tight shadow-xl active:scale-95 transition-transform"
              >
                Upgrade to the paid version to access this section - $49 plus $20
              </button>
              
              <button className="w-full bg-[#0f2a3d] text-white py-5 px-6 rounded-[24px] font-bold text-sm leading-tight shadow-xl active:scale-95 transition-transform">
                Enter COUPON
              </button>

              <button 
                onClick={onBack}
                className="w-full py-4 text-[#1a3a5a]/40 font-bold uppercase tracking-widest text-xs"
              >
                Go Back
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative h-screen bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url(https://picsum.photos/seed/sunset-beach/1080/1920)' }}
          >
            <div className="absolute inset-0 bg-black/20" />
            
            <div className="relative z-10 p-6 flex flex-col h-screen">
              {/* Header */}
              <header className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="size-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <LogoRingsUnified variation="default" size={32} />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-[#4fbdbb] leading-tight">Master</h1>
                    <p className="text-lg text-white leading-tight">Your Energy</p>
                  </div>
                </div>
                <button 
                  onClick={() => view === 'player' ? setView('selection') : setView('paywall')}
                  className="size-10 bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform"
                >
                  {view === 'player' ? <X size={24} /> : <ArrowLeft size={24} />}
                </button>
              </header>

              <AnimatePresence mode="wait">
                {view === 'selection' ? (
                  <motion.div 
                    key="selection"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex flex-col h-full"
                  >
                    <div className="bg-white/60 backdrop-blur-md rounded-[32px] p-8 mb-12 shadow-xl border border-white/40">
                      <p className="text-[#1a3a5a] text-lg font-bold text-center leading-relaxed">
                        Sleep & Meditate with reALIGNA and align your physical and energy being.
                      </p>
                    </div>

                    <div className="space-y-4">
                      {MASTER_TRACKS.map((track) => (
                        <button
                          key={track.id}
                          onClick={() => handlePlayTrack(track)}
                          className="w-full bg-[#1a3a5a]/80 backdrop-blur-md rounded-full p-2 flex items-center justify-between shadow-lg active:scale-[0.98] transition-transform group border border-white/10"
                        >
                          <span className="text-white font-bold text-lg ml-6">
                            <span className="text-[#4fbdbb]">Master</span> {track.title.replace('Master ', '')}
                          </span>
                          <div className="size-14 rounded-full overflow-hidden bg-white/20 p-1">
                            <LogoRingsUnified variation="default" size={48} />
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="player"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex-1 flex flex-col items-center justify-center gap-12"
                  >
                    {/* Track Title Pill */}
                    <div className="w-full bg-white/80 backdrop-blur-md rounded-2xl py-4 px-8 flex flex-col items-center shadow-xl border border-white/40">
                      <span className="text-[#1a3a5a] font-bold text-lg">{activeTrack?.title}</span>
                      <span className="text-[#f45d6e] font-bold">{activeTrack?.duration}</span>
                    </div>

                    {/* Controls */}
                    <div className="w-full space-y-12">
                      <div className="flex items-center justify-center gap-12">
                        <button className="text-white/60 hover:text-white transition-colors">
                          <RotateCcw size={40} />
                        </button>
                        <button 
                          onClick={toggle}
                          className="size-24 bg-white text-[#1a3a5a] rounded-full flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all"
                        >
                          {state.isPlaying ? <Pause size={48} fill="currentColor" /> : <Play size={48} fill="currentColor" className="ml-2" />}
                        </button>
                        <button className="text-white/60 hover:text-white transition-colors">
                          <RotateCw size={40} />
                        </button>
                      </div>

                      <div className="space-y-4">
                        <div className="relative h-1 w-full bg-white/20 rounded-full overflow-hidden cursor-pointer">
                          <div 
                            className="absolute inset-0" 
                            onClick={(e) => {
                              const rect = e.currentTarget.getBoundingClientRect();
                              const percent = (e.clientX - rect.left) / rect.width;
                              seek(percent * state.duration);
                            }}
                          />
                          <motion.div 
                            className="absolute top-0 left-0 h-full bg-white"
                            style={{ width: `${(state.currentTime / state.duration) * 100}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-sm font-bold text-white">
                          <span>{formatTime(state.currentTime)}</span>
                          <span>{formatTime(state.duration)}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
