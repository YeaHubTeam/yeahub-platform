import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Specializations } from '@/shared/config/i18n/i18nTranslations';
import { Card } from '@/shared/ui/Card';
import { Table } from '@/shared/ui/Table';

import { useGetSpecializationsGeneralProgressQuery } from '@/entities/specialization';
import { SpecializationsProgress } from '@/entities/specialization';

export const SpecializationsProgressPanel = () => {
	const { t } = useTranslation([i18Namespace.specialization]);

	const { data: specializationsProgress } = useGetSpecializationsGeneralProgressQuery({});

	const renderTableHeader = () => {
		const columns = {
			specialization: t(Specializations.PROGRESS_TABLE_SPECIALIZATION),
			skillCount: t(Specializations.PROGRESS_TABLE_SKILLS),
			questionCount: t(Specializations.PROGRESS_TABLE_QUESTIONS),
			averageProgress: t(Specializations.PROGRESS_TABLE_PROGRESS),
		};

		return Object.entries(columns)?.map(([k, v]) => <td key={k}>{v}</td>);
	};

	const renderTableBody = (stats: SpecializationsProgress) => {
		const columns = {
			specialization: stats.specialization.title,
			skillCount: stats.skillCount,
			questionCount: stats.questionCount,
			averageProgress: `${stats.averageProgress}%`,
		};
		return Object.entries(columns)?.map(([k, v]) => <td key={k}>{v}</td>);
	};

	if (!specializationsProgress?.data) {
		return null;
	}

	return (
		<Card
			actionTitle={t(Specializations.PROGRESS_DETAIL)}
			actionRoute={'statsActionRoute'}
			title={t(Specializations.PROGRESS_TITLE)}
			isActionPositionBottom
		>
			<Table
				items={specializationsProgress.data}
				renderTableHeader={renderTableHeader}
				renderTableBody={renderTableBody}
			/>
		</Card>
	);
};
