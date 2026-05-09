import classNames from 'classnames';

import { useScreenSize } from '@/shared/libs';
import { AuthorInfoSkeleton } from '@/shared/ui/AuthorInfo';
import { BaseFilterSectionSkeleton } from '@/shared/ui/BaseFilterSection';
import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { KeywordsListSkeleton } from '@/shared/ui/KeywordsList';
import { TextSkeleton } from '@/shared/ui/Text';

import { ResourceAdditionalInfoProps } from './ResourceAdditionalInfo';
import styles from './ResourceAdditionalInfo.module.css';

export const ResourceAdditionalInfoSkeleton = ({
	className,
}: Partial<ResourceAdditionalInfoProps>) => {
	const { isMobile, isTablet } = useScreenSize();

	return (
		<Flex direction="column" gap="20">
			<CardSkeleton className={(classNames(styles['additional']), className)} withOutsideShadow>
				<Flex direction="column" gap="24">
					<BaseFilterSectionSkeleton length={1} />
					<BaseFilterSectionSkeleton length={3} />
					<Flex direction="column" gap="8">
						<TextSkeleton variant="body3" width={100} />
						<KeywordsListSkeleton />
					</Flex>
				</Flex>
			</CardSkeleton>

			{!isMobile && !isTablet && <AuthorInfoSkeleton isCenter />}
		</Flex>
	);
};
