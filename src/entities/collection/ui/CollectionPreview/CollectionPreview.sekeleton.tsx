import classNames from 'classnames';

import { useScreenSize } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';
import { StatusChipSkeleton } from '@/shared/ui/StatusChip';

import styles from './CollectionPreview.module.css';

interface CollectionsPreviewSkeletonProps {
	variant?: 'row' | 'column';
}

export const CollectionsPreviewSkeleton = ({
	variant = 'row',
}: CollectionsPreviewSkeletonProps) => {
	const { isMobile } = useScreenSize();

	return (
		<div style={{ width: '100%' }}>
			<Card className={styles.content} withOutsideShadow>
				<Flex gap="20" direction={variant}>
					<Skeleton className={classNames(styles['image-wrapper'], styles[variant])} />
					<Flex gap="16" direction="column" maxWidth>
						<div className={styles.tags}>
							{[...Array(isMobile ? 2 : 3)].map((_, index) => (
								<StatusChipSkeleton key={index} />
							))}
						</div>
						<Flex gap="20" direction="column">
							<Skeleton height={20} width={isMobile ? '90%' : '60%'} />
							<Flex gap="16">
								<Skeleton height={20} width={isMobile ? '40%' : '20%'} />
								<Skeleton height={20} width={isMobile ? '40%' : '20%'} />
							</Flex>
							<Skeleton height={20} width={isMobile ? '50%' : '30%'} />
						</Flex>
					</Flex>
				</Flex>
			</Card>
		</div>
	);
};
