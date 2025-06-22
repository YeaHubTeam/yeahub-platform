import { useScreenSize } from '@/shared/hooks';

import { HeaderSkeleton } from '@/widgets/Header';
import { SidebarSkeleton } from '@/widgets/Sidebar';

import SkeletonGenerator from '../model/helper/SkeletonGenerator';

import styles from './MainLayout.module.css';

export const MainLayoutSkeleton = () => {
	const { isDesktop, isLaptop, isDesktopS } = useScreenSize();

	return (
		<section className={styles.layout}>
			{(isDesktop || isLaptop || isDesktopS) && (
				<div className={styles.sidebar}>
					<SidebarSkeleton />
				</div>
			)}

			<HeaderSkeleton />

			<main className={styles.main}>
				<div className={styles.container}>
					<SkeletonGenerator />
				</div>
			</main>
		</section>
	);
};
