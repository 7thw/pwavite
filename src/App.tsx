/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AudioProvider, useAudio } from './AudioContext';
import { Player } from './components/Player';
import { PlaylistsPage } from './components/PlaylistsPage';
import { MeditationLibrary } from './components/MeditationLibrary';
import { NightlyRealignments } from './components/NightlyRealignments';
import { MasterYourEnergy } from './components/MasterYourEnergy';
import { Footer } from './components/Footer';
import { Track } from './types';
import { Play, Pause, SkipForward } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SplashAnimation } from './components/brand/SplashAnimation';

const INITIAL_PLAYLIST: Track[] = [
  {
    id: '1',
    title: 'Midnight City',
    artist: 'M83',
    album: 'Hurry Up, We\'re Dreaming',
    artwork: 'https://picsum.photos/seed/m83/512/512',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    id: '2',
    title: 'Starboy',
    artist: 'The Weeknd',
    album: 'Starboy',
    artwork: 'https://picsum.photos/seed/weeknd/512/512',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
  },
  {
    id: '3',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    artwork: 'https://picsum.photos/seed/blinding/512/512',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
  }
];

const MiniPlayer = ({ onOpenPlayer }: { onOpenPlayer: () => void }) => {
  const { state, currentTrack, toggle, next } = useAudio();

  if (!currentTrack) return null;

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
      className="w-full"
    >
      <div 
        onClick={onOpenPlayer}
        className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[28px] p-3 flex items-center gap-4 shadow-2xl cursor-pointer group"
      >
        <img 
          src={currentTrack.artwork} 
          alt={currentTrack.title} 
          className="size-12 rounded-2xl object-cover shadow-lg group-hover:scale-105 transition-transform duration-300"
          referrerPolicy="no-referrer"
        />
        <div className="flex-1 min-w-0">
          <p className="font-bold text-sm truncate">{currentTrack.title}</p>
          <p className="text-xs text-white/40 truncate">{currentTrack.artist}</p>
        </div>
        <div className="flex items-center gap-2 pr-2">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              toggle();
            }}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            {state.isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <SkipForward size={18} fill="currentColor" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [isPlayerOpen, setIsPlayerOpen] = React.useState(false);
  const [showSplash, setShowSplash] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState<'playlists' | 'meditations' | 'nightly' | 'master'>('playlists');

  return (
    <AudioProvider initialPlaylist={INITIAL_PLAYLIST}>
      <div className="relative min-h-screen bg-[#0a0502]">
        <AnimatePresence mode="wait">
          {showSplash ? (
            <SplashAnimation 
              key="splash"
              onComplete={() => setShowSplash(false)} 
              duration={3000} 
            />
          ) : (
            <motion.div 
              key="main-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative min-h-screen"
            >
              <AnimatePresence mode="wait">
                {currentPage === 'playlists' ? (
                  <motion.div
                    key="playlists-page"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <PlaylistsPage 
                      onOpenPlayer={() => setIsPlayerOpen(true)} 
                      onOpenMeditations={() => setCurrentPage('meditations')}
                      onOpenNightly={() => setCurrentPage('nightly')}
                      onOpenMaster={() => setCurrentPage('master')}
                    />
                  </motion.div>
                ) : currentPage === 'meditations' ? (
                  <motion.div
                    key="meditations-page"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <MeditationLibrary onBack={() => setCurrentPage('playlists')} />
                  </motion.div>
                ) : currentPage === 'nightly' ? (
                  <motion.div
                    key="nightly-page"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <NightlyRealignments onBack={() => setCurrentPage('playlists')} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="master-page"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <MasterYourEnergy onBack={() => setCurrentPage('playlists')} />
                  </motion.div>
                )}
              </AnimatePresence>
              
              <AnimatePresence>
                {!isPlayerOpen && (
                  <MiniPlayer onOpenPlayer={() => setIsPlayerOpen(true)} />
                )}
              </AnimatePresence>

              <AnimatePresence>
                {isPlayerOpen && (
                  <motion.div 
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="fixed inset-0 z-50"
                  >
                    <Player onClose={() => setIsPlayerOpen(false)} />
                  </motion.div>
                )}
              </AnimatePresence>

              {!isPlayerOpen && (
                <div className="fixed bottom-0 left-0 right-0 z-40 px-6 pb-8 pt-4 pointer-events-none">
                  <div className="max-w-md mx-auto flex flex-col gap-3 pointer-events-auto">
                    <AnimatePresence>
                      {!isPlayerOpen && <MiniPlayer onOpenPlayer={() => setIsPlayerOpen(true)} />}
                    </AnimatePresence>
                    <Footer tone="light" />
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AudioProvider>
  );
}
