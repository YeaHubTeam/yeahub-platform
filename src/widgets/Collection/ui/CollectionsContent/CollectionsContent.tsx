import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Collections } from '@/shared/config/i18n/i18nTranslations';
import { FilterFromUser, useScreenSize } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { EmptyFilterStub } from '@/shared/ui/EmptyFilterStub';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { Collection } from '@/entities/collection';

import { CollectionsList } from '../CollectionsList/CollectionsList';

import styles from './CollectionsContent.module.css';
interface CollectionsProps {
	pagination: ReactNode;
	collections: Collection[];
	filter: FilterFromUser;
	resetFilters: () => void;
	renderDrawer: () => ReactNode;
}

export const CollectionsContent = ({
	collections,
	pagination,
	filter,
	resetFilters,
	renderDrawer,
}: CollectionsProps) => {
	const { t } = useTranslation(i18Namespace.collection);
	const { isSmallScreen } = useScreenSize();

	return (
		<div className={styles['main-info-wrapper']}>
			<Card className={styles.content}>
				<Flex className={styles.header} direction="row" justify="between">
					<Text variant="head1" className={styles.title}>
						{t(Collections.COLLECTIONS_TITLE)}
					</Text>
					{isSmallScreen && renderDrawer()}
				</Flex>

				<CollectionsList collections={collections} />
				{pagination}
				{collections.length === 0 && (
					<EmptyFilterStub text={filter?.title} resetFilters={resetFilters} />
				)}
			</Card>
		</div>
	);
};
