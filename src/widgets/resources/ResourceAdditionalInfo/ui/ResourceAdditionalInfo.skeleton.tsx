import classNames from 'classnames';

import { useScreenSize } from '@/shared/hooks';
import { AuthorInfoSkeleton } from '@/shared/ui/AuthorInfo/AuthorInfo.skeleton';
import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { KeywordsListSkeleton } from '@/shared/ui/KeywordsList';
import { TextSkeleton } from '@/shared/ui/Text';

import { SkillListSkeleton } from '@/entities/skill';

import { ResourceAdditionalInfoProps } from './ResourceAdditionalInfo';
import styles from './ResourceAdditionalInfo.module.css';

export const ResourceAdditionalInfoSkeleton = ({
	className,
}: Partial<ResourceAdditionalInfoProps>) => {
	const { isMobile, isTablet } = useScreenSize();
	return (
		<>
			<CardSkeleton className={classNames(styles['normal-height'], className)} withOutsideShadow>
				<Flex direction="column" gap="24">
					<Flex direction="column" gap="8">
						<TextSkeleton variant="body3" width={150} />
					</Flex>
					<Flex direction="column" gap="8">
						<TextSkeleton variant="body3" width={150} />
						<SkillListSkeleton />
					</Flex>
					<Flex direction="column" gap="8">
						<TextSkeleton variant="body3" width={150} />
						<KeywordsListSkeleton />
					</Flex>
				</Flex>
			</CardSkeleton>
			{!isMobile && !isTablet && <AuthorInfoSkeleton />}
		</>
	);
};
