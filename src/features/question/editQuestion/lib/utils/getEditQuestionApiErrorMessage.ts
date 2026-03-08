import { i18n, Translation } from '@/shared/config';

import { EditQuestionError } from '../../model/types/questionEditPageTypes';

export const getEditQuestionApiErrorMessage = (error: ApiErrorData<EditQuestionError>) => {
	switch (error.message) {
		case 'auth.auth.unauthorized':
			return i18n.t(Translation.TOAST_QUESTION_EDIT_AUTH_UNAUTHORIZED);
		case 'auth.user.verified':
			return i18n.t(Translation.TOAST_QUESTION_EDIT_AUTH_USER_VERIFIED);
		case 'auth.roles.author_can_change_only_own':
			return i18n.t(Translation.TOAST_QUESTION_EDIT_AUTH_ROLES_AUTHOR_CAN_CHANGE_ONLY_OWN);
		case 'question.question.not_found':
			return i18n.t(Translation.TOAST_QUESTION_EDIT_QUESTION_NOT_FOUND);
		case 'question.question.internal':
			return i18n.t(Translation.TOAST_QUESTION_EDIT_QUESTION_INTERNAL);
	}
};
