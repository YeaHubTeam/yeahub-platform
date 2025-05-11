import { Outlet } from 'react-router-dom';

import { Flex } from '@/shared/ui/Flex';

import styles from './Main.module.css';

export const Main = () => {
	return (
		<Flex direction="column" className={styles['main-container']}>
			<Outlet />
		</Flex>
	);
};
