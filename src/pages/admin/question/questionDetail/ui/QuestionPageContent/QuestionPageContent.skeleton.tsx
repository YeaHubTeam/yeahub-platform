import React from 'react';

import { useScreenSize } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { HeaderAdminPageDetailCardSkeleton } from '@/shared/ui/HeaderAdminPageDetailCard';

import { QuestionAdditionalInfoSkeleton } from '@/entities/question';

import { QuestionBodySkeleton } from '@/widgets/question/QuestionBody';
import { QuestionHeaderSkeleton } from '@/widgets/question/QuestionHeader';

import styles from './QuestionPageContent.module.css';

export const QuestionPageContentSkeleton = () => {
	const { isMobile, isTablet } = useScreenSize();

	return (
		<>
			<HeaderAdminPageDetailCardSkeleton />
			<Flex gap="20">
				<Flex gap="20" direction="column" flex={1}>
					<QuestionHeaderSkeleton />
					<QuestionBodySkeleton />
				</Flex>
				{!isMobile && !isTablet && (
					<Flex direction="column" gap="20" className={styles.additional}>
						<QuestionAdditionalInfoSkeleton />
					</Flex>
				)}
			</Flex>
		</>
	);
};
