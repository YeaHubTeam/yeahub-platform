import * as yup from 'yup';

export const collectionCreateSchema = yup
	.object({
		title: yup.string().required('Название коллекции обязательно'),
		description: yup.string().required('Описание обязательно'),
	})
	.required();
