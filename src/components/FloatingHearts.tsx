import { useState, useEffect, useRef } from 'react';
import { Heart, HeartDouble } from '../lib/icons';

interface HeartParticle {
  id: number;
  type: 'heart' | 'double';
  left: number;
  size: number;
  dur: number;
}

let nextId = 0;

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<HeartParticle[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);

  useEffect(() => {
    const spawn = () => {
      const h: HeartParticle = {
        id: nextId++,
        type: Math.random() > 0.6 ? 'double' : 'heart',
        left: Math.random() * 100,
        size: Math.random() * 10 + 12,
        dur: Math.random() * 6 + 8,
      };
      setHearts((prev) => [...prev.slice(-8), h]);
    };

    for (let i = 0; i < 4; i++) setTimeout(spawn, i * 400);
    intervalRef.current = setInterval(spawn, 2500);
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="heart-particle"
          style={{
            left: `${h.left}%`,
            fontSize: h.size,
            animationDuration: `${h.dur}s`,
          }}
        >
          {h.type === 'double' ? (
            <HeartDouble size={h.size} className="text-rose-400" />
          ) : (
            <Heart size={h.size} className="text-rose-400" />
          )}
        </span>
      ))}
    </div>
  );
}
