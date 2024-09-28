import { HeaderSkeleton } from '@/widgets/Header';
import { SidebarSkeleton } from '@/widgets/Sidebar';

import { MainPageSkeleton } from '@/pages/MainPage';

import styles from './MainLayout.module.css';

export const MainLayoutSkeleton = () => (
	<section className={styles.layout}>
		<div className={styles.sidebar}>
			<SidebarSkeleton />
		</div>

		<HeaderSkeleton />

		<main className={styles.main}>
			<div className={styles.container}>
				<MainPageSkeleton />
			</div>
		</main>
	</section>
);
