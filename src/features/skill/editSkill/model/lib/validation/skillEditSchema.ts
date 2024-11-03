import * as yup from 'yup';

export const skillEditSchema = yup.object().shape({
	id: yup.number().required(),
	title: yup.string().required(),
	description: yup.string(),
	imageSrc: yup.string().notRequired(),
	createdAt: yup.string(),
	updatedAt: yup.string(),
});
