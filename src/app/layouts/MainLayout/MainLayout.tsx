import { Suspense, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import { Loader } from '@/shared/ui/Loader';

import { useRefreshTokenQuery } from '@/entities/auth';

import { Header } from '@/widgets/Header';
import { NavSidebarList } from '@/widgets/NavSidebar';

import styles from './MainLayout.module.css';

export const MainLayout = () => {
	const [isOpenNavSidebar, setIsOpenNavSidebar] = useState<boolean>(false);

	const { accessToken } = useAppSelector((state) => state.auth);

	useRefreshTokenQuery(null, { skip: !!accessToken });

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
