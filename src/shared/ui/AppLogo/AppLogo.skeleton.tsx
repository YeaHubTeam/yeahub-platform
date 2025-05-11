import { useScreenSize } from '@/shared/hooks';
import { Skeleton } from '@/shared/ui/Skeleton';

import { Flex } from '../Flex';

import { AppLogoProps } from './AppLogo';
import styles from './AppLogo.module.css';

export const AppLogoSkeleton = ({ navigationFooter, isOpen }: AppLogoProps) => {
	const { isMobile } = useScreenSize();

	return (
		<Flex className={styles['home-link']}>
			{(isMobile && !navigationFooter) || isOpen ? (
				<Skeleton width={33} height={33} borderRadius="50%" />
			) : navigationFooter ? (
				<Skeleton width={99} height={28} borderRadius={4} />
			) : (
				<Flex gap="8" align="center">
					<Skeleton width={33} height={33} borderRadius="50%" />
					<Skeleton className="logo-text" width={99} height={22} borderRadius={4} />
				</Flex>
			)}
		</Flex>
	);
};
