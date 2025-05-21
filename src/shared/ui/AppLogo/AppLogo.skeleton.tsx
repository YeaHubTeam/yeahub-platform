import { useScreenSize } from '@/shared/hooks';

import { Flex } from '../Flex';
import { IconSkeleton } from '../Icon';

import { AppLogoProps } from './AppLogo';
import styles from './AppLogo.module.css';

export const AppLogoSkeleton = ({ isOpen }: AppLogoProps) => {
	const { isMobile } = useScreenSize();

	return (
		<Flex className={styles['home-link']}>
			{isMobile || isOpen ? (
				<IconSkeleton size={32} borderRadius="50%" />
			) : (
				<Flex gap="8" align="center">
					<IconSkeleton size={32} borderRadius="50%" />
					<IconSkeleton className={styles['logo-text']} />
				</Flex>
			)}
		</Flex>
	);
};
