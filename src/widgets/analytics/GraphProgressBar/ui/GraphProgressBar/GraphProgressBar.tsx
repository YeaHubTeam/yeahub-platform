import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { useAppSelector } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { getSpecializationId } from '@/entities/profile';
import { useGetPopularSkillsQuery } from '@/entities/skill';
import { DEFAULT_SPECIALIZATION_ID } from '@/entities/specialization';

import { ProgressBarItem } from '../ProgressBarItem/ProgressBarItem';

import styles from './GraphProgressBar.module.css';

interface GraphProgressBarProps {
	direction: 'row' | 'column';
	title: string;
}

export const GraphProgressBar = ({ direction, title }: GraphProgressBarProps) => {
	const specializationId = useAppSelector(getSpecializationId) || DEFAULT_SPECIALIZATION_ID;

	const { data } = useGetPopularSkillsQuery({ limit: 3, page: 1, specializationId });

	const { t } = useTranslation(i18Namespace.translation);

	const isSmallScreen = useMediaQuery({ maxWidth: 1440 });

	const itemsToShow =
		isSmallScreen && direction === 'column' ? 4 : !isSmallScreen && direction === 'column' ? 6 : 3;

	return (
		<Card
			className={styles[direction]}
			size="medium"
			title={title}
			actionTitle={t(Translation.CRUMBS_QUESTION_DETAIL)}
			actionRoute="/"
			isActionPositionBottom
		>
			<Flex direction={direction === 'column' ? 'row' : 'column'} justify="center" gap="12">
				{data?.data
					.slice(0, itemsToShow)
					.map((item) => (
						<ProgressBarItem
							key={item.id}
							direction={direction}
							currentCount={item.frequencyStat}
							totalCount={100}
							title={item.skill.title}
						/>
					))}
			</Flex>
		</Card>
	);
};
