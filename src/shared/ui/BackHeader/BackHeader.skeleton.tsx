import { BackButtonSkeleton } from '@/shared/ui/BackButton';
import { Flex } from '@/shared/ui/Flex';

import { BackHeaderProps } from './BackHeader';
import styles from './BackHeader.module.css';

export const BackHeaderSkeleton = ({ children }: BackHeaderProps) => {
	return (
		<Flex justify="between" align="center" className={styles['backheader']}>
			<BackButtonSkeleton />
			<Flex gap="16">{children}</Flex>
		</Flex>
	);
};
