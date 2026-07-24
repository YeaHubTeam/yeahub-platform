export const parseNumberArray = (value: string | null) => {
	if (!value) return undefined;

	const parsed = value
		.split(',')
		.map((item) => Number(item))
		.filter((item) => Number.isFinite(item));

	return parsed.length > 0 ? parsed : undefined;
};
