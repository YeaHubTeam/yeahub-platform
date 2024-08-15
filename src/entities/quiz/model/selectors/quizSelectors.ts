import { State } from '@/shared/config/store/State';

export const getActiveQuizzes = (state: State) => state.activeQuizzes.quizzes;
