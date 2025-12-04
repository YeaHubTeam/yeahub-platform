import { useTranslation } from 'react-i18next';

import { i18Namespace, Analytics } from '@/shared/config';
import { Table } from '@/shared/ui/Table';

import { PopularSkill } from '@/entities/skill';

interface PopularSkillsPageTableProps {
	popularSkills?: PopularSkill[];
}

export const PopularSkillsPageTable = ({ popularSkills }: PopularSkillsPageTableProps) => {
	const { t } = useTranslation([i18Namespace.analytics]);

	const renderTableHeader = () => {
		const columns = {
			number: '№',
			skills: t(Analytics.POPULAR_SKILLS_TABLE_SKILLS),
			popularity: t(Analytics.POPULAR_SKILLS_TABLE_POPULARITY),
		};

		return Object.entries(columns)?.map(([k, v]) => <td key={k}>{v}</td>);
	};

	const renderTableColumnWidths = () => {
		const columnWidths = {
			number: '4%',
			skills: '84%',
			popularity: '12%',
		};

		return Object.values(columnWidths)?.map((width, idx) => <col key={idx} style={{ width }} />);
	};

	const renderTableBody = (stats: PopularSkill, index?: number) => {
		const columns = {
			number: typeof index === 'number' ? index + 1 : 1,
			skills: stats.skill.title,
			popularity: `${stats.frequencyStat}%`,
		};
		return Object.entries(columns)?.map(([k, v]) => <td key={k}>{v}</td>);
	};

	return (
		<Table
			items={popularSkills || []}
			renderTableHeader={renderTableHeader}
			renderTableBody={renderTableBody}
			renderTableColumnWidths={renderTableColumnWidths}
		/>
	);
};
