import { skipToken } from '@reduxjs/toolkit/query/react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { i18Namespace, ROUTES, TestQuestions, Translation } from '@/shared/config';
import { BackHeader } from '@/shared/ui/BackHeader';
import { Stub } from '@/shared/ui/Stub';

import { listAdminRoles } from '@/entities/auth';
import { useGetTestQuestionByIdQuery } from '@/entities/testQuestion';

import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';

import { TestQuestionPageContent } from '../TestQuestionPageContent/TestQuestionPageContent';

const TestQuestionPage = () => {
	const { t } = useTranslation(i18Namespace.testQuestion);
	const { articleId } = useParams<{ articleId: string }>();
	const navigate = useNavigate();
	const questionId = Number(articleId);
	const isValidId =
		/^\d+$/.test(articleId ?? '') && Number.isSafeInteger(questionId) && questionId > 0;
	const {
		currentData: question,
		isFetching,
		isError,
		error,
		refetch,
	} = useGetTestQuestionByIdQuery(isValidId ? questionId : skipToken);
	const status = error && typeof error === 'object' && 'status' in error ? error.status : undefined;
	const onReturnToAdmin = () => navigate(ROUTES.adminRoute);

	const stubs: PageWrapperStubs = {
		empty: {
			title: t(TestQuestions.STUB_EMPTY_TITLE),
			subtitle: t(TestQuestions.STUB_EMPTY_SUBTITLE),
			buttonText: t(Translation.RETURN, { ns: i18Namespace.translation }),
			onClick: onReturnToAdmin,
		},
		error: { onClick: () => refetch() },
	};

	const content =
		status === 403 ? (
			<Stub type="access-denied" onClick={onReturnToAdmin} />
		) : question ? (
			<TestQuestionPageContent question={question} />
		) : null;

	return (
		<>
			<BackHeader />
			<PageWrapper
				isLoading={isFetching && !question}
				hasError={isError && status !== 404 && status !== 403}
				hasData={Boolean(question) || status === 403}
				stubs={stubs}
				roles={listAdminRoles}
				content={content}
			>
				{({ content }) => content}
			</PageWrapper>
		</>
	);
};

export default TestQuestionPage;
