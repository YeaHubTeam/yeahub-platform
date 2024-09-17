import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import InterviewIcon from '@/shared/assets/icons/interview.svg';
import MainIcon from '@/shared/assets/icons/main.svg';
import ProfileIcon from '@/shared/assets/icons/profile.svg';
import { ROUTES } from '@/shared/config/router/routes';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import { Loader } from '@/shared/ui/Loader';

import { Header } from '@/widgets/Header';
import { MenuItem, Sidebar } from '@/widgets/Sidebar';

import styles from './MainLayout.module.css';

const mainLayoutMenuItems: MenuItem[] = [
	{
		route: ROUTES.appRoute,
		title: 'Главная',
		icon: MainIcon,
	},
	{
		route: ROUTES.profile.route,
		title: 'Мой профиль',
		icon: ProfileIcon,
	},
	{
		route: ROUTES.interview.route,
		title: 'Собеседование',
		icon: InterviewIcon,
	},
];

export const MainLayout = () => {
	return (
		<section className={styles.layout}>
			<div className={styles.sidebar}>
				<Sidebar menuItems={mainLayoutMenuItems} />
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
