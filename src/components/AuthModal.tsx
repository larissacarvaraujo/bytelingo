import React, { useState } from 'react';
import {
  X,
  LogIn,
  UserPlus,
  Mail,
  Lock,
  User as UserIcon,
  Sparkles,
  Cloud,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
} from 'lucide-react';
import {
  loginWithEmail,
  registerWithEmail,
  loginWithGoogle,
  loginAsGuest,
} from '../services/authService';
import { playSound } from '../utils/sound';
import { CarcaraIcon } from './MascotByte';

interface AuthModalProps {
  onClose: () => void;
  onSuccess: (userName: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose, onSuccess }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (isRegister) {
        if (!name.trim()) {
          setError('Por favor, informe seu nome ou apelido.');
          setIsLoading(false);
          return;
        }
        if (password.length < 6) {
          setError('A senha deve ter pelo menos 6 caracteres.');
          setIsLoading(false);
          return;
        }
        const user = await registerWithEmail(email, password, name.trim());
        playSound('correct');
        onSuccess(user.displayName || name.trim() || 'Dev');
      } else {
        const user = await loginWithEmail(email, password);
        playSound('correct');
        onSuccess(user.displayName || user.email?.split('@')[0] || 'Dev');
      }
    } catch (err: unknown) {
      console.error('Erro de autenticação:', err);
      const msg = (err as Error).message || '';
      if (msg.includes('user-not-found') || msg.includes('invalid-credential')) {
        setError('E-mail ou senha incorretos.');
      } else if (msg.includes('email-already-in-use')) {
        setError('Este e-mail já está cadastrado. Tente entrar.');
      } else if (msg.includes('weak-password')) {
        setError('Senha muito fraca. Digite pelo menos 6 caracteres.');
      } else if (msg.includes('invalid-email')) {
        setError('Formato de e-mail inválido.');
      } else {
        setError('Não foi possível autenticar. Verifique seus dados.');
      }
      playSound('wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const user = await loginWithGoogle();
      playSound('correct');
      onSuccess(user.displayName || 'Dev');
    } catch (err: unknown) {
      console.error('Erro no login Google:', err);
      const msg = (err as Error).message || '';
      if (!msg.includes('popup-closed-by-user')) {
        setError('Não foi possível conectar com o Google no momento.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setError(null);
    setIsLoading(true);
    try {
      await loginAsGuest();
      playSound('correct');
      onSuccess('Convidado');
    } catch (err) {
      console.error('Erro no login anônimo:', err);
      setError('Erro ao iniciar como convidado.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('dev.aluno@bytelingo.com');
    setPassword('senha123456');
    setName('Dev Aluno');
    playSound('click');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full border-2 border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-in zoom-in-95 my-8 transition-colors">
        {/* Header Banner */}
        <div className="bg-gradient-to-br from-emerald-600 to-teal-700 p-6 text-white text-center relative overflow-hidden">
          <button
            onClick={() => {
              playSound('click');
              onClose();
            }}
            className="absolute top-4 right-4 p-2 rounded-2xl bg-black/20 hover:bg-black/30 text-white transition-colors cursor-pointer"
            aria-label="Fechar janela"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center mx-auto mb-3 shadow-inner overflow-hidden">
            <CarcaraIcon size={46} animation="idle" mood="happy" />
          </div>

          <h2 className="text-2xl font-black tracking-tight">
            {isRegister ? 'Criar Conta no ByteLingo' : 'Entrar no ByteLingo'}
          </h2>
          <p className="text-emerald-100 text-xs mt-1 max-w-xs mx-auto font-medium">
            Salve suas ofensivas, conquistas, cristais e continue em qualquer dispositivo!
          </p>

          <div className="mt-3 inline-flex items-center gap-1.5 bg-black/20 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-emerald-100 border border-white/10">
            <Cloud className="w-3.5 h-3.5 text-lime-300" />
            <span>Sincronização em Nuvem (Firebase)</span>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {/* Mode Tabs */}
          <div className="grid grid-cols-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-5 text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                playSound('click');
                setIsRegister(false);
                setError(null);
              }}
              className={`py-2 rounded-xl transition-all cursor-pointer ${
                !isRegister
                  ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-xs font-extrabold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Entrar
            </button>
            <button
              type="button"
              onClick={() => {
                playSound('click');
                setIsRegister(true);
                setError(null);
              }}
              className={`py-2 rounded-xl transition-all cursor-pointer ${
                isRegister
                  ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-xs font-extrabold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Criar Conta
            </button>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-4 p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-bold flex items-center gap-2 animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {isRegister && (
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Seu Nome / Apelido</label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Ana Dev"
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-800 rounded-xl text-sm font-medium text-slate-800 dark:text-slate-100 placeholder:text-slate-400 outline-hidden transition-all"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">E-mail</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-800 rounded-xl text-sm font-medium text-slate-800 dark:text-slate-100 placeholder:text-slate-400 outline-hidden transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Senha</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-800 rounded-xl text-sm font-medium text-slate-800 dark:text-slate-100 placeholder:text-slate-400 outline-hidden transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 px-4 rounded-2xl bg-emerald-500 border-b-4 border-emerald-700 hover:brightness-105 active:translate-y-0.5 active:border-b-0 text-white font-black text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer disabled:opacity-60"
            >
              {isLoading ? (
                <span>Conectando...</span>
              ) : isRegister ? (
                <>
                  <UserPlus className="w-4 h-4" />
                  <span>Cadastrar e Salvar</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Entrar</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Pre-fill */}
          <div className="mt-3 flex justify-center">
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-[11px] font-bold text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
            >
              ⚡ Preencher dados de teste rápido
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-800" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white dark:bg-slate-900 px-3 text-slate-400 font-bold">ou continue com</span>
            </div>
          </div>

          {/* Google & Guest Buttons */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 font-extrabold text-xs text-slate-700 dark:text-slate-200 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continuar com o Google</span>
            </button>

            <button
              type="button"
              onClick={handleGuestLogin}
              disabled={isLoading}
              className="w-full py-2 px-4 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold text-xs transition-colors cursor-pointer"
            >
              Continuar como Convidado (progresso salvo localmente)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
