import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from '../lib/icons';
import { supabase } from '../lib/supabase';

interface CaptionEditorProps {
  photoId: string;
  currentCaption: string;
  isOpen: boolean;
  onSave: (caption: string) => void;
  onCancel: () => void;
}

export default function CaptionEditor({ photoId, currentCaption, isOpen, onSave, onCancel }: CaptionEditorProps) {
  const [caption, setCaption] = useState(currentCaption);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setCaption(currentCaption);
  }, [currentCaption, photoId]);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 300));
    setSaving(false);
    onSave(caption);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-0 left-0 right-0 z-30"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-gradient-to-t from-black/90 via-black/80 to-transparent p-4 rounded-b-2xl space-y-2.5">
            {/* Caption */}
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-rose-300 mb-1 font-medium">
                Legenda
              </label>
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Escreva uma legenda..."
                className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-1 focus:ring-rose-300"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSave();
                  if (e.key === 'Escape') onCancel();
                }}
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-2 justify-end">
              <button
                onClick={onCancel}
                className="px-3 py-1.5 text-xs text-white/60 hover:text-white rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <motion.button
                onClick={handleSave}
                disabled={saving}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-1.5 text-xs font-medium text-white rounded-lg transition-colors disabled:opacity-50"
                style={{ background: 'linear-gradient(135deg, #be123c, #e11d48)' }}
              >
                {saving ? '...' : (
                  <span className="flex items-center gap-1">
                    Salvar <Heart size={10} />
                  </span>
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Hook to manage captions from Supabase (with localStorage fallback)
 */
export function useCaptions() {
  const [captions, setCaptions] = useState<Record<string, string>>({});

  useEffect(() => {
    // 1. Initial fast load from localStorage
    const savedCaptions = localStorage.getItem('amorfolio_captions');
    if (savedCaptions) {
      setCaptions(JSON.parse(savedCaptions));
    }

    // 2. Fetch fresh data from Supabase in the background
    const client = supabase;
    if (client) {
      const fetchCaptions = async () => {
        try {
          const { data, error } = await client
            .from('amorfolio_captions')
            .select('photo_id, caption');

          if (error) {
            console.error('Erro ao carregar legendas do Supabase:', error.message);
          } else if (data) {
            const remoteCaptions: Record<string, string> = {};
            data.forEach((row) => {
              remoteCaptions[row.photo_id] = row.caption;
            });
            setCaptions(remoteCaptions);
            localStorage.setItem('amorfolio_captions', JSON.stringify(remoteCaptions));
          }
        } catch (err: any) {
          console.error('Falha de rede ao buscar legendas do Supabase:', err);
        }
      };
      fetchCaptions();
    }
  }, []);

  const getCaption = useCallback((photoId: string): string => {
    return captions[photoId] || '';
  }, [captions]);

  const savePhotoEdits = useCallback((photoId: string, caption: string) => {
    // Update local state immediately for zero-lag UI feedback
    const updatedCaptions = { ...captions, [photoId]: caption };
    setCaptions(updatedCaptions);
    localStorage.setItem('amorfolio_captions', JSON.stringify(updatedCaptions));

    // Save to Supabase if configured
    const client = supabase;
    if (client) {
      const uploadCaption = async () => {
        try {
          const { error } = await client
            .from('amorfolio_captions')
            .upsert({ photo_id: photoId, caption: caption }, { onConflict: 'photo_id' });

          if (error) {
            console.error('Erro ao salvar legenda no Supabase:', error.message);
          }
        } catch (err: any) {
          console.error('Falha ao enviar legenda para o Supabase:', err);
        }
      };
      uploadCaption();
    }
  }, [captions]);

  return { getCaption, savePhotoEdits, captions };
}
