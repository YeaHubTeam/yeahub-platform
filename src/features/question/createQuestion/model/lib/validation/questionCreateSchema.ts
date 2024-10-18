import * as yup from 'yup';

export const questionCreateSchema = yup.object().shape({
	status: yup.string(),
	title: yup.string().required(),
	description: yup.string().required(),
	shortAnswer: yup.string().required(),
	longAnswer: yup.string().required(),
	imageSrc: yup.string(),
	rate: yup
		.number()
		.transform((value) => (Number.isNaN(value) ? null : value))
		.required(),
	complexity: yup
		.number()
		.transform((value) => (Number.isNaN(value) ? null : value))
		.required(),
	skills: yup.array().required(),
	specializations: yup.array().required(),
});
