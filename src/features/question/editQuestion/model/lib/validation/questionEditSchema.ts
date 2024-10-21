import * as yup from 'yup';

export const questionEditSchema = yup.object().shape({
	id: yup.number().required(),
	title: yup.string().required(),
	description: yup.string().required(),
	shortAnswer: yup.string().required(),
	longAnswer: yup.string().required(),
	rate: yup
		.number()
		.transform((value) => (Number.isNaN(value) ? null : value))
		.required(),
	specializations: yup.array().required(),
});
