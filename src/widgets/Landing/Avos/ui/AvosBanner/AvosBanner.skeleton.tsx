import classNames from 'classnames';

import { useScreenSize } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './AvosBanner.module.css';

export const AvosBannerSkeleton = () => {
	const { isMobile, isMobileM, isSmallScreen } = useScreenSize();

	const logoHeight = !isSmallScreen ? 500 : isMobile ? 250 : 350;

	return (
		<Flex
			direction="column"
			className={classNames(styles['avos-banner'], styles['avos-banner-skeleton'])}
		>
			<Flex
				justify="between"
				className={styles.content}
				direction={isSmallScreen ? 'column-reverse' : 'row'}
				gap={isSmallScreen ? '12' : undefined}
			>
				<div className={styles.promo}>
					<TextSkeleton variant="body3" width="200px" />
					<TextSkeleton
						variant={isMobileM ? 'body5-accent' : 'head3'}
						width="300px"
						className={styles.title}
					/>
				</div>
				<Skeleton className={styles.logo} width={600} height={logoHeight} />
			</Flex>
		</Flex>
	);
};
