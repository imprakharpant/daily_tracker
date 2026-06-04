"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateStreak = void 0;
const calculateStreak = (logs) => {
    if (!logs || logs.length === 0)
        return 0;
    const logDates = new Set(logs.map(l => l.date));
    let streak = 0;
    let checkDate = new Date();
    const formatDate = (date) => {
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };
    const todayStr = formatDate(checkDate);
    if (!logDates.has(todayStr)) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        if (!logDates.has(formatDate(yesterday))) {
            return 0;
        }
        checkDate = yesterday;
    }
    while (true) {
        const dStr = formatDate(checkDate);
        if (logDates.has(dStr)) {
            streak++;
            checkDate.setDate(checkDate.getDate() - 1);
        }
        else {
            break;
        }
    }
    return streak;
};
exports.calculateStreak = calculateStreak;
