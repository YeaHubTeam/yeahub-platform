import { useLocation } from 'react-router-dom';

import { useScreenSize } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';

import {
	filterSpecializationsOverviewByIds,
	getSpecializationIdsByIndustry,
	getUniqueIndustries,
	VacancyMarketOverview,
	VacancyMarketSpecializationItem,
} from '@/entities/vacancy';

import { VacancyMarketNote } from '../VacancyMarketNote/VacancyMarketNote';
import { VacancyMarketPageContentHeader } from '../VacancyMarketPageContentHeader/VacancyMarketPageContentHeader';
import { VacancyMarketSpecializationList } from '../VacancyMarketSpecializationList/VacancyMarketSpecializationList';

interface VacancyMarketPageContentProps {
	vacancyMarket: VacancyMarketOverview;
	specializations: VacancyMarketSpecializationItem[];
}

export const VacancyMarketPageContent = ({
	vacancyMarket,
	specializations,
}: VacancyMarketPageContentProps) => {
	const { isMobile } = useScreenSize();

	const location = useLocation();
	const currentIndustry = location.hash ? location.hash.replace('#', '') : 'all';

	const availableIndustries = getUniqueIndustries(specializations);

	const filteredSpecializationsOverview =
		currentIndustry !== 'all'
			? filterSpecializationsOverviewByIds(
					vacancyMarket.specializations,
					getSpecializationIdsByIndustry(specializations, currentIndustry),
				)
			: vacancyMarket.specializations;

	return (
		<Flex direction="column" gap={isMobile ? '10' : '20'}>
			<VacancyMarketPageContentHeader
				updatedAt={vacancyMarket.updatedAt}
				availableIndustries={availableIndustries}
			/>
			<VacancyMarketNote totalAnalyzedVacancyCount={vacancyMarket.totalAnalyzedVacancyCount} />
			<VacancyMarketSpecializationList specializations={filteredSpecializationsOverview} />
		</Flex>
	);
};
