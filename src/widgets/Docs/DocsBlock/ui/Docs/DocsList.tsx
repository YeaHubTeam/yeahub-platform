import { Flex } from '@/shared/ui/Flex';

import { docs } from '../../model/constants';
import { DocItem } from '../DocItem/DocItem';

import styles from './DocsList.module.css';

export const DocsList = () => {
	return (
		<div className={styles['docs']}>
			<Flex className={styles['docs-items']} direction="column" gap="40">
				{docs.map((doc) => (
					<DocItem key={doc.link} doc={doc} />
				))}
			</Flex>
		</div>
	);
};
