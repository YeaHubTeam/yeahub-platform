import { CreateNewMockQuizResponse, CreateNewQuizResponse } from '../model/types/quiz';

export const getActiveQuizQuestions = <T extends CreateNewQuizResponse | CreateNewMockQuizResponse>(
	data: T,
) => {
	const answers = data.response.answers;
	const questions = data.questions;
	const quizQuestions = answers?.map((item) => {
		const matchedQuestion = questions?.find((question) => question.id === item.questionId);
		return {
			...item,
			imageSrc: matchedQuestion?.imageSrc,
			shortAnswer: matchedQuestion?.shortAnswer,
			skills: matchedQuestion?.questionSkills,
		};
	});
	return quizQuestions;
};
