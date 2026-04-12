import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Track, AudioState, RepeatMode } from './types';

interface AudioContextType {
  state: AudioState;
  playlist: Track[];
  play: () => void;
  pause: () => void;
  toggle: () => void;
  next: () => void;
  previous: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  setTrackIndex: (index: number) => void;
  setSleepTimer: (duration: number) => void;
  setRepeatMode: (mode: RepeatMode) => void;
  currentTrack: Track | null;
}

const AudioContext = createContext<AudioContextType | null>(null);

export const AudioProvider: React.FC<{ children: React.ReactNode; initialPlaylist: Track[] }> = ({ children, initialPlaylist }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playlist] = useState<Track[]>(initialPlaylist);
  const [state, setState] = useState<AudioState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    currentTrackIndex: 0,
    volume: 1,
    sleepTimerDuration: 0,
    sleepTimerRemaining: 0,
    repeatMode: 'none',
    repeatCount: 0,
  });

  const currentTrack = playlist[state.currentTrackIndex] || null;

  // Sleep Timer Countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (state.sleepTimerRemaining > 0 && state.isPlaying) {
      interval = setInterval(() => {
        setState(s => {
          const remaining = s.sleepTimerRemaining - 1;
          if (remaining <= 0) {
            // Fade out and stop
            fadeOutAndStop();
            return { ...s, sleepTimerRemaining: 0, sleepTimerDuration: 0 };
          }
          return { ...s, sleepTimerRemaining: remaining };
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [state.sleepTimerRemaining, state.isPlaying]);

  const fadeOutAndStop = () => {
    if (!audioRef.current) return;
    const initialVolume = audioRef.current.volume;
    let currentVol = initialVolume;
    const fadeInterval = setInterval(() => {
      currentVol -= 0.05;
      if (currentVol <= 0) {
        clearInterval(fadeInterval);
        pause();
        if (audioRef.current) audioRef.current.volume = initialVolume;
      } else if (audioRef.current) {
        audioRef.current.volume = currentVol;
      }
    }, 100);
  };

  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'metadata';
    // @ts-ignore - playsInline is supported by Safari for audio but not in all TS types
    audio.playsInline = true; 
    audioRef.current = audio;

    const updateTime = () => setState(s => ({ ...s, currentTime: audio.currentTime }));
    const updateDuration = () => setState(s => ({ ...s, duration: audio.duration }));
    
    const onEnded = () => {
      handleTrackEnded();
    };

    const onPlay = () => {
      setState(s => ({ ...s, isPlaying: true }));
      updateMediaSession();
    };
    const onPause = () => {
      setState(s => ({ ...s, isPlaying: false }));
      updateMediaSession();
    };

    const onVolumeChange = () => {
      setState(s => ({ ...s, volume: audio.volume }));
    };

    const updatePositionState = () => {
      if ('mediaSession' in navigator && 'setPositionState' in navigator.mediaSession) {
        navigator.mediaSession.setPositionState({
          duration: audio.duration || 0,
          playbackRate: audio.playbackRate,
          position: audio.currentTime,
        });
      }
    };

    audio.addEventListener('timeupdate', () => {
      updateTime();
      updatePositionState();
    });
    audio.addEventListener('durationchange', updateDuration);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('volumechange', onVolumeChange);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('durationchange', updateDuration);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('volumechange', onVolumeChange);
      audio.pause();
      audio.src = '';
    };
  }, []);

  const handleTrackEnded = () => {
    setState(s => {
      const isLastTrack = s.currentTrackIndex === playlist.length - 1;
      
      if (isLastTrack) {
        if (s.repeatMode === 'all') {
          return { ...s, currentTrackIndex: 0, currentTime: 0 };
        } else if (s.repeatMode === 'two' || s.repeatMode === 'three') {
          const maxRepeats = s.repeatMode === 'two' ? 2 : 3;
          if (s.repeatCount + 1 < maxRepeats) {
            return { ...s, currentTrackIndex: 0, currentTime: 0, repeatCount: s.repeatCount + 1 };
          }
        }
        // If no more repeats, stop
        return { ...s, isPlaying: false, currentTime: 0 };
      }
      
      // Not last track, just go to next
      return { ...s, currentTrackIndex: s.currentTrackIndex + 1, currentTime: 0 };
    });
  };

  useEffect(() => {
    if (audioRef.current && currentTrack) {
      const wasPlaying = state.isPlaying;
      audioRef.current.src = currentTrack.url;
      audioRef.current.load();
      if (wasPlaying) {
        audioRef.current.play().catch(console.error);
      }
      updateMediaSession();
    }
  }, [state.currentTrackIndex]);

  const updateMediaSession = () => {
    if ('mediaSession' in navigator && currentTrack) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentTrack.title,
        artist: currentTrack.artist,
        album: currentTrack.album,
        artwork: [
          { src: currentTrack.artwork, sizes: '96x96', type: 'image/jpeg' },
          { src: currentTrack.artwork, sizes: '128x128', type: 'image/jpeg' },
          { src: currentTrack.artwork, sizes: '192x192', type: 'image/jpeg' },
          { src: currentTrack.artwork, sizes: '256x256', type: 'image/jpeg' },
          { src: currentTrack.artwork, sizes: '384x384', type: 'image/jpeg' },
          { src: currentTrack.artwork, sizes: '512x512', type: 'image/jpeg' },
        ],
      });

      navigator.mediaSession.playbackState = state.isPlaying ? 'playing' : 'paused';

      navigator.mediaSession.setActionHandler('play', play);
      navigator.mediaSession.setActionHandler('pause', pause);
      navigator.mediaSession.setActionHandler('previoustrack', previous);
      navigator.mediaSession.setActionHandler('nexttrack', next);
      navigator.mediaSession.setActionHandler('seekto', (details) => {
        if (details.seekTime !== undefined) seek(details.seekTime);
      });
    }
  };

  const play = () => audioRef.current?.play().catch(console.error);
  const pause = () => audioRef.current?.pause();
  const toggle = () => state.isPlaying ? pause() : play();
  
  const next = () => {
    setState(s => ({
      ...s,
      currentTrackIndex: (s.currentTrackIndex + 1) % playlist.length,
      currentTime: 0
    }));
  };

  const previous = () => {
    setState(s => ({
      ...s,
      currentTrackIndex: (s.currentTrackIndex - 1 + playlist.length) % playlist.length,
      currentTime: 0
    }));
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setState(s => ({ ...s, currentTime: time }));
    }
  };

  const setVolume = (volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      setState(s => ({ ...s, volume }));
    }
  };

  const setTrackIndex = (index: number) => {
    setState(s => ({
      ...s,
      currentTrackIndex: index,
      currentTime: 0
    }));
  };

  const setSleepTimer = (duration: number) => {
    setState(s => ({
      ...s,
      sleepTimerDuration: duration,
      sleepTimerRemaining: duration * 60
    }));
  };

  const setRepeatMode = (mode: RepeatMode) => {
    setState(s => ({
      ...s,
      repeatMode: mode,
      repeatCount: 0
    }));
  };

  return (
    <AudioContext.Provider value={{ 
      state, playlist, play, pause, toggle, next, previous, seek, setVolume, setTrackIndex, setSleepTimer, setRepeatMode, currentTrack 
    }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) throw new Error('useAudio must be used within AudioProvider');
  return context;
};
