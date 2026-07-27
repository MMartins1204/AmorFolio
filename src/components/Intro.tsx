import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, Lightning, Drama, HeartFire, Star, HeartDouble } from '../lib/icons';

interface IntroSlide {
  text: string;
  subtext?: string;
  icon?: React.ReactNode;
  subtextIcon?: React.ReactNode;
  photoUrl?: string;
  duration: number;
}

const slides: IntroSlide[] = [
  {
    text: 'Este é o portfolio\nde uma das relações\nmais promissoras do mundo',
    icon: <Book size={52} className="text-rose-400" />,
    duration: 3500,
  },
  {
    text: 'Eles podem lutar muito',
    icon: <Lightning size={52} className="text-amber-400" />,
    duration: 2200,
  },
  {
    text: 'Podem discutir muito',
    icon: <Drama size={52} className="text-rose-400" />,
    duration: 2200,
  },
  {
    text: 'Podem fazer muitos jogos\ntóxicos um com o outro',
    icon: <Drama size={52} className="text-violet-400" />,
    duration: 2800,
  },
  {
    text: 'Mas para a alegria dos amorosos,\npara a tristeza dos invejosos,\ne para a neutralidade dos tediosos...',
    duration: 4000,
  },
  {
    text: 'Eles também se amam muito',
    icon: <HeartFire size={52} className="text-rose-500" />,
    duration: 2500,
  },
  {
    text: 'Agora, feito por este indivíduo',
    photoUrl: '/couple-photo.jpg',
    duration: 3000,
  },
  {
    text: 'O AmorFolio\nde Brito e Belvina',
    icon: <HeartDouble size={52} className="text-rose-500" />,
    duration: 3500,
  },
  {
    text: 'Casal Prestígio 2026',
    subtextIcon: <Star size={40} className="text-amber-400" />,
    duration: 3000,
  },
];

interface IntroProps {
  onComplete: () => void;
}

export default function Intro({ onComplete }: IntroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [showSkip, setShowSkip] = useState(false);
  const [photoError, setPhotoError] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const t = setTimeout(() => setShowSkip(true), 2000);
    return () => clearTimeout(t);
  }, []);

  const advance = useCallback(() => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      setIsVisible(false);
      setTimeout(onComplete, 800);
    }
  }, [currentSlide, onComplete]);

  useEffect(() => {
    if (currentSlide < slides.length) {
      timerRef.current = setTimeout(advance, slides[currentSlide].duration);
    }
    return () => clearTimeout(timerRef.current);
  }, [currentSlide, advance]);

  const skip = () => {
    clearTimeout(timerRef.current);
    setIsVisible(false);
    setTimeout(onComplete, 600);
  };

  const slide = slides[currentSlide];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
          onClick={advance}
        >
          {/* Ambient glow */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              key={`glow-${currentSlide}`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.15, scale: 1 }}
              transition={{ duration: 2 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-3xl"
              style={{
                background: currentSlide % 2 === 0
                  ? 'radial-gradient(circle, #e11d48 0%, transparent 70%)'
                  : 'radial-gradient(circle, #f472b6 0%, transparent 70%)',
              }}
            />
          </div>

          {/* Slide content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 text-center px-6 max-w-2xl mx-auto"
            >
              {/* Icon */}
              {slide.icon && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
                  className="mb-8 flex justify-center"
                >
                  {slide.icon}
                </motion.div>
              )}

              {/* Photo */}
              {slide.photoUrl && !photoError && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="mb-8 mx-auto"
                >
                  <div className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full overflow-hidden border-4 border-rose-500/30 shadow-lg shadow-rose-500/20">
                    <img
                      src={slide.photoUrl}
                      alt="Brito"
                      className="w-full h-full object-cover"
                      onError={() => setPhotoError(true)}
                    />
                  </div>
                </motion.div>
              )}

              {/* Text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="font-[family-name:var(--font-display)] text-2xl md:text-4xl lg:text-5xl font-semibold text-white/90 leading-snug whitespace-pre-line"
              >
                {slide.text}
              </motion.p>

              {/* Subtext icon */}
              {slide.subtextIcon && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.6, type: 'spring' }}
                  className="mt-6 flex justify-center"
                >
                  {slide.subtextIcon}
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Progress dots */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
            {slides.map((_, i) => (
              <motion.div
                key={i}
                className={`h-1 rounded-full transition-all duration-500 ${
                  i === currentSlide ? 'bg-rose-400 w-6' : i < currentSlide ? 'bg-rose-500/40 w-2' : 'bg-white/15 w-2'
                }`}
                animate={i === currentSlide ? { scaleX: [0, 1], originX: 0 } : {}}
                transition={{ duration: slides[currentSlide].duration / 1000, ease: 'linear' }}
              />
            ))}
          </div>

          {/* Skip button */}
          <AnimatePresence>
            {showSkip && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={(e) => { e.stopPropagation(); skip(); }}
                className="absolute bottom-8 right-6 z-20 px-4 py-2 text-xs text-white/40 hover:text-white/70 border border-white/10 hover:border-white/20 rounded-full transition-all duration-300"
              >
                Pular intro →
              </motion.button>
            )}
          </AnimatePresence>

          {/* Tap hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 3 }}
            className="absolute bottom-20 left-1/2 -translate-x-1/2 text-xs text-white/30 z-20"
          >
            toque para continuar
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
