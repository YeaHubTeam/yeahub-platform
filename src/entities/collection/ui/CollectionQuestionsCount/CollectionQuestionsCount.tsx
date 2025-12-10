import { useTranslation } from 'react-i18next';

import { i18Namespace, Collections } from '@/shared/config';
import { Chip } from '@/shared/ui/Chip';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { Collection } from '../../model/types/collection';

import styles from './CollectionQuestionsCount.module.css';

interface CollectionQuestionsCountProps {
	questionsCount: Collection['questionsCount'];
}

export const CollectionQuestionsCount = ({ questionsCount }: CollectionQuestionsCountProps) => {
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
