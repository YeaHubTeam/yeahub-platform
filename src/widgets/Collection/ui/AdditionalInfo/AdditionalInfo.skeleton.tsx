import classNames from 'classnames';

import { BaseFilterSectionSkeleton } from '@/shared/ui/BaseFilterSection';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './AdditionalInfo.module.css';

export const AdditionalInfoSkeleton = ({ className }: { className?: string }) => {
	return (
		<Card className={classNames(styles.wrapper, className)}>
			<Flex direction="column" gap="24">
				<Flex direction="column" gap="8">
					<TextSkeleton variant="body3" width={62} />
					<Skeleton width={70} height={30} />
				</Flex>
				<BaseFilterSectionSkeleton length={2} />
				<Flex direction="column" gap="8">
					<TextSkeleton variant="body3" width={72} />
					<Skeleton width={70} height={30} />
				</Flex>
				<Flex direction="column" gap="8">
					<TextSkeleton variant="body3" width={66} />
					<Skeleton width={102} height={30} />
				</Flex>
				<Flex direction="column" gap="8">
					<TextSkeleton variant="body3" width={145} />
					<Skeleton width={41} height={39} />
				</Flex>
				<Flex direction="column" gap="8">
					<TextSkeleton variant="body3" width={137} />
					<Skeleton width={41} height={39} />
				</Flex>
				<Skeleton width={270} height={60} />
			</Flex>
		</Card>
	);
};
