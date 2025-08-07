# Lorcle

## Deutsch

### Überblick

Lorcle ist ein tägliches Kartenratespiel, inspiriert von Wordle, bei dem Spieler versuchen, die Karte des Tages zu erraten. Jeder Tag bringt eine neue Herausforderung mit einer zufällig ausgewählten Karte, die die Spieler durch strategisches Raten identifizieren müssen.

### Spielprinzip

- **Tägliche Herausforderung**: Jeden Tag wird eine neue Karte zum Erraten ausgewählt
- **Unbegrenzte Versuche**: Spieler können so oft raten, bis sie die richtige Karte finden
- **Sofortiges Feedback**: Nach jedem Versuch erhalten Spieler visuelles Feedback über die Ähnlichkeit ihrer Vermutung zur Zielkarte
- **Verlaufsverfolgung**: Alle Vermutungen werden lokal gespeichert und angezeigt
- **Gestrige Karte**: Nach dem Spielen wird die Karte des Vortages angezeigt

### Architektur

#### Frontend
- **Framework**: Next.js 15 mit React 19
- **Styling**: Tailwind CSS mit Radix UI Komponenten
- **Internationalisierung**: next-intl für mehrsprachige Unterstützung
- **Themes**: next-themes für Dark/Light Mode
- **Animationen**: Motion für flüssige Übergänge

#### Backend & Datenbank
- **Datenbank**: Supabase (PostgreSQL)
- **API Routes**: Next.js API Routes für Server-Funktionalität
- **Authentifizierung**: Supabase Auth (falls implementiert)

#### Datenspeicherung
- **Lokaler Speicher**: localStorage für Spielzustand und Verlauf
- **Datenbank**: Supabase für Karten, Historie und Statistiken

### Kernfunktionalitäten

#### 1. Kartenabruf und -verwaltung
```typescript
// Karten werden aus der Supabase-Datenbank abgerufen
const { data: cards } = await supabase
  .from('cards')
  .select('*');
```

Die Anwendung verwaltet eine Sammlung von Karten in der Datenbank, die verschiedene Eigenschaften haben können (Name, Typ, Seltenheit, etc.).

#### 2. Tägliche Kartenauswahl (Cron Job)
```typescript
// Deterministische Zufallsauswahl basierend auf Datum
const salt = process.env.SEED_SALT;
const rng = seedrandom(tomorrowFormatted + salt);
const index = Math.floor(rng() * cards.length);
const nextCard = cards[index];
```

**Cron Job Funktionalität** (`/api/cron`):
- Läuft täglich automatisch
- Wählt die Karte für den nächsten Tag aus
- Verwendet seeded randomization für Konsistenz
- Speichert die Auswahl in der `history` Tabelle
- Verhindert Duplikate durch Datumsprüfung
- Gesichert durch `CRON_SECRET` Authentifizierung

#### 3. Validierung des Rateversuchs
```typescript
const handleGuess = async (guessedCard: Card) => {
  const newGuessHistory = [guessedCard, ...guessHistory];
  setGuessHistory(newGuessHistory);
  updateGuessHistory('classic', guessedCard);

  if (guessedCard.id === todaysCard.id) {
    setGameState('win');
    updateGameStateStatus('classic', 'win');
    await incrementCorrectGuesses();
  }
};
```

Das System überprüft jede Vermutung gegen die Zielkarte und:
- Aktualisiert den Verlauf sofort
- Speichert den Zustand lokal
- Inkrementiert Statistiken bei korrekten Vermutungen
- Zeigt visuelles Feedback

#### 4. LocalStorage zum Speichern der Ratehistorie
```typescript
export interface GameState {
  mode: string;
  state: 'playing' | 'win';
  guessHistory: Card[];
  lastUpdated: string;
}
```

**LocalStorage Features**:
- **Täglicher Reset**: Speicher wird automatisch bei Tageswechsel zurückgesetzt
- **Spielmodus-spezifisch**: Unterstützt verschiedene Spielmodi (classic, etc.)
- **Persistente Sitzungen**: Spielzustand bleibt bei Browser-Neustarts erhalten
- **Fehlerbehandlung**: Robuste Behandlung von korrupten Daten
- **Server-Side Rendering**: Graceful handling für SSR

**Wichtige Funktionen**:
- `getGameState(mode)`: Lädt gespeicherten Spielzustand
- `updateGuessHistory(mode, guess)`: Fügt neuen Rateversuch hinzu
- `updateGameStateStatus(mode, state)`: Aktualisiert Gewinn-/Spielstatus
- `shouldResetStorage(date)`: Prüft auf Tageswechsel

#### 5. Statistik-Tracking
```typescript
// API Route für Statistik-Inkrementierung
const { error } = await supabase.rpc(
  'increment_correct_guesses_classic',
  { date_param }
);
```

