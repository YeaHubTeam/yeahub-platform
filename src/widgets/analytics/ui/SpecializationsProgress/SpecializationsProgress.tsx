import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Specializations } from '@/shared/config/i18n/i18nTranslations';
import { Card } from '@/shared/ui/Card';
import { Table } from '@/shared/ui/Table';

import { useGetGeneralProgressQuery } from '../../api/specializationProgressApi';
import { SpecializationProgress } from '../../model/types/specializationProgress';

export const SpecializationsProgress = () => {
	const { t } = useTranslation([i18Namespace.specialization]);

	const data = useGetGeneralProgressQuery({});
	console.log(data);

	const mockData = [
		{
			id: 1,
			skillCount: 10,
			questionCount: 20,
			averageProgress: 10,
			specialization: {
				id: 1,
				title: 'ml',
				description: 'frontend + backend',
				imageSrc: null,
				createdAt: '2024-12-31T10:00:00.000Z',
				updatedAt: '2024-12-31T10:00:00.000Z',
			},
		},
		{
			id: 1,
			skillCount: 12,
			questionCount: 30,
			averageProgress: 30,
			specialization: {
				id: 1,
				title: 'frontend',
				description: 'frontend + backend',
				imageSrc: null,
				createdAt: '2024-12-31T10:00:00.000Z',
				updatedAt: '2024-12-31T10:00:00.000Z',
			},
		},
		{
			id: 1,
			skillCount: 13,
			questionCount: 40,
			averageProgress: 40,
			specialization: {
				id: 1,
				title: 'androidDev',
				description: 'frontend + backend',
				imageSrc: null,
				createdAt: '2024-12-31T10:00:00.000Z',
				updatedAt: '2024-12-31T10:00:00.000Z',
			},
		},
	];

	const renderTableHeader = () => {
		const columns = {
			specialization: t(Specializations.PROGRESS_TABLE_SPECIALIZATION),
			skillCount: t(Specializations.PROGRESS_TABLE_SKILLS),
			questionCount: t(Specializations.PROGRESS_TABLE_QUESTIONS),
			averageProgress: t(Specializations.PROGRESS_TABLE_PROGRESS),
		};

		return Object.entries(columns)?.map(([k, v]) => <td key={k}>{v}</td>);
	};

	const renderTableBody = (stats: SpecializationProgress) => {
		const columns = {
			specialization: stats.specialization.title,
			skillCount: stats.skillCount,
			questionCount: stats.questionCount,
			averageProgress: `${stats.averageProgress}%`,
		};
		return Object.entries(columns)?.map(([k, v]) => <td key={k}>{v}</td>);
	};

	return (
		<Card
			actionTitle={t(Specializations.PROGRESS_DETAIL)}
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
