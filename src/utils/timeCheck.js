export function isOrderingOpen() {
    // Get the current time in EST/EDT (Indiana time)
    const now = new Date();
    
    // We can use Intl.DateTimeFormat to get the parts in "America/Indiana/Indianapolis"
    const options = {
        timeZone: 'America/Indiana/Indianapolis',
        weekday: 'short', // Mon, Tue, etc.
        hour: 'numeric',
        hour12: false,
    };
    
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const parts = formatter.formatToParts(now);
    
    let weekday = '';
    let hour = 0;
    
    for (const part of parts) {
        if (part.type === 'weekday') weekday = part.value;
        if (part.type === 'hour') hour = parseInt(part.value, 10);
    }
    
    // Check if open
    if (weekday === 'Sat' || weekday === 'Sun') {
        return false;
    }
    
    if (weekday === 'Mon') {
        if (hour < 8) {
            return false;
        }
        return true;
    }
    
    if (weekday === 'Fri') {
        if (hour >= 18) {
            return false;
        }
        return true;
    }
    
    // Tue, Wed, Thu are all true
    return true;
}
