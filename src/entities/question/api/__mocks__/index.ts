import { getQuestionsSpecializationByIdCountMock } from './getQuestionsSpecializationByIdCountMock';
import { questionListMock } from './questionListMock';
import { questionByIdMock } from './questionMock';
export const questionHandlers = [questionListMock, questionByIdMock];

export const quizHandlers = [getQuestionsSpecializationByIdCountMock];
