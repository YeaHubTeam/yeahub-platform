import { NewQuizResponse } from '../model/types/quiz';

export const getActiveQuizQuestions = (data: NewQuizResponse) => {
	const answers = data.response.answers;
	const questions = data.questions;
	const quizQuestions = answers?.map((item) => {
		const matchedQuestion = questions?.find((question) => question.id === item.questionId);
		return {
			...item,
			imageSrc: matchedQuestion?.imageSrc,
			shortAnswer: matchedQuestion?.shortAnswer,
		};
	});
	return quizQuestions;
};
