import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CaptionEditor from './CaptionEditor';
import { groupPhotosByDate } from '../lib/photos';
import { Heart } from '../lib/icons';

interface Photo {
  id: string;
  url: string;
  thumbnailUrl: string;
  title: string;
  width: number;
  height: number;
}

interface GalleryProps {
  photos: Photo[];
  onPhotoClick: (photo: Photo) => void;
  isAdmin: boolean;
  getCaption: (id: string) => string;
  onSaveEdits: (id: string, caption: string) => void;
}

interface Tile {
  photo: Photo;
  colSpan: number;
  rowSpan: number;
}

function buildTiles(photos: Photo[]): Tile[] {
  const tiles: Tile[] = [];
  let i = 0;

  while (i < photos.length) {
    const p = photos[i];
    const ratio = p.width / p.height;

    if (ratio > 1.4) {
      tiles.push({ photo: p, colSpan: 2, rowSpan: 1 });
      i++;
    } else if (ratio < 0.7) {
      if (i + 1 < photos.length) {
        const next = photos[i + 1];
        const nextRatio = next.width / next.height;
        if (nextRatio < 0.7) {
          tiles.push({ photo: p, colSpan: 1, rowSpan: 2 });
          tiles.push({ photo: next, colSpan: 1, rowSpan: 2 });
          i += 2;
        } else {
          tiles.push({ photo: p, colSpan: 1, rowSpan: 2 });
          tiles.push({ photo: next, colSpan: 1, rowSpan: 1 });
          i += 2;
        }
      } else {
        tiles.push({ photo: p, colSpan: 1, rowSpan: 2 });
        i++;
      }
    } else {
      if (i + 1 < photos.length) {
        tiles.push({ photo: p, colSpan: 1, rowSpan: 1 });
        tiles.push({ photo: photos[i + 1], colSpan: 1, rowSpan: 1 });
        i += 2;
      } else {
        tiles.push({ photo: p, colSpan: 2, rowSpan: 1 });
        i++;
      }
    }
  }

  return tiles;
}

export default function Gallery({ photos, onPhotoClick, isAdmin, getCaption, onSaveEdits }: GalleryProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const groups = useMemo(() => groupPhotosByDate(photos), [photos]);
  const groupEntries = useMemo(() => Array.from(groups.entries()), [groups]);

  const handlePhotoClick = useCallback(
    (photo: Photo) => {
      if (isAdmin) {
        setEditingId(editingId === photo.id ? null : photo.id);
      } else {
        onPhotoClick(photo);
      }
    },
    [isAdmin, editingId, onPhotoClick]
  );

  const handleSave = useCallback(
    (photoId: string, caption: string) => {
      onSaveEdits(photoId, caption);
      setEditingId(null);
    },
    [onSaveEdits]
  );

  return (
    <section className="relative py-24 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold gradient-text mb-4">
          Nossas Fotos
        </h2>
        <p className="text-rose-400 text-lg">
          {isAdmin
            ? `${photos.length} fotos — clique para editar`
            : `${photos.length} memórias especiais`}
        </p>
      </motion.div>

      <div className="space-y-1">
        {groupEntries.map(([, groupPhotos], groupIndex) => {
          const tiles = buildTiles(groupPhotos);

          return (
            <motion.div
              key={groupIndex}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: groupIndex * 0.05 }}
            >
              <div className="flex items-center gap-4 mb-1">
                <div className="flex-1 h-px bg-gradient-to-r from-rose-200 to-transparent" />
                <span className="text-xs text-rose-300 font-medium shrink-0">
                  {groupPhotos.length} foto{groupPhotos.length > 1 ? 's' : ''}
                </span>
                <div className="flex-1 h-px bg-gradient-to-l from-rose-200 to-transparent" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[120px] sm:auto-rows-[140px] md:auto-rows-[160px] gap-[2px]">
                {tiles.map((tile, index) => {
                  const { photo, colSpan, rowSpan } = tile;
                  const isEditing = editingId === photo.id;
                  const customCaption = getCaption(photo.id);
                  const displayTitle = customCaption || photo.title;

                  return (
                    <motion.div
                      key={photo.id}
                      initial={{ opacity: 0, scale: 0.92 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: '-20px' }}
                      transition={{ duration: 0.3, delay: index * 0.03 }}
                      style={{
                        gridColumn: `span ${colSpan}`,
                        gridRow: `span ${rowSpan}`,
                      }}
                      className={`relative group overflow-hidden cursor-pointer
                        ${isAdmin && isEditing ? 'ring-2 ring-rose-400 z-20' : ''}
                        ${isAdmin ? 'hover:ring-2 hover:ring-rose-300/50' : ''}
                        photo-hover`}
                      onMouseEnter={() => setHoveredId(photo.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      onClick={() => handlePhotoClick(photo)}
                    >
                      <img
                        src={photo.thumbnailUrl}
                        alt={displayTitle}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />

                      {isAdmin && (
                        <CaptionEditor
                          photoId={photo.id}
                          currentCaption={customCaption}
                          isOpen={isEditing}
                          onSave={(caption) => handleSave(photo.id, caption)}
                          onCancel={() => setEditingId(null)}
                        />
                      )}

                      {!isEditing && (
                        <div className="absolute bottom-0 left-0 right-0 p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out pointer-events-none">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            {customCaption && (
                              <span className="text-[8px] px-1.5 py-0.5 bg-rose-500/80 text-white rounded-full font-medium uppercase tracking-wider">
                                Editada
                              </span>
                            )}
                          </div>
                          <p className="text-white font-medium text-xs truncate">{displayTitle}</p>
                        </div>
                      )}

                      {isAdmin && !isEditing && (
                        <motion.div
                          animate={{ opacity: hoveredId === photo.id ? 1 : 0, scale: hoveredId === photo.id ? 1 : 0 }}
                          className="absolute top-1.5 right-1.5 bg-rose-500/90 backdrop-blur-sm rounded-md p-1 shadow-lg z-10"
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </motion.div>
                      )}

                      {!isAdmin && (
                        <AnimatePresence>
                          {hoveredId === photo.id && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0 }}
                              className="absolute top-2 right-2 z-10"
                            >
                              <Heart size={14} className="text-white drop-shadow-md" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
