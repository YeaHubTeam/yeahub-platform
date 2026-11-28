import { Translation } from '@/shared/config';

import { CreateTopicError } from '../../model/types/topicCreateTypes';

export const getCreateTopicApiErrorMessage = (
	error: ApiErrorData<CreateTopicError>,
): Translation => {
	switch (error.message) {
		case 'auth.auth.unauthorized':
			return Translation.TOAST_TOPIC_CREATE_AUTH_UNAUTHORIZED;
		case 'auth.user.verified':
			return Translation.TOAST_TOPIC_CREATE_AUTH_USER_VERIFIED;
		case 'auth.roles.admin_or_author_required':
			return Translation.TOAST_TOPIC_CREATE_AUTH_ROLES_ADMIN_OR_AUTHOR_REQUIRED;
		case 'topic.topic.title.conflict':
			return Translation.TOAST_TOPIC_CREATE_TITLE_CONFLICT;
		default:
			return Translation.TOAST_TOPIC_CREATE_FAILED;
	}
};
