import { motion } from 'motion/react';

export default function CategoryBar({ categories, selectedCategory, setSelectedCategory }) {
  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar">
      {categories.map((category) => (
        <motion.button
          key={category}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedCategory(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
            selectedCategory === category
              ? 'bg-neon-blue text-white shadow-lg shadow-neon-blue/20 ring-1 ring-white/20'
              : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
          }`}
        >
          {category}
        </motion.button>
      ))}
    </div>
  );
}
