import { SelectedAdminEntities } from '@/shared/types/types';

export interface QuestionsTablePageState {
	page: number;
	selectedQuestions?: SelectedAdminEntities;
	search?: string;
}