Das System verfolgt:
- Anzahl korrekter Vermutungen pro Tag
- Spieler-Statistiken über Zeit
- Erfolgsraten und Trends


### 📊 Performance Optimierungen

- **Lazy Loading**: Komponenten werden bei Bedarf geladen
- **LocalStorage**: Reduziert Server-Anfragen für Spielzustand
- **Caching**: Next.js automatisches Caching für statische Inhalte
- **Optimistic Updates**: UI wird sofort aktualisiert, bevor Server antwortet

### 🔒 Sicherheit

- **CRON_SECRET**: Schützt Cron Job Endpoint
- **Supabase RLS**: Row Level Security für Datenbankzugriff
- **Input Validation**: Alle Benutzereingaben werden validiert

---

## English

### Overview

Lorcle is a daily card guessing game inspired by Wordle, where players attempt to guess the card of the day. Each day brings a new challenge with a randomly selected card that players must identify through strategic guessing.

### Game Mechanics

- **Daily Challenge**: A new card is selected for guessing each day
- **Unlimited Attempts**: Players can guess as many times as needed until they find the correct card
- **Instant Feedback**: After each guess, players receive visual feedback about the similarity of their guess to the target card
- **History Tracking**: All guesses are stored locally and displayed
- **Yesterday's Card**: After playing, the previous day's card is revealed

### Architecture

#### Frontend
- **Framework**: Next.js 15 with React 19
- **Styling**: Tailwind CSS with Radix UI components
- **Internationalization**: next-intl for multi-language support
- **Themes**: next-themes for Dark/Light mode
- **Animations**: Motion for smooth transitions

#### Backend & Database
- **Database**: Supabase (PostgreSQL)
- **API Routes**: Next.js API Routes for server functionality
- **Authentication**: Supabase Auth (if implemented)

#### Data Storage
- **Local Storage**: localStorage for game state and history
- **Database**: Supabase for cards, history, and statistics

### Core Functionalities

#### 1. Card Fetching and Management
```typescript
// Cards are fetched from the Supabase database
const { data: cards } = await supabase
  .from('cards')
  .select('*');
```

The application manages a collection of cards in the database with various properties (name, type, rarity, etc.).

#### 2. Daily Card Selection (Cron Job)
```typescript
// Deterministic random selection based on date
const salt = process.env.SEED_SALT;
const rng = seedrandom(tomorrowFormatted + salt);
const index = Math.floor(rng() * cards.length);
const nextCard = cards[index];
```

**Cron Job Functionality** (`/api/cron`):
- Runs automatically daily
- Selects the card for the next day
- Uses seeded randomization for consistency
- Stores the selection in the `history` table
- Prevents duplicates through date checking
- Secured with `CRON_SECRET` authentication

#### 3. Guess Validation
```typescript
const handleGuess = async (guessedCard: Card) => {
  const newGuessHistory = [guessedCard, ...guessHistory];
  setGuessHistory(newGuessHistory);
  updateGuessHistory('classic', guessedCard);

  if (guessedCard.id === todaysCard.id) {
    setGameState('win');
    updateGameStateStatus('classic', 'win');
    await incrementCorrectGuesses();
  }
};
```

The system validates each guess against the target card and:
- Updates history immediately
- Saves state locally
- Increments statistics on correct guesses
- Displays visual feedback

#### 4. LocalStorage History Tracking
```typescript
export interface GameState {
  mode: string;
  state: 'playing' | 'win';
  guessHistory: Card[];
  lastUpdated: string;
}
```

**LocalStorage Features**:
- **Daily Reset**: Storage automatically resets on day change
- **Game Mode Specific**: Supports different game modes (classic, etc.)
- **Persistent Sessions**: Game state persists across browser restarts
- **Error Handling**: Robust handling of corrupted data
- **Server-Side Rendering**: Graceful handling for SSR

**Key Functions**:
- `getGameState(mode)`: Loads saved game state
- `updateGuessHistory(mode, guess)`: Adds new guess
- `updateGameStateStatus(mode, state)`: Updates win/playing status
- `shouldResetStorage(date)`: Checks for day change

#### 5. Statistics Tracking
```typescript
// API route for statistics incrementing
const { error } = await supabase.rpc(
  'increment_correct_guesses_classic',
  { date_param }
);
```

The system tracks:
- Number of correct guesses per day
- Player statistics over time
- Success rates and trends


### 📊 Performance Optimizations

- **Lazy Loading**: Components are loaded on demand
- **LocalStorage**: Reduces server requests for game state
- **Caching**: Next.js automatic caching for static content
- **Optimistic Updates**: UI updates immediately before server response

### 🔒 Security

- **CRON_SECRET**: Protects cron job endpoint
- **Supabase RLS**: Row Level Security for database access
- **Input Validation**: All user inputs are validated
