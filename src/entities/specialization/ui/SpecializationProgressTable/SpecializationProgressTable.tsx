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

	const numberColumn: TableColumn<SpecializationProgressTableRow> = {
		id: 'number',
		header: t(Analytics.SPECIALIZATION_PROGRESS_TABLE_NUMBER),
	};

	const columns: TableColumn<SpecializationProgressTableRow>[] = [
		...(!isWidget ? [numberColumn] : []),
		{
			id: 'specialization',
			header: t(Analytics.SPECIALIZATION_PROGRESS_TABLE_SPECIALIZATION),
		},
		{
			id: 'skillCount',
			header: t(Analytics.SPECIALIZATION_PROGRESS_TABLE_SKILLS),
		},
		{
			id: 'questionCount',
			header: t(Analytics.SPECIALIZATION_PROGRESS_TABLE_QUESTIONS),
		},
		{
			id: 'averageProgress',
			header: t(Analytics.SPECIALIZATION_PROGRESS_TABLE_PROGRESS),
		},
	];

	return <TableV2 data={tableData} columns={columns} />;
};
