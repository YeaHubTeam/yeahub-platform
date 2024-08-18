import { Suspense, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import { Loader } from '@/shared/ui/Loader';

import { useProfileQuery, useLazyGetRefreshTokenQuery } from '@/entities/auth';

import { Header } from '@/widgets/Header';
import { NavSidebarList } from '@/widgets/NavSidebar';

import styles from './MainLayout.module.css';

export const MainLayout = () => {
	const [isOpenNavSidebar, setIsOpenNavSidebar] = useState<boolean>(false);

	const { error } = useProfileQuery();
	const [trigger] = useLazyGetRefreshTokenQuery();

	useEffect(() => {
		if (error) {
			trigger();
		}
	}, [error, trigger]);

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
