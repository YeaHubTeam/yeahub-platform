import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import ArrowRight from '@/shared/assets/icons/arrowRight.svg';
import { Docs, i18Namespace } from '@/shared/config';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { DockItem } from '../../model/types/types';

import styles from './DocItem.module.css';

interface DocItemProps {
	doc: DockItem;
}

export const DocItem = ({ doc }: DocItemProps) => {
	const { t } = useTranslation(i18Namespace.docs);

	return (
		<Flex className={styles['doc-item']} justify="between" align="center">
			<Text variant="body3-accent">{t(doc.name)}</Text>
			<div className={styles['doc-link']}>
				<NavLink to={doc.link} target="_blank">
					<Button style={{ borderRadius: '12px' }} variant="link-purple">
						{t(Docs.LINK)}
						<ArrowRight style={{ width: '20px', height: '20px' }} />
					</Button>
				</NavLink>
			</div>
		</Flex>
	);
};
