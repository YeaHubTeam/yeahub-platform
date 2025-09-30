import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Specializations } from '@/shared/config/i18n/i18nTranslations';
import { Card } from '@/shared/ui/Card';
import { Table } from '@/shared/ui/Table';

import { SpecializationProgress } from '@/entities/specialization';

import styles from './SpecializationsProgress.module.css';

type SpecializationsProgressProps = {
	className?: string;
};

export const SpecializationsProgress = (className: SpecializationsProgressProps) => {
	const { t } = useTranslation([i18Namespace.specialization]);

	const mockData = [
		{ id: 1, title: 'ml', skillCount: 10, questionCount: 10, averageProgress: 10 },
		{ id: 2, title: 'frontend', skillCount: 12, questionCount: 12, averageProgress: 20 },
		{ id: 3, title: 'androidDev', skillCount: 13, questionCount: 10, averageProgress: 30 },
		{ id: 4, title: 'gameDevelopment', skillCount: 14, questionCount: 10, averageProgress: 40 },
		{ id: 5, title: 'dataScience', skillCount: 15, questionCount: 10, averageProgress: 50 },
		{ id: 6, title: 'testing', skillCount: 15, questionCount: 10, averageProgress: 50 },
	];

	const renderTableHeader = () => {
		const columns = {
			specialization: t(Specializations.PROGRESS_TABLE_SPECIALIZATION),
			skillCount: t(Specializations.PROGRESS_TABLE_SKILLS),
			questionCount: t(Specializations.PROGRESS_TABLE_QUESTIONS),
			averageProgress: t(Specializations.PROGRESS_TABLE_PROGRESS),
		};

		return Object.entries(columns)?.map(([k, v]) => (
			<td key={k} className={styles['table-header']}>
				{v}
			</td>
		));
	};

	const renderTableBody = (questionsStats: SpecializationProgress) => {
		const columns = {
			specialization: questionsStats.title,
			skillCount: questionsStats.skillCount,
			questionCount: questionsStats.questionCount,
			averageProgress: questionsStats.averageProgress,
		};
		return Object.entries(columns)?.map(([k, v]) => (
			<td key={k}>{k === 'averageProgress' ? `${v}%` : v}</td>
		));
	};

	return (
		<Card
			className={classNames(styles.card, className)}
			actionTitle={'Подробнее'}
			actionRoute={'statsActionRoute'}
			title={t(Specializations.PROGRESS_TITLE)}
			isActionPositionBottom
		>
			<Table
				items={mockData}
				renderTableHeader={renderTableHeader}
				renderTableBody={renderTableBody}
			/>
		</Card>
	);
};
