import { Flex } from '@/shared/ui/Flex';

import { docs } from '../../model/constants';
import { DocItemSkeleton } from '../DocItem/DocItem.skeleton';

import styles from './DocsList.module.css';

export const DocsListSkeleton = () => {
	return (
		<div className={styles['docs']}>
			<Flex className={styles['docs-items']} direction="column" gap="40">
				{docs.map((doc) => (
					<DocItemSkeleton key={doc.link} />
				))}
			</Flex>
		</div>
	);
};
