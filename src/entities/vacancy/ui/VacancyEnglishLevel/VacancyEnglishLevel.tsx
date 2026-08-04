import { useTranslation } from 'react-i18next';

import { i18Namespace, Vacancies } from '@/shared/config';
import { Flex } from '@/shared/ui/Flex';
import { StatusChip } from '@/shared/ui/StatusChip';
import { Text } from '@/shared/ui/Text';

import type { VacancyEnglishLevel } from '../../model/types/vacancy';

interface VacancyEnglishProps {
	englishLevel: VacancyEnglishLevel;
}

export const VacancyEnglish = ({ englishLevel }: VacancyEnglishProps) => {
	const { t } = useTranslation(i18Namespace.vacancies);

	return (
		<Flex gap="20" direction="column">
			<Text variant="body5-accent" color="black-900">
				{t(Vacancies.ENGLISH_LEVEL)}
			</Text>
			<StatusChip status={{ text: `${englishLevel}`, variant: 'purple' }} />
		</Flex>
	);
};
