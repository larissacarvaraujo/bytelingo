import { Track } from '../types';
import { LOGIC_TRACK } from './tracks/logicTrack';
import { PYTHON_TRACK } from './tracks/pythonTrack';
import { JAVASCRIPT_TRACK } from './tracks/javascriptTrack';
import { RUST_TRACK } from './tracks/rustTrack';
import { JAVA_TRACK } from './tracks/javaTrack';

export const TRACKS: Track[] = [
  LOGIC_TRACK,
  PYTHON_TRACK,
  JAVASCRIPT_TRACK,
  RUST_TRACK,
  JAVA_TRACK,
];

export const INITIAL_DAILY_QUESTS = [
  {
    id: 'quest-1',
    title: 'Codificador do Dia',
    description: 'Complete 1 lição interativa em qualquer trilha',
    progress: 0,
    target: 1,
    rewardGems: 15,
    completed: false,
  },
  {
    id: 'quest-2',
    title: 'Precisão Impecável',
    description: 'Acerte 3 exercícios seguidos sem perder vidas',
    progress: 0,
    target: 3,
    rewardGems: 25,
    completed: false,
  },
  {
    id: 'quest-3',
    title: 'Maratona de XP',
    description: 'Acumule 40 pontos de XP hoje',
    progress: 0,
    target: 40,
    rewardGems: 30,
    completed: false,
  },
];

export const SHOP_ITEMS = [
  {
    id: 'heart_refill',
    title: 'Recarga Total de Vidas',
    description: 'Restaure imediatamente seus 5 corações para continuar praticando sem parar.',
    costGems: 50,
    icon: '❤️',
    type: 'hearts',
  },
  {
    id: 'streak_freeze',
    title: 'Bloqueio de Ofensiva',
    description: 'Protege seus dias consecutivos de ofensiva se você não puder praticar amanhã.',
    costGems: 100,
    icon: '🧊',
    type: 'freeze',
  },
  {
    id: 'double_xp',
    title: 'Poção de XP em Dobro',
    description: 'Dobra todo o XP ganho em lições pelos próximos 30 minutos!',
    costGems: 80,
    icon: '🧪',
    type: 'potion',
  },
];

export const LEADERBOARD_USERS = [
  { rank: 1, name: 'Lucas "Rustacean"', xp: 840, league: 'Ouro', isCurrentUser: false, avatar: '🦀' },
  { rank: 2, name: 'Larissa Dev (Você)', xp: 0, league: 'Ouro', isCurrentUser: true, avatar: '🦅' },
  { rank: 3, name: 'Carlos Python', xp: 520, league: 'Ouro', isCurrentUser: false, avatar: '🐍' },
  { rank: 4, name: 'Beatriz FullStack', xp: 480, league: 'Ouro', isCurrentUser: false, avatar: '⚡' },
  { rank: 5, name: 'Rafael Java JVM', xp: 390, league: 'Ouro', isCurrentUser: false, avatar: '☕' },
  { rank: 6, name: 'Mariana Algoritmos', xp: 310, league: 'Ouro', isCurrentUser: false, avatar: '🧠' },
];
