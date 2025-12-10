import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { i18Namespace, Collections } from '@/shared/config';
import { useScreenSize } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Stub } from '@/shared/ui/Stub';
import { Text } from '@/shared/ui/Text';

import { Collection, CollectionsFilterParams } from '@/entities/collection';

import { CollectionsList } from '../CollectionsList/CollectionsList';

import styles from './CollectionsContent.module.css';

interface CollectionsProps {
	pagination: ReactNode;
	banner?: ReactNode;
	collections: Collection[];
	filter: CollectionsFilterParams;
	resetFilters: () => void;
	renderDrawer: () => ReactNode;
	hasFilters: boolean;
}

export const CollectionsContent = ({
	collections,
	pagination,
	resetFilters,
	renderDrawer,
	banner,
	hasFilters,
}: CollectionsProps) => {
	const { t } = useTranslation(i18Namespace.collection);
	const { isSmallScreen } = useScreenSize();
	const { search } = useLocation();

	const showEmptyCollectionsStub = collections.length === 0 && !hasFilters;
	const showFilterEmptyStub = collections.length === 0 && hasFilters;
	const showCollectionsList = collections.length > 0;

	return (
		<div className={styles['main-info-wrapper']}>
			<Card className={styles.content}>
				<Flex className={styles.header} direction="row" justify="between">
					<Text variant="head1" className={styles.title}>
						{t(Collections.COLLECTIONS_TITLE)}
					</Text>
					{isSmallScreen && renderDrawer()}
				</Flex>
				<Flex direction="column" gap="20">
					{showEmptyCollectionsStub && (
						<Stub
							type="empty"
							title={t(Collections.STUB_EMPTY_TITLE)}
							subtitle={t(Collections.STUB_EMPTY_SUBTITLE)}
						/>
					)}

					{showFilterEmptyStub && <Stub type="filter-empty" onClick={resetFilters} />}

					{showCollectionsList && (
						<>
							<CollectionsList collections={collections} queryFilter={search} />
							{banner}
							{pagination}
						</>
					)}
				</Flex>
			</Card>
		</div>
	);
};
