export const parseStringArray = (value: string | null) => {
	if (!value) return undefined;

	const parsed = value.split(',').filter((item) => isNaN(Number(item)));

	return parsed.length > 0 ? parsed : undefined;
};
