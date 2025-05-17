import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Collections } from '@/shared/config/i18n/i18nTranslations';
import { FilterFromUser } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { EmptyStub } from '@/shared/ui/EmptyStub';

import { Collection } from '@/entities/collection';

import { CollectionsList } from '../CollectionsList/CollectionsList';

import styles from './CollectionsContent.module.css';
interface CollectionsProps {
	pagination: ReactNode;
	collections: Collection[];
	filter: FilterFromUser;
	resetFilters: () => void;
}

export const CollectionsContent = ({
	collections,
	pagination,
	filter,
	resetFilters,
}: CollectionsProps) => {
	const { t } = useTranslation(i18Namespace.collection);

	return (
		<div className={styles['main-info-wrapper']}>
			<Card className={styles.content}>
				<h1 className={styles.title}>{t(Collections.COLLECTIONS_TITLE)}</h1>

				<CollectionsList collections={collections} />
				{pagination}
				{collections.length === 0 && <EmptyStub text={filter?.title} resetFilters={resetFilters} />}
			</Card>
		</div>
	);
};
