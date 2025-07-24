const linkPatterns = [
	/<\/?a\b[^>]*>/gi,
	/\b(?:https?|ftp|mailto):\/\/[^\s<>"']+/gi,
	/\b(?:www\.)?[a-z0-9-]+(?:\.[a-z]{2,}){1,2}\/[^\s<>"']*/gi,
	/\b(?:vk\.com|t\.me|t\.co|bit\.ly|goo\.gl|tinyurl\.com|ow\.ly)\/[^\s<>"']*/gi,
	/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/gi,
	/\b\d{1,3}(?:\.\d{1,3}){3}\b/gi,
	/\[[^\]]*?\]\([^)]+?\)/g,
] as const;

export const validateNoLinks = (value: string | null | undefined): boolean => {
	if (!value) return true;

	const withoutCodeBlocks = value.replace(/```[\s\S]*?```/g, '').replace(/`[^`]*`/g, '');

	return !linkPatterns.some((pattern) => {
		if (pattern.flags.includes('g')) pattern.lastIndex = 0;
		return pattern.test(withoutCodeBlocks);
	});
};
