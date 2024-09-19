import LeftChevron from '@/shared/assets/icons/leftChevron.svg';
import { AppLogo } from '@/shared/ui/AppLogo';

import { NavSidebarItem } from '../NavSidebarItem/NavSidebarItem';

import styles from './NavSidebarList.module.css';

interface NavSidebarListProps {
	isOpen: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NavSidebarList = ({ isOpen, setOpen }: NavSidebarListProps) => {
	const handleToggleSidebar = () => {
		setOpen(!isOpen);
	};

	return (
		<aside className={styles.sidebar}>
			<div className={styles.header}>
				<AppLogo isOpen={isOpen} />
				<button
					className={`${styles['close-icon']}  ${isOpen ? styles['left'] : ''}`}
					onClick={handleToggleSidebar}
				>
					<LeftChevron className={styles.arrow} />
				</button>
			</div>
			<div className={styles.content}>
				<NavSidebarItem isOpen={isOpen} />
			</div>
		</aside>
	);
};