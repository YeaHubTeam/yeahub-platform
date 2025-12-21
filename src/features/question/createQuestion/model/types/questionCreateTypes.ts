import { CreateOrEditQuestionFormValues, Question } from '@/entities/question';

export type CreateQuestionFormValues = Omit<CreateOrEditQuestionFormValues, 'id'>;

export type CreateQuestionBodyRequest = CreateQuestionFormValues;
export type CreateQuestionResponse = Question;

export type CreateQuestionsError =
	| 'auth.auth.unauthorized'
	| 'auth.user.verified'
	| 'auth.roles.admin.or.author.required'
	| 'question.user.not.found'
	| 'question.question.title.conflict';
