import { Outlet } from 'react-router-dom';

import { Flex } from '@/shared/ui/Flex';

import styles from './Main.module.css';

export const Main = () => {
	return (
		<main className={styles.main}>
			<Flex className={styles['main-content']}>
				<Outlet />
			</Flex>
		</main>
	);
};
