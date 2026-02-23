export const isEmptyHtml = (value: string | undefined): boolean => {
	if (!value) return true;
	const textOnly = value.replace(/<[^>]*>/g, '').trim();
	return textOnly.length === 0;
};
