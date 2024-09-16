import * as yup from 'yup';

export const profileSchema = yup.object().shape({
	image: yup
		.mixed<FileList>()
		.optional()
		.test('fileSize', 'Большой размер файла', (value) => {
			if (value && value.length > 0) {
				return value[0].size <= 2000000; // 2MB
			}
			return true;
		})
		.test('fileType', 'Неверный формат файла', (value) => {
			if (value && value.length > 0) {
				return ['image/jpeg', 'image/png', 'image/gif'].includes(value[0].type);
			}
			return true;
		}),
	firstName: yup
		.string()
		.required('Имя обязательно')
		.min(4, 'Должно быть больше 4 символов')
		.max(30, 'Должно быть меньше 30 символов'),
	lastName: yup
		.string()
		.required('Имя обязательно')
		.min(4, 'Должно быть больше 4 символов')
		.max(30, 'Должно быть меньше 30 символов'),
	specialization: yup.number().required('Выбор специализации обязателен'),
	phone: yup
		.string()
		.optional()
		.transform((value, originalValue) => {
			if (value === '') {
				return null;
			}
			return originalValue;
		})
		.nullable()
		.matches(/^\+7-\(\d{3}\)-\d{3}-\d{2}-\d{2}$/, 'Неверный формат телефона'),
	email: yup
		.string()
		.email('Неверный формат электронной почты')
		.required('Электронная почта обязательна'),
	location: yup
		.string()
		.optional()
		.transform((value, originalValue) => {
			if (value === '') {
				return null;
			}
			return originalValue;
		})
		.nullable()
		.min(5, 'Локация должна состоять как минимум из 5 символов')
		.max(255, 'Локация не может превышать 255 символов'),

	skillLevel: yup
		.string()
		.optional()
		.transform((value, originalValue) => {
			if (value === '') {
				return null;
			}
			return originalValue;
		})
		.nullable(),
	socialNetworks: yup
		.array()
		.of(
			yup.object().shape({
				code: yup
					.string()
					.oneOf(['instagram', 'linkedin', 'twitter', 'github', 'behance', 'whatsapp', 'telegram']),
				title: yup.string(),
			}),
		)
		.optional()
		.transform((value, originalValue) => {
			if (value === '') {
				return null;
			}
			return originalValue;
		})
		.nullable(),
	aboutMe: yup
		.string()
		.optional()
		.transform((value, originalValue) => {
			if (value === '') {
				return null;
			}
			return originalValue;
		})
		.nullable(),
	skills: yup
		.array()
		.optional()
		.transform((value, originalValue) => {
			if (value === '') {
				return null;
			}
			return originalValue;
		})
		.nullable(),
});
