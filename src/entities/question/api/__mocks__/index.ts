import { addFavoriteQuestionMock, deleteFavoriteQuestionMock } from './favoriteQuestionMock';
import { getLearnedQuestionsMock } from './getLearnedQuestionsMock';
import { getQuestionsSpecializationByIdCountMock } from './getQuestionsSpecializationByIdCountMock';
import { mostDifficultQuestionsMock, questionListMock } from './questionListMock';
import { questionByIdMock } from './questionMock';

export const questionHandlers = [
	questionListMock,
	questionByIdMock,
	addFavoriteQuestionMock,
	deleteFavoriteQuestionMock,
];

export const quizHandlers = [getQuestionsSpecializationByIdCountMock];

export const learnedQuestionHandlers = [getLearnedQuestionsMock];

export const difficultQuestionsHandler = [mostDifficultQuestionsMock];
