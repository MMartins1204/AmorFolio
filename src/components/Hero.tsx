import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HeartDouble, Calendar, Star, ChevronDown } from '../lib/icons';

function calcularTempo(dataInicio: Date) {
  const agora = new Date();

  let anos = agora.getFullYear() - dataInicio.getFullYear();
  let meses = agora.getMonth() - dataInicio.getMonth();
  let dias = agora.getDate() - dataInicio.getDate();

  if (dias < 0) {
    meses--;
    const mesAnterior = new Date(agora.getFullYear(), agora.getMonth(), 0);
    dias += mesAnterior.getDate();
  }
  if (meses < 0) {
    anos--;
    meses += 12;
  }

  const totalDias = Math.floor((agora.getTime() - dataInicio.getTime()) / (1000 * 60 * 60 * 24));
  const horas = agora.getHours();
  const minutos = agora.getMinutes();
  const segundos = agora.getSeconds();

  return { anos, meses, dias, totalDias, horas, minutos, segundos };
}

export default function Hero() {
  const dataInicio = new Date('2025-04-28T00:00:00');
  const [tempo, setTempo] = useState(calcularTempo(dataInicio));

  useEffect(() => {
    const interval = setInterval(() => {
      setTempo(calcularTempo(dataInicio));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const unidades = [
    { valor: tempo.anos, label: tempo.anos === 1 ? 'ano' : 'anos' },
    { valor: tempo.meses, label: tempo.meses === 1 ? 'mês' : 'meses' },
    { valor: tempo.dias, label: tempo.dias === 1 ? 'dia' : 'dias' },
    { valor: tempo.horas, label: 'horas' },
    { valor: tempo.minutos, label: 'minutos' },
    { valor: tempo.segundos, label: 'segundos' },
  ];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="hero-blob hero-blob-1" />
        <div className="hero-blob hero-blob-2" />
        <div className="hero-blob hero-blob-3" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 text-center max-w-4xl mx-auto"
      >
        {/* Heart icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 15 }}
          className="mb-6 flex justify-center"
        >
          <div
            className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center shadow-lg shadow-rose-200/30"
            style={{ animation: 'heartbeat 2s ease-in-out infinite' }}
          >
            <HeartDouble size={32} className="text-rose-500" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="font-[family-name:var(--font-display)] text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4"
          style={{
            background: 'linear-gradient(135deg, #be123c, #e11d48, #f472b6, #ec4899)',
            backgroundSize: '200% 200%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'shimmer 4s ease-in-out infinite',
          }}
        >
          AmorFolio
        </motion.h1>

        {/* Names */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="font-[family-name:var(--font-display)] text-lg md:text-2xl text-rose-600/80 italic mb-1 font-light"
        >
          Brito & Belvina
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.6 }}
          className="text-rose-400/50 text-xs tracking-widest uppercase mb-6 flex items-center justify-center gap-1.5"
        >
          Casal Prestígio 2026
          <Star size={12} className="text-amber-400" />
        </motion.p>

        {/* Date badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 border border-rose-100 shadow-sm mb-10 backdrop-blur-sm"
        >
          <Calendar size={14} className="text-rose-400" />
          <span className="text-rose-700 font-medium text-sm">Juntos desde 28 de Abril de 2025</span>
        </motion.div>

        {/* Counter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mb-10"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-rose-400 font-medium mb-5">
            Estamos juntos há
          </p>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {unidades.map((unidade, i) => (
              <motion.div
                key={unidade.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.06 }}
                className="glass-card rounded-xl px-3 py-2.5 md:px-5 md:py-3 min-w-[64px] md:min-w-[85px]"
              >
                <span className="block text-xl md:text-3xl font-bold text-rose-600 font-[family-name:var(--font-display)]">
                  {String(unidade.valor).padStart(2, '0')}
                </span>
                <span className="text-[9px] md:text-[11px] text-rose-400 uppercase tracking-wider">
                  {unidade.label}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-4 text-rose-300 text-xs"
          >
            {tempo.totalDias} dias juntos
          </motion.p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7, duration: 0.8 }}
          className="animate-float"
        >
          <p className="text-rose-300 text-xs mb-2">deslize para baixo</p>
          <ChevronDown size={18} className="text-rose-300 mx-auto" />
        </motion.div>
      </motion.div>
    </section>
  );
}
