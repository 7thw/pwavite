/**
 * NightlyRealignments – Sleep Meditation Builder (Dark Theme)
 * Three-view flow: Landing → Category Selection → Playlist Playback.
 * Users pick one track per category, then play them as a nightly sequence.
 * Background is a blurred water photo with dark overlay.
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, Info, Plus, Check, X, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LogoRingsUnified } from '@/components/brand/Logo';
import { useAudio } from '../../AudioContext';

const bg = "dark";

interface NightlyCategory {
  id: string;
  title: string;
  subtitle: string;
  archangel: any;
  tracks: NightlyTrack[];
}

interface NightlyTrack {
  id: string;
  title: string;
  description: string;
  duration: string;
  url: string;
}

/* ───── Category & Track Data ───── */
const NIGHTLY_DATA: NightlyCategory[] = [
  {
    id: 'core',
    title: 'Realign',
    subtitle: 'your Entire Core Being',
    archangel: 'ariel',
    tracks: [
      { id: 'c1', title: 'Core Realignment', description: 'Align your physical and spiritual core for deep restoration.', duration: '02:30', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
      { id: 'c2', title: 'Invite Calm in your Energy Field', description: 'Clear external noise and find inner peace.', duration: '00:33', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
      { id: 'c3', title: 'Communicate with Confidence', description: 'Strengthen your voice and expression.', duration: '00:38', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
      { id: 'c4', title: 'Fall in love with Exercise', description: 'Do you take strain with your physical health? Find balance between your body\'s own ability to heal itself.', duration: '00:33', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
    ]
  },
  {
    id: 'flow',
    title: 'Rebalance',
    subtitle: 'your Energy Flow',
    archangel: 'azrael',
    tracks: [
      { id: 'f1', title: 'Energy Cleansing', description: 'Wash away the day\'s heavy energy.', duration: '00:38', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
      { id: 'f2', title: 'Heal from Toxic Relationships', description: 'Release cords that no longer serve you.', duration: '00:45', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' },
    ]
  },
  {
    id: 'nature',
    title: 'Reconnect',
    subtitle: 'with Nature',
    archangel: 'chamuel',
    tracks: [
      { id: 'n1', title: 'Heal the Earth', description: 'Connect your heartbeat with the rhythm of nature.', duration: '01:02', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3' },
    ]
  },
  {
    id: 'love',
    title: 'Rediscover',
    subtitle: 'Love',
    archangel: 'jophiel',
    tracks: [
      { id: 'l1', title: 'Love Realignment', description: 'Open your heart to receive and give pure love.', duration: '00:41', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' },
      { id: 'l2', title: 'Grow Self-Love', description: 'Nurture your inner child and worth.', duration: '00:35', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3' },
    ]
  }
];

export function NightlyRealignments({ onBack }: { onBack: () => void }) {
  const [view, setView] = React.useState<'landing' | 'selecting' | 'playlist'>('landing');
  const [currentCatIndex, setCurrentCatIndex] = React.useState(0);
  const [selectedTracks, setSelectedTracks] = React.useState<Record<string, NightlyTrack>>({});
  const [infoTrack, setInfoTrack] = React.useState<NightlyTrack | null>(null);
  
  const { state, toggle, setPlaylist, setTrackIndex } = useAudio();

  const currentCategory = NIGHTLY_DATA[currentCatIndex];

  const handleToggleTrack = (track: NightlyTrack) => {
    setSelectedTracks(prev => {
      const next = { ...prev };
      if (next[currentCategory.id]?.id === track.id) {
        delete next[currentCategory.id];
      } else {
        next[currentCategory.id] = track;
      }
      return next;
    });
  };

  /* ───── Start Playlist ─────
     Builds a Track[] from selected tracks, loads into AudioContext, and auto-plays. */
  const startPlaylist = () => {
    const tracks = (Object.values(selectedTracks) as NightlyTrack[]).map(t => ({
      id: t.id,
      title: t.title,
      artist: 'Daleen',
      album: 'Nightly Realignments',
      artwork: 'https://picsum.photos/seed/sleep/800/450',
      url: t.url
    }));
    if (tracks.length > 0) {
      setPlaylist(tracks);
      setTrackIndex(0);
      setView('playlist');
      if (!state.isPlaying) {
        setTimeout(() => toggle(), 100);
      }
    }
  };

  return (
    <div id="nightly-page" data-component="nightly-page" className="relative min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(https://picsum.photos/seed/water/1080/1920?blur=10)' }}>
      {/* ── Background Overlay ── */}
      <div className="absolute inset-0 bg-[#0a1a2a]/40 backdrop-blur-sm" />
      
      <div className="relative z-10 p-6 flex flex-col h-screen overflow-hidden">

        {/* ───── Header ─────
             Logo, dynamic title/subtitle, and back/close button. */}
        <header id="nightly-header" data-component="nightly-header" className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="size-12 bg-white rounded-full flex items-center justify-center shadow-lg">
              <LogoRingsUnified variation="default" size={32} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white leading-tight">
                {view === 'playlist' ? 'Listen' : (view === 'selecting' ? currentCategory.title : 'Nightly Energy')}
              </h1>
              <p className="text-lg text-white/80 leading-tight">
                {view === 'playlist' ? 'While you Sleep' : (view === 'selecting' ? currentCategory.subtitle : 'Realignments')}
              </p>
            </div>
          </div>
          <button 
            id="nightly-back-btn"
            onClick={() => {
              if (view === 'playlist') setView('landing');
              else if (view === 'selecting') setView('landing');
              else onBack();
            }}
            className="size-10 bg-[#4fbdbb] text-white rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform"
          >
            {view === 'playlist' ? <ArrowLeft size={24} /> : (view === 'selecting' ? <ArrowLeft size={24} /> : <ArrowRight size={24} className="rotate-180" />)}
          </button>
        </header>

        {/* ───── Hero / Instructor Card ─────
             Selection instructions with Daleen's photo. Hidden during playlist view. */}
        {view !== 'playlist' && (
          <div id="nightly-hero" data-component="nightly-hero" className="bg-white/80 backdrop-blur-md rounded-[32px] p-4 flex items-center gap-4 mb-8 shadow-xl border border-white/40">
            <img 
              src="https://picsum.photos/seed/daleen2/200/200" 
              alt="Daleen" 
              className="size-20 rounded-2xl object-cover border-2 border-white shadow-md"
            />
            <div className="flex-1">
              <p className="text-[#1a3a5a] text-sm font-medium leading-snug">
                You can select ONE meditation from each category - or skip some.
              </p>
              <p className="text-[#f45d6e] text-sm font-bold">The choice is yours.</p>
            </div>
          </div>
        )}

        {/* ───── View Router ─────
             Animated switch between the three views: landing, selecting, playlist. */}
        <div id="nightly-content" data-component="nightly-content" className="flex-1 overflow-y-auto custom-scrollbar pb-32">
          <AnimatePresence mode="wait">

            {/* ── View: Landing ──
                 Category cards + "View Playlist" CTA */}
            {view === 'landing' && (
              <motion.div 
                key="landing"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                {NIGHTLY_DATA.map((cat, idx) => (
                  <button
                    key={cat.id}
                    data-category-id={cat.id}
                    onClick={() => {
                      setCurrentCatIndex(idx);
                      setView('selecting');
                    }}
                    className="w-full bg-[#1a3a5a]/60 backdrop-blur-md rounded-[32px] p-4 flex items-center justify-between shadow-lg active:scale-[0.98] transition-transform group border border-white/10"
                  >
                    <span className="text-white font-bold text-lg ml-4 text-left">
                      <span className="text-[#4fbdbb]">{cat.title}</span> {cat.subtitle}
                    </span>
                    <div className="size-12 rounded-full overflow-hidden bg-white/20 p-1">
                      <LogoRingsUnified variation="archangels" archangel={cat.archangel} size={40} />
                    </div>
                  </button>
                ))}
                
                {/* ── View Playlist CTA ── */}
                <div className="pt-8 flex justify-center">
                  <button 
                    id="nightly-view-playlist-btn"
                    onClick={startPlaylist}
                    disabled={Object.keys(selectedTracks).length === 0}
                    className="bg-[#f45d6e] text-white font-bold py-4 px-12 rounded-full shadow-lg active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 uppercase tracking-widest"
                  >
                    View Playlist
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── View: Selecting ──
                 Track picker for the current category with info + toggle buttons */}
            {view === 'selecting' && (
              <motion.div 
                key="selecting"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                {/* ── Next Category Button ── */}
                <button 
                  id="nightly-next-category-btn"
                  onClick={() => {
                    if (currentCatIndex < NIGHTLY_DATA.length - 1) {
                      setCurrentCatIndex(prev => prev + 1);
                    } else {
                      setView('landing');
                    }
                  }}
                  className="w-full bg-[#f45d6e] text-white font-bold py-4 rounded-full shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-transform uppercase tracking-widest"
                >
                  Next <ArrowRight size={20} />
                </button>

                {/* ── Track Cards ── */}
                {currentCategory.tracks.map((track) => {
                  const isSelected = selectedTracks[currentCategory.id]?.id === track.id;
                  return (
                    <div
                      key={track.id}
                      data-track-id={track.id}
                      className="w-full bg-[#1a3a5a]/60 backdrop-blur-md rounded-2xl p-4 flex items-center justify-between shadow-lg border border-white/10"
                    >
                      <span className="text-white font-medium ml-4">{track.title}</span>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => setInfoTrack(track)}
                          className="size-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                        >
                          <Info size={20} />
                        </button>
                        <button 
                          onClick={() => handleToggleTrack(track)}
                          className={cn(
                            "size-10 rounded-full flex items-center justify-center transition-all",
                            isSelected ? "bg-[#4fbdbb] text-white" : "bg-white/10 text-white/40"
                          )}
                        >
                          {isSelected ? <Check size={20} /> : <Plus size={20} />}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            )}

            {/* ── View: Playlist ──
                 Shows the selected tracks as a playable queue with hero artwork. */}
            {view === 'playlist' && (
              <motion.div 
                key="playlist"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                {/* ── Playlist Hero Image ── */}
                <div id="nightly-playlist-hero" className="w-full aspect-[16/7] rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20">
                  <img src="https://picsum.photos/seed/sleep2/800/450" alt="Sleep" className="w-full h-full object-cover" />
                </div>

                {/* ── Playlist Track Items ── */}
                <div id="nightly-playlist-tracks" data-component="nightly-playlist-tracks" className="space-y-3">
                  {(Object.values(selectedTracks) as NightlyTrack[]).map((track, idx) => (
                    <div 
                      key={track.id}
                      data-track-id={track.id}
                      className={cn(
                        "w-full rounded-2xl p-4 flex items-center justify-between shadow-lg border transition-all",
                        state.currentTrackIndex === idx ? "bg-[#f45d6e] border-white/20" : "bg-[#1a3a5a]/60 border-white/10"
                      )}
                    >
                      <span className="text-white font-bold">{track.title}</span>
                      <span className={cn("font-medium", state.currentTrackIndex === idx ? "text-white/80" : "text-[#f45d6e]")}>
                        {track.duration}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ───── Track Info Modal ─────
           Centered overlay with track description and close button. */}
      <AnimatePresence>
        {infoTrack && (
          <div id="nightly-info-modal" data-component="nightly-info-modal" className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            {/* ── Backdrop ── */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setInfoTrack(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            {/* ── Modal Card ── */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-sm bg-[#a55664] rounded-[40px] p-8 text-white shadow-2xl border border-white/20"
            >
              <button 
                id="nightly-info-close-btn"
                onClick={() => setInfoTrack(null)}
                className="absolute -top-4 -right-4 size-12 bg-white text-[#a55664] rounded-full flex items-center justify-center shadow-xl border-4 border-[#a55664]"
              >
                <X size={24} />
              </button>
              
              <h2 className="text-2xl font-bold text-center mb-6">{infoTrack.title}</h2>
              <p className="text-lg leading-relaxed text-center mb-8 opacity-90">
                {infoTrack.description}
              </p>
              
              <div className="flex justify-center">
                <div className="size-16 bg-white/20 rounded-full flex items-center justify-center">
                  <LogoRingsUnified variation="default" size={40} />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
