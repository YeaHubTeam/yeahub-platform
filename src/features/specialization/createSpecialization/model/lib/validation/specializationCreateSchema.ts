import * as yup from 'yup';

import { CreateSpecializationFormValues } from '../../types/specializationCreateTypes';

export const specializationCreateSchema: yup.ObjectSchema<CreateSpecializationFormValues> = yup
	.object()
	.shape({
		title: yup.string().required(),
		description: yup.string().required(),
		imageSrc: yup.string(),
	});
