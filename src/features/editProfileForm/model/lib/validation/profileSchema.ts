import * as yup from 'yup';

export const profileSchema = yup.object().shape({
	image: yup
		.mixed<FileList>()
		.optional()
		.transform((value, originalValue) => {
			if (value === '') {
				return null;
			}
			return originalValue;
		})
		.nullable()
		.test('fileSize', 'Файл слишком велик', (value) => {
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

	// таб Личная информация
	name: yup.string().required('Имя обязательно'),
	specialization: yup.string().required('Специализация обязательна'),
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
		.optional()
		.transform((value, originalValue) => {
			if (value === '') {
				return null;
			}
			return originalValue;
		})
		.nullable()
		.email('Неверный формат электронной почты'),
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
		.nullable()
		.min(5, 'Ваш уровень должен содержать как минимум 5 символов')
		.max(255, 'Уровень не может превышать 255 символов'),
	socials: yup
		.string()
		.optional()
		.transform((value, originalValue) => {
			if (value === '') {
				return null;
			}
			return originalValue;
		})
		.nullable()
		.test(
			'links format',
			'Ссылки на соц. сети должны быть в формате https://... или http://...',
			(value) => {
				if (!value) {
					return true;
				}
				const links = value.split(',');
				return links.every((link) => /^https?:\/\//.test(link));
			},
		),

	// таб Обо мне
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

	// таб Навыки
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

	// таб Проекты
	projectName: yup.string().required('Название проекта обязательно'),
	projectLink: yup
		.string()
		.required('Ссылка на проект обязательна')
		.test('links format', 'Ссылка должна быть в формате https://... или http://...', (value) => {
			if (!value) return true;
			return /^https?:\/\//.test(value.trim());
		}),
	projectDescription: yup.string().required('Описание проекта обязательно'),

	// таб Опыт работы
	companyName: yup.string().required('Место работы обязательно'),
	position: yup.string().required('Позиция обязательна'),
	employmentType: yup.string().required('Занятость обязательна'),
	experienceStartDate: yup
		.date()
		.required('Начало работы обязательно')
		.typeError('Начало работы обязательно'),
	experienceEndDate: yup
		.date()
		.required('Окончание работы обязательно')
		.typeError('Окончание работы обязательно'),

	// таб Образование
	educationalInstitution: yup.string().required('Учебное заведение обязательно'),
	level: yup.string().required('Уровень обязателен'),
	specialty: yup.string().required('Специальность обязательна'),
	educationStartDate: yup
		.date()
		.required('Начало обучения обязательно')
		.typeError('Начало обучения обязательно'),
	educationEndDate: yup
		.date()
		.required('Начало обучения обязательно')
		.typeError('Конец обучения обязателен')
		.transform((value, originalValue) => {
			if (!value) return null;
			return originalValue;
		})
		.nullable(),
});
