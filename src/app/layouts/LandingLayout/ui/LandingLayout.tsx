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
		<Flex dataTestId="LandingLayout_Wrapper" direction="column">
			<Suspense fallback={<LandingLayoutSkeleton />}>
				<Header />
				<AutoScrollToTop>
					<main data-testid="LandingLayout_Main" className={styles.main}>
						<Flex
							dataTestId="LandingLayout_MainContent"
							direction="column"
							className={styles['main-content']}
						>
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
