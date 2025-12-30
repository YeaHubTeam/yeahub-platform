import { useScreenSize } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { IconSkeleton } from '@/shared/ui/Icon';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './FooterLinks.module.css';

export const FooterLinksSkeleton = () => {
	const { isMobileS } = useScreenSize();

	return (
		<Flex className={styles['footer-resources-links']} dataTestId="FooterLinksSkeleton">
			{[...Array(2)].map((_, index) => (
				<TextSkeleton
					key={index}
					dataTestId="TextSkeleton"
					className={styles['docs-link']}
					width={isMobileS ? 70 : 80}
					variant="body2"
				/>
			))}
			{[...Array(5)].map((_, index) => (
				<IconSkeleton dataTestId="IconSkeleton" key={index} size={24} borderRadius="50%" />
			))}
		</Flex>
	);
};
