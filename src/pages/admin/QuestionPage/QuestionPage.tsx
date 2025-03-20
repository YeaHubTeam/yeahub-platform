import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useParams } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { route } from '@/shared/helpers/route';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { BackHeader } from '@/shared/ui/BackHeader';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

import { getProfileId } from '@/entities/profile';
import { useGetQuestionByIdQuery } from '@/entities/question';

import { DeleteQuestionButton } from '@/features/question/deleteQuestion';

import { QuestionAdditionalInfo } from '@/widgets/question/QuestionAdditionalInfo';
import { QuestionBody } from '@/widgets/question/QuestionBody';
import { QuestionHeader } from '@/widgets/question/QuestionHeader';

import styles from './QuestionPage.module.css';
import { QuestionPageSkeleton } from './QuestionPage.skeleton';

export const QuestionPage = () => {
	const { t } = useTranslation(i18Namespace.translation);

	const { isMobile, isTablet } = useScreenSize();
	const { questionId } = useParams<{ questionId: string }>();

	const profileId = useAppSelector(getProfileId);

	const {
		data: question,
		isFetching,
		isLoading,
	} = useGetQuestionByIdQuery({
		questionId,
		profileId,
	});

	if (isLoading || isFetching) {
		return <QuestionPageSkeleton />;
	}

	if (!question) {
		return null;
	}

	const { rate, keywords, complexity, questionSkills, shortAnswer, longAnswer, id, createdBy } =
		question;

	return (
		<>
			<BackHeader>
				<DeleteQuestionButton questionId={id} isDetailPage />
				<NavLink style={{ marginLeft: 'auto' }} to={route(ROUTES.admin.questions.edit.page, id)}>
					<Button>{t(Translation.EDIT)}</Button>
				</NavLink>
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
							route={ROUTES.interview.questions.page}
						/>
					</Flex>
				)}
			</Flex>
		</>
	);
};
