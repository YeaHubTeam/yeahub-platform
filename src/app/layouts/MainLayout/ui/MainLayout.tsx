import { Suspense, useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { ROUTES } from '@/shared/config/router/routes';
import { SentryRouteTracker } from '@/shared/config/sentry/SentryRouteTracker';
import { AutoScrollToTop } from '@/shared/ui/AutoScrollToTop';
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
	const isAuthor = profile?.userRoles.some((role) => role.name === 'author');

	const filteredMenuItems = isAdmin
		? sidebarItems
		: isAuthor
			? sidebarItems.filter((item) => !Object.prototype.hasOwnProperty.call(item, 'noAccessAuthor'))
			: sidebarItems.filter((_, index) => index !== 0);

	const onToggleOpenSidebarDrawer = () => {
		setIsOpenSidebarDrawer((prev) => !prev);
	};

	useEffect(() => {
		if (isOpenSidebarDrawer) {
			setIsOpenSidebarDrawer(false);
		}
	}, [location]);

	if (isLoading) return <MainLayoutSkeleton />;

	if (onlyAdmin && !isAdmin && !isAuthor) {
		return <Navigate to={ROUTES.appRoute} />;
	}

	return (
		<Suspense fallback={<MainLayoutSkeleton />}>
			<SentryRouteTracker />
			<AutoScrollToTop>
				<section className={styles.layout}>
					<div className={styles.sidebar}>
						<Sidebar
							menuItems={filteredMenuItems}
							onOpenSidebarDrawer={onToggleOpenSidebarDrawer}
							isOpenSidebarDrawer={isOpenSidebarDrawer}
							setIsOpenSidebarDrawer={setIsOpenSidebarDrawer}
						/>
					</div>

					<Header onOpenSidebarDrawer={onToggleOpenSidebarDrawer} />

					<ErrorBoundary fallback={<ErrorElement path={ROUTES.appRoute} />}>
						<main className={styles.main}>
							<div className={styles.container}>
								<Breadcrumbs />
								<Suspense fallback={<SkeletonGenerator />}>
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
						<Sidebar
							isMobileSidebar
							menuItems={filteredMenuItems}
							setIsOpenSidebarDrawer={setIsOpenSidebarDrawer}
							isOpenSidebarDrawer={isOpenSidebarDrawer}
						/>
					</Drawer>
				)}
			</AutoScrollToTop>
		</Suspense>
	);
};
