import { useScreenSize } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';

import { SpecializationCardSkeleton } from '@/widgets/Landing/SpecialityBlock/ui/SpecializationCard/SpecializationCard.skeleton';

import styles from './SpecializationBlock.module.css';

export const SpecializationBlockSkeleton = () => {
	const { isMobile, isDesktopS } = useScreenSize();

	return (
		<Flex direction="column" className={styles.container}>
			<Skeleton
				height={isMobile ? 24 : 39}
				width={isMobile ? 330 : '50%'}
				className={styles.title}
			/>

			<ul className={styles['cards-list']}>
				{Array.from({ length: 8 }).map((_, index) => (
					<li key={index}>
						<SpecializationCardSkeleton />
					</li>
				))}
			</ul>

			{(isMobile || isDesktopS) && <Skeleton height={40} width={240} className={styles.button} />}
		</Flex>
	);
};
