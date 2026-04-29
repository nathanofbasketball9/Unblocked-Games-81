import { ArrowLeft, Maximize, RotateCcw, Share2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function GamePlayer({ game, onBack }) {
  return (
    <div className="pt-24 px-6 max-w-6xl mx-auto min-h-screen flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <motion.button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          whileHover={{ x: -4 }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Library</span>
        </motion.button>
        
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-400 hover:text-white" title="Refresh">
            <RotateCcw className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-400 hover:text-white" title="Share">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="relative aspect-video w-full glass rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10">
        <iframe
          src={game.url}
          className="absolute inset-0 w-full h-full border-0"
          allow="fullscreen; autoplay"
          title={game.name}
        />
      </div>

      <div className="bg-dark-card p-8 rounded-3xl border border-white/5 flex flex-col md:flex-row justify-between gap-8">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-3xl font-bold text-white">{game.name}</h2>
            <span className="px-3 py-1 rounded-full bg-neon-blue/10 text-neon-blue text-xs font-bold ring-1 ring-neon-blue/20">
              {game.category}
            </span>
          </div>
          <p className="text-gray-400 max-w-2xl leading-relaxed">
            {game.description}. Experience this classic and many more on Nova Games, your ultimate source for unblocked gaming entertainment.
          </p>
        </div>

        <div className="flex flex-col gap-3 min-w-[200px]">
          <button 
             onClick={() => window.open(game.url, '_blank')}
             className="w-full h-12 rounded-xl bg-linear-to-r from-neon-purple to-neon-blue text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-neon-blue/20 active:scale-95 transition-transform"
          >
            <Maximize className="w-4 h-4" />
            POP OUT PLAYER
          </button>
          <div className="flex items-center justify-between px-2 py-1 text-gray-500 text-xs font-mono uppercase tracking-widest border-t border-white/5 pt-4">
            <span>Server: Stable</span>
            <span>v1.0.4</span>
          </div>
        </div>
      </div>
    </div>
  );
}
