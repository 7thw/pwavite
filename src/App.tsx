/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AudioProvider } from './AudioContext';
import { Player } from './components/player/Player';
import { MiniPlayer } from './components/player/MiniPlayer';
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

              {/* Player Drawer */}
              <Drawer open={isPlayerOpen} onOpenChange={setIsPlayerOpen} handleOnly>
                <DrawerContent className="!max-h-none h-[100dvh] rounded-none border-none bg-transparent p-0 overflow-hidden">
                  <DrawerHeader className="sr-only">
                    <DrawerTitle>Now Playing</DrawerTitle>
                    <DrawerDescription>Audio player controls</DrawerDescription>
                  </DrawerHeader>
                  <Player onClose={() => setIsPlayerOpen(false)} />
                </DrawerContent>
              </Drawer>

              {/* Bottom Bar: MiniPlayer + Footer */}
              {!isPlayerOpen && (
                <div className="fixed bottom-0 left-0 right-0 z-40 px-6 pb-8 pt-4 pointer-events-none">
                  <div className="max-w-md mx-auto flex flex-col gap-3 pointer-events-auto">
                    <AnimatePresence>
                      <MiniPlayer onOpenPlayer={() => setIsPlayerOpen(true)} />
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
