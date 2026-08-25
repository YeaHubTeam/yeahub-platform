import { Vacancies } from '@/shared/config';

export const getVacancyKey = (
	count: number,
	type: 'questions' | 'tasks' | 'collections',
): string => {
	const suffix = count === 1 ? 'ONE' : count < 5 ? 'FEW' : 'MANY';
	const prefix = type === 'questions' ? 'QUESTIONS' : type === 'tasks' ? 'TASKS' : 'COLLECTIONS';
	return Vacancies[`COUNT_${prefix}_${suffix}` as keyof typeof Vacancies];
};
