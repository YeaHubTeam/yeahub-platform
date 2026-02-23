import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { i18Namespace, Questions } from '@/shared/config';
import { useAppSelector } from '@/shared/libs';

import { getIsAuthor, getProfileId, getUserId } from '@/entities/profile';
import { useGetQuestionByIdQuery } from '@/entities/question';

import { PageWrapper, type PageWrapperStubs } from '@/widgets/PageWrapper';

import { QuestionPageContent } from '../QuestionPageContent/QuestionPageContent';
import { QuestionPageContentSkeleton } from '../QuestionPageContent/QuestionPageContent.skeleton';

export const QuestionPage = () => {
	const { t } = useTranslation(i18Namespace.questions);
	const { questionId } = useParams<{ questionId: string }>();

	const profileId = useAppSelector(getProfileId);
	const userId = useAppSelector(getUserId);
	const isAuthor = useAppSelector(getIsAuthor);

	const {
		data: question,
		isLoading: isLoadingQuestion,
		isError: isErrorQuestion,
		refetch: refetchQuestion,
	} = useGetQuestionByIdQuery({
		questionId,
		profileId,
	});

	const hasQuestion = question && Object.keys(question).length > 0;
	const isDisabled = Boolean(hasQuestion && isAuthor && question.createdBy?.id !== userId);

	const stubs: PageWrapperStubs = {
		empty: {
			title: t(Questions.STUB_EMPTY_QUESTION_TITLE),
			subtitle: t(Questions.STUB_EMPTY_QUESTION_SUBTITLE),
			buttonText: t(Questions.STUB_EMPTY_QUESTION_SUBMIT),
			onClick: refetchQuestion,
		},
		error: {
			onClick: () => refetchQuestion,
		},
	};

	const content = hasQuestion ? (
		<QuestionPageContent question={question} isDisabled={isDisabled} />
	) : null;

	return (
		<PageWrapper
			isLoading={isLoadingQuestion}
			hasError={isErrorQuestion}
			hasData={hasQuestion}
			skeleton={<QuestionPageContentSkeleton />}
			stubs={stubs}
			roles={['admin', 'author']}
			content={content}
		>
			{({ content }) => content}
		</PageWrapper>
	);
};
