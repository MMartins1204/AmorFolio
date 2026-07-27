import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Close, ChevronLeft, ChevronRight } from '../lib/icons';

interface Photo {
  id: string;
  url: string;
  thumbnailUrl: string;
  title: string;
  width: number;
  height: number;
}

interface LightboxProps {
  photo: Photo | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  isAdmin: boolean;
  onCaptionChange: (id: string, caption: string) => void;
}

export default function Lightbox({ photo, onClose, onNext, onPrev, isAdmin, onCaptionChange }: LightboxProps) {
  const [editing, setEditing] = useState(false);
  const [captionText, setCaptionText] = useState('');
  const [saving, setSaving] = useState(false);
  const editingRef = useRef(false);

  const syncEditing = (val: boolean) => {
    editingRef.current = val;
    setEditing(val);
  };

  useEffect(() => {
    editingRef.current = false;
    setEditing(false);
    setCaptionText(photo?.title || '');
  }, [photo?.id]);

  useEffect(() => {
    if (!photo) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (editingRef.current) {
          syncEditing(false);
        } else {
          onClose();
        }
      }
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'Enter' && isAdmin && !editingRef.current) {
        syncEditing(true);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [photo, onClose, onNext, onPrev, isAdmin]);

  const handleSave = async () => {
    if (!photo) return;
    setSaving(true);
    await new Promise((r) => setTimeout(r, 400));
    onCaptionChange(photo.id, captionText);
    setSaving(false);
    syncEditing(false);
  };

  if (!photo) return null;

  return (
    <AnimatePresence>
      {photo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 text-white/70 hover:text-white transition-colors w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
          >
            <Close size={20} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-4 z-50 text-white/70 hover:text-white transition-colors w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-14 z-50 text-white/70 hover:text-white transition-colors w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
          >
            <ChevronRight size={22} />
          </button>

          <div
            key={photo.id}
            className="relative max-w-5xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photo.url}
              alt={photo.title}
              className="max-w-full max-h-[70vh] mx-auto object-contain rounded-xl shadow-2xl"
            />

            <div className="mt-4 text-center px-4">
              {isAdmin && editing ? (
                <div className="max-w-lg mx-auto">
                  <input
                    type="text"
                    value={captionText}
                    onChange={(e) => setCaptionText(e.target.value)}
                    placeholder="Escreva uma legenda especial..."
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white text-center placeholder-white/30 text-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSave();
                      if (e.key === 'Escape') syncEditing(false);
                    }}
                  />
                  <div className="flex justify-center gap-3 mt-3">
                    <button
                      onClick={() => syncEditing(false)}
                      className="px-4 py-2 text-sm text-white/60 hover:text-white rounded-lg transition-colors"
                    >
                      Cancelar
                    </button>
                    <motion.button
                      onClick={handleSave}
                      disabled={saving}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-2 text-sm font-medium text-white rounded-lg transition-colors disabled:opacity-50"
                      style={{ background: 'linear-gradient(135deg, #be123c, #e11d48)' }}
                    >
                      {saving ? 'Salvando...' : 'Salvar'}
                    </motion.button>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-white font-[family-name:var(--font-display)] text-xl md:text-2xl font-semibold">
                    {photo.title}
                  </h3>
                  {isAdmin && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCaptionText(photo.title);
                        syncEditing(true);
                      }}
                      className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-rose-300 hover:text-white border border-rose-400/30 hover:border-rose-400/60 rounded-full transition-all duration-300"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                      Editar legenda
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
