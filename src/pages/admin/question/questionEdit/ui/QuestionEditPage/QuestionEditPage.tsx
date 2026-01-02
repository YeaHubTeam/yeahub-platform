import { Navigate, useParams } from 'react-router-dom';

import { ROUTES } from '@/shared/config';
import { useAppSelector } from '@/shared/libs';

import { getIsAuthor, getProfileId, getUserId } from '@/entities/profile';
import { useGetQuestionByIdQuery } from '@/entities/question';

import { QuestionEditForm } from '../QuestionEditForm/QuestionEditForm';

const QuestionEditPage = () => {
	const { questionId } = useParams<{ questionId: string }>();
	const profileId = useAppSelector(getProfileId);
	const userId = useAppSelector(getUserId);
	const isAuthor = useAppSelector(getIsAuthor);
	const { data: question } = useGetQuestionByIdQuery({
		questionId,
		profileId,
	});

	if (!question) {
		return null;
	}

	if (isAuthor && question?.createdBy?.id !== userId) {
		return <Navigate to={ROUTES.admin.questions.page} />;
	}

	return <QuestionEditForm question={question} />;
};

export default QuestionEditPage;
