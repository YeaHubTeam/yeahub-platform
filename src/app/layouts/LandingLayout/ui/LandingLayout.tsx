import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { CookiesWarning } from '@/widgets/Landing/CookiesWarningBlock';
import { Footer } from '@/widgets/Landing/Footer';
import { Header } from '@/widgets/Landing/Header';

import styles from './LandingLayout.module.css';

export const LandingLayout = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<Header />
				<Suspense>
					<Outlet />
				</Suspense>
			</div>
			<Footer />
			<CookiesWarning />
		</div>
	);
};
