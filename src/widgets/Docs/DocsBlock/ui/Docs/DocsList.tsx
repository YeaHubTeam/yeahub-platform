import { Flex } from '@/shared/ui/Flex';

import { docs } from '../../model/constants';
import { DocsTFunction } from '../../model/types/types';
import { DocItem } from '../DocItem/DocItem';

import styles from './DocsList.module.css';

interface DocsListProps {
	t: DocsTFunction;
}

export const DocsList = ({ t }: DocsListProps) => {
	return (
		<div className={styles['docs']}>
			<Flex className={styles['docs-items']} direction="column" gap="40">
				{docs.map((doc) => (
					<DocItem key={doc.link} doc={doc} t={t} />
				))}
			</Flex>
		</div>
	);
};
