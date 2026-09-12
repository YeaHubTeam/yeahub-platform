import classNames from 'classnames';

import { BaseFilterSectionSkeleton } from '@/shared/ui/BaseFilterSection';
import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import styles from './TopicAdditionalInfo.module.css';

interface TopicAdditionalInfoSkeletonProps {
	className?: string;
}

export const TopicAdditionalInfoSkeleton = ({ className }: TopicAdditionalInfoSkeletonProps) => {
	return (
		<>
			<CardSkeleton className={classNames(styles['normal-height'], className)} withOutsideShadow>
				<Flex direction="column" gap="24">
					<BaseFilterSectionSkeleton length={1} />
					<BaseFilterSectionSkeleton length={1} />
					<BaseFilterSectionSkeleton length={1} />
				</Flex>
			</CardSkeleton>
		</>
	);
};
