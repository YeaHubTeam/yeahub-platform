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
}

export const CollectionsContent = ({
	collections,
	pagination,
	resetFilters,
	renderDrawer,
	banner,
	filter,
}: CollectionsProps) => {
	const { t } = useTranslation(i18Namespace.collection);
	const { isSmallScreen } = useScreenSize();
	const { search } = useLocation();
	const hasActiveFilters = Object.keys(filter).some((key) => {
		if (key === 'page' || key === 'limit' || key === 'perPage') {
			return false;
		}

		const value = filter[key as keyof CollectionsFilterParams];

		if (value === undefined || value === null) {
			return false;
		}

		if (Array.isArray(value)) {
			return value.length > 0;
		}

		if (typeof value === 'string') {
			return value.trim() !== '';
		}

		return true;
	});
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
					{collections.length === 0 ? (
						hasActiveFilters ? (
							<Stub type="filter-empty" onClick={resetFilters} />
						) : (
							<Stub
								type="empty"
								title={t(Collections.NO_COLLECTIONS_TITLE)}
								subtitle={t(Collections.NO_COLLECTIONS_SUBTITLE)}
							/>
						)
					) : (
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
