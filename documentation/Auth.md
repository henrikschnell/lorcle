### User Authorization


```ts
import { requireAuth, getCurrentUser } from "@/lib/auth";

// Prüfung ob eingeloggt
await requireAuth();

// Aktuellen Benutzer holen
const user = await getCurrentUser();
```