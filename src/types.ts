export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  artwork: string;
  url: string;
}

export type RepeatMode = 'none' | 'one' | 'two' | 'three' | 'infinite';

export interface AudioState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  currentTrackIndex: number;
  volume: number;
  sleepTimerDuration: number; // in minutes
  sleepTimerRemaining: number; // in seconds
  repeatMode: RepeatMode;
  repeatCount: number; // to track how many times we've repeated in 'two' or 'three' modes
}
