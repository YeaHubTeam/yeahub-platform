import { i18n, Translation } from '@/shared/config';

import { DeleteQuestionError } from '../../model/types/deleteQuestionTypes';

export const getDeleteQuestionApiErrorMessage = (error: ApiErrorData<DeleteQuestionError>) => {
	switch (error.message) {
		case 'auth.auth.unauthorized':
			return i18n.t(Translation.TOAST_QUESTIONS_DELETE_AUTH_UNAUTHORIZED);
		case 'auth.user.verified':
			return i18n.t(Translation.TOAST_QUESTIONS_DELETE_AUTH_USER_VERIFIED);
		case 'auth.roles.author_can_change_only_own':
			return i18n.t(Translation.TOAST_QUESTIONS_DELETE_AUTH_ROLES_AUTHOR_CAN_CHANGE_ONLY_OWN);
		case 'question.question.not_found':
			return i18n.t(Translation.TOAST_QUESTIONS_DELETE_QUESTION_NOT_FOUND);
		case 'question.collection.question_in_collection':
			return i18n.t(Translation.TOAST_QUESTIONS_DELETE_QUESTION_IN_COLLECTION);
		default:
			return i18n.t(Translation.TOAST_QUESTIONS_DELETE_SINGLE_FAILED);
	}
};
