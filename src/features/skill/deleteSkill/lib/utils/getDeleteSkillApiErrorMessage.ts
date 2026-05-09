import { i18n, Translation } from '@/shared/config';

import type { DeleteSkillError } from '../../model/types/DeleteSkillErrorTypes';

export const getDeleteSkillApiErrorMessage = (error: ApiErrorData<DeleteSkillError>) => {
	switch (error.message) {
		case 'storage.image.url.invalid':
			return i18n.t(Translation.TOAST_SKILLS_DELETE_SINGLE_STORAGE_IMAGE_URL_INVALID);

		case 'storage.image.not_found':
			return i18n.t(Translation.TOAST_SKILLS_DELETE_SINGLE_STORAGE_IMAGE_NOT_FOUND);

		case 'auth.auth.unauthorized':
			return i18n.t(Translation.TOAST_SKILLS_DELETE_SINGLE_AUTH_UNAUTHORIZED);

		case 'auth.user.verified':
			return i18n.t(Translation.TOAST_SKILLS_DELETE_SINGLE_AUTH_USER_VERIFIED);

		case 'skill.skill.not_found':
			return i18n.t(Translation.TOAST_SKILLS_DELETE_SINGLE_SKILL_NOT_FOUND);

		case 'skill.skill.constraint.foreign_key_violation':
			return i18n.t(Translation.TOAST_SKILLS_DELETE_SINGLE_SKILL_CONSTRAINT_FOREIGN_KEY_VIOLATION);

		case 'skill.specialization.constraint.foreign_key_violation':
			return i18n.t(
				Translation.TOAST_SKILLS_DELETE_SINGLE_SPECIALIZATION_CONSTRAINT_FOREIGN_KEY_VIOLATION,
			);

		case 'skill.question.constraint.foreign_key_violation':
			return i18n.t(
				Translation.TOAST_SKILLS_DELETE_SINGLE_QUESTION_CONSTRAINT_FOREIGN_KEY_VIOLATION,
			);

		case 'skill.profile.constraint.foreign_key_violation':
			return i18n.t(
				Translation.TOAST_SKILLS_DELETE_SINGLE_PROFILE_CONSTRAINT_FOREIGN_KEY_VIOLATION,
			);

		default:
			return i18n.t(Translation.TOAST_SKILLS_DELETE_SINGLE_FAILED);
	}
};
