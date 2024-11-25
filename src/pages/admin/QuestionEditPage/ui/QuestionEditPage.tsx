import { useParams } from 'react-router-dom';

import { useAppSelector } from '@/shared/hooks/useAppSelector';

import { getProfileId } from '@/entities/profile';
import { useGetQuestionByIdQuery } from '@/entities/question';

import { QuestionEditForm } from '@/features/question/editQuestion';

const QuestionEditPage = () => {
	const { questionId } = useParams<{ questionId: string }>();
	const profileId = useAppSelector(getProfileId);
	const { data: question } = useGetQuestionByIdQuery({
		questionId,
		profileId,
	});

	if (!question) {
		return null;
	}

	return <QuestionEditForm question={question} />;
};

export default QuestionEditPage;
