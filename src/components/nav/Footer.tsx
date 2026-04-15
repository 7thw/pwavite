/**
 * Footer – Expandable Bottom Navigation Bar
 * A single pill containing two animated inline panels:
 *   - MainNav:    expands to 7/8 width, collapses to a Menu icon tab
 *   - MiniPlayer: expands to 7/8 width, collapses to an AudioLines icon tab
 *
 * The two panels toggle via a `footerMode` boolean ('nav' | 'miniplayer').
 * The MiniPlayer panel only renders when a track is loaded in AudioContext.
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { HomeIcon, MediatationIcon, EnergyIcon, ProfileIcon } from './NavIcons';
import { AnimateIcon } from '@/components/animate-ui/icons/icon';
import { Moon } from '@/components/animate-ui/icons/moon';
import { MenuIcon } from '@/components/animate-ui/icons/menu';
import { AudioLinesIcon } from '@/components/animate-ui/icons/audio-lines';
import { useAudio } from '@/AudioContext';
import { Play, Pause, SkipForward } from 'lucide-react';

/* ─── Spring config shared across both panels ─── */
const SPRING = { type: 'spring', stiffness: 320, damping: 30 } as const;

interface FooterProps {
  theme?: 'light' | 'dark';
  className?: string;
  onOpenPlayer?: () => void;
  onNavigate?: (page: 'playlists' | 'meditations' | 'nightly' | 'master') => void;
  currentPage?: string;
}

