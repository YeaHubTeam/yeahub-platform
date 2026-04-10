import { GetLanguagesResponse } from '@/entities/programmingLanguage/model/types/programmingLanguage';

export const programmingLanguagesMock: GetLanguagesResponse = [
	{
		id: 54,
		name: 'C++',
		version: 'GCC 9.4.0',
		monacoLangId: 'cpp',
		fileExtension: '.cpp',
		isActive: true,
		imageSrc:
			'https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/skill/c8bd243b-be4e-4cb1-9eb1-153028e7d04a',
		defaultPreloadedCode: null,
	},
	{
		id: 60,
		name: 'Go',
		version: '1.18.0',
		monacoLangId: 'go',
		fileExtension: '.go',
		isActive: true,
		imageSrc:
			'https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/skill/450a5eb7-9486-4ed6-b549-95502d6f7a5b',
		defaultPreloadedCode:
			'package main\n\nimport (\n    "encoding/json" // Для формирования JSON-лога\n    "fmt"           // Для вывода в консоль\n)\n',
	},
	{
		id: 62,
		name: 'Java',
		version: 'OpenJDK 13.0.1',
		monacoLangId: 'java',
		fileExtension: '.java',
		isActive: true,
		imageSrc:
			'https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/skill/71281b57-2c0d-4c09-abf4-4c456cdae362',
		defaultPreloadedCode: 'import java.util.*;\nimport java.util.stream.*;',
	},
	{
		id: 63,
		name: 'JavaScript',
		version: 'Node.js 18.15.0',
		monacoLangId: 'javascript',
		fileExtension: '.js',
		isActive: true,
		imageSrc:
			'https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/skill/4bc13320-d4bf-48cd-918f-32b46f7a6175',
		defaultPreloadedCode: null,
	},
	{
		id: 71,
		name: 'Python',
		version: '3.10.0',
		monacoLangId: 'python',
		fileExtension: '.py',
		isActive: true,
		imageSrc:
			'https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/skill/865523d3-4546-4380-afe2-494313bf307d',
		defaultPreloadedCode: null,
	},
	{
		id: 72,
		name: 'Ruby',
		version: '3.0.0',
		monacoLangId: 'ruby',
		fileExtension: '.rb',
		isActive: true,
		imageSrc:
			'https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/skill/3759ff1b-bf0b-4e46-ad1b-a4ea7774f984',
		defaultPreloadedCode: null,
	},
];
