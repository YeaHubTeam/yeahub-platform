import { i18n, Translation } from '@/shared/config';

import { TopicEditError } from '../../model/types/topicEditErrorTypes';

export const getEditTopicApiErrorMessage = (error: ApiErrorData<TopicEditError>) => {
	switch (error.message) {
		case 'auth.auth.unauthorized':
			return i18n.t(Translation.TOAST_TOPIC_EDIT_AUTH_UNAUTHORIZED);

		case 'auth.user.verified':
			return i18n.t(Translation.TOAST_TOPIC_EDIT_AUTH_USER_VERIFIED);

		case 'auth.roles.author_can_change_only_own':
			return i18n.t(Translation.TOAST_TOPIC_EDIT_AUTH_AUTHOR_CAN_CHANGE_ONLY_OWN);

		case 'topic.topic.not_found':
			return i18n.t(Translation.TOAST_TOPIC_EDIT_TOPIC_NOT_FOUND);

		case 'topic.topic.title.conflict':
			return i18n.t(Translation.TOAST_TOPIC_EDIT_TOPIC_TITLE_CONFLICT);

		case 'tinify.tinify.compress_failed':
			return i18n.t(Translation.TOAST_TOPIC_EDIT_TINIFY_COMPRESS_FAILED);

		case 'tinify.tinify.resize_failed':
			return i18n.t(Translation.TOAST_TOPIC_EDIT_TINIFY_RESIZE_FAILED);

		default:
			return i18n.t(Translation.TOAST_TOPIC_EDIT_FAILED);
	}
};
