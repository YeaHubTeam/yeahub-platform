import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Collections } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { useGetCollectionsListQuery } from '@/entities/collection';
import { CollectionPreview } from '@/entities/collection';

import styles from './PreviewCollectionsList.module.css';

export interface PreviewCollectionsListProps {
	className?: string;
}

export const PreviewCollectionsList = ({ className }: PreviewCollectionsListProps) => {
	const { t } = useTranslation([i18Namespace.translation, i18Namespace.collection]);

	const { data: allCollections, isSuccess } = useGetCollectionsListQuery({ limit: 3 });

	const collections = allCollections?.data ?? [];

	const isEmptyCollections = isSuccess && collections.length === 0;

	if (isEmptyCollections) {
		return (
			<Text variant="body4" color="black-700" className={styles['no-collections']}>
				{t(Collections.EMPTY)}
			</Text>
		);
	}

	return (
		<Card
			className={className}
			title={t(Collections.COLLECTIONS_TITLE, { ns: i18Namespace.collection })}
			actionTitle={t(Collections.COLLECTIONS_DETAIL, { ns: i18Namespace.collection })}
			actionRoute={ROUTES.collections.route}
		>
			<Flex direction="column" gap="20" className={styles.list}>
				{collections.map((collection) => (
					<CollectionPreview key={collection.id} collection={collection} />
				))}
			</Flex>
		</Card>
	);
};
