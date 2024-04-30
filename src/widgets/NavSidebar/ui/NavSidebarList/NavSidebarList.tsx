import { FC } from 'react';
import { useDispatch } from 'react-redux';

import RightChevron from '@/shared/assets/icons/rightChevron.svg';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { AppLogo } from '@/shared/ui/AppLogo';

import { toggleOpenSidebar } from '../../../NavSidebar/model/slice';
import { NavSidebarItem } from '../NavSidebarItem/NavSidebarItem';

import styles from './NavSidebarList.module.css';

export const NavSidebarList: FC = () => {
	const isOpenSidebar = useAppSelector((state) => state.navSidebar.isOpenSidebar);
	const dispatch = useDispatch();
	const handleToggleSidebar = () => {
		dispatch(toggleOpenSidebar());
	};

	return (
		<aside className={styles.sidebar}>
			<div className={styles.header}>
				<AppLogo />
				<button
					className={`${styles['close-icon']}  ${isOpenSidebar ? styles['left'] : ''}`}
					onClick={handleToggleSidebar}
				>
					<RightChevron className={styles.arrow} />
				</button>
			</div>
			<div className={styles.content}>
				<NavSidebarItem />
			</div>
		</aside>
	);
};
