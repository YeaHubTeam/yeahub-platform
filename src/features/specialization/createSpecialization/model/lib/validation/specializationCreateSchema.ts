import * as yup from 'yup';

export const specializationCreateSchema = yup.object().shape({
	title: yup.string().required(),
	description: yup.string().required(),
	imageSrc: yup.string(),
});
