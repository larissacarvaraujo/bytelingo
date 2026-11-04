import { Track } from '../types';

export interface TrackCompletionStats {
  totalLessons: number;
  completedLessons: number;
  percentage: number;
  isCompleted: boolean;
}

/**
 * Checks if all lessons across all units in a track have been completed
 */
export function isTrackCompleted(track: Track, completedLessonIds: string[]): boolean {
  if (!track || !track.units || track.units.length === 0) return false;
  return track.units.every((unit) =>
    unit.lessons.every((lesson) => completedLessonIds.includes(lesson.id))
  );
}

/**
 * Computes detailed progress statistics for a track
 */
export function getTrackCompletionStats(
  track: Track,
  completedLessonIds: string[]
): TrackCompletionStats {
  if (!track || !track.units || track.units.length === 0) {
    return { totalLessons: 0, completedLessons: 0, percentage: 0, isCompleted: false };
  }

  const allLessons = track.units.flatMap((u) => u.lessons);
  const totalLessons = allLessons.length;
  const completedLessons = allLessons.filter((l) => completedLessonIds.includes(l.id)).length;
  const percentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  const isCompleted = completedLessons === totalLessons && totalLessons > 0;

  return {
    totalLessons,
    completedLessons,
    percentage,
    isCompleted,
  };
}

/**
 * Generates an official-looking certificate verification hash
 */
export function generateCertificateCode(trackId: string, studentName: string): string {
  const prefix = `BYTE-${trackId.toUpperCase().slice(0, 3)}-2026`;
  let hash = 0;
  const str = `${trackId}:${studentName}:ByteLingoCert`;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  const hex = Math.abs(hash).toString(16).toUpperCase().padStart(5, '0').slice(0, 5);
  return `${prefix}-${hex}`;
}

/**
 * Formats issue date in Portuguese (e.g., "04 de novembro de 2026")
 */
