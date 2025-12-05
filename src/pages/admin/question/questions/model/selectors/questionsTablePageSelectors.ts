import { State } from '@/shared/config';

export const getSelectedQuestions = (state: State) =>
	state.questionsTablePage.selectedQuestions || [];
