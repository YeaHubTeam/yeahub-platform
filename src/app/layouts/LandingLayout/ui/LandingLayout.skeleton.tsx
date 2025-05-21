import { Flex } from '@/shared/ui/Flex';

import { FooterSkeleton } from '@/widgets/Landing/Footer';
import { HeaderSkeleton } from '@/widgets/Landing/Header';

import { SkeletonGenerator } from '../model/helper/SkeletonGenerator';

import styles from './LandingLayout.module.css';

export const LandingLayoutSkeleton = () => {
	return (
		<Flex direction="column">
			<HeaderSkeleton />
			<main className={styles.main}>
				<Flex direction="column" className={styles['main-content']}>
					<SkeletonGenerator />
				</Flex>
			</main>
			<FooterSkeleton />
		</Flex>
	);
};
