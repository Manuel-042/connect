export function formatCount(count: number): string {
    if (count >= 1_000_000_000) {
        return (count / 1_000_000_000).toFixed(0) + "B";
    } else if (count >= 1_000_000) {
        return (count / 1_000_000).toFixed(0) + "M";
    } else if (count >= 1_000) {
        return (count / 1_000).toFixed(0) + "K";
    } else {
        return count.toString();
    }
}
