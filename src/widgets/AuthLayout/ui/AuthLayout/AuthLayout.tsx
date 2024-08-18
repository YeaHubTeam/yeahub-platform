import { ReactNode } from 'react';

import { AppLogo } from '@/shared/ui/AppLogo';

import { AuthAside } from '../AuthAside/AuthAside';

import styles from './AuthLayout.module.css';

interface AuthLayoutProps {
	children: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
	return (
		<div className={styles.container}>
			<AuthAside />
			<div className={styles['logo-wrapper']}>
				<AppLogo isOpen={false} fill="black" />
			</div>
			{children}
		</div>
	);
};
