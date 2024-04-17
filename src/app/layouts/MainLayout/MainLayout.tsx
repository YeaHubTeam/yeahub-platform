/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { Header } from '@/widgets/Header';
import { NavSidebarList } from '@/widgets/NavigationSidebar';

import styles from './MainLayout.module.css';

export const MainLayout = () => {
	const isOpenSidebar = useSelector((state: any) => state.navigationSidebar.isOpenSidebar);

	return (
		<section className={`${styles.layout} ${isOpenSidebar && styles.closing}`}>
			<div className={styles.sidebar}>
				<NavSidebarList />
			</div>

			<Header />
			<main className={styles.main}>
				<Outlet />
			</main>
		</section>
	);
};
