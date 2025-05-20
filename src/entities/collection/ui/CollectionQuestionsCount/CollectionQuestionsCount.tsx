import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Collections } from '@/shared/config/i18n/i18nTranslations';
import { Chip } from '@/shared/ui/Chip';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { Collection } from '../../model/types/collection';

import styles from './CollectionQuestionsCount.module.css';

export const CollectionQuestionsCount = ({
	questionsCount,
}: Pick<Collection, 'questionsCount'>) => {
	const { t } = useTranslation(i18Namespace.collection);

	return (
		<Flex direction="column" gap="8">
			<Text variant="body3" color="black-700">
				{t(Collections.QUESTIONS_ADDITIONAL_INFO)}
			</Text>
			<Chip label={String(questionsCount)} active className={styles.chip} />
		</Flex>
	);
};
