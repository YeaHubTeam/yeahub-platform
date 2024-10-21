import React, { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { ROUTES } from '@/shared/config/router/routes';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';

import { useProfileQuery } from '@/entities/auth';

import { Header } from '@/widgets/Header';
import { MenuItem, Sidebar } from '@/widgets/Sidebar';

import { MainPageSkeleton } from '@/pages/interview/MainPage';

import styles from './MainLayout.module.css';
import { MainLayoutSkeleton } from './MainLayout.skeleton';

interface MainLayoutProps {
	sidebarItems: MenuItem[];
	onlyAdmin?: boolean;
}

export const MainLayout = ({ sidebarItems, onlyAdmin }: MainLayoutProps) => {
	const { data: profile, isLoading } = useProfileQuery();

	const isAdmin = profile?.userRoles[0]?.name === 'admin';

	const filteredMenuItems = !isAdmin
		? sidebarItems.filter((_, index) => index !== 0)
		: sidebarItems;

	if (isLoading) return <MainLayoutSkeleton />;

	if (onlyAdmin && !isAdmin) {
		return <Navigate to={ROUTES.appRoute} />;
	}

	return (
		<section className={styles.layout}>
			<div className={styles.sidebar}>
				<Sidebar menuItems={filteredMenuItems} />
			</div>

			<Header />

			<main className={styles.main}>
				<div className={styles.container}>
					<Suspense fallback={<MainPageSkeleton />}>
						<Breadcrumbs />
						<Outlet />
					</Suspense>
				</div>
			</main>
		</section>
	);
};
