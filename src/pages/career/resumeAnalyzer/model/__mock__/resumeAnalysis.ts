import { ResumeAnalyzeByPortraitResponse } from '@/pages/career/resumeAnalyzer/model/types/resumeAnalyzer';

export const resumeAnalysis: ResumeAnalyzeByPortraitResponse = {
	overall: {
		score: 74,
		label: 'good',
	},
	analyzedVacancyCount: 212,
	skillsVacancyCount: 132,
	keywords: {
		coveragePercent: 62.5,
		matchedKeywords: [
			{
				title: 'react',
				percent: 83.33,
			},
		],
		missingKeywords: [
			{
				title: 'react',
				percent: 83.33,
			},
		],
		criticalKeywords: [
			{
				title: 'react',
				percent: 83.33,
			},
		],
		optionalKeywords: [
			{
				title: 'react',
				percent: 83.33,
			},
		],
		totalVacancyKeywords: 50,
		totalMatched: 31,
		recommendations: ['string'],
	},
	skills: {
		coveragePercent: 68,
		matchedSkills: [
			{
				title: 'react',
				percent: 83.33,
			},
		],
		missingSkills: [
			{
				title: 'react',
				percent: 83.33,
			},
		],
		totalSkills: 25,
		totalMatched: 17,
	},
	tasks: {
		matchedTasks: [
			{
				title: 'проектировать архитектуру',
				evidence: 'проектировал систему модулей',
				matchType: 'partial',
				score: 0.5,
			},
		],
		recommendations: ['string'],
		coveragePercent: 48.3,
		missingTasks: ['string'],
	},
	profile: {
		projectScopeSignals: ['string'],
		missingProjectElements: ['string'],
		hasStackSection: true,
		matchedExtraSignals: [
			{
				title: 'проектировать архитектуру',
				evidence: 'проектировал систему модулей',
			},
		],
		missingExtraSignals: [
			{
				title: 'проектировать архитектуру',
				evidence: 'проектировал систему модулей',
			},
		],
		weaklySupportedSignals: [
			{
				title: 'проектировать архитектуру',
				evidence: 'проектировал систему модулей',
			},
		],
		presentSections: ['string'],
		missingSections: ['string'],
		recommendations: ['string'],
		quantifiedAchievementsPercent: 40,
		quantifiedAchievements: [
			{
				text: 'Ускорил загрузку приложения на 40%',
				comment: 'Оптимизировал бандл и уменьшил время загрузки интерфейса',
			},
		],
		unquantifiedAchievements: [
			{
				text: 'Ускорил загрузку приложения на 40%',
				comment: 'Оптимизировал бандл и уменьшил время загрузки интерфейса',
			},
		],
		totalAchievements: 8,
		extraMatchPercent: 55,
		coveredExtraCount: 7,
		totalExtraCount: 10,
		profileQualityScore: 72,
		hasProjectScope: true,
		hasStructuredResume: true,
	},
} as ResumeAnalyzeByPortraitResponse;
