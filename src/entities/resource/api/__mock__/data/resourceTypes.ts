import type { ResourceType } from '../../../model/types/resource';

export const resourceTypes: ResourceType[] = [
	{ code: 'video', description: 'Видео' },
	{ code: 'podcast', description: 'Подкаст' },
	{ code: 'channel', description: 'Канал' },
	{ code: 'course', description: 'Курс' },
	{ code: 'article', description: 'Статья' },
	{ code: 'book', description: 'Книга' },
	{ code: 'guide', description: 'Гайд' },
	{ code: 'roadmap', description: 'Роадмап' },
	{ code: 'trainer', description: 'Тренажер' },
	{ code: 'game', description: 'Игра' },
	{ code: 'repository', description: 'Репозиторий' },
	{ code: 'chat', description: 'Чат' },
	{ code: 'tool', description: 'Инструмент' },
	{ code: 'documentation', description: 'Документация' },
];
