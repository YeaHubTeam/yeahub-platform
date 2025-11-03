import { State } from '@/shared/config/store/State';

export const getSelectedQuestions = (state: State) =>
	state.questionsTablePage.selectedQuestions || [];
