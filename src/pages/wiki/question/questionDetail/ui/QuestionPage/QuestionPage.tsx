import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { i18Namespace, Questions } from '@/shared/config';
import { useAppSelector } from '@/shared/libs';

import { getProfileId } from '@/entities/profile';
import { useGetQuestionByIdQuery } from '@/entities/question';

import { useGetQuestionsFilterParams } from '@/features/question/filterQuestions';
import {
	useQuestionNavigation,
	useQuestionQueryNavigate,
} from '@/features/question/navigateQuestion';

import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';

import { QuestionPageContent } from '../QuestionPageContent/QuestionPageContent';
import { QuestionPageContentSkeleton } from '../QuestionPageContent/QuestionPageContent.skeleton';

export const QuestionPage = () => {
	const { t } = useTranslation(i18Namespace.questions);
	const filter = useGetQuestionsFilterParams({ page: 1, status: 'all' });
	const { questionId = '' } = useParams<{ questionId: string }>();
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

	const { handleNavigation } = useQuestionQueryNavigate();

	const { prevId, prevPage, nextId, nextPage, isDisabled } = useQuestionNavigation({
		questionId,
		filter,
	});

	const onMovePrev = () => {
		handleNavigation(prevId, prevPage);
	};

	const onMoveNext = () => {
		handleNavigation(nextId, nextPage);
	};

	const stubs: PageWrapperStubs = {
		empty: {
			title: t(Questions.STUB_EMPTY_QUESTION_TITLE),
			subtitle: t(Questions.STUB_EMPTY_QUESTION_SUBTITLE),
			buttonText: t(Questions.STUB_EMPTY_QUESTION_SUBMIT),
			onClick: refetch,
		},
		error: {
			onClick: refetch,
		},
	};

	const hasQuestion = question && Object.keys(question).length > 0;

	const content = hasQuestion ? (
		<QuestionPageContent
			question={question}
			questionId={questionId}
			isDisabled={isDisabled}
			onMovePrev={onMovePrev}
			onMoveNext={onMoveNext}
		/>
	) : null;

	return (
		<PageWrapper
			isLoading={isLoading}
			hasData={hasQuestion}
			hasError={isError}
			skeleton={<QuestionPageContentSkeleton />}
			stubs={stubs}
			content={content}
		>
			{({ content }) => content}
		</PageWrapper>
	);
};

export default QuestionPage;
