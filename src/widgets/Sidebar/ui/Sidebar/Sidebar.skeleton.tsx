import classNames from 'classnames';

import LeftChevron from '@/shared/assets/icons/leftChevron.svg';
import { AppLogo } from '@/shared/ui/AppLogo';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';

import styles from './Sidebar.module.css';

export const SidebarSkeleton = ({
	menuLength,
	isOpenNavSidebar,
}: {
	menuLength: number;
	isOpenNavSidebar: boolean;
}) => {
	return (
		<aside
			className={classNames(styles.sidebar, { [styles.closing]: isOpenNavSidebar })}
			data-testid="Sidebar"
		>
			<div className={styles.header}>
				<AppLogo isOpen={isOpenNavSidebar} />
				<button
					className={classNames(styles['close-icon'], { [styles['left']]: isOpenNavSidebar })}
					data-testid="Sidebar_CloseButton"
				>
					<LeftChevron className={styles.arrow} />
				</button>
			</div>
			<div className={styles.menu}>
				<Flex gap={'8'} direction={'column'}>
					{[...Array(menuLength)].map((_, i) => (
						<Skeleton key={i} width={isOpenNavSidebar ? '48px' : '100%'} height={'44px'} />
					))}
				</Flex>
			</div>
		</aside>
	);
};
