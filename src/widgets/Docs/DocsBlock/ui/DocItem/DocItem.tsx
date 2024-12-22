import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import ArrowRight from '@/shared/assets/icons/arrowRight.svg';
import { i18Namespace } from '@/shared/config/i18n';
import { Docs } from '@/shared/config/i18n/i18nTranslations';
import { Button } from '@/shared/ui/Button/ui/Button';
import { Flex } from '@/shared/ui/Flex/ui/Flex';

import { DockItem } from '../../model/types/types';

import styles from './DocItem.module.css';

interface DocItemProps {
	doc: DockItem;
}

export const DocItem = ({ doc }: DocItemProps) => {
	const { t } = useTranslation(i18Namespace.docs);

	return (
		<Flex className={styles['doc-item']} justify="between" align="center">
			<p className={styles['doc-item-name']}>{t(doc.name)}</p>
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
