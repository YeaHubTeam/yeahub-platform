import * as yup from 'yup';

import { EditSpecializationFormValues } from '../../types/specializationEditPageTypes';

export const specializationEditSchema: yup.ObjectSchema<EditSpecializationFormValues> = yup
	.object()
	.shape({
		id: yup.number().required(),
		title: yup.string().required(),
		description: yup.string().required(),
		imageSrc: yup.string().nullable(),
		createdAt: yup.string().required(),
		updatedAt: yup.string().required(),
	});
