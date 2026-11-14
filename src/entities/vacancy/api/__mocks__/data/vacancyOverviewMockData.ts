import { VacancyMarketOverview } from '@/entities/vacancy';

export const vacancyOverviewMockData: VacancyMarketOverview = {
	updatedAt: '2026-11-10T04:00:00.745Z',
	industry: '',
	availableIndustries: ['Ecommerce', 'FinTech'],
	totalAnalyzedVacancyCount: 116,
	specializations: [
		{
			specializationId: 20,
			name: 'Mock Java Backend Developer',
			vacancyCount: 80,
			analyzedVacancyCount: 68,
			topSkills: [
				{
					title: 'java',
					count: 64,
					percent: 94.12,
				},
				{
					title: 'postgresql',
					count: 25,
					percent: 36.76,
				},
				{
					title: 'spring framework',
					count: 18,
					percent: 26.47,
				},
				{
					title: 'apache kafka',
					count: 16,
					percent: 23.53,
				},
				{
					title: 'spring boot',
					count: 14,
					percent: 20.59,
				},
			],
			topKeywords: [
				{
					title: 'java',
					count: 12,
					percent: 17.65,
				},
				{
					title: 'spring boot',
					count: 8,
					percent: 11.76,
				},
				{
					title: 'apache kafka',
					count: 8,
					percent: 11.76,
				},
				{
					title: 'docker',
					count: 8,
					percent: 11.76,
				},
				{
					title: 'kubernetes',
					count: 8,
					percent: 11.76,
				},
			],
		},
		{
			specializationId: 23,
			name: 'Mock Golang Backend Developer',
			vacancyCount: 32,
			analyzedVacancyCount: 26,
			topSkills: [
				{
					title: 'golang',
					count: 22,
					percent: 84.62,
				},
				{
					title: 'go',
					count: 16,
					percent: 61.54,
				},
				{
					title: 'postgresql',
					count: 16,
					percent: 61.54,
				},
				{
					title: 'docker',
					count: 8,
					percent: 30.77,
				},
				{
					title: 'kafka',
					count: 8,
					percent: 30.77,
				},
			],
			topKeywords: [
				{
					title: 'go',
					count: 4,
					percent: 15.38,
				},
				{
					title: 'kubernetes',
					count: 4,
					percent: 15.38,
				},
				{
					title: 'apache kafka',
					count: 3,
					percent: 11.54,
				},
				{
					title: 'postgresql',
					count: 3,
					percent: 11.54,
				},
				{
					title: 'high-load systems',
					count: 2,
					percent: 7.69,
				},
			],
		},
		{
			specializationId: 11,
			name: 'Mock React Frontend Developer',
			vacancyCount: 28,
			analyzedVacancyCount: 22,
			topSkills: [
				{
					title: 'javascript',
					count: 19,
					percent: 86.36,
				},
				{
					title: 'typescript',
					count: 16,
					percent: 72.73,
				},
				{
					title: 'react',
					count: 15,
					percent: 68.18,
				},
				{
					title: 'git',
					count: 8,
					percent: 36.36,
				},
				{
					title: 'html',
					count: 7,
					percent: 31.82,
				},
			],
			topKeywords: [
				{
					title: 'frontend',
					count: 3,
					percent: 13.64,
				},
				{
					title: 'архитектура',
					count: 3,
					percent: 13.64,
				},
				{
					title: 'javascript',
					count: 3,
					percent: 13.64,
				},
				{
					title: 'html',
					count: 3,
					percent: 13.64,
				},
				{
					title: 'css',
					count: 3,
					percent: 13.64,
				},
			],
		},
	],
};
