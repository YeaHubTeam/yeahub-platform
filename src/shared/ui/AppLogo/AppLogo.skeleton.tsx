import { Flex } from '../Flex';
import { Skeleton } from '../Skeleton';

import styles from './AppLogo.module.css';

export const AppLogoSkeleton = () => (
	<Flex gap="8" align="center">
		<Skeleton width={45} height={45} borderRadius={'50%'} />
		<Skeleton className={styles.name} width={140} height={45} />
	</Flex>
);
