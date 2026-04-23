import { i18n, Translation } from '@/shared/config';

import type { TopicCreateError } from '../../model/types/topicCreateErrorTypes';

export const getCreateTopicsApiErrorMessage = (error: ApiErrorData<TopicCreateError>) => {
	switch (error.message) {
		case 'auth.auth.unauthorized':
			return i18n.t(Translation.TOAST_TOPIC_CREATE_AUTH_UNAUTHORIZED);

		case 'auth.user.verified':
			return i18n.t(Translation.TOAST_TOPIC_CREATE_AUTH_USER_VERIFIED);

		case 'topic.skill.not_found':
			return i18n.t(Translation.TOAST_TOPIC_CREATE_TOPIC_SKILL_NOT_FOUND);

		case 'topic.topic.title.conflict':
			return i18n.t(Translation.TOAST_TOPIC_CREATE_TOPIC_TITLE_CONFLICT);

		case 'tinify.tinify.compress_failed':
			return i18n.t(Translation.TOAST_TOPIC_CREATE_TINIFY_COMPRESS_FAILED);

		case 'tinify.tinify.resize_failed':
			return i18n.t(Translation.TOAST_TOPIC_CREATE_TINIFY_RESIZE_FAILED);

		default:
			return i18n.t(Translation.TOAST_TOPIC_CREATE_FAILED);
	}
};
