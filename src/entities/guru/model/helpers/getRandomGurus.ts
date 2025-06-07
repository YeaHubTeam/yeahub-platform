import { gurus } from '../constants/gurus';

export const getRandomGurus = (count: number = 4) => {
	const copy = [...gurus];

	for (let i = copy.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[copy[i], copy[j]] = [copy[j], copy[i]];
	}

	return copy.slice(0, count);
};
