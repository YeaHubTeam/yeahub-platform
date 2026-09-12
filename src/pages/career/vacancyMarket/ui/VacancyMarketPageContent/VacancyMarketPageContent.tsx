import { useScreenSize } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';

import { VacancyMarketOverview } from '@/entities/vacancy';

import { VacancyMarketNote } from '../VacancyMarketNote/VacancyMarketNote';
import { VacancyMarketPageContentHeader } from '../VacancyMarketPageContentHeader/VacancyMarketPageContentHeader';
import { VacancyMarketSpecializationList } from '../VacancyMarketSpecializationList/VacancyMarketSpecializationList';

interface VacancyMarketPageContentProps {
	vacancyMarket: VacancyMarketOverview;
}

export const VacancyMarketPageContent = ({ vacancyMarket }: VacancyMarketPageContentProps) => {
	const { isMobile } = useScreenSize();

	return (
		<Flex direction="column" gap={isMobile ? '10' : '20'}>
			<VacancyMarketPageContentHeader updatedAt={vacancyMarket.updatedAt} />
			<VacancyMarketNote totalAnalyzedVacancyCount={vacancyMarket.totalAnalyzedVacancyCount} />
			<VacancyMarketSpecializationList specializations={vacancyMarket.specializations} />
		</Flex>
	);
};
