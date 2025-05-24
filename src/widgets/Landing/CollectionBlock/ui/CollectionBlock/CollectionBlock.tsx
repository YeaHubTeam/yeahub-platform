import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { useScreenSize } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { AdditionalBlock } from '../AdditionalBlock/AdditionalBlock';
import { FiltersBlock } from '../FiltersBlock/FiltersBlock';
import { MainBlock } from '../MainBlock/MainBlock';

import styles from './CollectionBlock.module.css';

export const CollectionBlock = () => {
	const { t } = useTranslation(i18Namespace.landing);
	const { isMobile } = useScreenSize();

	return (
		<section className={styles['collection']} data-testid="CollectionBlock">
			<Flex gap="20" direction="column" align="center" className={styles['collection-wrapper']}>
				<div data-testid="TitleBlock" className={styles['title-block']}>
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
