import { CreateOrEditQuestionFormValues, Question } from '@/entities/question';

export type EditQuestionFormValues = CreateOrEditQuestionFormValues;

export type EditQuestionBodyRequest = EditQuestionFormValues;
export type EditQuestionResponse = Question;

export type EditQuestionError =
	| 'auth.auth.unauthorized'
	| 'auth.user.verified'
	| 'auth.roles.author_can_change_only_own'
	| 'question.question.not_found'
	| 'question.question.internal';
