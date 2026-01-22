import React from 'react';

import { useScreenSize } from '@/shared/libs';
import { BackHeaderSkeleton } from '@/shared/ui/BackHeader';
import { ButtonSkeleton } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

import { QuestionAdditionalInfoSkeleton } from '@/entities/question';

import { DeleteQuestionButtonSkeleton } from '@/features/question/deleteQuestion';

import { QuestionBodySkeleton } from '@/widgets/question/QuestionBody';
import { QuestionHeaderSkeleton } from '@/widgets/question/QuestionHeader';

import styles from './QuestionPageContent.module.css';

export const QuestionPageContentSkeleton = () => {
	const { isMobile, isTablet } = useScreenSize();

	return (
		<>
			<BackHeaderSkeleton>
				<DeleteQuestionButtonSkeleton isDetailPage />
				<ButtonSkeleton width={180} />
			</BackHeaderSkeleton>
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
