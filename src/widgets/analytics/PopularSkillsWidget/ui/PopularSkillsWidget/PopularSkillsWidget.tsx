import { useTranslation } from 'react-i18next';

import { i18Namespace, Analytics, ROUTES } from '@/shared/config';
import { useAppSelector } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { getSpecializationId } from '@/entities/profile';
import { useGetPopularSkillsQuery } from '@/entities/skill';

import { PopularSkillItem } from '../PopularSkillItem/PopularSkillItem';

import styles from './PopularSkillsWidget.module.css';

const PopularSkillsWidget = () => {
	const { t } = useTranslation(i18Namespace.analytics);

	const specializationId = useAppSelector(getSpecializationId);

	const { data } = useGetPopularSkillsQuery({ limit: 3, page: 1, specializationId });

	return (
		<Card
			className={styles['popular-skills-card']}
			size="medium"
			title={t(Analytics.POPULAR_SKILLS_TITLE_ALL)}
			actionRoute={ROUTES.analytics['popular-skills'].page}
			isActionPositionBottom
		>
			<Flex direction="column" gap="12">
				{data?.data
					.slice(0, 3)
					.map((item) => (
						<PopularSkillItem
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

export default PopularSkillsWidget;
