import * as yup from 'yup';

import { CreateCollectionFormValues } from '../../types/collectionCreateTypes';

export const collectionCreateSchema: yup.ObjectSchema<CreateCollectionFormValues> = yup
	.object()
	.shape({
		questions: yup.array().of(yup.number().required()).required(),
	});
