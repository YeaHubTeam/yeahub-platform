import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AutoScrollToTop } from '@/shared/ui/AutoScrollToTop';

import { CookiesWarning } from '@/widgets/Landing/CookiesWarningBlock';
import { Footer } from '@/widgets/Landing/Footer';
import { Header } from '@/widgets/Landing/Header';

import styles from './LandingLayout.module.css';

export const LandingLayout = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles['header-background']}>
				<div className={styles.container}>
					<Header />
				</div>
			</div>
			<div className={styles.container}>
				<Suspense>
					<AutoScrollToTop>
						<Outlet />
					</AutoScrollToTop>
				</Suspense>
			</div>
			<Footer />
			<CookiesWarning />
		</div>
	);
};
