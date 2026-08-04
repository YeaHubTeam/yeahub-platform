import { useTranslation } from 'react-i18next';

import { Vacancies, i18Namespace } from '@/shared/config';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';
import { TextHtml } from '@/shared/ui/TextHtml';

import type { Vacancy } from '@/entities/vacancy';

import styles from './VacancyDescription.module.css';

interface VacancyDescriptionProps {
	description: Vacancy['description'];
}

export const VacancyDescription = ({ description }: VacancyDescriptionProps) => {
	const { t } = useTranslation(i18Namespace.vacancies);

	return (
		<Flex gap="12" direction="column">
			<Text variant="body6" color="black-900" className={styles.title}>
				{t(Vacancies.DESCRIPTION_TITLE)}
			</Text>

			<Flex gap="20" direction="column">
				<TextHtml html={description} className={styles['description-content']} />
			</Flex>
		</Flex>
	);
};
