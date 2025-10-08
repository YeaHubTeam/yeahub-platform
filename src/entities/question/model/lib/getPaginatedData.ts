import { LearnedQuestion } from '../types/learnedQuestion';

type preparePaginatedDataArg = {
	questions: LearnedQuestion[];
	page: string;
	limit: string;
};

export const preparePaginatedData = ({ questions, page, limit }: preparePaginatedDataArg) => {
	return questions.slice((Number(page) - 1) * Number(limit), Number(page) * Number(limit));
};
