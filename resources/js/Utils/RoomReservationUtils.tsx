export function formatDateTime(date: string) {
    const dateObject = new Date(date);

    // Define an array of short day names
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Extract day of the week, day, month, year, hour, and minute
    const dayOfWeek = days[dateObject.getDay()];
    const day = dateObject.getDate();
    const month = dateObject.toLocaleString('default', { month: 'short' });
    const year = dateObject.getFullYear();
    const hour = String(dateObject.getHours()).padStart(2, '0');
    const minute = String(dateObject.getMinutes()).padStart(2, '0');

    // Format the date and time
    const formattedDate = `${dayOfWeek}, ${day} ${month} ${year} ${hour}:${minute}`;

    return formattedDate;
}