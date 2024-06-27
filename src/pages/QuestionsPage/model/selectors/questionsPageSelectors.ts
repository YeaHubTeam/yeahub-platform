import { State } from '@/shared/config/store/State';

export const getQuestionsPageNum = (state: State) => state.questionsPage.page || 1;
