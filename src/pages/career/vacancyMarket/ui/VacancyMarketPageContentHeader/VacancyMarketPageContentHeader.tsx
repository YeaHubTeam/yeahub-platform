import { useScreenSize } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';

import { VacancyMarketOverview } from '@/entities/vacancy';

import { IndustryTabs } from '@/widgets/IndustryTabs';

import { VacancyMarketPageContentHeaderInfo } from '../VacancyMarketPageContentHeaderInfo/VacancyMarketPageContentHeaderInfo';

import styles from './VacancyMarketPageContentHeader.module.css';

interface VacancyMarketPageContentHeaderProps {
	updatedAt: VacancyMarketOverview['updatedAt'];
	availableIndustries: string[];
}

export const VacancyMarketPageContentHeader = ({
	updatedAt,
	availableIndustries,
}: VacancyMarketPageContentHeaderProps) => {
	const { isMobile, isTablet } = useScreenSize();

	return (
		<Flex direction={isMobile || isTablet ? 'column' : 'row'} className={styles.header}>
			<VacancyMarketPageContentHeaderInfo updatedAt={updatedAt} isMobile={isMobile} />
			<IndustryTabs availableIndustries={availableIndustries} />
		</Flex>
	);
};
