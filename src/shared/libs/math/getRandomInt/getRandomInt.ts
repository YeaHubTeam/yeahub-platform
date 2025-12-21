export const getRandomInt = (min: number, max: number): number => {
	if (min > max) throw new Error('min must be <= max');
	return Math.floor(Math.random() * (max - min + 1) + min);
};
