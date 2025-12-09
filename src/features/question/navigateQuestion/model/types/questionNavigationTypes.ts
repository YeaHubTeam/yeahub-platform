import { QuestionsFilterParams } from '@/entities/question';

export type QuestionNavigation = {
	questionId: number | string;
	filter: QuestionsFilterParams;
};
