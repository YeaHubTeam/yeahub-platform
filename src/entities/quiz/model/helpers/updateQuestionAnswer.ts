import { Answers, ChangeQuestionAnswerParams } from '../types/quiz';

export const updateQuestionAnswer = (
	questions: Answers[],
	params: ChangeQuestionAnswerParams,
): Answers[] => {
	return questions.map((question) =>
		question.questionId === params.questionId ? { ...question, answer: params.answer } : question,
	);
};
