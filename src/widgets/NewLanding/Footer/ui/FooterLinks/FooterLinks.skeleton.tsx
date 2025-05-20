import { useScreenSize } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';
import { IconSkeleton } from '@/shared/ui/Icon';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './FooterLinks.module.css';

export const FooterLinksSkeleton = () => {
	const { isMobileS } = useScreenSize();

	return (
		<Flex className={styles['footer-resources-links']}>
			<TextSkeleton className={styles['docs-link']} width={isMobileS ? 70 : 80} variant={'body2'} />
			{[...Array(3)].map((_, index) => (
				<IconSkeleton key={index} size={24} borderRadius={'50%'} />
			))}
		</Flex>
	);
};
