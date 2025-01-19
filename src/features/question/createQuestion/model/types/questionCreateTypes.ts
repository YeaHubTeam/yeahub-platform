import { CreateOrEditQuestionFormValues, Question } from '@/entities/question';

export type CreateQuestionFormValues = Omit<CreateOrEditQuestionFormValues, 'id'>;

export type CreateQuestionBodyRequest = CreateQuestionFormValues;
export type CreateQuestionResponse = Question;
