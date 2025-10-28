import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Analytics } from '@/shared/config/i18n/i18nTranslations';
import { useAppSelector, useScreenSize } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { Pagination } from '@/shared/ui/Pagination';
import { Text } from '@/shared/ui/Text';
import { Tooltip } from '@/shared/ui/Tooltip';

import { getSpecializationId } from '@/entities/profile';
import { useGetPopularSkillsQuery } from '@/entities/skill';
import { SpecializationSelect } from '@/entities/specialization';

import { PopularSkillsMobileCard } from '../PopularSkillsMobileCard/PopularSkillsMobileCard';
import { PopularSkillsPageTable } from '../PopularSkillsPageTable/PopularSkillsPageTable';

import styles from './PopularSkillsPage.module.css';

export const PopularSkillsPage = () => {
	const specializationId = useAppSelector(getSpecializationId);
	const [selectedSpecId, setSelectedSpecId] = useState(specializationId);
	const [currentPage, setCurrentPage] = useState(1);
	const { t } = useTranslation([i18Namespace.analytics]);
	const { isMobile } = useScreenSize();

	const { data: popularSkills } = useGetPopularSkillsQuery({
		limit: 10,
		page: currentPage,
		specializationId: selectedSpecId,
	});

	const totalPages =
		popularSkills?.total && popularSkills?.limit
			? Math.ceil(popularSkills.total / popularSkills.limit)
			: 0;

	const specialization = popularSkills?.data[0].specialization.title;

	const onPrevPageClick = () => {
		setCurrentPage(currentPage - 1);
	};

	const onNextPageClick = () => {
		setCurrentPage(currentPage + 1);
	};

	const onChangePage = (newPage: number) => {
		setCurrentPage(newPage);
	};

	return (
		<Card className={styles.card}>
			<Flex justify="between" align="start">
				<Text variant={isMobile ? 'body5-accent' : 'body6'} className={styles.title}>
					{t(Analytics.SKILLS_POPULARITY, { specialization })}
				</Text>
				<Tooltip
					title={t(Analytics.POPULARITY_TOOLTIP)}
					placement="bottom-start"
					className={styles.tooltip}
				>
					<Icon icon="info" size={20} color="black-600" />
				</Tooltip>
			</Flex>
			<SpecializationSelect
				onChange={(value) => setSelectedSpecId(Array.isArray(value) ? value[0] : value)}
				value={selectedSpecId}
				className={styles.dropdown}
				prefix
			/>
			<Flex direction="column" justify="center" align="center" gap="20">
				{isMobile ? (
					popularSkills?.data.map((skill) => (
						<PopularSkillsMobileCard key={skill.id} skill={skill} />
					))
				) : (
					<PopularSkillsPageTable popularSkills={popularSkills?.data} />
				)}
				<Pagination
					onPrevPageClick={onPrevPageClick}
					onNextPageClick={onNextPageClick}
					onChangePage={onChangePage}
					page={currentPage}
					totalPages={totalPages}
				/>
			</Flex>
		</Card>
	);
};
