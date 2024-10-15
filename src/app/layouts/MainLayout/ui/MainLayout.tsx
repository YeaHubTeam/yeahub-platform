import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';

import { useProfileQuery } from '@/entities/auth';

import { Header } from '@/widgets/Header';
import { MenuItem, Sidebar } from '@/widgets/Sidebar';

import { MainPageSkeleton } from '@/pages/MainPage';

import styles from './MainLayout.module.css';
import { MainLayoutSkeleton } from './MainLayout.skeleton';

interface AdminSideBarProps {
	adminSideBar: MenuItem[];
}

export const MainLayout = ({ adminSideBar }: AdminSideBarProps) => {
	const { data: profile, isLoading } = useProfileQuery();

	const isUser = profile?.userRoles[0]?.name === 'user' || !profile?.userRoles[0]?.name;

	const filteredMenuItems = isUser ? adminSideBar.filter((_, index) => index !== 0) : adminSideBar;

	if (isLoading) return <MainLayoutSkeleton />;
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
