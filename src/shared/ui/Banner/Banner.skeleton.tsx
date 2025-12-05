import classNames from 'classnames';

import { useScreenSize } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './Banner.module.css';

interface BannerSkeletonProps {
	color?: 'white' | 'violet';
	className?: string;
	showDescription?: boolean;
}

export const BannerSkeleton = ({
	color = 'white',
	className,
	showDescription = false,
}: BannerSkeletonProps) => {
	const { isLargeScreen, isLaptop } = useScreenSize();

	const wrapperClassName = classNames(
		styles.wrapper,
		color === 'white' ? styles.white : styles.violet,
		className,
	);

	return (
		<Flex className={wrapperClassName} gap="20" align="center">
			<Skeleton className={styles['alarm-img']} />

			<Flex direction="column" gap="8" style={{ flex: 1 }}>
				<TextSkeleton variant={isLargeScreen || isLaptop ? 'body6' : 'body5-accent'} width="60%" />
				{showDescription && (
					<TextSkeleton variant="body3-accent" width={isLaptop ? '90%' : '100%'} />
				)}
			</Flex>
		</Flex>
	);
};
