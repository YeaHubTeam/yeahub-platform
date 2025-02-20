import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Collections } from '@/shared/config/i18n/i18nTranslations';
import { Flex } from '@/shared/ui/Flex';

import { Collection } from '@/entities/collection';
import { CollectionPreview } from '@/entities/collection';

import styles from './CollectionsList.module.css';

interface CollectionsListProps {
	collections: Collection[];
}

export const CollectionsList = ({ collections }: CollectionsListProps) => {
	const { t } = useTranslation(i18Namespace.collection);

	return (
		<>
			<h1 className={styles.title}>{t(Collections.COLLECTIONS_TITLE)}</h1>

			<Flex direction="column" gap="20">
				{collections &&
					collections.map((collection) => (
						<CollectionPreview key={collection.id} collection={collection} />
					))}
			</Flex>
		</>
	);
};
