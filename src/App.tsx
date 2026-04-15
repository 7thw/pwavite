/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * App – Root Application Shell
 * Orchestrates top-level routing, splash screen, player drawer,
 * and the persistent bottom bar (MiniPlayer + Footer).
 */

import React from 'react';
import { AudioProvider } from './AudioContext';
import { Player } from './components/player/Player';
import { PlaylistsPage } from './components/pages/PlaylistsPage';
import { MeditationLibrary } from './components/pages/MeditationLibrary';
import { NightlyRealignments } from './components/pages/NightlyRealignments';
import { MasterYourEnergy } from './components/pages/MasterYourEnergy';
import { Footer } from './components/nav/Footer';
import { motion, AnimatePresence } from 'motion/react';
import { SplashAnimation } from './components/brand/SplashAnimation';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from '@/components/ui/drawer';

export default function App() {
  const [isPlayerOpen, setIsPlayerOpen] = React.useState(false);
  const [showSplash, setShowSplash] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState<'playlists' | 'meditations' | 'nightly' | 'master'>('playlists');

  return (
    <AudioProvider>
      {/* App Shell – Dark base background wrapping the entire viewport */}
      <div id="app-shell" data-component="app-shell" className="relative min-h-screen bg-[#0a0502]">
        <AnimatePresence mode="wait">
          {showSplash ? (
            /* ───── Splash Screen ─────
               Animated brand intro shown once on first load. */
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
              {/* ───── Page Router ─────
                   Animated page transitions between the four content pages. */}
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

              {/* ───── Player Drawer ─────
                   Full-screen audio player opened via MiniPlayer tap.
                   Uses Vaul Drawer for swipe-to-dismiss gesture support. */}
              <Drawer open={isPlayerOpen} onOpenChange={setIsPlayerOpen} handleOnly>
                <DrawerContent className="!max-h-none h-[100dvh] rounded-none border-none bg-transparent p-0 overflow-hidden">
                  <DrawerHeader className="sr-only">
                    <DrawerTitle>Now Playing</DrawerTitle>
                    <DrawerDescription>Audio player controls</DrawerDescription>
                  </DrawerHeader>
                  <Player onClose={() => setIsPlayerOpen(false)} />
                </DrawerContent>
              </Drawer>

              {/* ───── Bottom Bar ─────
                   Fixed-position overlay containing the unified Footer
                   (Nav + MiniPlayer tabs). Hidden when the Player drawer is open. */}
              {!isPlayerOpen && (
                <div id="bottom-bar" data-component="bottom-bar" className="fixed bottom-0 left-0 right-0 z-40 px-6 pb-8 pt-4 pointer-events-none">
                  <div className="max-w-md mx-auto pointer-events-auto">
                    <Footer
                      theme={currentPage === 'nightly' || currentPage === 'master' ? 'light' : 'dark'}
                      onOpenPlayer={() => setIsPlayerOpen(true)}
                      onNavigate={(page) => setCurrentPage(page)}
                      currentPage={currentPage}
                    />
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
