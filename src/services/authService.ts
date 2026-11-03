import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInAnonymously,
  signOut,
  onAuthStateChanged,
  updateProfile,
  User,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { UserProfile } from '../types';

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const googleProvider = new GoogleAuthProvider();

export async function loginWithEmail(email: string, pass: string): Promise<User> {
  const cred = await signInWithEmailAndPassword(auth, email.trim(), pass);
  return cred.user;
}

export async function registerWithEmail(
  email: string,
  pass: string,
  displayName?: string
): Promise<User> {
  const cred = await createUserWithEmailAndPassword(auth, email.trim(), pass);
  if (displayName && cred.user) {
    try {
      await updateProfile(cred.user, { displayName });
    } catch {
      // Non-fatal
    }
  }
  return cred.user;
}

export async function loginWithGoogle(): Promise<User> {
  const cred = await signInWithPopup(auth, googleProvider);
  return cred.user;
}

export async function loginAsGuest(): Promise<User> {
  const cred = await signInAnonymously(auth);
  return cred.user;
}

export async function logoutUser(): Promise<void> {
  await signOut(auth);
}

/**
 * Loads user profile from Firestore if it exists
 */
export async function loadUserProfile(uid: string): Promise<Partial<UserProfile> | null> {
  try {
    const userDocRef = doc(db, 'users', uid);
    const snap = await getDoc(userDocRef);
    if (snap.exists()) {
      return snap.data() as Partial<UserProfile>;
    }
    return null;
  } catch (err) {
    console.warn('Erro ao carregar perfil do Firestore:', err);
    return null;
  }
}

/**
 * Saves or updates user profile in Firestore
 */
export async function saveUserProfile(uid: string, profile: UserProfile): Promise<boolean> {
  try {
    const userDocRef = doc(db, 'users', uid);
    const dataToSave = {
      uid,
      email: auth.currentUser?.email || 'anonimo@bytelingo.app',
      displayName: auth.currentUser?.displayName || 'Dev Aprendiz',
      theme: profile.theme || 'light',
      hearts: profile.hearts,
      maxHearts: profile.maxHearts,
      gems: profile.gems,
      xp: profile.xp,
      streak: profile.streak,
      longestStreak: profile.longestStreak ?? 14,
      totalDaysActive: profile.totalDaysActive ?? 22,
      lastActiveDate: profile.lastActiveDate,
      completedLessonIds: profile.completedLessonIds || [],
      activeTrack: profile.activeTrack,
      league: profile.league,
      notificationPreferences: profile.notificationPreferences || {
        enabled: false,
        time: '20:00',
        sound: true,
      },
      updatedAt: new Date().toISOString(),
    };

    await setDoc(userDocRef, dataToSave, { merge: true });
    return true;
  } catch (err) {
    console.error('Erro ao salvar perfil no Firestore:', err);
    return false;
  }
}
