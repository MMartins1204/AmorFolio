import { useState, useCallback, useMemo } from 'react';
import { AuthProvider, useAuth } from './lib/auth';
import { samplePhotos } from './lib/photos';
import Intro from './components/Intro';
import FloatingHearts from './components/FloatingHearts';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import Gallery from './components/Gallery';
import Lightbox from './components/Lightbox';
import AdminToolbar from './components/AdminToolbar';
import MessageSection from './components/MessageSection';
import Footer from './components/Footer';
import MusicPlayer from './components/MusicPlayer';
import { useCaptions } from './components/CaptionEditor';

interface Photo {
  id: string;
  url: string;
  thumbnailUrl: string;
  title: string;
  width: number;
  height: number;
}

function AmorFolioApp() {
  const { isAdmin } = useAuth();
  const [introDone, setIntroDone] = useState(() => {
    return localStorage.getItem('amorfolio_intro_seen') === 'true';
  });
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const { getCaption, savePhotoEdits, captions } = useCaptions();

  const resolvedPhotos = useMemo(() => {
    return samplePhotos.map((p) => ({
      ...p,
      title: getCaption(p.id) || p.title,
    }));
  }, [getCaption, captions]);

  const handleIntroComplete = useCallback(() => {
    localStorage.setItem('amorfolio_intro_seen', 'true');
    setIntroDone(true);
  }, []);

  const handlePhotoClick = useCallback((photo: Photo) => {
    const idx = resolvedPhotos.findIndex((p) => p.id === photo.id);
    setPhotoIndex(idx);
    setSelectedPhoto(resolvedPhotos[idx]);
  }, [resolvedPhotos]);

  const handleClose = useCallback(() => setSelectedPhoto(null), []);

  const handleCaptionChange = useCallback((id: string, caption: string) => {
    savePhotoEdits(id, caption);
  }, [savePhotoEdits]);

  const handleNext = useCallback(() => {
    const nextIndex = (photoIndex + 1) % resolvedPhotos.length;
    setPhotoIndex(nextIndex);
    setSelectedPhoto(resolvedPhotos[nextIndex]);
  }, [photoIndex, resolvedPhotos]);

  const handlePrev = useCallback(() => {
    const prevIndex = (photoIndex - 1 + resolvedPhotos.length) % resolvedPhotos.length;
    setPhotoIndex(prevIndex);
    setSelectedPhoto(resolvedPhotos[prevIndex]);
  }, [photoIndex, resolvedPhotos]);

  return (
    <>
      {!introDone && <Intro onComplete={handleIntroComplete} />}

      <div className="relative">
        <FloatingHearts />
        <AdminToolbar />
        <MusicPlayer />

        <main className={`relative z-10 ${isAdmin ? 'pt-16' : ''}`}>
          <Hero />
          <Timeline />
          <Gallery
            photos={resolvedPhotos}
            onPhotoClick={handlePhotoClick}
            isAdmin={isAdmin}
            getCaption={getCaption}
            onSaveEdits={savePhotoEdits}
          />
          <MessageSection />
          <Footer />
        </main>

        <Lightbox
          photo={selectedPhoto}
          onClose={handleClose}
          onNext={handleNext}
          onPrev={handlePrev}
          isAdmin={isAdmin}
          onCaptionChange={handleCaptionChange}
        />
      </div>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AmorFolioApp />
    </AuthProvider>
  );
}
