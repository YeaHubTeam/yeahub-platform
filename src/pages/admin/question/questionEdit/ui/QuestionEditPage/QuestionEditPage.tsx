import { Navigate, useParams } from 'react-router-dom';

import { ROUTES } from '@/shared/config';
import { route, useAppSelector } from '@/shared/libs';

import { getIsAuthor, getProfileId, getUserId } from '@/entities/profile';
import { useGetQuestionByIdQuery } from '@/entities/question';

import { QuestionEditForm } from '@/features/question/editQuestion';

import { PageWrapper, type PageWrapperStubs } from '@/widgets/PageWrapper';

const QuestionEditPage = () => {
	const { questionId } = useParams<{ questionId: string }>();

	const profileId = useAppSelector(getProfileId);
	const userId = useAppSelector(getUserId);
	const isAuthor = useAppSelector(getIsAuthor);

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

	if (hasQuestion && isAuthor && question.createdBy?.id !== userId) {
		return <Navigate to={route(ROUTES.admin.questions.page)} />;
	}

	const stubs: PageWrapperStubs = {
		error: {
			onClick: refetch,
		},
	};

	const content = hasQuestion ? <QuestionEditForm question={question} /> : null;

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
