import classNames from 'classnames';

import { useScreenSize } from '@/shared/libs';
import { AuthorInfoSkeleton } from '@/shared/ui/AuthorInfo';
import { BaseFilterSectionSkeleton } from '@/shared/ui/BaseFilterSection';
import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { StatusChipSkeleton } from '@/shared/ui/StatusChip';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './AdditionalInfo.module.css';

export const AdditionalInfoSkeleton = ({ className }: { className?: string }) => {
	const { isLargeScreen, isSmallScreen } = useScreenSize();
	return (
		<>
			<CardSkeleton className={classNames(styles.wrapper, className)}>
				<Flex direction="column" gap="24">
					<Flex direction="column" gap="8">
						<TextSkeleton variant="body3" width={62} />
						<StatusChipSkeleton />
					</Flex>
					<BaseFilterSectionSkeleton length={2} />
					<BaseFilterSectionSkeleton length={1} />
					<BaseFilterSectionSkeleton length={1} />
					<BaseFilterSectionSkeleton length={1} />
					<BaseFilterSectionSkeleton length={1} />
					{isSmallScreen && <AuthorInfoSkeleton />}
				</Flex>
			</CardSkeleton>

			{isLargeScreen && <AuthorInfoSkeleton isCenter />}
		</>
	);
};
