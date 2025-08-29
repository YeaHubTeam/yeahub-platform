import { Flex } from '@/shared/ui/Flex';

import { useProfileQuery } from '@/entities/auth';

import styles from './Footer.module.css';
import { FooterSkeleton } from './Footer.skeleton';
import { FooterMain } from './FooterMain/FooterMain';
import { FooterMeta } from './FooterMeta/FooterMeta';

export const Footer = () => {
	const { isLoading } = useProfileQuery();

	if (isLoading) return <FooterSkeleton />;

	return (
		<footer data-testid="Footer" className={styles.footer}>
			<Flex dataTestId="Footer_Content" className={styles['footer-content']}>
				<FooterMain />
				<FooterMeta />
			</Flex>
		</footer>
	);
};
