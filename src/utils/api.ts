export async function incrementCorrectGuesses() {
    const res = await fetch(`/api/stats/incrementguesses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error(payload.error || `HTTP ${res.status}`);
    }
    return res.json();
}