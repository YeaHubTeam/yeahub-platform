const linkPatterns = [
	/<a\b[^>]*>/gi,
	/<\/a>/gi,
	/(?:https?|ftp|mailto|irc|bitcoin|magnet):\/\/[^\s<>"']+/gi,
	/\b(?:www\.)?[a-z0-9-]+(?:\.[a-z]{2,}){1,2}\b\/?[^\s<>"']*/gi,
	/\b(?:vk\.com|t\.me|t\.co|bit\.ly|goo\.gl|tinyurl\.com|ow\.ly)\b\/?[^\s<>"']*/gi,
	/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/gi,
	/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/gi,
	/\[.*?\]\([^\s]+\)/g,
	/\[.*?\]\s*\[.*?\]/g,
	/<[^\s<>]+>/g,
] as const;

export const validateNoLinks = (value: string | null | undefined): boolean => {
	if (!value) return true;
	return !linkPatterns.some((pattern) => {
		if (pattern.flags.includes('g')) pattern.lastIndex = 0;
		return pattern.test(value);
	});
};
