import { Suspense } from 'react';

import { AutoScrollToTop } from '@/shared/ui/AutoScrollToTop';
import { Flex } from '@/shared/ui/Flex';

import { CookiesWarning } from '@/widgets/NewLanding/CookiesWarningBlock';
import { Footer } from '@/widgets/NewLanding/Footer';
import { Header } from '@/widgets/NewLanding/Header';
import { Main } from '@/widgets/NewLanding/Main/Main';

import { SkeletonGenerator } from '../model/helper/SkeletonGenerator';

export const LandingLayout = () => {
	return (
		<Flex direction="column">
			<Header />
			<Suspense fallback={<SkeletonGenerator />}>
				<AutoScrollToTop>
					<Main />
				</AutoScrollToTop>
			</Suspense>
			<Footer />
			<CookiesWarning />
		</Flex>
	);
};
