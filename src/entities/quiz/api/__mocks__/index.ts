import { createNewQuizMock } from '@/entities/quiz/api/__mocks__/createNewQuizMock';

import interviewPreparationQuizzesActiveHandler from './interviewPreparationQuizzesActiveHandler';

export const interviewHandlers = [interviewPreparationQuizzesActiveHandler, createNewQuizMock];
