import { useTranslation } from 'react-i18next';

import { i18Namespace, Collections, ROUTES } from '@/shared/config';
import { useAppSelector } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { useGetCollectionsListQuery, CollectionPreview } from '@/entities/collection';
import { getSpecializationId } from '@/entities/profile';

import styles from './PreviewCollectionsList.module.css';

export interface PreviewCollectionsListProps {
	className?: string;
}

export const PreviewCollectionsList = ({ className }: PreviewCollectionsListProps) => {
	const { t } = useTranslation(i18Namespace.collection);
	const specializationId = useAppSelector(getSpecializationId);

	const { data: allCollections, isSuccess } = useGetCollectionsListQuery({
		limit: 3,
		specializations: specializationId,
	});

	const collections = allCollections?.data ?? [];

	const isEmptyCollections = isSuccess && collections.length === 0;

	return (
		<Card
			className={className}
			title={t(Collections.COLLECTIONS_TITLE)}
			actionTitle={t(Collections.COLLECTIONS_DETAIL)}
			actionDisabled={isEmptyCollections}
			actionRoute={ROUTES.wiki.collections.page}
		>
			{isEmptyCollections ? (
				<Text variant="body4" color="black-700" className={styles['no-collections']}>
					{t(Collections.EMPTY)}
				</Text>
			) : (
				<Flex direction="column" gap="20" className={styles.list}>
					{collections.map((collection) => (
						<CollectionPreview key={collection.id} collection={collection} />
					))}
				</Flex>
			)}
		</Card>
	);
};
