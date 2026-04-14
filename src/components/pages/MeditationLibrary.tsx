import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LogoRingsUnified } from '@/components/brand/Logo';
import { useAudio } from '../../AudioContext';

interface MeditationCategory {
  id: string;
  title: string;
  subtitle: string;
  archangel: any;
}

interface MeditationTrack {
  id: string;
  title: string;
  artist: string;
  artwork: string;
  url: string;
  duration: string;
}

const CATEGORIES: MeditationCategory[] = [
  { id: 'heal-past', title: 'Heal The Past', subtitle: 'Meditations', archangel: 'jeremiel' },
  { id: 'stay-present', title: 'Stay In The Present', subtitle: 'Meditations', archangel: 'haniel' },
  { id: 'manifest-future', title: 'Manifest Your Future', subtitle: 'Meditations', archangel: 'michael' },
  { id: 'sunrise', title: 'Sunrise', subtitle: 'Meditations with each 15 Archangel', archangel: 'gabriel' },
  { id: 'full-moon', title: 'Full Moon', subtitle: 'Meditations', archangel: 'haniel' },
];

const TRACKS: Record<string, MeditationTrack[]> = {
  'heal-past': [
    { id: 'hp1', title: 'Explore your Core', artist: 'Daleen', artwork: 'https://picsum.photos/seed/med1/800/450', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', duration: '00:39' }
  ],
  'stay-present': [
    { id: 'sp1', title: 'Gratitude at Sunrise', artist: 'Daleen', artwork: 'https://picsum.photos/seed/med2/800/450', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', duration: '00:39' },
    { id: 'sp2', title: 'Connect to your Intuition', artist: 'Daleen', artwork: 'https://picsum.photos/seed/med3/800/450', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', duration: '00:39' },
    { id: 'sp3', title: 'Bring back your Bounce', artist: 'Daleen', artwork: 'https://picsum.photos/seed/med4/800/450', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', duration: '00:39' },
    { id: 'sp4', title: 'Find Freedom\'s Flow', artist: 'Daleen', artwork: 'https://picsum.photos/seed/med5/800/450', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', duration: '00:39' },
    { id: 'sp5', title: 'Connect your Energy with Nature', artist: 'Daleen', artwork: 'https://picsum.photos/seed/med6/800/450', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3', duration: '00:39' },
    { id: 'sp6', title: 'Rediscover Love Relationships', artist: 'Daleen', artwork: 'https://picsum.photos/seed/med7/800/450', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3', duration: '00:39' },
  ],
  'manifest-future': [
    { id: 'mf1', title: 'Release Past Attachments', artist: 'Daleen', artwork: 'https://picsum.photos/seed/med8/800/450', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', duration: '00:39' },
    { id: 'mf2', title: 'Explore your Core', artist: 'Daleen', artwork: 'https://picsum.photos/seed/med9/800/450', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3', duration: '00:39' },
  ],
  'sunrise': [
    { id: 'sr1', title: 'Archangel Ariel', artist: 'Daleen', artwork: 'https://picsum.photos/seed/ariel/800/450', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3', duration: '00:39' },
    { id: 'sr2', title: 'Archangel Azrael', artist: 'Daleen', artwork: 'https://picsum.photos/seed/azrael/800/450', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3', duration: '00:39' },
    { id: 'sr3', title: 'Archangel Chamuel', artist: 'Daleen', artwork: 'https://picsum.photos/seed/chamuel/800/450', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3', duration: '00:39' },
    { id: 'sr4', title: 'Archangel Gabrielle', artist: 'Daleen', artwork: 'https://picsum.photos/seed/gabrielle/800/450', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3', duration: '00:39' },
    { id: 'sr5', title: 'Archangel Haniel', artist: 'Daleen', artwork: 'https://picsum.photos/seed/haniel/800/450', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3', duration: '00:39' },
    { id: 'sr6', title: 'Archangel Jophiel', artist: 'Daleen', artwork: 'https://picsum.photos/seed/jophiel/800/450', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3', duration: '00:39' },
  ],
  'full-moon': [
    { id: 'fm1', title: 'Full Moon Meditation', artist: 'Daleen', artwork: 'https://picsum.photos/seed/moon/800/450', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3', duration: '00:39' }
  ]
};

export function MeditationLibrary({ onBack }: { onBack: () => void }) {
  const [currentCategory, setCurrentCategory] = React.useState<MeditationCategory | null>(null);
  const { state, toggle, setPlaylist, setTrackIndex } = useAudio();

  const handlePlayTrack = (track: MeditationTrack, index: number) => {
    // Load the full category playlist into AudioContext
    const categoryTracks = TRACKS[currentCategory!.id]?.map(t => ({
      id: t.id,
      title: t.title,
      artist: t.artist,
      album: currentCategory?.title || 'Meditations',
      artwork: t.artwork,
      url: t.url
    })) || [];
    setPlaylist(categoryTracks);
    setTrackIndex(index);
    // Auto-play if not already playing
    if (!state.isPlaying) {
      setTimeout(() => toggle(), 100);
    }
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(https://picsum.photos/seed/beach/1080/1920?blur=10)' }}>
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm" />
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10 p-6 flex flex-col h-screen overflow-hidden"
      >
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="size-12 bg-white rounded-full flex items-center justify-center shadow-lg">
              <LogoRingsUnified variation="default" size={32} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#1a3a5a] leading-tight">
                {currentCategory ? currentCategory.title : 'Daily Energy'}
              </h1>
              <p className="text-lg text-[#1a3a5a]/60 leading-tight">Meditations</p>
            </div>
          </div>
          <button 
            onClick={() => currentCategory ? setCurrentCategory(null) : onBack()}
            className="size-10 bg-[#f45d6e] text-white rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform"
          >
            <ArrowLeft size={24} />
          </button>
        </header>

        {/* Hero Section */}
        <div className="bg-white/60 backdrop-blur-md rounded-[40px] p-4 flex items-center gap-4 mb-8 shadow-xl border border-white/40">
          <img 
            src="https://picsum.photos/seed/daleen/200/200" 
            alt="Daleen" 
            className="size-24 rounded-full object-cover border-2 border-white shadow-md"
          />
          <p className="text-[#1a3a5a] font-medium leading-snug pr-4">
            {currentCategory 
              ? <>Select one recording from <strong>below</strong> and press play to listen</>
              : "Select a Daily Energy Meditation from any of the categories below."
            }
          </p>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar pb-32">
          <AnimatePresence mode="wait">
            {!currentCategory ? (
              <motion.div 
                key="categories"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-4"
              >
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCurrentCategory(cat)}
                    className="w-full bg-white rounded-[32px] p-4 flex items-center justify-between shadow-lg active:scale-[0.98] transition-transform group"
                  >
                    <span className="text-[#1a3a5a] font-bold text-lg ml-4">
                      {cat.title} <span className="font-normal opacity-60">{cat.subtitle}</span>
                    </span>
                    <div className="size-12 rounded-full overflow-hidden opacity-40 group-hover:opacity-100 transition-opacity">
                      <LogoRingsUnified variation="archangels" archangel={cat.archangel} size={48} />
                    </div>
                  </button>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="tracks"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                {TRACKS[currentCategory.id]?.map((track, index) => (
                  <button
                    key={track.id}
                    onClick={() => handlePlayTrack(track, index)}
                    className="w-full bg-white rounded-[32px] p-4 flex items-center justify-between shadow-lg active:scale-[0.98] transition-transform group"
                  >
                    <span className="text-[#1a3a5a] font-bold text-lg ml-4">
                      {track.title}
                    </span>
                    <div className="size-8 rounded-full bg-[#d0e6f0] flex items-center justify-center text-[#1a3a5a]">
                      <Play size={16} fill="currentColor" />
                    </div>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
