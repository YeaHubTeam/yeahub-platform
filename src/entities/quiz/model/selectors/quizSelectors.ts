import { State } from '@/shared/config/store/State';

export const getActiveQuizQuestions = (state: State) => state.activeQuiz.questions;
export const getActiveQuiz = (state: State) => state.activeQuiz.quiz;
