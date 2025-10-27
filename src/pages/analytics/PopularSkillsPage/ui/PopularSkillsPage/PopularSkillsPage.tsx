import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Analytics } from '@/shared/config/i18n/i18nTranslations';
import { useAppSelector, useScreenSize } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';
import { Tooltip } from '@/shared/ui/Tooltip';

import { getSpecializationId } from '@/entities/profile';
import { useGetPopularSkillsQuery } from '@/entities/skill';
import { SpecializationSelect } from '@/entities/specialization';

import { PopularSkillsPageTable } from '../PopularSkillsPageTable/PopularSkillsPageTable';

import styles from './PopularSkillsPage.module.css';

export const PopularSkillsPage = () => {
	const specializationId = useAppSelector(getSpecializationId);
	const [selectedSpecId, setSelectedSpecId] = useState(specializationId);
	const { t } = useTranslation([i18Namespace.analytics]);
	const { isMobile } = useScreenSize();

	const { data: popularSkills } = useGetPopularSkillsQuery({
		limit: 3,
		page: 1,
		specializationId: selectedSpecId,
	});

	const specialization = popularSkills?.data[0].specialization.title
		.replace('Developer', '')
		.trim();

	return (
		<Card className={styles.card}>
			<Flex justify="between" align={isMobile ? 'start' : 'center'}>
				<Text variant={isMobile ? 'body5-accent' : 'body6'}>
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
			<PopularSkillsPageTable popularSkills={popularSkills?.data} />
		</Card>
	);
};
