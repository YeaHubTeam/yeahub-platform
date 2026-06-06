import { collectionsMock } from './collectionsMock';

const extractKeyWords = (): string[] => {
	const allKeyWords = collectionsMock.data.flatMap((collection) => collection.keywords || []);

	const uniqueKeyWords = new Set(allKeyWords);

	return Array.from(uniqueKeyWords);
};

export const keyWordsMock = extractKeyWords();
