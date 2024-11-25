import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Flex } from '@/shared/ui/Flex';

import { docs } from '../../model/constants';
import { DockProps } from '../../model/types/types';
import { DocItem } from '../DocItem/DocItem';

import styles from './Docs.module.css';

export const Docs = () => {
	const { t } = useTranslation(i18Namespace.docs);

	return (
		<div className={styles['docs']}>
			<Flex className={styles['docs-items']} direction="column" gap="40">
				{docs.map((doc: DockProps) => (
					<DocItem key={doc.link} name={t(doc.name)} link={doc.link} />
				))}
			</Flex>
		</div>
	);
};
