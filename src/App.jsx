/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import Header from './components/Header';
import GameCard from './components/GameCard';
import GamePlayer from './components/GamePlayer';
import CategoryBar from './components/CategoryBar';
import gamesData from './games.json';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Trophy, FireExtinguisher as Fire } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const games = gamesData;
  
  const categories = useMemo(() => {
    const cats = ['All', ...new Set(games.map(g => g.category))];
    return cats;
  }, [games]);

  const filteredGames = useMemo(() => {
    return games.filter(game => {
      const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [games, searchQuery, selectedCategory]);

  const handleGameSelect = (game) => {
    setSelectedGame(game);
    setCurrentView('player');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedGame(null);
  };

  return (
    <div className="min-h-screen bg-dark-bg selection:bg-neon-blue/30 selection:text-neon-blue">
      <Header 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        onLogoClick={handleBackToHome}
      />

      <main className="relative">
        <AnimatePresence mode="wait">
          {currentView === 'home' ? (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="pt-28 pb-20 px-6 max-w-7xl mx-auto"
            >
              {/* Hero Section */}
              <section className="mb-16 relative rounded-[40px] overflow-hidden p-12 bg-linear-to-br from-neon-purple/20 to-neon-blue/20 ring-1 ring-white/5">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-150 pointer-events-none" />
                <div className="relative z-10 max-w-2xl">
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-neon-blue mb-6 tracking-wide uppercase"
                  >
                    <Sparkles className="w-3 h-3" />
                    Now featuring unblocked classics
                  </motion.div>
                  <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
                    Level Up Your <br />
                    <span className="bg-linear-to-r from-neon-purple to-neon-blue bg-clip-text text-transparent">Gaming Experience.</span>
                  </h2>
                  <p className="text-lg text-gray-400 mb-8 max-w-lg leading-relaxed">
                    Unblocked Games 81 brings you the best unblocked web games in a beautiful, unified interface. No ads, no lag, just pure gaming.
                  </p>
                  <div className="flex flex-wrap gap-4 px-2">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Trophy className="w-4 h-4 text-yellow-500" />
                      <span>50+ High Quality Titles</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Fire className="w-4 h-4 text-orange-500" />
                      <span>Updated Daily</span>
                    </div>
                  </div>
                </div>
                
                {/* Visual Flair */}
                <div className="absolute top-1/2 right-[-10%] -translate-y-1/2 w-[60%] aspect-square rounded-full bg-neon-blue/20 blur-[120px] pointer-events-none" />
              </section>

              {/* Browse Section */}
              <section>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-b border-white/5 pb-8">
                  <h3 className="text-3xl font-bold tracking-tight">Explore Library</h3>
                  <CategoryBar 
                    categories={categories} 
                    selectedCategory={selectedCategory} 
                    setSelectedCategory={setSelectedCategory} 
                  />
                </div>

                {filteredGames.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredGames.map((game) => (
                      <GameCard 
                        key={game.id} 
                        game={game} 
                        onClick={handleGameSelect} 
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-24 glass rounded-3xl">
                     <p className="text-gray-500 text-lg">No games found matches your search.</p>
                     <button 
                       onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                       className="mt-4 text-neon-blue hover:underline"
                     >
                       Clear all filters
                     </button>
                  </div>
                )}
              </section>
            </motion.div>
          ) : (
            <motion.div
              key="player"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {selectedGame && (
                <GamePlayer 
                  game={selectedGame} 
                  onBack={handleBackToHome} 
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="mt-20 border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-gray-500">
          <p>© 2026 Nova Games Portfolio. Built for speed and accessibility.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
