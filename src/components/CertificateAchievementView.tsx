import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Share2,
  Download,
  Award,
  Sparkles,
  CheckCircle2,
  FileText,
  Copy,
  Check,
  Edit3,
  Calendar,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Track, UserProfile } from '../types';
import { MascotByte, CarcaraIcon } from './MascotByte';
import {
  formatCertificateDate,
  generateCertificateCode,
  renderDiplomaToCanvas,
  downloadDiplomaImage,
} from '../utils/certificateHelper';
import { playSound } from '../utils/sound';

interface CertificateAchievementViewProps {
  user: UserProfile;
  track: Track;
  onClose: () => void;
  onOpenFullCertificate?: () => void;
  onUpdateStudentName?: (newName: string) => void;
}

export const CertificateAchievementView: React.FC<CertificateAchievementViewProps> = ({
  user,
  track,
  onClose,
  onOpenFullCertificate,
  onUpdateStudentName,
}) => {
  const defaultName =
    user.studentName ||
    (typeof window !== 'undefined' && localStorage.getItem('bytelingo_student_name')) ||
    'Larissa Dev';

  const [studentName, setStudentName] = useState<string>(defaultName);
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [copiedShare, setCopiedShare] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const verificationCode = generateCertificateCode(track.id, studentName);
  const completionDate = formatCertificateDate(user.lastActiveDate);

  // Trigger celebration effects on mount
  useEffect(() => {
    playSound('levelup');

    // Multi-stage confetti celebration
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ['#F59E0B', '#10B981', '#FBBF24', '#38BDF8'],
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ['#F59E0B', '#10B981', '#FBBF24', '#38BDF8'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, [track.id]);

  // Keep canvas graphic in sync for instant high-res PNG download
  useEffect(() => {
    if (canvasRef.current) {
      renderDiplomaToCanvas(canvasRef.current, {
        studentName,
        trackName: track.name,
        trackIcon: track.icon,
        trackColor: track.color,
        completionDate,
        verificationCode,
      });
    }
  }, [studentName, track, completionDate, verificationCode]);

  const handleSaveName = () => {
    const trimmed = studentName.trim();
    if (trimmed) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('bytelingo_student_name', trimmed);
      }
      onUpdateStudentName?.(trimmed);
      setIsEditingName(false);
      playSound('click');
    }
  };

  const handleDownloadGraphic = () => {
    playSound('click');
    if (!canvasRef.current) return;
    setIsExporting(true);

    try {
      const sanitizedName = studentName.toLowerCase().replace(/[^a-z0-9]/g, '-');
      const filename = `diploma-conquista-${track.id}-${sanitizedName}.png`;
      downloadDiplomaImage(canvasRef.current, filename);
    } finally {
      setTimeout(() => setIsExporting(false), 800);
    }
  };

  const handleShare = async () => {
    playSound('click');
    const shareTitle = `Conquista ByteLingo: Mestre em ${track.name}! 🎓`;
    const shareText = `Acabei de concluir 100% da formação de ${track.name} no ByteLingo! 🚀\nDiploma de Maestria verificado: ${verificationCode}\nCarga Horária: 40h de desafios práticos de código!`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: window.location.origin,
        });
        return;
      } catch {
        // Fallback to clipboard if cancelled or rejected
      }
    }

    // Clipboard fallback with robust error handling
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(`${shareTitle}\n\n${shareText}`);
        setCopiedShare(true);
        setTimeout(() => setCopiedShare(false), 2500);
        return;
      }
    } catch {
      // Fallback if clipboard permission is denied or in automated environments
    }

    try {
      const textarea = document.createElement('textarea');
      textarea.value = `${shareTitle}\n\n${shareText}`;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    } catch {
      // Ignore
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Conquista do Certificado"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
    >
      {/* Hidden high-res canvas for rendering exportable graphic */}
      <canvas ref={canvasRef} className="hidden" width={1200} height={675} />

      <div className="bg-slate-900 border-2 border-amber-500/50 rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden flex flex-col relative animate-in fade-in zoom-in-95 duration-200">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-amber-500/20 via-yellow-500/10 to-transparent pointer-events-none" />

        {/* Modal Header */}
        <div className="px-5 sm:px-8 pt-5 pb-3 flex items-center justify-between border-b border-slate-800 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Conquista Desbloqueada
                </span>
                <span className="text-xs text-slate-400 font-semibold">• 100% Concluído</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white leading-tight mt-0.5">
                Mestre em {track.name} 🎓
              </h2>
            </div>
          </div>

          <button
            onClick={() => {
              playSound('click');
              onClose();
            }}
            aria-label="Fechar"
            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mascot & Celebration Subheader */}
        <div className="px-5 sm:px-8 py-3 bg-slate-850/60 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <MascotByte mood="celebrating" animation="celebration" size="xs" />
            <div>
              <p className="text-xs sm:text-sm text-slate-200 font-bold">
                "Parabéns! Você voou alto e dominou cada conceito e linha de código!"
              </p>
              <p className="text-[11px] text-amber-400 font-medium">
                — Carcará Tech Lead & Byte Tutor IA
              </p>
            </div>
          </div>

          {/* Quick Name Editor */}
          <div className="flex items-center gap-2 shrink-0">
            {isEditingName ? (
              <div className="flex items-center gap-1.5">
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSaveName();
                    }
                  }}
                  placeholder="Nome no diploma"
                  autoFocus
                  className="px-2.5 py-1 text-xs font-bold text-white bg-slate-800 border border-emerald-500 rounded-lg focus:outline-hidden"
                />
                <button
                  onClick={handleSaveName}
                  className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" /> Salvar
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditingName(true)}
                className="px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                <span>Editar Nome no Diploma</span>
              </button>
            )}
          </div>
        </div>

        {/* Stylized Diploma Graphic Display Card */}
        <div className="p-4 sm:p-7 flex justify-center overflow-x-auto">
          <div
            id="bytelingo-achievement-card"
            className="relative w-full max-w-2xl bg-gradient-to-b from-[#111827] via-[#0B0F19] to-[#060911] rounded-2xl p-6 sm:p-8 border-4 border-amber-500/80 shadow-[0_0_50px_rgba(245,158,11,0.2)] text-white select-none overflow-hidden"
          >
            {/* Inner Double Gold Border */}
            <div className="absolute inset-2 border border-amber-400/40 rounded-xl pointer-events-none" />

            {/* Corner Decorative Brackets */}
            <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-amber-400" />
            <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-amber-400" />
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-amber-400" />
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-amber-400" />

            {/* Watermark Crest Background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
              <CarcaraIcon className="w-96 h-96" />
            </div>

            {/* Card Content */}
            <div className="relative z-10 flex flex-col items-center text-center">
              {/* Header Badge */}
              <div className="flex items-center gap-2 mb-1.5">
                <CarcaraIcon className="w-6 h-6 text-amber-400" />
                <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-amber-400">
                  ByteLingo Academy • Conquista Oficial
                </span>
                <CarcaraIcon className="w-6 h-6 text-amber-400 scale-x-[-1]" />
              </div>

              <h1 className="text-xl sm:text-3xl font-black uppercase tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 font-serif">
                Certificado de Conquista & Maestria
              </h1>
              <p className="text-[11px] sm:text-xs text-slate-400 font-medium mt-0.5">
                Comprovação de Proficiência Técnica e Resolução Prática de Código
              </p>

              <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent my-3" />

              {/* Salutation */}
              <p className="text-xs sm:text-sm text-slate-300 italic font-serif">
                Certificamos com honra e reconhecimento de dedicação que
              </p>

              {/* Hero Student Name */}
              <h3 className="text-2xl sm:text-4xl font-extrabold text-amber-300 underline decoration-amber-500/60 underline-offset-8 font-serif my-2 tracking-tight">
                {studentName}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 font-medium mt-2 max-w-lg">
                concluiu com êxito todas as 5 unidades, lições interativas e desafios práticos de:
              </p>

              {/* Track Banner Box */}
              <div className="my-3.5 px-5 py-2.5 rounded-xl bg-slate-800/90 border-2 border-amber-400/80 shadow-md flex items-center gap-2.5">
                <span className="text-2xl">{track.icon}</span>
                <span className="text-sm sm:text-base font-black uppercase tracking-wider text-sky-400">
                  {track.name} • Especialização Completa
                </span>
              </div>

              {/* Stats Highlights */}
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-slate-300 my-2 font-medium">
                <span className="flex items-center gap-1 bg-slate-800/70 px-2.5 py-1 rounded-lg border border-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  11 Lições Concluídas
                </span>
                <span className="flex items-center gap-1 bg-slate-800/70 px-2.5 py-1 rounded-lg border border-slate-700">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  40 Horas de Prática
                </span>
                <span className="flex items-center gap-1 bg-slate-800/70 px-2.5 py-1 rounded-lg border border-slate-700">
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                  Maestria 100%
                </span>
              </div>

              {/* Footer Meta Row */}
              <div className="w-full pt-4 mt-2 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
                <div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-amber-400" />
                    <span>Conclusão: <strong>{completionDate}</strong></span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                    Hash: <strong className="text-amber-400">{verificationCode}</strong>
                  </div>
                </div>

                {/* Carcará Gold Stamp */}
                <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/40 rounded-full px-3 py-1">
                  <span className="text-base">🦅</span>
                  <div className="text-center">
                    <div className="text-[9px] font-black uppercase tracking-wider text-amber-300 leading-tight">
                      Selo de Maestria
                    </div>
                    <div className="text-[8px] text-amber-400/80 leading-tight">
                      Carcará Tech Lead
                    </div>
                  </div>
                </div>

                <div className="text-center sm:text-right">
                  <div className="text-xs font-serif italic font-bold text-slate-300">
                    Byte Tutor IA & Carcará
                  </div>
                  <div className="text-[9px] text-slate-500 uppercase tracking-widest mt-0.5">
                    Avaliação Autônoma
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Controls Bar */}
        <div className="px-5 sm:px-8 py-4 bg-slate-850 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm border border-slate-700 flex items-center gap-2 transition-colors cursor-pointer"
            >
              {copiedShare ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Copiado!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-amber-400" />
                  <span>Compartilhar Conquista</span>
                </>
              )}
            </button>

            {onOpenFullCertificate && (
              <button
                onClick={() => {
                  playSound('click');
                  onOpenFullCertificate();
                }}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm border border-slate-700 flex items-center gap-2 transition-colors cursor-pointer"
                title="Abrir versão completa formatada para A4 / PDF"
              >
                <FileText className="w-4 h-4 text-sky-400" />
                <span>Certificado Formal (PDF)</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadGraphic}
              disabled={isExporting}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-black text-xs sm:text-sm shadow-lg flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{isExporting ? 'Exportando PNG...' : 'Baixar Imagem da Conquista (PNG)'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
