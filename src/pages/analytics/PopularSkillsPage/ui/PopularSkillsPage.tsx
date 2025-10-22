import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Analytics } from '@/shared/config/i18n/i18nTranslations';
import { useAppSelector } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { Table } from '@/shared/ui/Table';

import { getSpecializationId } from '@/entities/profile';
import { PopularSkill, useGetPopularSkillsQuery } from '@/entities/skill';
import { DEFAULT_SPECIALIZATION_ID } from '@/entities/specialization';

export const PopularSkillsPage = () => {
	const specializationId = useAppSelector(getSpecializationId) || DEFAULT_SPECIALIZATION_ID;
	const { t } = useTranslation([i18Namespace.skill]);

	const { data: popularSkills } = useGetPopularSkillsQuery({ limit: 3, page: 1, specializationId });

	const renderTableHeader = () => {
		const columns = {
			number: '№',
			skills: t(Analytics.SKILLS_TABLE_SKILLS),
			popularity: t(Analytics.SKILLS_TABLE_POPULARITY),
		};

		return Object.entries(columns)?.map(([k, v]) => <td key={k}>{v}</td>);
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
		<Card title={'Популярность навыков в квизах для Python разработчика'}>
			<Table
				items={popularSkills?.data || []}
				renderTableHeader={renderTableHeader}
				renderTableBody={renderTableBody}
			/>
		</Card>
	);
};
