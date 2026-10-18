import { CreateOrEditTestQuestionFormValues, TestQuestion } from '@/entities/testQuestion';

export type EditTestQuestionFormValues = CreateOrEditTestQuestionFormValues;

export type EditTestQuestionBodyRequest = EditTestQuestionFormValues;

export type EditTestQuestionResponse = TestQuestion;
