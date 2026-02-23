import { i18n, Translation } from '@/shared/config';

import type { CreateSkillError } from '../../model/types/skillCreateTypes';

export const getCreateSkillApiErrorMessage = (error: ApiErrorData<CreateSkillError>) => {
	switch (error.message) {
		case 'auth.auth.unauthorized':
			return i18n.t(Translation.TOAST_SKILL_CREATE_AUTH_UNAUTHORIZED);
		case 'auth.user.verified':
			return i18n.t(Translation.TOAST_SKILL_CREATE_AUTH_USER_VERIFIED);
		case 'skill.user.not_found':
			return i18n.t(Translation.TOAST_SKILL_CREATE_USER_NOT_FOUND);
		case 'tinify.tinify.compress_failed':
			return i18n.t(Translation.TOAST_SKILL_CREATE_TINIFY_COMPRESS_FAILED);
		case 'skill.skill.title.conflict':
			return i18n.t(Translation.TOAST_SKILL_CREATE_TITLE_CONFLICT);
		case 'tinify.tinify.resize_failed':
			return i18n.t(Translation.TOAST_SKILL_CREATE_TINIFY_RESIZE_FAILED);
		default:
			return i18n.t(Translation.TOAST_SKILL_CREATE_FAILED);
	}
};
