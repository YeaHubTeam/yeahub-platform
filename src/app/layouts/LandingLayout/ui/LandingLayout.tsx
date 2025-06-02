import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AutoScrollToTop } from '@/shared/ui/AutoScrollToTop';
import { Flex } from '@/shared/ui/Flex';

import { CookiesWarning } from '@/widgets/Landing/CookiesWarningBlock';
import { Footer } from '@/widgets/Landing/Footer';
import { Header } from '@/widgets/Landing/Header';

import { SkeletonGenerator } from '../model/helper/SkeletonGenerator';

import styles from './LandingLayout.module.css';
import { LandingLayoutSkeleton } from './LandingLayout.skeleton';

export const LandingLayout = () => {
	return (
		<Flex direction="column">
			<Suspense fallback={<LandingLayoutSkeleton />}>
				<Header />
				<AutoScrollToTop>
					<main className={styles.main}>
						<Flex direction="column" className={styles['main-content']}>
							<Suspense fallback={<SkeletonGenerator />}>
								<Outlet />
							</Suspense>
						</Flex>
					</main>
				</AutoScrollToTop>
				<Footer />
			</Suspense>
			<CookiesWarning />
		</Flex>
	);
};
