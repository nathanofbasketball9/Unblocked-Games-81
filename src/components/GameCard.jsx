import React from 'react';
import { Play, Star } from 'lucide-react';
import { motion } from 'motion/react';

const GameCard = ({ game, onClick }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      className="group relative bg-dark-card rounded-2xl overflow-hidden border border-white/5 hover:border-neon-blue/30 transition-all duration-300 cursor-pointer"
      onClick={() => onClick(game)}
    >
      <div className="aspect-video relative overflow-hidden bg-gray-900 flex items-center justify-center">
        <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent z-0" />
        <div className="z-10 flex flex-col items-center gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
          <Play className="w-12 h-12 text-white fill-white/20 group-hover:scale-110 transition-transform duration-500" />
        </div>
        
        <div className="absolute top-3 left-3 px-2 py-1 rounded-md glass text-[10px] uppercase font-bold tracking-wider text-neon-blue border border-neon-blue/20">
          {game.category}
        </div>

        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <motion.div 
             className="w-14 h-14 rounded-full bg-neon-blue flex items-center justify-center shadow-[0_0_30px_rgba(110,114,252,0.6)]"
             initial={{ scale: 0.8 }}
             whileHover={{ scale: 1.1 }}
           >
             <Play className="text-white w-6 h-6 fill-white ml-1" />
           </motion.div>
        </div>
      </div>

      <div className="p-4 bg-linear-to-b from-transparent to-black/20">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-gray-100 group-hover:text-neon-blue transition-colors truncate">
            {game.name}
          </h3>
          <div className="flex items-center gap-1 text-xs text-yellow-500/80">
            <Star className="w-3 h-3 fill-current" />
            <span>{(Math.random() * (5 - 4.5) + 4.5).toFixed(1)}</span>
          </div>
        </div>
        <p className="text-sm text-gray-500 line-clamp-1">
          {game.description}
        </p>
      </div>
    </motion.div>
  );
};

export default GameCard;
