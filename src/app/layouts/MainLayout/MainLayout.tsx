import { Suspense, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from '@/widgets/Header';
import { NavSidebarList } from '@/widgets/NavSidebar';

import styles from './MainLayout.module.css';

export const MainLayout = () => {
	const [isOpenNavSidebar, setIsOpenNavSidebar] = useState<boolean>(false); // TOFIX

	return (
		<section className={`${styles.layout} ${isOpenNavSidebar ? styles['closing'] : ''}`}>
			<div className={styles.sidebar}>
				<NavSidebarList isOpen={isOpenNavSidebar} setOpen={setIsOpenNavSidebar} />
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
