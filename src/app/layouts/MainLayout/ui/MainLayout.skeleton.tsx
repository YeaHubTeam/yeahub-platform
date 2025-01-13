import { useScreenSize } from '@/shared/hooks/useScreenSize';

import { HeaderSkeleton } from '@/widgets/Header';
import { SidebarSkeleton } from '@/widgets/Sidebar';

import SkeletonGenerator from '../model/helper/SkeletonGenerator';

import styles from './MainLayout.module.css';

export const MainLayoutSkeleton = () => {
	const { isDesktop, isLaptop } = useScreenSize();

	return (
		<section className={styles.layout}>
			{(isDesktop || isLaptop) && (
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
