import React from 'react';

import { ROUTES } from '@/shared/config';
import { useScreenSize } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { HeaderAdminPageDetailCard } from '@/shared/ui/HeaderAdminPageDetailCard';

import { type Question, QuestionAdditionalInfo } from '@/entities/question';

import { useDeleteQuestionMutation } from '@/features/question/deleteQuestion';

import { QuestionBody } from '@/widgets/question/QuestionBody';
import { QuestionHeader } from '@/widgets/question/QuestionHeader';

import styles from './QuestionPageContent.module.css';

interface QuestionPageContentProps {
	question: Question;
	isDisabled: boolean;
}

export const QuestionPageContent = ({ question, isDisabled }: QuestionPageContentProps) => {
	const { isMobile, isTablet } = useScreenSize();
	const [deleteQuestion] = useDeleteQuestionMutation();

	const {
		rate,
		keywords,
		complexity,
		questionSkills,
		shortAnswer,
		longAnswer,
		id,
		createdBy,
		questionTopics,
		questionSpecializations,
	} = question;

	const handleDeleteQuestion = () => {
		void deleteQuestion(id);
	};

	return (
		<>
			<HeaderAdminPageDetailCard onDelete={handleDeleteQuestion} isDisabled={isDisabled} />
			<Flex gap="20">
				<Flex gap="20" direction="column" flex={1} maxWidth>
					<QuestionHeader question={question} />
					<QuestionBody shortAnswer={shortAnswer} longAnswer={longAnswer} />
				</Flex>
				{!isMobile && !isTablet && (
					<Flex direction="column" gap="20" className={styles.additional}>
						<QuestionAdditionalInfo
							rate={rate}
							questionTopics={questionTopics}
							createdBy={createdBy}
							keywords={keywords}
							complexity={complexity}
							questionSkills={questionSkills}
							questionSpecializations={questionSpecializations}
							route={ROUTES.wiki.questions.page}
						/>
					</Flex>
				)}
			</Flex>
		</>
	);
};
