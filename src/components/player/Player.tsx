import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, SkipBack, SkipForward, Volume2, ListMusic, ChevronDown, Repeat, Heart } from 'lucide-react';
import { TimerIcon } from '@/components/animate-ui/icons/timer';
import { useAudio } from '../../AudioContext';
import { RepeatMode } from '../../types';

import { cn } from '@/lib/utils';

interface PlayerProps {
  onClose?: () => void;
}

export const Player: React.FC<PlayerProps> = ({ onClose }) => {
  const { state, playlist, currentTrack, toggle, next, previous, seek, setVolume, setTrackIndex, setSleepTimer, setRepeatMode } = useAudio();
  const [showPlaylist, setShowPlaylist] = React.useState(false);
  const [showDuration, setShowDuration] = React.useState(false);
  const [showVolumePill, setShowVolumePill] = React.useState(false);
  const volumeTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    if (state.sleepTimerDuration > 0) {
      const timer = setTimeout(() => setShowDuration(true), 800);
      return () => clearTimeout(timer);
    } else {
      setShowDuration(false);
    }
  }, [state.sleepTimerDuration]);

  // Show volume pill on volume change
  React.useEffect(() => {
    // Only trigger auto-hide if the pill was shown due to a volume change
    setShowVolumePill(true);
    if (volumeTimerRef.current) clearTimeout(volumeTimerRef.current);
    volumeTimerRef.current = setTimeout(() => setShowVolumePill(false), 3000);
    return () => {
      if (volumeTimerRef.current) clearTimeout(volumeTimerRef.current);
    };
  }, [state.volume]);

  const handleVolumeButtonClick = () => {
    if (showVolumePill) {
      setShowVolumePill(false);
      if (volumeTimerRef.current) clearTimeout(volumeTimerRef.current);
    } else {
      setShowVolumePill(true);
      // When opened via button, we can either let it stay or still auto-hide.
      // Let's keep the auto-hide but maybe longer (3s)
      if (volumeTimerRef.current) clearTimeout(volumeTimerRef.current);
      volumeTimerRef.current = setTimeout(() => setShowVolumePill(false), 5000);
    }
  };

  const [isFavorite, setIsFavorite] = React.useState(false);

  React.useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const playlistId = 'realigna-favorites';
    setIsFavorite(favorites.includes(playlistId));
  }, []);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const playlistId = 'realigna-favorites';
    let newFavorites;
    if (favorites.includes(playlistId)) {
      newFavorites = favorites.filter((id: string) => id !== playlistId);
    } else {
      newFavorites = [...favorites, playlistId];
    }
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  if (!currentTrack) return null;

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSleepTimerClick = () => {
    const options = [0, 15, 30, 60, 90];
    const currentIndex = options.indexOf(state.sleepTimerDuration);
    const nextDuration = options[(currentIndex + 1) % options.length];
    setShowDuration(false);
    setSleepTimer(nextDuration);
  };

  const handleRepeatClick = () => {
    const modes: RepeatMode[] = ['none', 'all', 'two', 'three'];
    const currentIndex = modes.indexOf(state.repeatMode);
    const nextMode = modes[(currentIndex + 1) % modes.length];
    setRepeatMode(nextMode);
  };

  const getRepeatLabel = () => {
    if (state.repeatMode === 'none') return 'Repeat Off';
    if (state.repeatMode === 'all') return 'Repeat All';
    if (state.repeatMode === 'two') return 'Repeat 2x';
    if (state.repeatMode === 'three') return 'Repeat 3x';
    return '';
  };

  return (
    <div className="fixed inset-0 h-[100dvh] bg-[#0a0502] text-white overflow-hidden flex flex-col">
      {/* Background Artwork Cover */}
      <div className="fixed inset-0 -z-0 overflow-hidden pointer-events-none">
        <motion.img 
          key={`bg-${currentTrack.id}`}
          src={currentTrack.artwork}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1 }}
          className="w-screen h-screen object-cover blur-0 scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Header */}
      <header className="relative z-10 p-6 flex justify-between items-center">
        <button 
          onClick={onClose}
          className="p-2 hover:bg-white/10 rounded-full transition-colors border border-white/20 mix-blend-difference"
        >
          <ChevronDown size={20} />
        </button>
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-semibold">Playing from Playlist</p>
          <p className="text-sm font-medium">Realigna Favorites</p>
        </div>
        <button 
          onClick={() => setShowPlaylist(!showPlaylist)}
          className="p-2 hover:bg-white/10 rounded-full transition-colors border border-white/20 mix-blend-difference"
        >
          <ListMusic size={20} />
        </button>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-end px-8 pb-40">
        {/* Spacer for artwork area */}
        <div className="flex-1" />

        {/* Track Info */}
        <div className="w-full text-center mb-8 flex flex-col items-center">
          <motion.h1 
            key={`title-${currentTrack.id}`}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-3xl font-bold tracking-tight mb-1"
          >
            {currentTrack.title}
          </motion.h1>
          <motion.p 
            key={`artist-${currentTrack.id}`}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/60 font-medium"
          >
            {currentTrack.artist}
          </motion.p>
        </div>

        <div id="controls-wrap" className="absolute bottom-0 left-0 right-0 px-4 flex flex-col items-center">
          {/* Row 1: Timer, Progress, Volume */}
          <div className="w-full flex items-center gap-2 mb-0 mix-blend-difference">
            {/* Sleep Timer Button */}
            <button 
              onClick={handleSleepTimerClick}
              className={cn(
                "relative p-2.5 rounded-full transition-all duration-300 border border-white/20",
                state.sleepTimerDuration > 0 ? "bg-white/40 text-white" : "text-white/40 hover:text-white"
              )}
            >
              <div className="relative flex items-center justify-center">
                <TimerIcon animate={state.sleepTimerDuration > 0} className="size-4" />
                <AnimatePresence>
                  {showDuration && state.sleepTimerDuration > 0 && (
                    <motion.span 
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2 flex size-3.5 items-center justify-center rounded-full bg-transparent text-white font-black text-[6px]"
                    >
                      {state.sleepTimerDuration}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </button>

            {/* Progress Bar */}
            <div className="flex-1 mx-4">
              <div className="relative h-1 w-full bg-white/20 rounded-full overflow-hidden cursor-pointer group border border-white/10">
                <div 
                  className="absolute inset-0 bg-white/20 w-full" 
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const percent = (e.clientX - rect.left) / rect.width;
                    seek(percent * state.duration);
                  }}
                />
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-white rounded-full relative z-10"
                  style={{ width: `${(state.currentTime / state.duration) * 100}%` }}
                />
              </div>
              <div className="flex justify-between mt-2 text-[10px] font-bold tracking-widest text-white/40 uppercase">
                <span>{formatTime(state.currentTime)}</span>
                <span>{formatTime(state.duration)}</span>
              </div>
            </div>

            {/* Volume Trigger Button */}
            <div className="relative flex items-center gap-2">
              <AnimatePresence>
                {showVolumePill && (
                  <motion.div 
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 10, opacity: 0 }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-6 z-50"
                  >
                    <div className="relative w-12 h-40 bg-white/10 backdrop-blur-2xl rounded-[22px] overflow-hidden border border-white/10 shadow-2xl">
                      <input 
                        type="range" 
                        min="0" 
                        max="1" 
                        step="0.01" 
                        value={state.volume}
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                        className="absolute inset-0 w-40 h-12 -rotate-90 origin-center translate-y-[64px] -translate-x-[64px] opacity-0 cursor-pointer z-10"
                        style={{ width: '160px', height: '48px' }}
                      />
                      <div 
                        className="absolute bottom-0 left-0 w-full bg-white transition-all duration-75"
                        style={{ height: `${state.volume * 100}%` }}
                      />
                      <div className="absolute inset-0 pointer-events-none flex items-end justify-center pb-4">
                        <Volume2 size={12} className={cn("transition-colors duration-300", state.volume > 0.2 ? "text-black/60" : "text-white/40")} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Real-time Volume Meter */}
              <div className="flex items-end gap-[2px] h-4 px-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={false}
                    animate={{ 
                      height: `${(i + 1) * 20}%`,
                      opacity: state.volume >= (i + 1) / 5 ? 1 : 0.2,
                      backgroundColor: state.volume >= (i + 1) / 5 ? 'white' : 'rgba(255,255,255,0.2)'
                    }}
                    className="w-[3px] rounded-full"
                  />
                ))}
              </div>

              <button 
                onClick={handleVolumeButtonClick}
                className={cn(
                  "relative p-2.5 rounded-full transition-all duration-300 border border-white/20",
                  showVolumePill ? "bg-white/40 text-white" : "text-white/40 hover:text-white"
                )}
              >
                <Volume2 size={16} />
              </button>
            </div>
          </div>

          {/* Row 2: Loop, Prev, Play/Pause, Next, Favorite */}
          <div className="w-full flex justify-center items-center px-2 mix-blend-difference max-w-sm gap-3">
            {/* Repeat Button */}
            <button 
              onClick={handleRepeatClick}
              className={cn(
                "relative p-2.5 rounded-full transition-all duration-300 border border-white/20",
                state.repeatMode !== 'none' ? "bg-white/40 text-white" : "text-white/40 hover:text-white"
              )}
              title={getRepeatLabel()}
            >
              <div className="relative">
                <Repeat size={16} />
                {(state.repeatMode === 'two' || state.repeatMode === 'three') && (
                  <span className="absolute -left-1 -top-1 flex size-3.5 items-center justify-center rounded-full bg-white text-black font-bold text-[7px]">
                    {state.repeatMode === 'two' ? '2' : '3'}
                  </span>
                )}
              </div>
            </button>

            <button 
              onClick={previous}
              className="p-2.5 text-white/80 hover:text-white transition-colors border border-white/20 rounded-full"
            >
              <SkipBack size={20} fill="currentColor" />
            </button>
            
            <button 
              onClick={toggle}
              className="w-16 h-16 aspect-square bg-white text-black rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl border border-white/20"
            >
              {state.isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
            </button>

            <button 
              onClick={next}
              className="p-2.5 text-white/80 hover:text-white transition-colors border border-white/20 rounded-full"
            >
              <SkipForward size={20} fill="currentColor" />
            </button>

            {/* Favorite Button */}
            <button 
              onClick={toggleFavorite}
              className={cn(
                "p-2.5 rounded-full transition-all duration-300 border border-white/20",
                isFavorite ? "text-red-500 bg-red-500/10 border-red-500/20" : "text-white/40 hover:text-white"
              )}
            >
              <Heart size={16} fill={isFavorite ? "currentColor" : "none"} />
            </button>
          </div>
        </div>
      </main>

      {/* Footer / Empty for spacing */}
      <footer className={cn("relative z-10 p-6 pt-0 h-0", state.isPlaying && "hidden")} />

      {/* Playlist Overlay */}
      <AnimatePresence>
        {showPlaylist && (
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute inset-0 z-50 bg-[#0a0502]/95 backdrop-blur-2xl p-6 flex flex-col"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Up Next</h2>
              <button 
                onClick={() => setShowPlaylist(false)}
                className="p-2 hover:bg-white/10 rounded-full"
              >
                <ChevronDown size={24} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
              {playlist.map((track, index) => (
                <button 
                  key={track.id}
                  onClick={() => {
                    setTrackIndex(index);
                    setShowPlaylist(false);
                  }}
                  className={cn(
                    "w-full flex items-center gap-4 p-3 rounded-2xl transition-colors",
                    index === state.currentTrackIndex ? "bg-white/10" : "hover:bg-white/5"
                  )}
                >
                  <img 
                    src={track.artwork} 
                    alt={track.title} 
                    className="w-12 h-12 rounded-lg object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 text-left">
                    <p className={cn("font-semibold", index === state.currentTrackIndex ? "text-white" : "text-white/80")}>
                      {track.title}
                    </p>
                    <p className="text-xs text-white/40">{track.artist}</p>
                  </div>
                  {index === state.currentTrackIndex && state.isPlaying && (
                    <div className="flex gap-1 items-end h-4">
                      <motion.div animate={{ height: [4, 12, 4] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-1 bg-white" />
                      <motion.div animate={{ height: [8, 4, 8] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1 bg-white" />
                      <motion.div animate={{ height: [4, 10, 4] }} transition={{ repeat: Infinity, duration: 0.7 }} className="w-1 bg-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
