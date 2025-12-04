import classNames from 'classnames';

import { useScreenSize } from '@/shared/libs';
import { AuthorInfoSkeleton } from '@/shared/ui/AuthorInfo';
import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { KeywordsListSkeleton } from '@/shared/ui/KeywordsList';
import { TextSkeleton } from '@/shared/ui/Text';

import { QuestionGradeListSkeleton } from '@/entities/question';
import { SkillListSkeleton } from '@/entities/skill';

import { QuestionAdditionalInfoProps } from './QuestionAdditionalInfo';
import styles from './QuestionAdditionalInfo.module.css';

export const QuestionAdditionalInfoSkeleton = ({
	className,
}: Partial<QuestionAdditionalInfoProps>) => {
	const { isMobile, isTablet } = useScreenSize();

	return (
		<>
			<CardSkeleton className={classNames(styles['normal-height'], className)} withOutsideShadow>
				<Flex direction="column" gap="24">
					<Flex direction="column" gap="16">
						<TextSkeleton variant="body3" width={150} />
						<QuestionGradeListSkeleton />
					</Flex>
					<Flex direction="column" gap="16">
						<TextSkeleton variant="body3" width={150} />
						<SkillListSkeleton />
					</Flex>
					<Flex direction="column" gap="16">
						<TextSkeleton variant="body3" width={150} />
						<KeywordsListSkeleton />
					</Flex>
				</Flex>
			</CardSkeleton>
			{!isMobile && !isTablet && <AuthorInfoSkeleton isCenter />}
		</>
	);
};
