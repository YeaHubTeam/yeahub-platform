import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Analytics } from '@/shared/config/i18n/i18nTranslations';
import { Table } from '@/shared/ui/Table';

import { SpecializationsProgress } from '@/entities/specialization';

interface SpecializationProgressTableProps {
	specializationsProgress: SpecializationsProgress[];
	isWidget?: boolean;
}

export const SpecializationProgressTable = ({
	specializationsProgress,
	isWidget,
}: SpecializationProgressTableProps) => {
	const { t } = useTranslation(i18Namespace.analytics);

	const renderTableHeader = () => {
		const columns = {
			...(!isWidget && { number: t(Analytics.SPECIALIZATION_PROGRESS_TABLE_NUMBER) }),
			specialization: t(Analytics.SPECIALIZATION_PROGRESS_TABLE_SPECIALIZATION),
			skillCount: t(Analytics.SPECIALIZATION_PROGRESS_TABLE_SKILLS),
			questionCount: t(Analytics.SPECIALIZATION_PROGRESS_TABLE_QUESTIONS),
			averageProgress: t(Analytics.SPECIALIZATION_PROGRESS_TABLE_PROGRESS),
		};

		return Object.entries(columns)?.map(([k, v]) => <td key={k}>{v}</td>);
	};

	const renderTableBody = (stats: SpecializationsProgress, index?: number) => {
		const columns = {
			...(!isWidget && typeof index === 'number' && { number: ++index }),
			specialization: stats.specialization.title,
			skillCount: stats.skillCount,
			questionCount: stats.questionCount,
			averageProgress: `${stats.averageProgress}%`,
		};
		return Object.entries(columns)?.map(([k, v]) => <td key={k}>{v}</td>);
	};

	const renderTableColumnWidths = () => {
		const columnWidths = {
			...(!isWidget && { number: '50px' }),
			specialization: 'auto',
			skillCount: '120px',
			questionCount: '120px',
			averageProgress: '120px',
		};
		return Object.values(columnWidths)?.map((width, index) => (
			<col key={index} style={{ width }} />
		));
	};

	return (
		<Table
			items={specializationsProgress}
			renderTableHeader={renderTableHeader}
			renderTableBody={renderTableBody}
			renderTableColumnWidths={renderTableColumnWidths}
		/>
	);
};
