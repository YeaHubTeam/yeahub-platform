import { i18n, Translation } from '@/shared/config';

import { EditArticleError } from '../../model/types/articleEditTypes';

export const getEditArticleApiErrorMessage = (error: ApiErrorData<EditArticleError>) => {
	switch (error.message) {
		case 'article.article.body.empty':
			return i18n.t(Translation.TOAST_ARTICLE_EDIT_BODY_EMPTY);

		case 'article.article.relations.required':
			return i18n.t(Translation.TOAST_ARTICLE_EDIT_RELATIONS_REQUIRED);

		case 'storage.image.invalid_format':
			return i18n.t(Translation.TOAST_ARTICLE_EDIT_IMAGE_INVALID_FORMAT);

		case 'auth.auth.unauthorized':
			return i18n.t(Translation.TOAST_ARTICLE_EDIT_AUTH_UNAUTHORIZED);

		case 'auth.user.verified':
			return i18n.t(Translation.TOAST_ARTICLE_EDIT_AUTH_USER_VERIFIED);

		case 'auth.roles.admin_or_author_required':
			return i18n.t(Translation.TOAST_ARTICLE_EDIT_AUTH_ROLES_ADMIN_OR_AUTHOR_REQUIRED);

		case 'auth.roles.author_can_change_only_own':
			return i18n.t(Translation.TOAST_ARTICLE_EDIT_AUTH_ROLES_AUTHOR_CAN_CHANGE_ONLY_OWN);

		case 'article.article.not_found':
			return i18n.t(Translation.TOAST_ARTICLE_EDIT_ARTICLE_NOT_FOUND);

		case 'article.specialization.not_found':
			return i18n.t(Translation.TOAST_ARTICLE_EDIT_SPECIALIZATION_NOT_FOUND);

		case 'article.skill.not_found':
			return i18n.t(Translation.TOAST_ARTICLE_EDIT_SKILL_NOT_FOUND);

		case 'article.question.not_found':
			return i18n.t(Translation.TOAST_ARTICLE_EDIT_QUESTION_NOT_FOUND);

		case 'article.test_question.not_found':
			return i18n.t(Translation.TOAST_ARTICLE_EDIT_TEST_QUESTION_NOT_FOUND);

		case 'article.task.not_found':
			return i18n.t(Translation.TOAST_ARTICLE_EDIT_TASK_NOT_FOUND);

		case 'storage.image.too_large':
			return i18n.t(Translation.TOAST_ARTICLE_EDIT_IMAGE_TOO_LARGE);

		default:
			return i18n.t(Translation.TOAST_ARTICLE_EDIT_FAILED);
	}
};
