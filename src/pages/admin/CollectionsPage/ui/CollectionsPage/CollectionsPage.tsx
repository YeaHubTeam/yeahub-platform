import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { SelectedAdminEntities } from '@/shared/types/types';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { collectionsMock } from '@/entities/collection';

import { CollectionsTable } from '@/widgets/CollectionsTable';
import { SearchSection } from '@/widgets/SearchSection';

import { getSelectedCollections } from '../../model/selectors/collectionsPageSelectors';
import { collectionsPageActions } from '../../model/slices/collectionsPageSlice';

import styles from './CollectionsPage.module.css';

/**
 * Page showing info about all the created collections
 * @constructor
 */

const CollectionsPage = () => {
	const dispatch = useAppDispatch();
	const selectedCollections = useSelector(getSelectedCollections);
	const onSelectCollections = (ids: SelectedAdminEntities) => {
		dispatch(collectionsPageActions.setSelectedCollections(ids));
	};

	return (
		<Flex componentType="main" direction="column" gap="24">
			<SearchSection to="create" showRemoveButton={true} />
			<Card className={styles.content}>
				<CollectionsTable
					collections={collectionsMock}
					selectedCollections={selectedCollections}
					onSelectCollections={onSelectCollections}
				/>
			</Card>
		</Flex>
	);
};

export default CollectionsPage;
