/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AudioProvider, useAudio } from './AudioContext';
import { Player } from './components/Player';
import { Track } from './types';
import { Play, Pause, SkipForward } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

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

const Library = ({ onOpenPlayer }: { onOpenPlayer: () => void }) => {
  const { playlist, currentTrack, setTrackIndex } = useAudio();

  return (
    <div className="min-h-screen bg-[#0a0502] text-white p-6 pb-24">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Library</h1>
        <p className="text-white/40 mt-1">Your favorite tracks</p>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {playlist.map((track, index) => (
          <button 
            key={track.id}
            onClick={() => {
              setTrackIndex(index);
              onOpenPlayer();
            }}
            className={`flex items-center gap-4 p-3 rounded-2xl transition-all duration-300 ${
              currentTrack?.id === track.id ? 'bg-white/10' : 'hover:bg-white/5'
            }`}
          >
            <img 
              src={track.artwork} 
              alt={track.title} 
              className="size-14 rounded-xl object-cover shadow-lg"
              referrerPolicy="no-referrer"
            />
            <div className="flex-1 text-left">
              <p className={`font-semibold ${currentTrack?.id === track.id ? 'text-white' : 'text-white/80'}`}>
                {track.title}
              </p>
              <p className="text-sm text-white/40">{track.artist}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

const MiniPlayer = ({ onOpenPlayer }: { onOpenPlayer: () => void }) => {
  const { state, currentTrack, toggle, next } = useAudio();

  if (!currentTrack) return null;

  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      exit={{ y: 100 }}
      className="fixed bottom-6 left-6 right-6 z-40"
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

  return (
    <AudioProvider initialPlaylist={INITIAL_PLAYLIST}>
      <div className="relative min-h-screen bg-[#0a0502]">
        <Library onOpenPlayer={() => setIsPlayerOpen(true)} />
        
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
      </div>
    </AudioProvider>
  );
}
