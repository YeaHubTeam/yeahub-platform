import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from '@/widgets/Header';
import { NavSidebarList } from '@/widgets/NavSidebar';

import styles from './MainLayout.module.css';

export const MainLayout = () => {
	return (
		<section className={`${styles.layout}`}>
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
