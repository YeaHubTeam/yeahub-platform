import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { useAppSelector } from '@/shared/hooks/useAppSelector';

import { Header } from '@/widgets/Header';
import { NavSidebarList } from '@/widgets/NavSidebar';

import styles from './MainLayout.module.css';

export const MainLayout = () => {
	const isOpenSidebar = useAppSelector((state) => state.navSidebar.isOpenSidebar);

	return (
		<section className={`${styles.layout} ${isOpenSidebar ? styles['closing'] : ''}`}>
			<div className={styles.sidebar}>
				<NavSidebarList />
			</div>

			<Header />
			<main className={styles.main}>
				<Suspense>
					<Outlet />
				</Suspense>
			</main>
		</section>
	);
};
