import { useScreenSize } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';

import { VacancyMarketOverview } from '@/entities/vacancy';

import { VacancyMarketNote } from '@/pages/career/vacancyMarket/ui/VacancyMarketNote/VacancyMarketNote';
import { VacancyMarketSpecializationList } from '@/pages/career/vacancyMarket/ui/VacancyMarketSpecializationList/VacancyMarketSpecializationList';

import { VacancyMarketPageContentHeader } from '../VacancyMarketPageContentHeader/VacancyMarketPageContentHeader';

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
