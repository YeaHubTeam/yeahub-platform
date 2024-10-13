import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import EducationIcon from '@/shared/assets/icons/education.svg';
import InterviewIcon from '@/shared/assets/icons/interview.svg';
import MainIcon from '@/shared/assets/icons/main.svg';
import ProfileIcon from '@/shared/assets/icons/profile.svg';
import { ROUTES } from '@/shared/config/router/routes';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';

import { useProfileQuery } from '@/entities/auth';

import { Header } from '@/widgets/Header';
import { MenuItem, Sidebar } from '@/widgets/Sidebar';

import { MainPageSkeleton } from '@/pages/MainPage';

import styles from './MainLayout.module.css';
import { MainLayoutSkeleton } from './MainLayout.skeleton';

const mainLayoutMenuItems: MenuItem[] = [
	{
		type: 'single',
		route: ROUTES.appRoute,
		title: 'tabs.main',
		icon: MainIcon,
	},
	{
		type: 'single',
		route: ROUTES.profile.route,
		title: 'tabs.profile',
		icon: ProfileIcon,
	},
	{
		type: 'category',
		title: 'Обучение',
		icon: EducationIcon,
		elements: [
			{
				route: ROUTES.interview.route,
				title: 'Собеседование',
				icon: InterviewIcon,
			},
		],
	},
];

export const MainLayout = () => {
	const { isLoading } = useProfileQuery();

	if (isLoading) return <MainLayoutSkeleton />;

	return (
		<section className={styles.layout}>
			<div className={styles.sidebar}>
				<Sidebar menuItems={mainLayoutMenuItems} />
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
