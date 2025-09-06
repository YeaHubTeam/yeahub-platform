import { useScreenSize } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';
import { TextSkeleton } from '@/shared/ui/Text';

import { AdditionalBlockSkeleton } from '../AdditionalBlock/AdditionalBlock.skeleton';
import { FiltersBlockSkeleton } from '../FiltersBlock/FiltersBlock.skeleton';
import { MainBlockSkeleton } from '../MainBlock/MainBlock.skeleton';

import styles from './CollectionBlock.module.css';

export const CollectionBlockSkeleton = () => {
	const { isMobile } = useScreenSize();
	return (
		<section className={styles.collection}>
			<Flex gap="20" direction="column" align="center" className={styles['collection-wrapper']}>
				<div className={styles['title-block']}>
					<TextSkeleton
						width={isMobile ? 320 : 473}
						variant={isMobile ? 'body5-accent' : 'head3'}
						className={styles.title}
					/>
					<TextSkeleton width={isMobile ? 320 : 473} variant="body3" className={styles.subtitle} />
				</div>
				<FiltersBlockSkeleton />
				<MainBlockSkeleton />
				<AdditionalBlockSkeleton />
			</Flex>
		</section>
	);
};