export function Footer({
  theme = 'dark',
  className,
  onOpenPlayer,
  onNavigate,
  currentPage = 'playlists',
}: FooterProps) {
  const [footerMode, setFooterMode] = React.useState<'nav' | 'miniplayer'>('nav');
  const { state, currentTrack, toggle, next } = useAudio();

  /* Switch back to nav if track stops / is cleared */
  React.useEffect(() => {
    if (!currentTrack) setFooterMode('nav');
  }, [currentTrack]);

  const hasTrack = !!currentTrack;

  return (
    /* ── Theme wrapper forces correct CSS var resolution ── */
    <div id="footer-root" data-component="footer" className={cn(theme, className)}>
      {/* ── Outer pill shell ── */}
      <div
        id="footer-pill"
        className="w-full max-w-md mx-auto rounded-[32px] p-1.5 flex items-stretch gap-1.5 shadow-2xl backdrop-blur-xl border bg-background border-border overflow-hidden"
        style={{ minHeight: 64 }}
      >

        {/* ─────────────────────────────────────────
            PANEL A — Main Navigation
            7/8 wide when footerMode === 'nav'
            1/8 wide (icon tab) when footerMode === 'miniplayer'
        ───────────────────────────────────────── */}
        <motion.div
          id="footer-nav-panel"
          data-component="footer-nav-panel"
          layout
          transition={SPRING}
          className={cn(
            "relative flex items-center rounded-[26px] overflow-hidden shrink-0",
            footerMode === 'nav'
              ? "flex-1 justify-around px-1"
              : "w-11 justify-center cursor-pointer hover:bg-foreground/5 transition-colors"
          )}
          onClick={footerMode === 'miniplayer' ? () => setFooterMode('nav') : undefined}
        >
          <AnimatePresence mode="wait">
            {footerMode === 'nav' ? (
              /* ── Nav buttons (full) ── */
              <motion.div
                key="nav-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex items-center justify-around w-full"
              >
                <button
                  id="footer-nav-home"
                  onClick={() => onNavigate?.('playlists')}
                  className={cn(
                    "p-3 rounded-2xl transition-colors",
                    currentPage === 'playlists'
                      ? "text-foreground"
                      : "text-foreground/40 hover:text-foreground hover:bg-foreground/10"
                  )}
                >
                  <HomeIcon size={22} />
                </button>

                <button
                  id="footer-nav-nightly"
                  onClick={() => onNavigate?.('nightly')}
                  className={cn(
                    "p-3 rounded-2xl transition-colors",
                    currentPage === 'nightly'
                      ? "text-foreground"
                      : "text-foreground/40 hover:text-foreground hover:bg-foreground/10"
                  )}
                >
                  <AnimateIcon animateOnHover>
                    <Moon size={22} />
                  </AnimateIcon>
                </button>

                <button
                  id="footer-nav-meditations"
                  onClick={() => onNavigate?.('meditations')}
                  className={cn(
                    "p-3 rounded-2xl transition-colors",
                    currentPage === 'meditations'
                      ? "text-foreground"
                      : "text-foreground/40 hover:text-foreground hover:bg-foreground/10"
                  )}
                >
                  <MediatationIcon size={22} />
                </button>

                <button
                  id="footer-nav-master"
                  onClick={() => onNavigate?.('master')}
                  className={cn(
                    "p-3 rounded-2xl transition-colors",
                    currentPage === 'master'
                      ? "text-foreground"
                      : "text-foreground/40 hover:text-foreground hover:bg-foreground/10"
                  )}
                >
                  <EnergyIcon size={22} />
                </button>

                <button
                  id="footer-nav-profile"
                  className="p-3 text-foreground/40 hover:text-foreground hover:bg-foreground/10 rounded-2xl transition-colors"
                >
                  <ProfileIcon size={22} />
                </button>
              </motion.div>
            ) : (
              /* ── Nav collapsed → Menu icon tab ── */
              <motion.div
                key="nav-icon"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.15 }}
              >
                <AnimateIcon animateOnHover>
                  <MenuIcon size={20} className="text-foreground/60" />
                </AnimateIcon>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ─────────────────────────────────────────
            PANEL B — MiniPlayer
            Only renders when a track is available.
            1/8 wide (AudioLines tab) when footerMode === 'nav'
            7/8 wide (full player strip) when footerMode === 'miniplayer'
        ───────────────────────────────────────── */}
        <AnimatePresence>
          {hasTrack && (
            <motion.div
              id="footer-miniplayer-panel"
              data-component="footer-miniplayer-panel"
              layout
              transition={SPRING}
              initial={{ width: 44, opacity: 0 }}
              animate={{
                opacity: 1,
                width: footerMode === 'miniplayer' ? undefined : 44,
              }}
              exit={{ width: 44, opacity: 0 }}
              className={cn(
                "relative flex items-center rounded-[26px] overflow-hidden shrink-0",
                footerMode === 'miniplayer'
                  ? "flex-1"
                  : "w-11 justify-center cursor-pointer hover:bg-foreground/5 transition-colors"
              )}
              onClick={footerMode === 'nav' ? () => setFooterMode('miniplayer') : undefined}
            >
              <AnimatePresence mode="wait">
                {footerMode === 'miniplayer' ? (
                  /* ── MiniPlayer expanded ── */
                  <motion.div
                    key="mini-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center gap-3 w-full px-2 cursor-pointer"
                    onClick={onOpenPlayer}
                  >
                    {/* Artwork */}
                    <img
                      src={currentTrack?.artwork}
                      alt={currentTrack?.title}
                      className="size-10 rounded-xl object-cover shadow-md shrink-0"
                      referrerPolicy="no-referrer"
                    />

                    {/* Track info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-xs text-foreground truncate leading-tight">
                        {currentTrack?.title}
                      </p>
                      <p className="text-[10px] text-foreground/40 truncate leading-tight">
                        {currentTrack?.artist}
                      </p>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        id="footer-mini-play-btn"
                        onClick={(e) => { e.stopPropagation(); toggle(); }}
                        className="p-2 text-foreground hover:bg-foreground/10 rounded-full transition-colors"
                      >
                        {state.isPlaying
                          ? <Pause size={16} fill="currentColor" />
                          : <Play size={16} fill="currentColor" className="ml-0.5" />
                        }
                      </button>
                      <button
                        id="footer-mini-next-btn"
                        onClick={(e) => { e.stopPropagation(); next(); }}
                        className="p-2 text-foreground/60 hover:text-foreground hover:bg-foreground/10 rounded-full transition-colors"
                      >
                        <SkipForward size={16} fill="currentColor" />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  /* ── MiniPlayer collapsed → AudioLines tab ── */
                  <motion.div
                    key="mini-icon"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center justify-center w-full h-full"
                  >
                    <AnimateIcon animate={state.isPlaying}>
                      <AudioLinesIcon
                        size={20}
                        className={state.isPlaying ? "text-foreground" : "text-foreground/40"}
                      />
                    </AnimateIcon>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
