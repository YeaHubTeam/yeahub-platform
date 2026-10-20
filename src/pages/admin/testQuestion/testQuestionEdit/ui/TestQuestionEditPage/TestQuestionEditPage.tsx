import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { i18Namespace, ROUTES, TestQuestions } from '@/shared/config';
import { useAppSelector } from '@/shared/libs';

import { getProfileId } from '@/entities/profile';
import { useGetTestQuestionByIdQuery } from '@/entities/testQuestion';

import { TestQuestionEditForm } from '@/features/testQuestion/editTestQuestion';

import { EditAccessGuard } from '@/widgets/EditAccessGuard';
import { PageWrapper, type PageWrapperStubs } from '@/widgets/PageWrapper';

const TestQuestionEditPage = () => {
	const { t } = useTranslation(i18Namespace.testQuestion);
	const { testQuestionId } = useParams<{ testQuestionId: string }>();
	const profileId = useAppSelector(getProfileId);

	const {
		data: testQuestion,
		isLoading,
		isError,
		refetch,
	} = useGetTestQuestionByIdQuery({
		testQuestionId,
		profileId,
	});

	const hasTestQuestion = testQuestion && Object.keys(testQuestion).length > 0;

	const stubs: PageWrapperStubs = {
		error: {
			onClick: refetch,
		},
	};

	const content = hasTestQuestion ? (
		<EditAccessGuard
			authorId={testQuestion.createdBy?.id ?? testQuestion.createdById}
			redirectTo={ROUTES.admin.testQuestions.page}
			titleStub={t(TestQuestions.STUB_EDIT_ACCESS_TITLE)}
			subtitleStub={t(TestQuestions.STUB_EDIT_ACCESS_SUBTITLE)}
			buttonTextStub={t(TestQuestions.STUB_EDIT_ACCESS_SUBMIT)}
		>
			<TestQuestionEditForm testQuestion={testQuestion} />
		</EditAccessGuard>
	) : null;

	return (
		<PageWrapper
			isLoading={isLoading}
			hasError={isError}
			hasData={hasTestQuestion}
			stubs={stubs}
			roles={['admin', 'author']}
			content={content}
		>
			{({ content }) => content}
		</PageWrapper>
	);
};

export default TestQuestionEditPage;
