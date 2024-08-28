import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AppLogo } from '@/shared/ui/AppLogo';
import { Loader } from '@/shared/ui/Loader';

import { AuthAside } from '../AuthAside/AuthAside';

import styles from './AuthLayout.module.css';

export const AuthLayout = () => {
	return (
		<div className={styles.container}>
			<Suspense fallback={<Loader />}>
				<AuthAside />
				<div className={styles['logo-wrapper']}>
					<AppLogo isOpen={false} fill="black" />
				</div>
				<Outlet />
			</Suspense>
		</div>
	);
};
