import { Suspense, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import { Loader } from '@/shared/ui/Loader';

import { Header } from '@/widgets/Header';
import { NavSidebarList } from '@/widgets/NavSidebar';

import styles from './MainLayout.module.css';

export const MainLayout = () => {
	const [isOpenNavSidebar, setIsOpenNavSidebar] = useState<boolean>(false);

	return (
		<section className={`${styles.layout} ${isOpenNavSidebar ? styles['closing'] : ''}`}>
			<div className={styles.sidebar}>
				<NavSidebarList isOpen={isOpenNavSidebar} setOpen={setIsOpenNavSidebar} />
			</div>

			<Header />
			<main className={styles.main}>
				<div className={styles.container}>
					<Suspense fallback={<Loader />}>
						<Breadcrumbs />
						<Outlet />
					</Suspense>
				</div>
			</main>
		</section>
	);
};
