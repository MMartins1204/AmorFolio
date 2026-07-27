import { motion } from 'framer-motion';
import { HeartDouble, Heart, Rose, Butterfly, Flower, Sparkle } from '../lib/icons';

export default function Footer() {
  return (
    <footer className="relative py-16 px-4 text-center overflow-hidden">
      {/* Top divider */}
      <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto mb-12" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="font-[family-name:var(--font-display)] text-2xl md:text-3xl text-rose-500/60 mb-4 italic">
          Feito com{' '}
          <span className="inline-flex items-center align-middle">
            <HeartDouble size={20} className="text-rose-400" />
          </span>
          {' '}para a pessoa mais especial da minha vida
        </p>

        <div className="flex items-center justify-center gap-3 mb-8">
          <span style={{ animation: 'heartbeat 2s ease-in-out infinite' }}>
            <Heart size={22} className="text-rose-500" />
          </span>
          <span className="text-4xl font-[family-name:var(--font-display)] font-bold gradient-text">
            AmorFolio
          </span>
          <span style={{ animation: 'heartbeat 2s ease-in-out 0.5s infinite' }}>
            <Heart size={22} className="text-rose-500" />
          </span>
        </div>

        <p className="text-rose-300 text-sm">
          28 de Abril de 2025 — Para sempre{' '}
          <Heart size={10} className="inline text-rose-400" />
        </p>

        <div className="mt-8 flex justify-center items-center gap-3 opacity-30">
          <Rose size={16} className="text-rose-400" />
          <Butterfly size={16} className="text-violet-400" />
          <Flower size={16} className="text-pink-400" />
          <Sparkle size={16} className="text-amber-400" />
          <Rose size={16} className="text-rose-400" />
        </div>
      </motion.div>
    </footer>
  );
}
