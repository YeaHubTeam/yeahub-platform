import { Flex } from '@/shared/ui/Flex';

import { FooterSkeleton } from '@/widgets/Landing/Footer';
import { HeaderSkeleton } from '@/widgets/Landing/Header';

import { SkeletonGenerator } from '../model/helper/SkeletonGenerator';

import styles from './LandingLayout.module.css';

export const LandingLayoutSkeleton = () => {
	return (
		<Flex dataTestId={'LandingLayoutSkeleton_Wrapper'} direction="column">
			<HeaderSkeleton />
			<main data-testid={'LandingLayoutSkeleton_Main'} className={styles.main}>
				<Flex
					dataTestId={'LandingLayoutSkeleton_MainContent'}
					direction="column"
					className={styles['main-content']}
				>
					<SkeletonGenerator />
				</Flex>
			</main>
			<FooterSkeleton />
		</Flex>
	);
};