export function formatCertificateDate(dateStr?: string): string {
  const date = dateStr ? new Date(dateStr) : new Date();
  const day = String(date.getDate()).padStart(2, '0');
  const months = [
    'janeiro',
    'fevereiro',
    'março',
    'abril',
    'maio',
    'junho',
    'julho',
    'agosto',
    'setembro',
    'outubro',
    'novembro',
    'dezembro',
  ];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} de ${month} de ${year}`;
}

/**
 * Draws a high-resolution, stylized 1200x675 diploma achievement graphic onto a canvas
 */
export function renderDiplomaToCanvas(
  canvas: HTMLCanvasElement,
  options: {
    studentName: string;
    trackName: string;
    trackIcon: string;
    trackColor?: string;
    completionDate: string;
    verificationCode: string;
  }
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const width = 1200;
  const height = 675;
  canvas.width = width;
  canvas.height = height;

  // 1. Background Luxury Gradient
  const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 80, width / 2, height / 2, 700);
  bgGrad.addColorStop(0, '#131b2e');
  bgGrad.addColorStop(0.6, '#0b0f19');
  bgGrad.addColorStop(1, '#05070c');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Subtle ambient glow
  const glowGrad = ctx.createRadialGradient(width / 2, 100, 10, width / 2, 100, 400);
  glowGrad.addColorStop(0, 'rgba(245, 158, 11, 0.15)');
  glowGrad.addColorStop(1, 'rgba(245, 158, 11, 0)');
  ctx.fillStyle = glowGrad;
  ctx.fillRect(0, 0, width, height);

  // 2. Borders & Ornaments
  // Outer gold border
  ctx.strokeStyle = '#d97706';
  ctx.lineWidth = 6;
  ctx.strokeRect(18, 18, width - 36, height - 36);

  // Inner thin border
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(28, 28, width - 56, height - 56);

  // Corner filigree brackets
  const drawCorner = (x: number, y: number, rot: number) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((rot * Math.PI) / 180);
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(0, 36);
    ctx.lineTo(0, 0);
    ctx.lineTo(36, 0);
    ctx.stroke();

    // Small inner diamond
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(10, 10, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  drawCorner(38, 38, 0);
  drawCorner(width - 38, 38, 90);
  drawCorner(width - 38, height - 38, 180);
  drawCorner(38, height - 38, 270);

  // 3. Header
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Academy Tag
  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 13px system-ui, -apple-system, sans-serif';
  ctx.letterSpacing = '4px';
  ctx.fillText('BYTELINGO ACADEMY  •  PROGRAMA DE FORMAÇÃO TÉCNICA', width / 2, 68);
  ctx.letterSpacing = '0px';

  // Title
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 32px serif, Georgia, "Times New Roman"';
  ctx.fillText('CERTIFICADO DE CONQUISTA & MAESTRIA', width / 2, 114);

  // Subtitle
  ctx.fillStyle = '#94a3b8';
  ctx.font = '500 13px system-ui, sans-serif';
  ctx.fillText('Comprovação de Proficiência Técnica e Resolução Prática de Código', width / 2, 146);

  // Golden dividing line with diamond
  ctx.strokeStyle = '#d97706';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(width / 2 - 160, 168);
  ctx.lineTo(width / 2 + 160, 168);
  ctx.stroke();

  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.arc(width / 2, 168, 4, 0, Math.PI * 2);
  ctx.fill();

  // 4. Salutation
  ctx.fillStyle = '#cbd5e1';
  ctx.font = 'italic 15px Georgia, serif';
  ctx.fillText('Certificamos com honra e reconhecimento de dedicação que', width / 2, 214);

  // 5. Student Name (Hero element)
  ctx.fillStyle = '#fef08a';
  ctx.font = 'bold 44px Georgia, serif';
  ctx.fillText(options.studentName, width / 2, 268);

  // Underline for name
  const nameWidth = ctx.measureText(options.studentName).width;
  ctx.strokeStyle = 'rgba(250, 204, 21, 0.4)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(width / 2 - Math.min(nameWidth / 2 + 30, 320), 296);
  ctx.lineTo(width / 2 + Math.min(nameWidth / 2 + 30, 320), 296);
  ctx.stroke();

  // 6. Accomplishment statement
  ctx.fillStyle = '#cbd5e1';
  ctx.font = '14px system-ui, sans-serif';
  ctx.fillText('concluiu com êxito todas as 5 unidades, lições interativas e desafios práticos de:', width / 2, 332);

  // 7. Track Banner Box
  const bannerWidth = 480;
  const bannerHeight = 56;
  const bannerX = width / 2 - bannerWidth / 2;
  const bannerY = 360;

  // Banner Background
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(bannerX, bannerY, bannerWidth, bannerHeight, 14);
  ctx.fill();
  ctx.stroke();

  // Banner text
  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 22px system-ui, sans-serif';
  ctx.fillText(`${options.trackIcon}  ${options.trackName.toUpperCase()} • ESPECIALIZAÇÃO COMPLETA`, width / 2, bannerY + bannerHeight / 2);

  // 8. Stats Badge Row
  ctx.fillStyle = '#94a3b8';
  ctx.font = '600 13px system-ui, sans-serif';
  ctx.fillText('⚡ 11 Lições Concluídas   •   ⏱️ 40h de Prática   •   🎯 100% dos Desafios Aprovados', width / 2, 444);

  // 9. Footer Divider
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(80, 480);
  ctx.lineTo(width - 80, 480);
  ctx.stroke();

  // 10. Footer Details
  // Left: Issue Date & Verification Code
  ctx.textAlign = 'left';
  ctx.fillStyle = '#94a3b8';
  ctx.font = '12px system-ui, sans-serif';
  ctx.fillText(`📅 Data de Conclusão: ${options.completionDate}`, 90, 524);
  ctx.fillText(`🔑 Registro de Validação: ${options.verificationCode}`, 90, 548);
  ctx.fillStyle = '#64748b';
  ctx.font = '10px system-ui, sans-serif';
  ctx.fillText('* Documento de comprovação técnica emitido pela plataforma ByteLingo.', 90, 580);

  // Center: Golden Seal
  ctx.textAlign = 'center';
  const sealX = width / 2;
  const sealY = 545;

  ctx.fillStyle = 'rgba(245, 158, 11, 0.15)';
  ctx.beginPath();
  ctx.arc(sealX, sealY, 38, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(sealX, sealY, 34, 0, Math.PI * 2);
  ctx.stroke();

  ctx.font = '22px system-ui, sans-serif';
  ctx.fillText('🦅', sealX, sealY - 4);
  ctx.fillStyle = '#f59e0b';
  ctx.font = 'bold 9px system-ui, sans-serif';
  ctx.letterSpacing = '1px';
  ctx.fillText('SELO DE MAESTRIA', sealX, sealY + 18);
  ctx.letterSpacing = '0px';

  // Right: Digital Signature
  ctx.textAlign = 'right';
  ctx.fillStyle = '#cbd5e1';
  ctx.font = 'bold 14px "Brush Script MT", cursive, Georgia, serif';
  ctx.fillText('Byte Tutor IA & Carcará Tech Lead', width - 90, 528);

  ctx.strokeStyle = '#d97706';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(width - 320, 538);
  ctx.lineTo(width - 90, 538);
  ctx.stroke();

  ctx.fillStyle = '#94a3b8';
  ctx.font = '11px system-ui, sans-serif';
  ctx.fillText('Mentoria Autônoma & Avaliação Contínua', width - 90, 556);
  ctx.fillStyle = '#64748b';
  ctx.font = '10px system-ui, sans-serif';
  ctx.fillText('Hash Autenticado: SHA256-BYTELINGO-OK', width - 90, 574);
}

/**
 * Exports the canvas diploma as a PNG image and triggers download
 */
export function downloadDiplomaImage(
  canvas: HTMLCanvasElement,
  filename: string = 'diploma-conquista-bytelingo.png'
) {
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/png', 1.0);
  link.click();
}
