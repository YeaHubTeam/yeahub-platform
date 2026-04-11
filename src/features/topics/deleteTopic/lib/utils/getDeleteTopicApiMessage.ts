import { i18n, Translation } from '@/shared/config';

import { DeleteTopicError } from '../../model/types/deleteTopicTypes';

export const getDeleteTopicApiErrorMessage = (error: ApiErrorData<DeleteTopicError>) => {
	switch (error.message) {
		case 'storage.image.url.invalid':
			return i18n.t(Translation.TOAST_TOPIC_DELETE_SINGLE_IMAGE_URL_INVALID);

		case 'auth.auth.unauthorized':
			return i18n.t(Translation.TOAST_TOPIC_DELETE_AUTH_UNAUTHORIZED);

		case 'auth.user.verified':
			return i18n.t(Translation.TOAST_TOPIC_DELETE_AUTH_USER_VERIFIED);

		case 'auth.roles.author_can_change_only_own':
			return i18n.t(Translation.TOAST_TOPIC_DELETE_AUTH_ROLES_AUTHOR_CAN_CHANGE_ONLY_OWN);

		case 'topic.topic.not_found':
			return i18n.t(Translation.TOAST_TOPIC_DELETE_SINGLE_NOTFOUND);

		case 'storage.image.not_found':
			return i18n.t(Translation.TOAST_TOPIC_DELETE_SINGLE_IMAGE_NOT_FOUND);

		case 'topic.question.constraint.foreign_key_violation':
		case 'topic.topic.constraint.foreign_key_violation':
			return i18n.t(Translation.TOAST_TOPIC_DELETE_CONSTRAINT_KEY_VIOLATION);

		default:
			return i18n.t(Translation.TOAST_TOPIC_DELETE_SINGLE_FAILED);
	}
};
