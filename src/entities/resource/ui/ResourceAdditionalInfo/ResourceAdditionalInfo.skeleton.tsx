import classNames from 'classnames';

import { useScreenSize } from '@/shared/libs';
import { AuthorInfoSkeleton } from '@/shared/ui/AuthorInfo';
import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { KeywordsListSkeleton } from '@/shared/ui/KeywordsList';
import { TextSkeleton } from '@/shared/ui/Text';

import { SkillListSkeleton } from '@/entities/skill/@x/resource';
import { SpecializationsListSkeleton } from '@/entities/specialization/@x/resource';

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
					<SpecializationsListSkeleton />
					<Flex direction="column" gap="8">
						<TextSkeleton variant="body2" color="black-700" width={80} />
						<SkillListSkeleton />
					</Flex>
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
