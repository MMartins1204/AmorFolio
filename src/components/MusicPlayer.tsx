import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Play, Pause, Heart } from '../lib/icons';

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<SVGCircleElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      if (audio.duration && isFinite(audio.duration) && progressRef.current) {
        const pct = audio.currentTime / audio.duration;
        progressRef.current.style.strokeDasharray = `${pct * 138.23} 138.23`;
      }
    };

    const onError = () => {
      const err = audio.error;
      setError(err ? `Erro: ${err.code}` : 'Erro ao carregar áudio');
      setIsPlaying(false);
    };

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('error', onError);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('error', onError);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const timer = setTimeout(() => {
      audio.play().catch(() => {
        setError('Autoplay bloqueado pelo navegador');
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      setError(null);
      audio.play().catch((e) => {
        setError(`Não foi possível tocar: ${e.message}`);
      });
    }
  }, [isPlaying]);

  return (
    <>
      <audio ref={audioRef} loop preload="auto" crossOrigin="anonymous">
        <source src="/hernani-ela.mp3" type="audio/mpeg" />
        <source src="/hernani-ela.mp3" type="audio/mp3" />
      </audio>

      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6, type: 'spring', stiffness: 200 }}
        className="fixed bottom-6 left-6 z-50"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggle}
          className="relative group w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-500 overflow-hidden"
          style={{
            background: isPlaying
              ? 'linear-gradient(135deg, #be123c, #e11d48, #f472b6)'
              : 'rgba(255,255,255,0.85)',
            border: isPlaying ? 'none' : '1px solid rgba(253,164,175,0.3)',
          }}
          title="Hernâni - É Ela"
        >
          {isPlaying && (
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 48 48">
              <circle cx="24" cy="24" r="22" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
              <circle
                ref={progressRef}
                cx="24" cy="24" r="22" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2"
                strokeDasharray="0 138.23" strokeLinecap="round"
              />
            </svg>
          )}

          <span className="relative z-10">
            {isPlaying ? (
              <Pause size={18} className="text-white" />
            ) : (
              <Play size={18} className="text-rose-500 ml-0.5" />
            )}
          </span>

          {isPlaying && (
            <motion.span
              className="absolute inset-0 rounded-full border-2 border-rose-300"
              animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
        </motion.button>

        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              className="absolute bottom-full left-0 mb-3 whitespace-nowrap"
            >
              <div className="bg-white/95 backdrop-blur-md rounded-xl px-3 py-2 shadow-lg border border-rose-100/50">
                <div className="flex items-center gap-2">
                  <Music size={12} className="text-rose-400" />
                  <span className="text-xs font-medium text-rose-600">Hernâni — É Ela</span>
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <Heart size={8} className="text-rose-300" />
                  <span className="text-[10px] text-rose-300">
                    {error ? error : isPlaying ? 'A tocar...' : 'Toque para ouvir'}
                  </span>
                </div>
              </div>
              <div className="w-2 h-2 bg-white/95 border-l border-b border-rose-100/50 transform rotate-45 ml-3 -mt-1" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
