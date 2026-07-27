import { motion } from 'framer-motion';
import { Envelope, HeartDouble, Heart } from '../lib/icons';

interface MessageSectionProps {
  message?: string;
}

export default function MessageSection({ message }: MessageSectionProps) {
  const defaultMessage = `
    Cada dia ao seu lado é um presente.
    Cada foto aqui é uma lembrança de que o amor verdadeiro existe.
    
    Obrigado por cada momento, cada risada, cada abraço.
    Obrigado por ser você.
    
    Eu te amo mais do que as palavras podem expressar.
  `;

  return (
    <section className="relative py-24 px-4 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.3 }}
          className="mb-8 flex justify-center"
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center">
            <Envelope size={28} className="text-rose-400" />
          </div>
        </motion.div>

        <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold gradient-text mb-8">
          Uma Carta Para Você
        </h2>

        <div className="glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden">
          {/* Decorative corner icons */}
          <span className="absolute top-4 left-4 opacity-15">
            <HeartDouble size={20} className="text-rose-400" />
          </span>
          <span className="absolute bottom-4 right-4 opacity-15">
            <HeartDouble size={20} className="text-rose-400" />
          </span>
          <span className="absolute top-4 right-4 opacity-10">
            <Heart size={16} className="text-rose-400" />
          </span>
          <span className="absolute bottom-4 left-4 opacity-10">
            <Heart size={16} className="text-rose-400" />
          </span>

          <p className="font-[family-name:var(--font-display)] text-lg md:text-xl text-rose-600/80 leading-relaxed whitespace-pre-line italic">
            {message || defaultMessage}
          </p>

          <div className="mt-8 pt-6 border-t border-rose-200/30">
            <p className="text-rose-400 text-sm flex items-center justify-center gap-1.5">
              Com todo meu amor
              <Heart size={12} className="text-rose-400" />
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
