import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Collections } from '@/shared/config/i18n/i18nTranslations';
import { FilterFromUser, useScreenSize } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Stub } from '@/shared/ui/Stub';
import { Text } from '@/shared/ui/Text';

import { Collection } from '@/entities/collection';

import { CollectionsList } from '../CollectionsList/CollectionsList';

import styles from './CollectionsContent.module.css';

interface CollectionsProps {
	pagination: ReactNode;
	banner?: ReactNode;
	collections: Collection[];
	filter: FilterFromUser;
	resetFilters: () => void;
	renderDrawer: () => ReactNode;
}

export const CollectionsContent = ({
	collections,
	pagination,
	resetFilters,
	renderDrawer,
	banner,
}: CollectionsProps) => {
	const { t } = useTranslation(i18Namespace.collection);
	const { isSmallScreen } = useScreenSize();
	const { search } = useLocation();
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
					<CollectionsList collections={collections} queryFilter={search} />
					{banner}
					{pagination}
					{collections.length === 0 && <Stub type={'filter-empty'} onClick={resetFilters} />}
				</Flex>
			</Card>
		</div>
	);
};
