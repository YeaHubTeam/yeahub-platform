import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AutoScrollToTop } from '@/shared/ui/AutoScrollToTop';
import { ROUTES } from '@/shared/config/router/routes';
import { AppLogo } from '@/shared/ui/AppLogo';
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary';
import { ErrorElement } from '@/shared/ui/ErrorElement';
import { Loader } from '@/shared/ui/Loader';

import { AuthAside } from '../AuthAside/AuthAside';

import styles from './AuthLayout.module.css';

export const AuthLayout = () => {
	return (
		<div className={styles.container}>
			<Suspense fallback={<Loader />}>
				<AuthAside />
				<ErrorBoundary fallback={<ErrorElement path={ROUTES.appRoute} />}>
					<div className={styles['logo-wrapper']}>
						<AppLogo isOpen={false} fill="black" />
					</div>
					<AutoScrollToTop>
						<Outlet />
					</AutoScrollToTop>
				</ErrorBoundary>
			</Suspense>
		</div>
	);
};
