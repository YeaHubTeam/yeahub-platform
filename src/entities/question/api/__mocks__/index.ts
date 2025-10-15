import { getLearnedQuestionsMock } from './getLearnedQuestionsMock';
import { getQuestionsSpecializationByIdCountMock } from './getQuestionsSpecializationByIdCountMock';
import { mostDifficultQuestionsMock, questionListMock } from './questionListMock';
import { questionByIdMock } from './questionMock';

export const questionHandlers = [questionListMock, questionByIdMock];

export const quizHandlers = [getQuestionsSpecializationByIdCountMock];

export const learnedQuestionHandlers = [getLearnedQuestionsMock];

export const difficultQuestionsHandler = [mostDifficultQuestionsMock];
