import { Suspense, useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { ROUTES } from '@/shared/config/router/routes';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import { Drawer } from '@/shared/ui/Drawer';
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary';
import { ErrorElement } from '@/shared/ui/ErrorElement';

import { useProfileQuery } from '@/entities/auth';

import { Header } from '@/widgets/Header';
import { MenuItem, Sidebar } from '@/widgets/Sidebar';

import SkeletonGenerator from '../model/helper/SkeletonGenerator';

import styles from './MainLayout.module.css';
import { MainLayoutSkeleton } from './MainLayout.skeleton';

interface MainLayoutProps {
	sidebarItems: MenuItem[];
	onlyAdmin?: boolean;
}

export const MainLayout = ({ sidebarItems, onlyAdmin }: MainLayoutProps) => {
	const [isOpenSidebarDrawer, setIsOpenSidebarDrawer] = useState(false);
	const location = useLocation();

	const { data: profile, isLoading } = useProfileQuery();
	const isAdmin = profile?.userRoles.some((role) => role.name === 'admin');

	const filteredMenuItems = !isAdmin
		? sidebarItems.filter((_, index) => index !== 0)
		: sidebarItems;

	const onToggleOpenSidebarDrawer = () => {
		setIsOpenSidebarDrawer((prev) => !prev);
	};

	useEffect(() => {
		if (isOpenSidebarDrawer) {
			setIsOpenSidebarDrawer(false);
		}
	}, [location]);

	if (isLoading) return <MainLayoutSkeleton />;

	if (onlyAdmin && !isAdmin) {
		return <Navigate to={ROUTES.appRoute} />;
	}

	return (
		<Suspense fallback={<MainLayoutSkeleton />}>
			<section className={styles.layout}>
				<div className={styles.sidebar}>
					<Sidebar menuItems={filteredMenuItems} />
				</div>

				<Header onOpenSidebarDrawer={onToggleOpenSidebarDrawer} />

				<ErrorBoundary fallback={<ErrorElement path={ROUTES.appRoute} />}>
					<main className={styles.main}>
						<div className={styles.container} id='main-container'>
							<Suspense fallback={<SkeletonGenerator />}>
								<Breadcrumbs />
								<Outlet />
							</Suspense>
						</div>
					</main>
				</ErrorBoundary>
			</section>
			{isOpenSidebarDrawer && (
				<Drawer
					rootName="body"
					isOpen={isOpenSidebarDrawer}
					onClose={onToggleOpenSidebarDrawer}
					position="left"
					className={styles.drawer}
				>
					<Sidebar isMobileSidebar menuItems={filteredMenuItems} />
				</Drawer>
			)}
		</Suspense>
	);
};
