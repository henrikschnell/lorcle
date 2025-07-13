import { Card } from '@/types/card';

// Types for local storage data
export interface GameState {
  mode: string;
  state: 'playing' | 'win';
  guessHistory: Card[];
  lastUpdated: string; // ISO date string
}

export interface LocalStorageData {
  currentDate: string; // ISO date string (YYYY-MM-DD)
  gameStates: Record<string, GameState>; // keyed by mode name
}

const STORAGE_KEY = 'lorcle-game-data';

// Get current date in YYYY-MM-DD format
export function getCurrentDateString(): string {
  return new Date().toISOString().split('T')[0];
}

// Check if it's a new day and storage should be reset
export function shouldResetStorage(storedDate: string): boolean {
  const currentDate = getCurrentDateString();
  return storedDate !== currentDate;
}

// Get data from localStorage
export function getLocalStorageData(): LocalStorageData | null {
  if (typeof window === 'undefined') {
    return null; // Server-side rendering
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return null;
    }

    const data: LocalStorageData = JSON.parse(stored);

    // Check if it's a new day - if so, reset storage
    if (shouldResetStorage(data.currentDate)) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    localStorage.removeItem(STORAGE_KEY); // Clear corrupted data
    return null;
  }
}

// Save data to localStorage
export function saveLocalStorageData(data: LocalStorageData): void {
  if (typeof window === 'undefined') {
    return; // Server-side rendering
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

// Initialize storage for current day
export function initializeStorage(): LocalStorageData {
  const currentDate = getCurrentDateString();
  return {
    currentDate,
    gameStates: {}
  };
}

// Get game state for a specific mode
export function getGameState(mode: string): GameState | null {
  const data = getLocalStorageData();
  if (!data) {
    return null;
  }

  return data.gameStates[mode] || null;
}

// Save game state for a specific mode
export function saveGameState(mode: string, gameState: Omit<GameState, 'mode' | 'lastUpdated'>): void {
  let data = getLocalStorageData();

  if (!data) {
    data = initializeStorage();
  }

  data.gameStates[mode] = {
    ...gameState,
    mode,
    lastUpdated: new Date().toISOString()
  };

  saveLocalStorageData(data);
}

// Update guess history for a specific mode
export function updateGuessHistory(mode: string, newGuess: Card): void {
  const currentState = getGameState(mode);
  const currentGuessHistory = currentState?.guessHistory || [];

  saveGameState(mode, {
    state: currentState?.state || 'playing',
    guessHistory: [newGuess, ...currentGuessHistory]
  });
}

// Update game state (playing/win) for a specific mode
export function updateGameStateStatus(mode: string, state: 'playing' | 'win'): void {
  const currentState = getGameState(mode);

  saveGameState(mode, {
    state,
    guessHistory: currentState?.guessHistory || []
  });
}

// Clear all storage (useful for testing or manual reset)
export function clearStorage(): void {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.removeItem(STORAGE_KEY);
}
