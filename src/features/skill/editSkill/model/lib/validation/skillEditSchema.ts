import * as yup from 'yup';

export const skillEditSchema = yup.object().shape({
	id: yup.number().required(),
	title: yup.string().required(),
	description: yup.string().required(),
	imageSrc: yup.string().required(),
	createdAt: yup.string().required(),
	updatedAt: yup.string().required(),
});
