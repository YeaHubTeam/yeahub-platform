import { Flex } from '../Flex';
import { Skeleton } from '../Skeleton';

import styles from './AppLogo.module.css';

export const AppLogoSkeleton = () => (
	<Flex gap="8" align="center">
		<Skeleton width={'36px'} height={'36px'} borderRadius={'50%'} />
		<Skeleton className={styles.name} width={'100px'} height={'32px'} />
	</Flex>
);
