import { State } from '@/shared/config/store/State';

export const getActiveQuizQuestions = (state: State) => state.activeQuiz.questions;
