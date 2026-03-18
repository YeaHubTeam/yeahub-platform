import { useTranslation } from 'react-i18next';

import { i18Namespace, Collections } from '@/shared/config';
import { Chip } from '@/shared/ui/Chip';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { Collection } from '../../model/types/collection';

import styles from './CollectionTasksCount.module.css';

interface CollectionTasksCountProps {
	tasksCount: Collection['tasksCount'];
}

export const CollectionTasksCount = ({ tasksCount }: CollectionTasksCountProps) => {
	const { t } = useTranslation(i18Namespace.collection);

	return (
		<Flex direction="column" gap="8">
			<Text variant="body3" color="black-700">
				{t(Collections.TASKS_ADDITIONAL_INFO)}
			</Text>
			<Chip label={String(tasksCount)} active className={styles.chip} />
		</Flex>
	);
};
