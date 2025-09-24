import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Analytics, Translation } from '@/shared/config/i18n/i18nTranslations';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';

import { analyticsApi } from '@/entities/analytics';

import { PopularSkillsItem } from '../PopularSkillsItem/PopularSkillsItem';

import styles from './PopularSkills.module.css';

export const PopularSkills = () => {
	const { data } = analyticsApi.useGetPopularSkillsQuery();

	const { t: translations } = useTranslation(i18Namespace.translation);
	const { t: analytics } = useTranslation(i18Namespace.analytics);

	return (
		<Card
			className={styles['progress-skills-card']}
			size="medium"
			title={analytics(Analytics.TITLE_POPULAR_SKILLS)}
		>
			<Flex className={styles['flex-card']}>
				{data?.data.map((item) => (
					<PopularSkillsItem
						key={item.id}
						currentCount={item.frequencyStat}
						totalCount={100}
						title={item.skill.title}
					/>
				))}
				<NavLink to={'/'} className={styles['more-info-flex']}>
					<span>{translations(Translation.CRUMBS_QUESTION_DETAIL)}</span>
					<Icon icon="arrowRight" />
				</NavLink>
			</Flex>
		</Card>
	);
};
