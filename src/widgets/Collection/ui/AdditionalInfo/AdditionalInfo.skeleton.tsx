import classNames from 'classnames';

import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';

import styles from './AdditionalInfo.module.css';

export const AdditionalInfoSkeleton = ({ className }: { className?: string }) => {
	return (
		<Card className={classNames(styles.wrapper, className)}>
			<Flex direction="column" gap="24">
				{[...Array(5)].map((_, index) => (
					<Flex key={index} direction="column" gap="8">
						<Skeleton width={70} height={19} />
						<Skeleton width={200} height={42} borderRadius={12} />
					</Flex>
				))}
			</Flex>
		</Card>
	);
};
