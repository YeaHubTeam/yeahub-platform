import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import ArrowRight from '@/shared/assets/icons/arrowRight.svg';
import { i18Namespace } from '@/shared/config/i18n';
import { Docs as DocsI18n } from '@/shared/config/i18n/i18nTranslations';
import { Button } from '@/shared/ui/Button/ui/Button';
import { Flex } from '@/shared/ui/Flex/ui/Flex';

import { DockProps } from '../../model/types/types';

import styles from './DocItem.module.css';

export const DocItem = ({ name, link }: DockProps) => {
	const { t } = useTranslation(i18Namespace.docs);

	return (
		<Flex className={styles['doc-item']} justify="between" align="center">
			<p className={styles['doc-item-name']}>{name}</p>
			<div className={styles['doc-link']}>
				<NavLink to={link} target="_blank">
					<Button style={{ borderRadius: '12px' }} variant="link-purple">
						{t(DocsI18n.TITLE)}
						<ArrowRight style={{ width: '20px', height: '20px' }} />
					</Button>
				</NavLink>
			</div>
		</Flex>
	);
};
