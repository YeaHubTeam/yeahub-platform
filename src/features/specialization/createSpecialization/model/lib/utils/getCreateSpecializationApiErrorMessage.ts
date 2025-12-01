import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';

import { CreateSpecializationError } from '@/features/specialization/createSpecialization/model/types/specializationCreateTypes';

export const getCreateSpecializationApiErrorMessage = (
	error: ApiErrorData<CreateSpecializationError>,
) => {
	switch (error.message) {
		case 'specialization.specialization.title.conflict':
			return 'Специализация с таким названием уже существует';
		default:
			return i18n.t(Translation.TOAST_SPECIALIZATION_CREATE_FAILED);
	}
};
