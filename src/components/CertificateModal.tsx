import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Printer,
  Share2,
  CheckCircle2,
  Award,
  Sparkles,
  Edit3,
  Check,
  Copy,
  Lock,
  Download,
  ShieldCheck,
  Calendar,
  Clock,
  QrCode,
  GraduationCap,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Track, UserProfile } from '../types';
import { TRACKS } from '../data/curriculum';
import { CarcaraIcon } from './MascotByte';
import {
  getTrackCompletionStats,
  generateCertificateCode,
  formatCertificateDate,
} from '../utils/certificateHelper';
import { playSound } from '../utils/sound';

interface CertificateModalProps {
  user: UserProfile;
  initialTrack?: Track;
  onClose: () => void;
  onOpenAchievement?: (track: Track) => void;
  onUpdateStudentName?: (newName: string) => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  user,
  initialTrack,
  onClose,
  onOpenAchievement,
  onUpdateStudentName,
}) => {
  const [selectedTrackId, setSelectedTrackId] = useState<string>(
    initialTrack?.id || user.activeTrack || 'python'
  );
  const activeTrack = TRACKS.find((t) => t.id === selectedTrackId) || TRACKS[0];

  const defaultName =
    user.studentName ||
    (typeof window !== 'undefined' && localStorage.getItem('bytelingo_student_name')) ||
    'Larissa Dev';
  const [studentName, setStudentName] = useState<string>(defaultName);
  const [isEditingName, setIsEditingName] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);

  const stats = getTrackCompletionStats(activeTrack, user.completedLessonIds);
  const verificationCode = generateCertificateCode(activeTrack.id, studentName);
  const issueDate = formatCertificateDate(user.lastActiveDate);

  // Trigger celebration confetti when opening a completed certificate
  useEffect(() => {
    if (stats.isCompleted) {
      playSound('levelup');
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [selectedTrackId, stats.isCompleted]);

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

  const handlePrint = () => {
    playSound('click');
    window.print();
  };

  const handleCopyValidation = () => {
    playSound('click');
    const shareText = `🎓 Concluí o curso de ${activeTrack.name} no ByteLingo! Certificado de Conclusão autenticado: ${verificationCode}. 🚀`;
    navigator.clipboard?.writeText(shareText);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 print:p-0 print:bg-white print:static">
      {/* Print Styles injected specifically for pristine certificate printing */}
      <style>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          #bytelingo-printable-certificate,
          #bytelingo-printable-certificate * {
            visibility: visible !important;
          }
          #bytelingo-printable-certificate {
            position: fixed !important;
            left: 0 !important;
            top: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            margin: 0 !important;
            padding: 24px !important;
            background: #fff !important;
            box-shadow: none !important;
            border: 4px solid #d97706 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-4xl w-full border-2 border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[94vh] print:max-h-none print:border-none print:shadow-none print:w-full">
        {/* Top Header & Track Selector (Hidden during printing) */}
        <div className="no-print bg-slate-50 dark:bg-slate-850 px-4 sm:px-6 py-3.5 border-b-2 border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white leading-tight flex items-center gap-1.5">
                Certificados de Conclusão
                <span className="text-xs bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 font-extrabold px-2 py-0.5 rounded-full border border-amber-300 dark:border-amber-700">
                  ByteLingo Academy
                </span>
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-none mt-0.5">
                Formalização e celebração do aprendizado concluído
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playSound('click');
              onClose();
            }}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-colors"
            title="Fechar"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Track Selector Bar (Hidden in print) */}
        <div className="no-print px-4 sm:px-6 py-2.5 bg-slate-100/70 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 overflow-x-auto shrink-0 scrollbar-none">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 shrink-0 mr-1">
            Cursos:
          </span>
          {TRACKS.map((track) => {
            const trackStats = getTrackCompletionStats(track, user.completedLessonIds);
            const isSelected = track.id === selectedTrackId;
            return (
              <button
                key={track.id}
                onClick={() => {
                  playSound('click');
                  setSelectedTrackId(track.id);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 shrink-0 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                }`}
              >
                <span>{track.icon}</span>
                <span>{track.name}</span>
                {trackStats.isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 dark:text-emerald-400 fill-emerald-600 dark:fill-emerald-500" />
                ) : (
                  <span className="text-[10px] opacity-75">({trackStats.percentage}%)</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Completion Status Alert if not completed (Hidden in print) */}
        {!stats.isCompleted && (
          <div className="no-print mx-4 sm:mx-6 mt-3 bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-800 rounded-2xl p-3 flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2.5 text-xs">
              <Lock className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <div className="text-amber-900 dark:text-amber-200 font-semibold leading-tight">
                <strong>Pré-visualização do Modelo:</strong> Você completou {stats.completedLessons} de {stats.totalLessons} lições ({stats.percentage}%). Conclua todas as fases para emitir seu certificado definitivo!
              </div>
            </div>
            <div className="shrink-0 text-right">
              <span className="text-xs font-black text-amber-700 dark:text-amber-400">
                Faltam {stats.totalLessons - stats.completedLessons} lições
              </span>
            </div>
          </div>
        )}

        {/* Scrollable Certificate Viewport */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-6 flex flex-col items-center">
          {/* THE OFFICIAL DIPLOMA / CERTIFICATE CARD */}
          <div
            id="bytelingo-printable-certificate"
            ref={certificateRef}
            className="w-full max-w-3xl bg-gradient-to-b from-amber-50/70 via-white to-amber-50/50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 text-slate-900 dark:text-slate-100 rounded-2xl sm:rounded-3xl p-6 sm:p-10 border-4 border-amber-500/80 shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[480px]"
          >
            {/* Ornate Inner Border Line */}
            <div className="absolute inset-2 sm:inset-3 border-2 border-amber-400/40 rounded-xl sm:rounded-2xl pointer-events-none" />

            {/* Subtle Watermark Logo Background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.035] dark:opacity-[0.05] pointer-events-none select-none">
              <CarcaraIcon size={340} mood="tutor" animation="none" />
            </div>

            {/* Certificate Header */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-white flex items-center justify-center shadow-md p-1.5">
                  <CarcaraIcon size={36} mood="celebrating" animation="none" />
                </div>
                <div className="text-left">
                  <div className="text-lg font-black tracking-tight text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    Byte<span className="text-slate-800 dark:text-slate-100">Lingo</span>
                    <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-1.5 py-0.5 rounded-sm">
                      Academy
                    </span>
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-amber-700 dark:text-amber-400 font-extrabold">
                    Programa de Formação em Programação
                  </div>
                </div>
              </div>

              <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent my-1.5" />

              <h1 className="text-xl sm:text-3xl font-black uppercase tracking-wide text-slate-900 dark:text-amber-100 font-serif mt-2">
                Certificado de Conclusão
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
                Comprovação de Proficiência & Aprendizado Prático Gamificado
              </p>
            </div>

            {/* Certificate Body */}
            <div className="relative z-10 my-6 sm:my-8 text-center flex flex-col items-center">
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium italic">
                Certificamos para todos os devidos fins de capacitação técnica que
              </p>

              {/* Student Name (Interactive Edit) */}
              <div className="my-2 sm:my-3 flex items-center justify-center gap-2">
                {isEditingName ? (
                  <div className="no-print flex items-center gap-2">
                    <input
                      type="text"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="Seu nome completo"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleSaveName();
                        }
                      }}
                      className="px-3 py-1.5 text-base sm:text-xl font-black text-slate-900 dark:text-white bg-white dark:bg-slate-800 border-2 border-emerald-500 rounded-xl text-center focus:outline-hidden shadow-xs"
                    />
                    <button
                      onClick={handleSaveName}
                      aria-label="Salvar nome do aluno"
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Check className="w-4 h-4" />
                      <span>Salvar</span>
                    </button>
                  </div>
                ) : (
                  <div className="group flex items-center justify-center gap-2 cursor-pointer">
                    <h2 className="text-2xl sm:text-4xl font-extrabold text-amber-950 dark:text-amber-200 underline decoration-amber-400/60 underline-offset-8 font-serif tracking-tight">
                      {studentName}
                    </h2>
                    <button
                      onClick={() => setIsEditingName(true)}
                      className="no-print p-1 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-100/50 dark:hover:bg-slate-800 transition-colors"
                      title="Editar nome no certificado"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 max-w-2xl leading-relaxed mt-2">
                concluiu com êxito todas as etapas avaliativas, desafios práticos de código, testes de sintaxe e resolução de problemas na formação completa de:
              </p>

              {/* Course Title Badge */}
              <div className="mt-3 inline-flex items-center gap-2.5 px-4 sm:px-6 py-2 rounded-2xl bg-amber-500/10 dark:bg-amber-950/60 border-2 border-amber-300 dark:border-amber-700 text-amber-950 dark:text-amber-200">
                <span className="text-2xl sm:text-3xl">{activeTrack.icon}</span>
                <span className="text-base sm:text-xl font-black tracking-tight">
                  {activeTrack.name.toUpperCase()} • ESPECIALIZAÇÃO COMPLETA
                </span>
              </div>

              {/* Competencies Mastered (5 Units) */}
              <div className="mt-5 w-full max-w-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 rounded-xl p-3 sm:p-4 text-left">
                <div className="text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center justify-between">
                  <span>Habilidades & Módulos Dominados ({activeTrack.units.length} Unidades):</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-extrabold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    100% Validado
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-700 dark:text-slate-300 font-medium">
                  {activeTrack.units.map((u, i) => (
                    <div key={u.id} className="flex items-center gap-1.5 truncate">
                      <span className="text-emerald-500 font-bold shrink-0">✓</span>
                      <span className="truncate">{u.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Certificate Footer: Authenticity, Date & Seal */}
            <div className="relative z-10 pt-4 border-t-2 border-amber-400/40 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
              {/* Workload & Issue Date */}
              <div className="text-left text-xs text-slate-600 dark:text-slate-400 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>Carga Horária: 40 horas</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-600" />
                  <span>Emissão: {issueDate}</span>
                </div>
                <div className="text-[10px] text-slate-500 font-mono">
                  Registro: {verificationCode}
                </div>
              </div>

              {/* Official Carcará Gold Stamp / Seal */}
              <div className="flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-500 p-1 shadow-lg flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-amber-50 dark:bg-slate-900 flex flex-col items-center justify-center border border-amber-300 text-center">
                    <Award className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                    <span className="text-[7px] font-black uppercase tracking-tighter text-amber-800 dark:text-amber-300">
                      Selo de Maestria
                    </span>
                  </div>
                </div>
                <span className="text-[9px] font-bold text-amber-800 dark:text-amber-400 mt-1 uppercase tracking-wider">
                  Carcará Tech Lead
                </span>
              </div>

              {/* Digital Signature */}
              <div className="text-center sm:text-right flex flex-col items-center sm:items-end">
                <div className="font-serif italic text-base sm:text-lg text-slate-800 dark:text-slate-200 border-b border-slate-400 dark:border-slate-600 pb-0.5 px-4 font-bold">
                  Byte Tutor IA & Carcará
                </div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 font-semibold">
                  Mentoria & Avaliação Autônoma
                </span>
                <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">
                  Hash: SHA256-BYTELINGO-OK
                </span>
              </div>
            </div>

            {/* Bottom Official Note */}
            <div className="relative z-10 text-center mt-3 pt-2 text-[10px] text-slate-400 dark:text-slate-500 italic">
              * Certificado de comprovação de aprendizado livre e desenvolvimento de competências práticas emitido pela plataforma ByteLingo.
            </div>
          </div>
        </div>

        {/* Action Toolbar (Hidden during print) */}
        <div className="no-print bg-slate-50 dark:bg-slate-850 px-4 sm:px-6 py-4 border-t-2 border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditingName(true)}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Edit3 className="w-4 h-4 text-slate-500" />
              <span>Editar Nome</span>
            </button>

            <button
              onClick={handleCopyValidation}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copiedCode ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400">Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-500" />
                  <span>Copiar Validação</span>
                </>
              )}
            </button>

            {onOpenAchievement && (
              <button
                onClick={() => {
                  playSound('click');
                  onOpenAchievement(activeTrack);
                }}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/50 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Award className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Card de Conquista</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white shadow-md flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir / Salvar em PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
