import { useTranslation } from 'react-i18next';

import { i18Namespace, Analytics } from '@/shared/config';
import { TableV2, type TableColumn } from '@/shared/ui/TableV2';

import { SpecializationsProgress } from '../../model/types/specializationsProgress';

interface SpecializationProgressTableRow {
	id: number;
	number: number;
	specialization: string;
	skillCount: number;
	questionCount: number;
	averageProgress: string;
}

interface SpecializationProgressTableProps {
	specializationsProgress: SpecializationsProgress[];
	isWidget?: boolean;
}

export const SpecializationProgressTable = ({
	specializationsProgress,
	isWidget,
}: SpecializationProgressTableProps) => {
	const { t } = useTranslation(i18Namespace.analytics);

	const tableData: SpecializationProgressTableRow[] = specializationsProgress.map(
		(stats, index) => ({
			id: stats.id,
			number: index + 1,
			specialization: stats.specialization.title,
			skillCount: stats.skillCount,
			questionCount: stats.questionCount,
			averageProgress: `${stats.averageProgress}%`,
		}),
	);

	const columns: TableColumn<SpecializationProgressTableRow>[] = [
		...(!isWidget
			? [
					{
						id: 'number',
						header: t(Analytics.SPECIALIZATION_PROGRESS_TABLE_NUMBER),
						accessor: (row: SpecializationProgressTableRow) => row.number,
					},
				]
			: []),
		{
			id: 'specialization',
			header: t(Analytics.SPECIALIZATION_PROGRESS_TABLE_SPECIALIZATION),
			accessor: (row) => row.specialization,
		},
		{
			id: 'skillCount',
			header: t(Analytics.SPECIALIZATION_PROGRESS_TABLE_SKILLS),
			accessor: (row) => row.skillCount,
		},
		{
			id: 'questionCount',
			header: t(Analytics.SPECIALIZATION_PROGRESS_TABLE_QUESTIONS),
			accessor: (row) => row.questionCount,
		},
		{
			id: 'averageProgress',
			header: t(Analytics.SPECIALIZATION_PROGRESS_TABLE_PROGRESS),
			accessor: (row) => row.averageProgress,
		},
	];

	return <TableV2 data={tableData} columns={columns} getRowId={(row) => row.id} />;
};
