import classNames from 'classnames';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AutoScrollToTop } from '@/shared/ui/AutoScrollToTop';
import { Flex } from '@/shared/ui/Flex';

import { CookiesWarning } from '@/widgets/Landing/CookiesWarningBlock';
import { Footer } from '@/widgets/Landing/Footer';
import { Header } from '@/widgets/Landing/Header';

import styles from './LandingLayout.module.css';

export const LandingLayout = () => {
	return (
		<Flex direction="column">
			<Flex direction="column" className={styles.wrapper}>
				<Header />
				<main className={classNames('container', styles.main)}>
					<Suspense>
						<AutoScrollToTop>
							<Outlet />
						</AutoScrollToTop>
					</Suspense>
				</main>
			</Flex>
			<Footer />
			<CookiesWarning />
		</Flex>
	);
};
