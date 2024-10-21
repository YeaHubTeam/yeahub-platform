import { State } from '@/shared/config/store/State';

export const getQuestionsPageNum = (state: State) => state.questionsTablePage.page || 1;
export const getQuestionsSearch = (state: State) => state.questionsTablePage.search || '';
export const getSelectedQuestions = (state: State) =>
	state.questionsTablePage.selectedQuestions || [];
