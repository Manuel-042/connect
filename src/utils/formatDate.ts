export default function formatDate(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();

    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };

    const isSameDay = date.toDateString() === now.toDateString();

    if (!isSameDay) {
        return date.toLocaleDateString('en-US', options);
    }

    const hoursDifference = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    return hoursDifference > 0 ? `${hoursDifference}h ago` : 'Just now';
}
