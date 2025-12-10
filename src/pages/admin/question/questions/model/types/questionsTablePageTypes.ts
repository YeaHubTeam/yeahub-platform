import { SelectedAdminEntities } from '@/shared/libs';

export interface QuestionsTablePageState {
	page: number;
	selectedQuestions?: SelectedAdminEntities;
	search?: string;
}
