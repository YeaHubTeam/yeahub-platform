import { CreateOrEditTestQuestionFormValues, TestQuestion } from '@/entities/testQuestion';

export type CreateTestQuestionFormValues = Omit<CreateOrEditTestQuestionFormValues, 'id'>;

export type CreateTestQuestionBodyRequest = CreateTestQuestionFormValues;

export type CreateTestQuestionResponse = TestQuestion;
