import { useTranslation } from 'react-i18next';

import { i18Namespace, Landing } from '@/shared/config';
import { useScreenSize } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { AdditionalBlock } from '../CollectionAdditionalBlock/AdditionalBlock';
import { MainBlock } from '../CollectionMainBlock/MainBlock';
import { FiltersBlock } from '../FiltersBlock/FiltersBlock';

import styles from './CollectionBlock.module.css';

export const CollectionBlock = () => {
	const { t } = useTranslation(i18Namespace.landing);
	const { isMobile } = useScreenSize();

	return (
		<section data-testid="CollectionBlock">
			<Flex gap="20" direction="column" align="center" className={styles['collection-wrapper']}>
				<div data-testid="CollectionBlock_TitleBlock" className={styles['title-block']}>
					<Text variant={isMobile ? 'body5-accent' : 'head3'} className={styles.title}>
						{t(Landing.COLLECTION_TITLE).toUpperCase()}
					</Text>
					<Text variant="body3" className={styles.subtitle}>
						{t(Landing.COLLECTION_SUBTITLE)}
					</Text>
				</div>
				<FiltersBlock />
				<MainBlock />
				<AdditionalBlock />
			</Flex>
		</section>
	);
};
