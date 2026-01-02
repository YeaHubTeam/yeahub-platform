import { CreateOrEditQuestionFormValues, Question } from '@/entities/question';

export type EditQuestionFormValues = CreateOrEditQuestionFormValues;

export type EditQuestionBodyRequest = EditQuestionFormValues;
export type EditQuestionResponse = Question;
