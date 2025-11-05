import type { FilterFromUser } from '@/shared/hooks';

export type QuestionNavigation = {
	questionId: number | string;
	filter: FilterFromUser;
};
