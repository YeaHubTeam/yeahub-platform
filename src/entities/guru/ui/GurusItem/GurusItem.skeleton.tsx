import { useScreenSize } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';
import { IconSkeleton } from '@/shared/ui/Icon';
import { TextSkeleton } from '@/shared/ui/Text';

import { GuruSocialsListSkeleton } from '../GuruSocialsList/GuruSocialsList.skeleton';

import styles from './GurusItem.module.css';

export const GurusItemSkeleton = () => {
	const { isMobile, isMobileM } = useScreenSize();
	return (
		<Flex componentType="li" direction="column" gap="12" className={styles['border-skeleton']}>
			<Flex gap="8" align={'center'}>
				<IconSkeleton size={40} borderRadius="50%" />
				<Flex gap="4" direction="column">
					<TextSkeleton variant="body3-accent" color="black-800" width={150} />
					<TextSkeleton variant="body3-accent" color="black-500" width={150} />
				</Flex>
			</Flex>
			<TextSkeleton variant="body3-accent" color="black-800" width={isMobile ? '100%' : 250} />
			{!isMobileM && <TextSkeleton variant="body3-accent" color="black-800" width={250} />}
			<GuruSocialsListSkeleton />
		</Flex>
	);
};
