import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { VacancyKeywordsList } from '@/entities/vacancy';
import type { VacancyMarketTopItem } from '@/entities/vacancy';

interface VacancyMarketKeywordsProps {
	keywords: VacancyMarketTopItem[];
	title: string;
}

export const VacancyMarketKeywords = ({ keywords, title }: VacancyMarketKeywordsProps) => {
	return (
		<Flex componentType="section" direction="column" gap="12">
			<Text variant="body3-accent" color="black-500">
				{title}
			</Text>
			<VacancyKeywordsList keywords={keywords.map(({ title }) => title)} topCount={1} />
		</Flex>
	);
};
