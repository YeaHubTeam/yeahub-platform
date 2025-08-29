import { Question } from '@/entities/question';

export const getQuestionImage = (question: Question): string | null => {
	return question.imageSrc || (question.questionSkills?.[0]?.imageSrc ?? null);
};
