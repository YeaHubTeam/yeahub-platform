import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { i18Namespace, Questions, ROUTES } from '@/shared/config';
import { useAppSelector } from '@/shared/libs';

import { getProfileId } from '@/entities/profile';
import { useGetQuestionByIdQuery } from '@/entities/question';

import { QuestionEditForm } from '@/features/question/editQuestion';

import { EditAccessGuard } from '@/widgets/EditAccessGuard';
import { PageWrapper, type PageWrapperStubs } from '@/widgets/PageWrapper';

const QuestionEditPage = () => {
	const { t } = useTranslation(i18Namespace.questions);
	const { questionId } = useParams<{ questionId: string }>();
	const profileId = useAppSelector(getProfileId);

	const {
		data: question,
		isLoading,
		isError,
		refetch,
	} = useGetQuestionByIdQuery({
		questionId,
		profileId,
	});

	const hasQuestion = question && Object.keys(question).length > 0;

	const stubs: PageWrapperStubs = {
		error: {
			onClick: refetch,
		},
	};

	const content = hasQuestion ? (
		<EditAccessGuard
			authorId={question.createdBy?.id}
			redirectTo={ROUTES.admin.questions.page}
			titleStub={t(Questions.STUB_EDIT_ACCESS_TITLE)}
			subtitleStub={t(Questions.STUB_EDIT_ACCESS_SUBTITLE)}
			buttonTextStub={t(Questions.STUB_EDIT_ACCESS_SUBMIT)}
		>
			<QuestionEditForm question={question} />
		</EditAccessGuard>
	) : null;

	return (
		<PageWrapper
			isLoading={isLoading}
			hasError={isError}
			hasData={hasQuestion}
			stubs={stubs}
			roles={['admin', 'author']}
			content={content}
		>
			{({ content }) => content}
		</PageWrapper>
	);
};

export default QuestionEditPage;
