import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { i18Namespace, ROUTES, Translation } from '@/shared/config';
import { route, useScreenSize } from '@/shared/libs';
import { BackHeader } from '@/shared/ui/BackHeader';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { Tooltip } from '@/shared/ui/Tooltip';

import { type Question, QuestionAdditionalInfo } from '@/entities/question';

import { DeleteQuestionButton } from '@/features/question/deleteQuestion';

import { QuestionBody } from '@/widgets/question/QuestionBody';
import { QuestionHeader } from '@/widgets/question/QuestionHeader';

import styles from './QuestionPageContent.module.css';

interface QuestionPageContentProps {
	question: Question;
	isDisabled: boolean;
}

export const QuestionPageContent = ({ question, isDisabled }: QuestionPageContentProps) => {
	const { t } = useTranslation(i18Namespace.translation);
	const { isMobile, isTablet } = useScreenSize();

	const { rate, keywords, complexity, questionSkills, shortAnswer, longAnswer, id, createdBy } =
		question;

	return (
		<>
			<BackHeader>
				<DeleteQuestionButton questionId={id} isDetailPage disabled={isDisabled} />
				<Tooltip
					title={t(Translation.TOOLTIP_COLLECTION_DISABLED_INFO)}
					placement="bottom-start"
					color="red"
					offsetTooltip={10}
					shouldShowTooltip={isDisabled}
				>
					<NavLink style={{ marginLeft: 'auto' }} to={route(ROUTES.admin.questions.edit.page, id)}>
						<Button disabled={isDisabled}>{t(Translation.EDIT)}</Button>
					</NavLink>
				</Tooltip>
			</BackHeader>
			<Flex gap="20">
				<Flex gap="20" direction="column" flex={1} maxWidth>
					<QuestionHeader question={question} />
					<QuestionBody shortAnswer={shortAnswer} longAnswer={longAnswer} />
				</Flex>
				{!isMobile && !isTablet && (
					<Flex direction="column" gap="20" className={styles.additional}>
						<QuestionAdditionalInfo
							rate={rate}
							createdBy={createdBy}
							keywords={keywords}
							complexity={complexity}
							questionSkills={questionSkills}
							route={ROUTES.wiki.questions.page}
						/>
					</Flex>
				)}
			</Flex>
		</>
	);
};
