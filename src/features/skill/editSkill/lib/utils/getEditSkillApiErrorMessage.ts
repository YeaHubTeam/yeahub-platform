import { i18n, Translation } from '@/shared/config';

import { EditSkillError } from '../../model/types/skillEditPageTypes';

export const getEditSkillApiErrorMessage = (error: ApiErrorData<EditSkillError>) => {
	switch (error.message) {
		case 'auth.auth.unauthorized':
			return i18n.t(Translation.TOAST_SKILL_EDIT_AUTH_UNAUTHORIZED);
		case 'auth.user.verified':
			return i18n.t(Translation.TOAST_SKILL_EDIT_AUTH_USER_VERIFIED);
		case 'skill.skill.not_found':
			return i18n.t(Translation.TOAST_SKILL_EDIT_SKILL_NOT_FOUND);
		case 'skill.skill.title.conflict':
			return i18n.t(Translation.TOAST_SKILL_EDIT_SKILL_TITLE_CONFLICT);
		case 'tinify.tinify.compress_failed':
			return i18n.t(Translation.TOAST_SKILL_EDIT_TINIFY_COMPRESS_FAILED);
		case 'tinify.tinify.resize_failed':
			return i18n.t(Translation.TOAST_SKILL_EDIT_TINIFY_RESIZE_FAILED);
	}
};
