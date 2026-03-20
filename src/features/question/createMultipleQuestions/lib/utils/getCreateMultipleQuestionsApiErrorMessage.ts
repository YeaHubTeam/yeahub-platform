import { i18n, Translation, Questions } from '@/shared/config';

import { CreateMultipleQuestionsError } from '../../model/types/createMultipleQuestionsTypes';

export const getCreateMultipleQuestionsApiErrorMessage = (
	error: ApiErrorData<CreateMultipleQuestionsError>,
) => {
	switch (error?.message) {
		case 'auth.auth.unauthorized':
			return i18n.t(Translation.TOAST_QUESTIONS_CREATE_AUTH_UNAUTHORIZED);
		case 'auth.user.verified':
			return i18n.t(Translation.TOAST_QUESTIONS_CREATE_AUTH_USER_VERIFIED);
		case 'auth.roles.admin.or.author.required':
			return i18n.t(Translation.TOAST_QUESTIONS_CREATE_AUTH_ROLES_ADMIN_OR_AUTHOR_REQUIRED);
		case 'question.user.not.found':
			return i18n.t(Translation.TOAST_QUESTIONS_CREATE_USER_NOT_FOUND);
		default:
			return i18n.t(Translation.TOAST_QUESTIONS_CREATE_MULTIPLE_FAILED);
	}
};

export const getGeneratedQuestionsApiErrorMessage = (
	generationError: string | null,
	savingError: string | null,
) => {
	console.log('generationError', generationError);
	console.log('savingError', savingError);
	if (generationError) {
		return generationError;
	}

	switch (savingError) {
		case 'question.question.title.conflict':
			return i18n.t(Questions.GENERATED_QUESTIONS_ERRORS_TITLE_CONFLICT);
		default:
			return i18n.t(Translation.TOAST_QUESTIONS_CREATE_MULTIPLE_FAILED);
	}
};
