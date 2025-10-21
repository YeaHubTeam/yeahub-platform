import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Analytics, Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { useAppSelector } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { getSpecializationId } from '@/entities/profile';
import { useGetPopularSkillsQuery } from '@/entities/skill';
import { DEFAULT_SPECIALIZATION_ID } from '@/entities/specialization';

import { ProgressBarItem } from '../ProgressBarItem/ProgressBarItem';

import styles from './PopularSkills.module.css';

const PopularSkills = () => {
	const specializationId = useAppSelector(getSpecializationId) || DEFAULT_SPECIALIZATION_ID;

	const { data } = useGetPopularSkillsQuery({ limit: 3, page: 1, specializationId });

	const { t } = useTranslation([i18Namespace.translation, i18Namespace.analytics]);
	return (
		<Card
			className={styles['popular-skills-card']}
			size="medium"
			title={t(Analytics.TITLE_POPULAR_SKILLS, { ns: i18Namespace.analytics })}
			actionTitle={t(Translation.CRUMBS_QUESTION_DETAIL, { ns: i18Namespace.translation })}
			actionRoute={ROUTES.analytics.skills.page}
			isActionPositionBottom
		>
			<Flex direction="column" gap="12">
				{data?.data
					.slice(0, 3)
					.map((item) => (
						<ProgressBarItem
							key={item.id}
							currentCount={item.frequencyStat}
							totalCount={100}
							title={item.skill.title}
						/>
					))}
			</Flex>
		</Card>
	);
};

export default PopularSkills;
