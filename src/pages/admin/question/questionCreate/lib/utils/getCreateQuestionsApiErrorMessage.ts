import { i18n, Translation } from '@/shared/config';

import { CreateQuestionsError } from '../../model/types/questionCreateTypes';

export const getCreateQuestionsApiErrorMessage = (error: ApiErrorData<CreateQuestionsError>) => {
	switch (error.message) {
		case 'auth.auth.unauthorized':
			return i18n.t(Translation.TOAST_QUESTIONS_CREATE_AUTH_UNAUTHORIZED);
		case 'auth.user.verified':
			return i18n.t(Translation.TOAST_QUESTIONS_CREATE_AUTH_USER_VERIFIED);
		case 'auth.roles.admin.or.author.required':
			return i18n.t(Translation.TOAST_QUESTIONS_CREATE_AUTH_ROLES_ADMIN_OR_AUTHOR_REQUIRED);
		case 'question.user.not.found':
			return i18n.t(Translation.TOAST_QUESTIONS_CREATE_USER_NOT_FOUND);
		case 'question.question.title.conflict':
			return i18n.t(Translation.TOAST_QUESTIONS_CREATE_QUESTION_TITLE_CONFLICT);
		default:
			return i18n.t(Translation.TOAST_QUESTION_CREATE_FAILED);
	}
};
