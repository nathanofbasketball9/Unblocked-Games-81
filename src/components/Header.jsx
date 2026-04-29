import { Search, Gamepad2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function Header({ searchQuery, setSearchQuery, onLogoClick }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={onLogoClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-neon-purple to-neon-blue flex items-center justify-center neon-glow">
            <Gamepad2 className="text-white w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight bg-linear-to-r from-white to-white/60 bg-clip-text text-transparent">
            Unblocked Games 81
          </h1>
        </motion.div>

        <div className="relative group flex-1 max-w-md ml-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-neon-blue transition-colors" />
          <input
            type="text"
            placeholder="Search games..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 focus:outline-hidden focus:border-neon-blue/50 focus:ring-2 focus:ring-neon-blue/20 transition-all font-sans text-sm"
          />
        </div>

        <div className="hidden md:flex items-center gap-6 ml-8 text-sm font-medium text-gray-400">
          <button className="hover:text-white transition-colors">Trending</button>
          <button className="hover:text-white transition-colors">New</button>
          <button className="hover:text-white transition-colors">Popular</button>
        </div>
      </div>
    </header>
  );
}
