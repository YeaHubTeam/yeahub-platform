import { LearnedQuestionsResponse } from '../../../model/types';

export const learnedQuestionsMock: LearnedQuestionsResponse = {
	data: [
		{
			id: 1,
			skill: {
				id: 1,
				title: 'Python',
				description:
					'Python — это высокоуровневый язык программирования общего назначения с динамической строгой типизацией и автоматическим управлением памятью.',
				imageSrc:
					'https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/skill/python_mock_image.png',
				createdAt: '2024-06-04T13:40:16.610Z',
				updatedAt: '2025-01-18T19:39:52.495Z',
			},
			specialization: {
				id: 29,
				title: 'QA Engineer',
				description:
					'QA-тестировщик или инженер по тестированию (QA-engineer) — это специалист, который создаёт сценарии тестирования, прогнозирует сбои и находит ошибки в продуктах.',
				imageSrc: null,
				createdAt: '2024-12-13T15:37:18.095Z',
				updatedAt: '2024-12-13T15:37:18.095Z',
			},
			total: 100,
			learnedPercentage: 92,
			calculatedAt: '2024-12-12T19:16:34.726Z',
		},
		{
			id: 2,
			skill: {
				id: 2,
				title: 'JS',
				description:
					'JavaScript - популярный язык программирования, в основном используемый для создания динамических и интерактивных веб-страниц. Он необходим для разработки интерфейсов веб-приложений.',
				imageSrc:
					'https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/skill/3ded3210-32fa-4063-9b8f-a5e8f353a1c4',
				createdAt: '2024-06-04T13:40:16.610Z',
				updatedAt: '2025-03-10T17:16:46.190Z',
			},
			specialization: {
				id: 11,
				title: 'React Frontend Developer',
				description:
					'React-разработчик — это инженер-программист или веб-разработчик, который занимается фронтендом или дизайном пользовательских интерфейсов, используя библиотеку React',
				imageSrc: null,
				createdAt: '2024-10-03T09:08:10.605Z',
				updatedAt: '2024-12-13T15:29:16.935Z',
			},
			total: 100,
			learnedPercentage: 72,
			calculatedAt: '2024-12-12T19:16:34.726Z',
		},
		{
			id: 3,
			skill: {
				id: 3,
				title: 'Java',
				description:
					'Java — строго типизированный объектно-ориентированный язык программирования общего назначения, разработанный компанией Sun Microsystems.',
				imageSrc:
					'https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/skill/java_mock_image.png',
				createdAt: '2024-06-04T13:40:16.610Z',
				updatedAt: '2025-02-20T11:25:10.120Z',
			},
			specialization: {
				id: 40,
				title: 'Desktop Application Developer',
				description:
					'Разработчик настольных приложений – специалист, который создаёт кроссплатформенные или нативные программы для Windows, macOS и Linux.',
				imageSrc: null,
				createdAt: '2025-02-06T18:42:12.680Z',
				updatedAt: '2025-02-06T18:42:12.680Z',
			},
			total: 100,
			learnedPercentage: 62,
			calculatedAt: '2024-12-12T19:16:34.726Z',
		},
		{
			id: 4,
			skill: {
				id: 4,
				title: 'C++',
				description:
					'C++ — компилируемый, статически типизированный язык программирования общего назначения. Поддерживает такие парадигмы программирования, как процедурная, объектно-ориентированная и обобщённая.',
				imageSrc:
					'https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/skill/cpp_mock_image.png',
				createdAt: '2024-06-04T13:40:16.610Z',
				updatedAt: '2025-03-01T09:00:00.000Z',
			},
			specialization: {
				id: 39,
				title: 'System Software Engineer',
				description:
					'Системный программист – специалист, который разрабатывает системное ПО (ОС, драйверы, компиляторы), обеспечивая взаимодействие железа и софта.',
				imageSrc: null,
				createdAt: '2025-02-06T18:41:59.722Z',
				updatedAt: '2025-02-06T18:41:59.722Z',
			},
			total: 100,
			learnedPercentage: 32,
			calculatedAt: '2024-12-12T19:16:34.726Z',
		},
		{
			id: 5,
			skill: {
				id: 5,
				title: 'Ruby',
				description:
					'Ruby — динамический, рефлективный, интерпретируемый высокоуровневый язык программирования. Язык обладает независимой от операционной системы реализацией многопоточности.',
				imageSrc:
					'https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/skill/ruby_mock_image.png',
				createdAt: '2024-06-04T13:40:16.610Z',
				updatedAt: '2025-01-15T18:45:30.500Z',
			},
			specialization: {
				id: 25,
				title: 'Ruby Backend Developer',
				description:
					'Программисты Ruby (Ruby Developers) создают сервисную часть сайтов, корпоративные приложения, высоконагруженное программное обеспечение на языке общего назначения Ruby',
				imageSrc: null,
				createdAt: '2024-12-13T15:32:58.103Z',
				updatedAt: '2024-12-13T15:32:58.103Z',
			},
			total: 100,
			learnedPercentage: 72,
			calculatedAt: '2024-12-12T19:16:34.726Z',
		},
		{
			id: 6,
			skill: {
				id: 6,
				title: 'Kotlin',
				description:
					'Kotlin — статически типизированный язык программирования, работающий поверх JVM и разрабатываемый компанией JetBrains. Официальный язык для разработки под Android.',
				imageSrc:
					'https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/skill/kotlin_mock_image.png',
				createdAt: '2024-06-04T13:40:16.610Z',
				updatedAt: '2025-04-10T12:00:00.000Z',
			},
			specialization: {
				id: 27,
				title: 'Android Mobile Developer',
				description:
					'Android-developer или андроид-разработчик — программист, который создает программное обеспечение (ПО) для операционной системы Android.',
				imageSrc: null,
				createdAt: '2024-12-13T15:34:12.455Z',
				updatedAt: '2024-12-13T15:34:12.455Z',
			},
			total: 100,
			learnedPercentage: 92,
			calculatedAt: '2024-12-12T19:16:34.726Z',
		},
	],
	page: 1,
	limit: 10,
	total: 6,
};
