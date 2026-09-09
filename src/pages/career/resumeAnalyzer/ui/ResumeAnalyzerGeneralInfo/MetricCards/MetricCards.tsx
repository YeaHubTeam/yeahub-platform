import { useTranslation } from 'react-i18next';

import { i18Namespace, Vacancies } from '@/shared/config';

import type { ResumeAnalysis } from '@/entities/vacancy';

import { MetricCard } from '../MetricCard/MetricCard';

import styles from './MetricCards.module.css';
interface MetricCardsProps {
	tasks: ResumeAnalysis['tasks'];
	keywords: ResumeAnalysis['keywords'];
	skills: ResumeAnalysis['skills'];
	priority: number;
}

export const MetricCards = ({ skills, tasks, keywords, priority }: MetricCardsProps) => {
	const { t } = useTranslation(i18Namespace.vacancies);

	const metrics = [
		{
			percent: skills.coveragePercent,
			matched: skills.totalMatched,
			total: skills.totalSkills,
			title: t(Vacancies.RESUME_ANALYZER_METRIC_SKILLS),
		},
		{
			percent: tasks.coveragePercent,
			matched: tasks.missingTasks.length,
			total: tasks.matchedTasks.length,
			title: t(Vacancies.RESUME_ANALYZER_METRIC_TASKS),
		},
		{
			percent: keywords.coveragePercent,
			matched: keywords.totalMatched,
			total: keywords.totalVacancyKeywords,
			title: t(Vacancies.RESUME_ANALYZER_METRIC_KEYWORDS),
		},
		{
			percent: priority,
			priority: priority,
			title: t(Vacancies.RESUME_ANALYZER_METRIC_PRIORITY),
		},
	];

	return (
		<div className={styles.container}>
			{metrics.map((metric) => (
				<MetricCard key={metric.title} {...metric} />
			))}
		</div>
	);
};
