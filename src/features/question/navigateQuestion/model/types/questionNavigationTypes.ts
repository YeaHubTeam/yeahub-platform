import { QuestionsFilterParams } from '@/features/question/filterQuestions';

export type QuestionNavigation = {
	questionId: number | string;
	filter: QuestionsFilterParams;
};
