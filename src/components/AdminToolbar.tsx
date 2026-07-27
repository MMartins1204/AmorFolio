import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../lib/auth';
import { Lock, Wrench } from '../lib/icons';

export default function AdminToolbar() {
  const { isAdmin, activateAdmin, deactivateAdmin } = useAuth();
  const [showDialog, setShowDialog] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [expanded, setExpanded] = useState(false);

  const handleActivate = () => {
    if (activateAdmin(password)) {
      setShowDialog(false);
      setPassword('');
      setError('');
    } else {
      setError('Senha incorreta');
      setPassword('');
    }
  };

  return (
    <>
      {/* Secret admin trigger */}
      {!isAdmin && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          whileHover={{ opacity: 1, scale: 1.15 }}
          transition={{ duration: 0.3 }}
          onClick={() => setShowDialog(true)}
          className="fixed bottom-6 right-6 z-50 cursor-pointer select-none glass-card rounded-full p-3 shadow-lg hover:shadow-rose-200/50"
          title="Modo admin"
        >
          <Lock size={18} className="text-rose-400" />
        </motion.button>
      )}

      {/* Admin toolbar */}
      <AnimatePresence>
        {isAdmin && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 120 }}
            className="fixed top-0 left-0 right-0 z-40"
          >
            <div className="mx-auto max-w-4xl px-4 pt-3">
              <div className="glass-card rounded-2xl px-4 py-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Wrench size={14} className="text-rose-500" />
                  <div className="hidden sm:block">
                    <p className="text-xs font-medium text-rose-600">Modo Admin Ativo</p>
                    <p className="text-[10px] text-rose-400">Clique nas fotos para editar legendas</p>
                  </div>
                  <span className="sm:hidden text-xs font-medium text-rose-600">Admin</span>
                </div>

                <div className="flex items-center gap-2">
                  <AnimatePresence>
                    {expanded && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8, width: 0 }}
                        animate={{ opacity: 1, scale: 1, width: 'auto' }}
                        exit={{ opacity: 0, scale: 0.8, width: 0 }}
                        className="overflow-hidden"
                      >
                        <button
                          onClick={deactivateAdmin}
                          className="whitespace-nowrap px-3 py-1.5 text-xs text-rose-500 hover:text-white hover:bg-rose-500 rounded-lg border border-rose-200 transition-all duration-300"
                        >
                          Desativar Admin
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    onClick={() => setExpanded(!expanded)}
                    className="p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all duration-300"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="19" cy="12" r="1" />
                      <circle cx="5" cy="12" r="1" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Password dialog */}
      <AnimatePresence>
        {showDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
            onClick={() => { setShowDialog(false); setPassword(''); setError(''); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="glass-card rounded-3xl p-8 w-full max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center mx-auto mb-3">
                  <Lock size={24} className="text-rose-500" />
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-rose-700">
                  Modo Admin
                </h3>
                <p className="text-rose-400 text-sm mt-1">
                  Apenas o criador pode editar legendas
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleActivate();
                }}
                className="space-y-4"
              >
                <input
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  placeholder="Senha secreta"
                  autoFocus
                  className="w-full px-4 py-3 rounded-xl bg-white/70 border border-rose-200/50 text-rose-900 placeholder-rose-300 text-center text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all"
                />

                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-rose-500 text-xs text-center"
                  >
                    {error}
                  </motion.p>
                )}

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => { setShowDialog(false); setPassword(''); setError(''); }}
                    className="flex-1 py-3 rounded-xl text-rose-400 hover:text-rose-600 hover:bg-rose-50 transition-all text-sm font-medium"
                  >
                    Cancelar
                  </button>
                  <motion.button
                    type="submit"
                    whileTap={{ scale: 0.97 }}
                    className="flex-1 py-3 rounded-xl font-semibold text-white shadow-lg shadow-rose-200/50 transition-all"
                    style={{ background: 'linear-gradient(135deg, #be123c, #e11d48, #f472b6)' }}
                  >
                    Entrar
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
