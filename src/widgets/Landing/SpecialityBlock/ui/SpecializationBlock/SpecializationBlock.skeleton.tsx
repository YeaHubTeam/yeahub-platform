import { useScreenSize } from '@/shared/hooks';
import { ButtonSkeleton } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { TextSkeleton } from '@/shared/ui/Text';

import { SpecializationCardSkeleton } from '@/widgets/Landing/SpecialityBlock/ui/SpecializationCard/SpecializationCard.skeleton';

import styles from './SpecializationBlock.module.css';

export const SpecializationBlockSkeleton = () => {
	const { isMobile, isDesktopS } = useScreenSize();

	return (
		<Flex direction="column" className={styles.container}>
			<TextSkeleton
				variant={isMobile ? 'body5-accent' : 'head3'}
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

			{(isMobile || isDesktopS) && <ButtonSkeleton fullWidth className={styles.button} />}
		</Flex>
	);
};
