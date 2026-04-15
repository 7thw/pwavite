/**
 * MiniPlayer – Compact Now-Playing Bar
 * A slim, tappable strip shown in the bottom bar when audio is playing.
 * Displays artwork, track title/artist, play/pause, and skip-forward controls.
 * Tapping the body opens the full-screen Player drawer.
 */

import React from 'react';
import { useAudio } from '../../AudioContext';
import { Play, Pause, SkipForward } from 'lucide-react';
import { motion } from 'motion/react';

interface MiniPlayerProps {
  onOpenPlayer: () => void;
}

export const MiniPlayer = ({ onOpenPlayer }: MiniPlayerProps) => {
  const { state, currentTrack, toggle, next } = useAudio();

  // Only display when something is actively playing
  if (!currentTrack || !state.isPlaying) return null;

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
      className="w-full"
    >
      {/* ───── MiniPlayer Container ─────
           Tappable card that opens the full Player drawer. */}
      <div 
        id="mini-player" 
        data-component="mini-player"
        onClick={onOpenPlayer}
        className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[28px] p-3 flex items-center gap-4 shadow-2xl cursor-pointer group"
      >
        {/* ───── Track Artwork ───── */}
        <img 
          src={currentTrack.artwork} 
          alt={currentTrack.title} 
          className="size-12 rounded-2xl object-cover shadow-lg group-hover:scale-105 transition-transform duration-300"
          referrerPolicy="no-referrer"
        />

        {/* ───── Track Info ───── */}
        <div id="mini-player-track-info" className="flex-1 min-w-0">
          <p className="font-bold text-sm truncate">{currentTrack.title}</p>
          <p className="text-xs text-white/40 truncate">{currentTrack.artist}</p>
        </div>

        {/* ───── Playback Controls ───── */}
        <div id="mini-player-controls" className="flex items-center gap-2 pr-2">
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
