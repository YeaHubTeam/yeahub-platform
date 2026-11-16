import { useTranslation } from 'react-i18next';

import { i18Namespace, VacanciesMarket } from '@/shared/config';
import { formatDate, useScreenSize } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

import { VacancyMarketOverview } from '@/entities/vacancy';

import styles from './VacancyMarketPageContentHeader.module.css';

interface VacancyMarketPageContentHeaderProps {
	updatedAt: VacancyMarketOverview['updatedAt'];
}

export const VacancyMarketPageContentHeader = ({
	updatedAt,
}: VacancyMarketPageContentHeaderProps) => {
	const { t } = useTranslation(i18Namespace.vacanciesMarket);
	const { isMobile } = useScreenSize();

	const updatedAtTitle = updatedAt
		? t(VacanciesMarket.UPDATED_AT_TITLE, {
				date: formatDate(new Date(updatedAt), 'd.MM.yyyy'),
			})
		: t(VacanciesMarket.UPDATED_AT_UNAVAILABLE);

	return (
		<Flex gap="12" direction="column">
			<Text
				isLimitSize
				variant={isMobile ? 'body5-accent' : 'head3'}
				isMainTitle
				className={styles.title}
			>
				{t(VacanciesMarket.TITLE)}
			</Text>
			<Text variant="body3-accent" className={styles.description}>
				{t(VacanciesMarket.DESCRIPTION)}
			</Text>
			<div className={styles.updated}>
				<Icon icon="calendarNoDots" size={20} color="purple-700" aria-hidden />
				<Text variant="body3-accent" color="black-500">
					{updatedAtTitle}
				</Text>
			</div>
		</Flex>
	);
};
