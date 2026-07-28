import { motion } from 'framer-motion';
import { Ring, Flower, Sun, Butterfly, Cake, Sparkle, Heart } from '../lib/icons';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const events: TimelineEvent[] = [
  {
    date: '2024',
    title: 'O Início de Tudo',
    description: 'O dia em que nossos caminhos se cruzaram. Eu ainda lembro de como foi, e tu?',
    icon: <Ring size={22} className="text-rose-500" />,
  },
  {
    date: '28 Abr 2025',
    title: 'Começamos a Namorar',
    description: 'O dia em que oficializamos o que já sentíamos. O dia mais especial da nossa história. Para mim começamos a namorar no dia 14, mas enfim',
    icon: <Heart size={22} className="text-rose-500" />,
  },
  {
    date: '28 Mai 2025',
    title: '1 Mês',
    description: 'O primeiro mês já era especial. Cada dia descobríamos algo novo um no outro.',
    icon: <Flower size={22} className="text-pink-400" />,
  },
  {
    date: '28 Jun 2025',
    title: '2 Meses',
    description: 'Ainda não tinham me dado o bolo, e nem falo de bolo de aniversário',
    icon: <Sun size={22} className="text-amber-400" />,
  },
  {
    date: '28 Jul 2025',
    title: '3 Meses',
    description: 'Ainda sem bolo',
    icon: <Butterfly size={22} className="text-violet-400" />,
  },
  {
    date: '28 Abr 2026',
    title: '1 Ano de Namoro!',
    description: '365 dias de amor, risadas, parceria e muita cumplicidade. Já tinham me dado o primeiro bolo, mas não foi o último.',
    icon: <Cake size={22} className="text-rose-400" />,
  },
  {
    date: '28 Jul 2026',
    title: '1 Ano e 3 Meses',
    description: 'Te amo mais do que ontem, e menos do que amanhã',
    icon: <Sparkle size={22} className="text-violet-400" />,
  },
];

export default function Timeline() {
  return (
    <section className="relative py-20 px-4 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold gradient-text mb-3">
          Nossa História
        </h2>
        <p className="text-rose-400 text-base">
          Cada marco, cada momento, cada memória
        </p>
      </motion.div>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-rose-200 via-rose-300/50 to-transparent md:-translate-x-px" />

        {events.map((event, index) => {
          const isLeft = index % 2 === 0;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className={`relative flex items-center mb-10 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
            >
              {/* Dot */}
              <div className="absolute left-6 md:left-1/2 w-3 h-3 bg-rose-400 rounded-full border-3 border-white shadow-md -translate-x-1/2 z-10" />

              {/* Card */}
              <div
                className={`ml-14 md:ml-0 md:w-[calc(50%-32px)] ${isLeft ? 'md:pr-0 md:text-right' : 'md:pl-0 md:text-left'
                  }`}
              >
                <div className="bg-white/70 border border-rose-100 rounded-xl p-5 group photo-hover cursor-default backdrop-blur-sm">
                  <div className={`flex items-start gap-3 ${isLeft ? 'md:flex-row-reverse md:text-right' : ''}`}>
                    <span className="flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                      {event.icon}
                    </span>
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-rose-300 font-medium">
                        {event.date}
                      </span>
                      <h3 className="font-[family-name:var(--font-display)] text-lg md:text-xl font-semibold text-rose-700 mt-0.5 mb-1">
                        {event.title}
                      </h3>
                      <p className="text-rose-500/60 text-sm leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hidden md:block md:w-[calc(50%-32px)]" />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
