import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { getFromLS, LS_BANNER_NY_LANDING_KEY } from '@/shared/libs';
import { AutoScrollToTop } from '@/shared/ui/AutoScrollToTop';
import { Flex } from '@/shared/ui/Flex';
import { NYBanner } from '@/shared/ui/NYBanner';

import { CookiesWarning } from '@/widgets/Landing/CookiesWarningBlock';
import { Footer } from '@/widgets/Landing/Footer';
import { Header } from '@/widgets/Landing/Header';

import styles from './LandingLayout.module.css';
import { LandingLayoutSkeleton } from './LandingLayout.skeleton';
import { SkeletonGenerator } from './SkeletonGenerator/SkeletonGenerator';

export const LandingLayout = () => {
	const isOpenNYBanner = getFromLS(LS_BANNER_NY_LANDING_KEY);

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
								<NYBanner isOpenBanner={!isOpenNYBanner} lsKey={LS_BANNER_NY_LANDING_KEY} />
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
